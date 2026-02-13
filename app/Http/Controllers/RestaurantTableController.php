<?php

namespace App\Http\Controllers;

use App\Models\RestaurantTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class RestaurantTableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tables = RestaurantTable::orderBy('table_number')->get();
        return view('admin.tables.index', compact('tables'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.tables.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'table_number' => 'required|string|max:255|unique:restaurant_tables,table_number',
            'capacity' => 'required|integer|min:1|max:20',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $table = RestaurantTable::create([
            'table_number' => $request->table_number,
            'capacity' => $request->capacity,
            'location' => $request->location,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()
            ->route('admin.tables.index')
            ->with('success', 'Table created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RestaurantTable $table)
    {
        return view('admin.tables.show', compact('table'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RestaurantTable $table)
    {
        return view('admin.tables.edit', compact('table'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RestaurantTable $table)
    {
        $request->validate([
            'table_number' => 'required|string|max:255|unique:restaurant_tables,table_number,' . $table->id,
            'capacity' => 'required|integer|min:1|max:20',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $table->update([
            'table_number' => $request->table_number,
            'capacity' => $request->capacity,
            'location' => $request->location,
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()
            ->route('admin.tables.index')
            ->with('success', 'Table updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RestaurantTable $table)
    {
        // Check if table has active orders
        if ($table->orders()->whereIn('status', ['pending', 'confirmed', 'preparing'])->count() > 0) {
            return redirect()
                ->route('admin.tables.index')
                ->with('error', 'Cannot delete table with active orders.');
        }

        // Delete QR code file if exists
        if ($table->qr_code_path && Storage::disk('public')->exists($table->qr_code_path)) {
            Storage::disk('public')->delete($table->qr_code_path);
        }

        $table->delete();

        return redirect()
            ->route('admin.tables.index')
            ->with('success', 'Table deleted successfully.');
    }

    /**
     * Generate QR code for table
     */
    public function generateQr(Request $request, RestaurantTable $table)
    {
        // Create QR code content (URL to menu with table parameter)
        $menuUrl = route('menu', ['table' => $table->table_number]);

        // Use a public QR generation API to fetch a PNG image
        $qrApi = 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=' . urlencode($menuUrl);

        try {
            $response = Http::timeout(10)->get($qrApi);
            if ($response->successful()) {
                $filename = 'qr-codes/table-' . $table->table_number . '.png';
                Storage::disk('public')->put($filename, $response->body());

                $table->update([
                    'qr_code_path' => $filename,
                    'qr_code_generated_at' => now(),
                ]);

                $payload = [
                    'success' => true,
                    'message' => 'QR code generated successfully.',
                    'menu_url' => $menuUrl,
                    'qr_path' => Storage::disk('public')->url($filename)
                ];

                if ($request->wantsJson()) {
                    return response()->json($payload);
                }

                return redirect()->route('admin.tables.index')->with('success', 'QR code generated successfully.');
            }
        } catch (\Throwable $e) {
            // fall through to error below
        }

        // Fallback: store URL as a txt file (previous behavior)
        $filename = 'qr-codes/table-' . $table->table_number . '.txt';
        Storage::disk('public')->put($filename, $menuUrl);

        $table->update([
            'qr_code_path' => $filename,
            'qr_code_generated_at' => now(),
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => false,
                'message' => 'QR generation service unavailable; saved URL as placeholder.',
                'menu_url' => $menuUrl,
            ]);
        }

        return redirect()->route('admin.tables.index')->with('error', 'QR generation failed; saved URL as placeholder.');
    }

    /**
     * Download QR code
     */
    public function downloadQr(RestaurantTable $table)
    {
        if (!$table->qr_code_path || !Storage::disk('public')->exists($table->qr_code_path)) {
            return redirect()
                ->route('admin.tables.index')
                ->with('error', 'QR code not found. Please generate it first.');
        }

        $filename = 'Table-' . $table->table_number . '-QR';

        // If stored file is an image (png/jpg), append extension
        $ext = pathinfo($table->qr_code_path, PATHINFO_EXTENSION);
        if (in_array(strtolower($ext), ['png', 'jpg', 'jpeg', 'svg'])) {
            $filename .= '.' . $ext;
        } else {
            // default to .txt
            $filename .= '.txt';
        }

        return Storage::disk('public')->download($table->qr_code_path, $filename);
    }

    /**
     * Download QR code as a simple PDF (built with pure PHP, no composer required).
     */
    public function downloadQrPdf(RestaurantTable $table)
    {
        if (! $table->qr_code_path || ! Storage::disk('public')->exists($table->qr_code_path)) {
            return redirect()->route('admin.tables.index')->with('error', 'QR code not found. Please generate it first.');
        }

        // Get full path to image on public disk
        $imagePath = Storage::disk('public')->path($table->qr_code_path);

        // Load image (support PNG/JPEG). We'll convert to JPEG in-memory using GD for simpler PDF embedding.
        if (! extension_loaded('gd')) {
            return redirect()->route('admin.tables.index')->with('error', 'GD extension is required to generate PDF.');
        }

        $img = null;
        $ext = strtolower(pathinfo($imagePath, PATHINFO_EXTENSION));
        if (in_array($ext, ['png'])) {
            $img = @imagecreatefrompng($imagePath);
        } elseif (in_array($ext, ['jpg','jpeg'])) {
            $img = @imagecreatefromjpeg($imagePath);
        }

        if (! $img) {
            return redirect()->route('admin.tables.index')->with('error', 'Unable to read QR image for PDF generation.');
        }

        // Convert to JPEG binary in-memory
        ob_start();
        imagejpeg($img, null, 90);
        $jpegData = ob_get_clean();
        imagedestroy($img);

        // Get image dimensions
        $info = getimagesizefromstring($jpegData);
        $widthPx = $info[0];
        $heightPx = $info[1];

        // PDF units: use pixels as points (approx 1 px = 1 pt for simplicity)
        $w = $widthPx;
        $h = $heightPx;

        // Build minimal PDF with embedded JPEG stream
        $obj = [];
        $offsets = [];
        $pdf = "%PDF-1.3\n%\u00e2\u00e3\u00cf\u00d3\n";

        // 1: Catalog
        $offsets[1] = strlen($pdf);
        $obj[1] = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
        $pdf .= $obj[1];

        // 2: Pages
        $offsets[2] = strlen($pdf);
        $obj[2] = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
        $pdf .= $obj[2];

        // 3: Page
        $offsets[3] = strlen($pdf);
        $contentsStream = "q\n{$w} 0 0 {$h} 0 0 cm\n/Im0 Do\nQ\n";
        $contents = $contentsStream;
        $obj[3] = "3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /XObject << /Im0 4 0 R >> /ProcSet [/PDF /ImageC] >> /MediaBox [0 0 {$w} {$h}] /Contents 5 0 R >>\nendobj\n";
        $pdf .= $obj[3];

        // 4: Image XObject (JPEG)
        $offsets[4] = strlen($pdf);
        $stream = $jpegData;
        $len = strlen($stream);
        $obj[4] = "4 0 obj\n<< /Type /XObject /Subtype /Image /Width {$widthPx} /Height {$heightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length {$len} >>\nstream\n";
        $pdf .= $obj[4];
        $pdf .= $stream . "\nendstream\nendobj\n";

        // 5: Contents stream
        $offsets[5] = strlen($pdf);
        $lenC = strlen($contents);
        $obj[5] = "5 0 obj\n<< /Length {$lenC} >>\nstream\n" . $contents . "\nendstream\nendobj\n";
        $pdf .= $obj[5];

        // xref
        $xrefOffset = strlen($pdf);
        $pdf .= "xref\n0 6\n0000000000 65535 f \n";
        for ($i = 1; $i <= 5; $i++) {
            $pdf .= str_pad($offsets[$i], 10, '0', STR_PAD_LEFT) . " 00000 n \n";
        }

        // trailer
        $pdf .= "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n{$xrefOffset}\n%%EOF";

        // Stream PDF to browser
        $pdfName = 'Table-' . $table->table_number . '-QR.pdf';
        return response($pdf, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="' . $pdfName . '"');
    }
}
<?php
// scripts/assign_images.php
// Usage:
//  php scripts/assign_images.php           # dry-run (no DB changes)
//  php scripts/assign_images.php --apply   # persist updates

require __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Product;

$apply = in_array('--apply', $argv, true);

echo "Auto-matching product images\n";
echo $apply ? "Mode: APPLY (will update DB)\n" : "Mode: DRY-RUN (no changes)\n";

$files = [];
try {
    $files = Storage::disk('public')->files('products');
} catch (Throwable $e) {
    echo "Error listing public disk files: " . $e->getMessage() . "\n";
    exit(1);
}

if (empty($files)) {
    echo "No files found under public disk 'products/'\n";
}

// Normalize filenames to basename map
$basenameMap = [];
foreach ($files as $f) {
    $basenameMap[basename($f)] = $f; // e.g., 'xyz.jpg' => 'products/xyz.jpg'
}

$products = Product::orderBy('id')->get();

$matched = 0;
$skipped = 0;
$updated = 0;

foreach ($products as $product) {
    if (!empty($product->image_path)) {
        // already has an image
        continue;
    }

    $candidates = [];

    // 1) Try basename equals slug + extension
    $slug = $product->slug;
    if ($slug) {
        foreach ($basenameMap as $basename => $full) {
            $nameWithoutExt = pathinfo($basename, PATHINFO_FILENAME);
            if (strcasecmp($nameWithoutExt, $slug) === 0) {
                $candidates[] = $full;
            }
        }
    }

    // 2) Try slug contained in filename
    if (empty($candidates) && $slug) {
        foreach ($basenameMap as $basename => $full) {
            if (stripos($basename, $slug) !== false) {
                $candidates[] = $full;
            }
        }
    }

    // 3) Try normalized product name words matched in filename
    if (empty($candidates)) {
        $norm = Str::slug($product->name ?: '');
        if ($norm) {
            foreach ($basenameMap as $basename => $full) {
                if (stripos($basename, $norm) !== false) {
                    $candidates[] = $full;
                }
            }
        }
    }

    // 4) If still empty, try matching by product id in filename
    if (empty($candidates)) {
        foreach ($basenameMap as $basename => $full) {
            if (stripos($basename, (string)$product->id) !== false) {
                $candidates[] = $full;
            }
        }
    }

    // 5) If exactly one candidate, pick it
    if (count($candidates) === 1) {
        $path = ltrim($candidates[0], '/');
        echo "Match: Product(id={$product->id}, name='{$product->name}') -> {$path}\n";
        $matched++;
        if ($apply) {
            $product->image_path = $path;
            $product->save();
            $updated++;
        }
    } elseif (count($candidates) > 1) {
        echo "Ambiguous: Product(id={$product->id}, name='{$product->name}') candidates:\n";
        foreach ($candidates as $c) {
            echo "  - {$c}\n";
        }
        $skipped++;
    } else {
        // try a looser match: if only one file exists, and product name words overlap
        // skip for safety
        $skipped++;
    }
}

echo "\nSummary:\n";
echo "  products scanned: " . $products->count() . "\n";
echo "  matched (dry candidates): {$matched}\n";
echo "  updated (applied): {$updated}\n";
echo "  skipped/ambiguous: {$skipped}\n";

if (!$apply) {
    echo "\nRun with --apply to persist updates.\n";
}

return 0;

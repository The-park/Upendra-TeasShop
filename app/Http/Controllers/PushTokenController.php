<?php

namespace App\Http\Controllers;

use App\Models\DeviceToken;
use Illuminate\Http\Request;

class PushTokenController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'token'    => 'required|string',
            'platform' => 'nullable|string|max:50',
            'device_id'=> 'nullable|string|max:191',
        ]);

        $deviceId = $data['device_id'] ?? $request->header('X-Device-Id');

        $token = DeviceToken::updateOrCreate(
            [
                'token'    => $data['token'],
                'platform' => $data['platform'] ?? null,
                'device_id'=> $deviceId,
            ],
            [
                'last_used_at' => now(),
            ]
        );

        return response()->json([
            'success' => true,
            'id'      => $token->id,
        ]);
    }
}

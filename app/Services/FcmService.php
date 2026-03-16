<?php

namespace App\Services;

use App\Models\DeviceToken;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FcmService
{
    protected string $endpoint = 'https://fcm.googleapis.com/fcm/send';

    public function sendToAll(string $title, string $body, array $data = []): void
    {
        $tokens = DeviceToken::query()->pluck('token')->all();
        if (empty($tokens)) {
            return;
        }

        $chunks = array_chunk($tokens, 500); // FCM limit per request

        foreach ($chunks as $chunk) {
            $this->sendRaw($chunk, $title, $body, $data);
        }
    }

    public function sendToToken(string $token, string $title, string $body, array $data = []): void
    {
        $this->sendRaw([$token], $title, $body, $data);
    }

    protected function sendRaw(array $tokens, string $title, string $body, array $data = []): void
    {
        $serverKey = config('services.fcm.server_key');
        if (!$serverKey) {
            Log::warning('FCM server key not configured; skipping push notification.');
            return;
        }

        $payload = [
            'registration_ids' => $tokens,
            'notification' => [
                'title' => $title,
                'body'  => $body,
            ],
            'data' => $data,
        ];

        try {
            $response = Http::withToken($serverKey)
                ->acceptJson()
                ->post($this->endpoint, $payload);

            if ($response->failed()) {
                Log::error('FCM request failed', [
                    'status' => $response->status(),
                    'body'   => $response->body(),
                ]);
            }
        } catch (\Throwable $e) {
            Log::error('FCM request threw exception: '.$e->getMessage());
        }
    }
}

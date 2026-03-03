<?php

namespace Tests\Feature\UnitTests;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AdminAuthTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_admin_can_login()
    {
        $admin = User::factory()->create([
            'email' => 'admin@teashop.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        $response = $this->post('/login', [
            'email' => 'admin@teashop.com',
            'password' => 'password'
        ]);

        $response->assertRedirect('/dashboard');
        $this->assertAuthenticatedAs($admin);
    }

    public function test_admin_dashboard_requires_authentication()
    {
        $response = $this->get('/admin/dashboard');
        $response->assertRedirect('/login');
    }

    public function test_non_admin_cannot_access_admin_dashboard()
    {
        $user = User::factory()->create([
            'role' => 'staff'
        ]);

        $response = $this->actingAs($user)->get('/admin/dashboard');
        $response->assertStatus(403);
    }

    public function test_admin_can_access_all_admin_routes()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $routes = [
            '/admin/dashboard',
            '/admin/products',
            '/admin/categories',
            '/admin/tables',
            '/admin/orders/history',
            '/admin/analytics',
            '/admin/analytics/sales',
            '/admin/analytics/products',
        ];

        foreach ($routes as $route) {
            $response = $this->actingAs($admin)->get($route);
            $response->assertSuccessful();
        }
    }

    public function test_admin_can_logout()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin);
        $response = $this->post('/logout');

        $response->assertRedirect('/');
        $this->assertGuest();
    }
}
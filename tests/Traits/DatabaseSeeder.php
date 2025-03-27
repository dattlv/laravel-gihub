<?php

namespace Tests\Traits;

use Illuminate\Foundation\Testing\RefreshDatabase;

trait DatabaseSeeder
{
    use RefreshDatabase;

    /**
     * Set up the test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        
        // Run the database seeder
        $this->seed();
    }
}
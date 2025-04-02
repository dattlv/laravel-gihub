<?php

namespace Tests\Unit\Requests\Project;

use App\Http\Requests\Project\StoreProjectRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;
use App\Models\ProjectCategory;

class StoreProjectRequestTest extends TestCase
{
    use RefreshDatabase;

    private function rules()
    {
        return (new StoreProjectRequest())->rules();
    }

    /** @test */
    public function it_validates_required_fields()
    {
        // Arrange
        $validator = Validator::make([], $this->rules());

        // Assert
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->messages());
        $this->assertArrayHasKey('category_id', $validator->errors()->messages());
        $this->assertArrayHasKey('status', $validator->errors()->messages());
        $this->assertArrayHasKey('visibility', $validator->errors()->messages());
    }

    /** @test */
    public function it_validates_valid_project_data()
    {
        // Create a valid category first
        $category = ProjectCategory::factory()->create();

        // Prepare valid project data
        $data = [
            'name' => 'Test Project',
            'description' => 'This is a test project',
            'category_id' => $category->id,
            'start_date' => now()->format('Y-m-d'),
            'end_date' => now()->addDays(30)->format('Y-m-d'),
            'status' => 'active',
            'visibility' => 'private',
            'priority' => 'medium',
            'tags' => ['test', 'project'],
            'settings' => ['notifications' => true]
        ];

        // Act
        $validator = Validator::make($data, $this->rules());

        // Assert
        $this->assertFalse($validator->fails(), $validator->errors()->first());
    }

    /** @test */
    public function it_validates_status_values()
    {
        // Arrange
        $data = [
            'name' => 'Test Project',
            'category_id' => 1,
            'status' => 'invalid_status',
            'visibility' => 'public'
        ];

        // Act
        $validator = Validator::make($data, $this->rules());

        // Assert
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('status', $validator->errors()->messages());
    }

    /** @test */
    public function it_validates_visibility_values()
    {
        // Arrange
        $data = [
            'name' => 'Test Project',
            'category_id' => 1,
            'status' => 'active',
            'visibility' => 'invalid_visibility'
        ];

        // Act
        $validator = Validator::make($data, $this->rules());

        // Assert
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('visibility', $validator->errors()->messages());
    }

    /** @test */
    public function it_validates_date_order()
    {
        // Arrange
        $data = [
            'name' => 'Test Project',
            'category_id' => 1,
            'status' => 'active',
            'visibility' => 'public',
            'start_date' => '2024-12-31',
            'end_date' => '2024-01-01' // End date before start date
        ];

        // Act
        $validator = Validator::make($data, $this->rules());

        // Assert
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('end_date', $validator->errors()->messages());
    }
}

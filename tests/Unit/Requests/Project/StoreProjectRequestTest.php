<?php

namespace Tests\Unit\Requests\Project;

use App\Http\Requests\Project\StoreProjectRequest;
use App\Models\ProjectCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class StoreProjectRequestTest extends TestCase
{
    use RefreshDatabase;

    private StoreProjectRequest $request;
    private array $validData;

    protected function setUp(): void
    {
        parent::setUp();

        $this->request = new StoreProjectRequest();

        // Create test category
        $category = ProjectCategory::factory()->create();

        // Set up valid project data
        $this->validData = [
            'name' => 'Test Project',
            'description' => 'Test Description',
            'category_id' => $category->id,
            'start_date' => now()->format('Y-m-d'),
            'end_date' => now()->addDays(30)->format('Y-m-d'),
            'status' => 'active',
            'visibility' => 'private',
            'priority' => 'medium',
            'settings' => [
                'notifications' => true,
                'task_tracking' => true
            ]
        ];
    }

    #[Test]
    public function it_validates_required_fields()
    {
        $validator = validator([], $this->request->rules());
        $this->assertTrue($validator->fails());

        $errors = $validator->errors();
        $this->assertTrue($errors->has('name'));
        $this->assertTrue($errors->has('category_id'));
        $this->assertTrue($errors->has('start_date'));
        $this->assertTrue($errors->has('status'));
        $this->assertTrue($errors->has('visibility'));
        $this->assertTrue($errors->has('priority'));
    }

    #[Test]
    public function it_validates_valid_project_data()
    {
        $validator = validator($this->validData, $this->request->rules());
        $this->assertFalse($validator->fails());
    }

    #[Test]
    public function it_validates_status_values()
    {
        $data = array_merge($this->validData, ['status' => 'invalid_status']);
        $validator = validator($data, $this->request->rules());
        $this->assertTrue($validator->fails());
        $this->assertTrue($validator->errors()->has('status'));
    }

    #[Test]
    public function it_validates_visibility_values()
    {
        $data = array_merge($this->validData, ['visibility' => 'invalid_visibility']);
        $validator = validator($data, $this->request->rules());
        $this->assertTrue($validator->fails());
        $this->assertTrue($validator->errors()->has('visibility'));
    }

    #[Test]
    public function it_validates_date_order()
    {
        $data = array_merge($this->validData, [
            'start_date' => now()->format('Y-m-d'),
            'end_date' => now()->subDays(1)->format('Y-m-d')
        ]);

        $validator = validator($data, $this->request->rules());
        $this->assertTrue($validator->fails());
        $this->assertTrue($validator->errors()->has('end_date'));
    }
}

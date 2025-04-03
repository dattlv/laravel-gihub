# Code Structure and Conventions

## Directory Structure

```
app/
├── Http/
│   ├── Controllers/      # Request handlers
│   │   ├── Project/     # Project-related controllers
│   │   └── Auth/        # Authentication controllers
│   ├── Requests/        # Form request validation
│   ├── Resources/       # API resources
│   └── Middleware/      # Custom middleware
├── Models/              # Eloquent models
├── Services/           # Business logic
│   └── Project/        # Project-related services
├── Repositories/       # Data access layer
│   └── Contracts/      # Repository interfaces
├── Events/            # Event classes
│   └── Project/       # Project-related events
├── Listeners/         # Event listeners
└── Policies/          # Authorization policies

resources/
├── js/
│   ├── Components/     # React components
│   ├── Pages/         # Page components
│   ├── Layouts/       # Layout components
│   └── utils/         # Utility functions
```

## Coding Standards

### PHP

1. **PSR-12 Coding Style**
   - Use PSR-12 for all PHP code
   - Configure PHP CS Fixer accordingly

2. **Naming Conventions**
   - Controllers: `{Resource}Controller`
   - Services: `{Resource}Service`
   - Repositories: `{Resource}Repository`
   - Events: `{Action}{Resource}`
   - Requests: `{Action}{Resource}Request`

3. **Type Hinting**
   - Use type hints for parameters and return types
   - Use nullable types where appropriate
   - Use strict types declaration

### TypeScript/JavaScript

1. **File Naming**
   - Components: PascalCase (e.g., `ProjectCard.tsx`)
   - Utilities: camelCase (e.g., `formatDate.ts`)
   - Interfaces: PascalCase with 'I' prefix (e.g., `IProject.ts`)

2. **Component Structure**
   - One component per file
   - Use functional components with hooks
   - Props interface at the top of file

## Best Practices

### Controllers
- Keep controllers thin
- Use Form Request Validation
- Return API Resources
- Use dependency injection

```php
class ProjectController extends Controller
{
    public function __construct(
        private ProjectService $projectService
    ) {}

    public function store(StoreProjectRequest $request)
    {
        $project = $this->projectService->createProject(
            $request->validated(),
            $request->user()->id
        );
        
        return new ProjectResource($project);
    }
}
```

### Services
- Business logic goes here
- Use repository pattern
- Handle complex operations
- Emit events when necessary

```php
class ProjectService
{
    public function __construct(
        private ProjectRepository $projectRepository
    ) {}

    public function createProject(array $data, int $ownerId): Project
    {
        $project = $this->projectRepository->create([
            ...data,
            'owner_id' => $ownerId
        ]);

        event(new ProjectCreated($project));

        return $project;
    }
}
```

### Models
- Define relationships
- Use type casting
- Keep business logic in services
- Use model observers for simple events

```php
class Project extends Model
{
    protected $fillable = [
        'name',
        'description',
        'status',
        'owner_id'
    ];

    protected $casts = [
        'status' => ProjectStatus::class
    ];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }
}
```

### React Components
- Use TypeScript
- Implement proper error boundaries
- Use proper prop types
- Keep components small and focused

```typescript
interface ProjectCardProps {
    project: IProject;
    onEdit?: (project: IProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    onEdit
}) => {
    return (
        <div className="card">
            <h3>{project.name}</h3>
            {onEdit && (
                <button onClick={() => onEdit(project)}>
                    Edit
                </button>
            )}
        </div>
    );
};
```

## Testing

### PHP Tests
- Unit tests for Services and Repositories
- Feature tests for Controllers
- Use factories for test data
- Mock external services

### JavaScript Tests
- Unit tests for utilities
- Component tests with React Testing Library
- Integration tests for complex features
- E2E tests with Cypress 

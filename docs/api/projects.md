# Projects API

## List Projects
Get a list of all projects.

### Request
```http
GET /api/v1/projects
```

### Query Parameters
| Parameter    | Type    | Description                               |
|-------------|---------|-------------------------------------------|
| status      | string  | Filter by status (active, archived)        |
| visibility  | string  | Filter by visibility (public, private)     |
| category_id | integer | Filter by category                         |
| search      | string  | Search in project name and description     |
| per_page    | integer | Number of items per page (default: 10)     |

### Response
```json
{
    "data": [
        {
            "id": 1,
            "name": "Project Name",
            "slug": "project-name",
            "description": "Project description",
            "status": "active",
            "visibility": "public",
            "owner_id": 1,
            "category_id": 1,
            "created_at": "2024-04-01T00:00:00.000000Z",
            "updated_at": "2024-04-01T00:00:00.000000Z",
            "owner": {
                "id": 1,
                "name": "John Doe"
            },
            "category": {
                "id": 1,
                "name": "Category Name"
            }
        }
    ],
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "per_page": 10,
        "to": 1,
        "total": 1
    }
}
```

## Create Project

### Request
```http
POST /api/v1/projects
```

### Request Body
| Parameter    | Type    | Required | Description                    |
|-------------|---------|----------|--------------------------------|
| name        | string  | Yes      | Project name                   |
| description | string  | No       | Project description            |
| visibility  | string  | Yes      | public or private              |
| category_id | integer | No       | Category ID                    |

### Response
```json
{
    "data": {
        "id": 1,
        "name": "Project Name",
        "slug": "project-name",
        "description": "Project description",
        "status": "active",
        "visibility": "public",
        "owner_id": 1,
        "category_id": 1,
        "created_at": "2024-04-01T00:00:00.000000Z",
        "updated_at": "2024-04-01T00:00:00.000000Z"
    }
}
```

## Get Project

### Request
```http
GET /api/v1/projects/{id}
```

### Response
```json
{
    "data": {
        "id": 1,
        "name": "Project Name",
        "slug": "project-name",
        "description": "Project description",
        "status": "active",
        "visibility": "public",
        "owner_id": 1,
        "category_id": 1,
        "created_at": "2024-04-01T00:00:00.000000Z",
        "updated_at": "2024-04-01T00:00:00.000000Z",
        "owner": {
            "id": 1,
            "name": "John Doe"
        },
        "category": {
            "id": 1,
            "name": "Category Name"
        },
        "members": [
            {
                "id": 1,
                "name": "Jane Doe",
                "role": "member"
            }
        ]
    }
}
```

## Update Project

### Request
```http
PUT /api/v1/projects/{id}
```

### Request Body
| Parameter    | Type    | Required | Description                    |
|-------------|---------|----------|--------------------------------|
| name        | string  | No       | Project name                   |
| description | string  | No       | Project description            |
| visibility  | string  | No       | public or private              |
| category_id | integer | No       | Category ID                    |

### Response
Same as Get Project

## Delete Project

### Request
```http
DELETE /api/v1/projects/{id}
```

### Response
```json
{
    "message": "Project deleted successfully"
}
```

## Archive Project

### Request
```http
PUT /api/v1/projects/{id}/archive
```

### Response
Same as Get Project with status "archived"

## Restore Project

### Request
```http
PUT /api/v1/projects/{id}/restore
```

### Response
Same as Get Project with status "active" 

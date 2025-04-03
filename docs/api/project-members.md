# Project Members API

## List Project Members
Get a list of all members for a specific project.

### Request
```http
GET /api/v1/projects/{project_id}/members
```

### Response
```json
{
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "project_id": 1,
            "role": "owner",
            "permissions": {
                "view": true,
                "create": true,
                "update": true,
                "delete": true
            },
            "created_at": "2024-04-01T00:00:00.000000Z",
            "updated_at": "2024-04-01T00:00:00.000000Z",
            "user": {
                "id": 1,
                "name": "John Doe",
                "email": "john@example.com"
            }
        }
    ]
}
```

## Add Project Member

### Request
```http
POST /api/v1/projects/{project_id}/members
```

### Request Body
| Parameter    | Type    | Required | Description                    |
|-------------|---------|----------|--------------------------------|
| user_id     | integer | Yes      | User ID to add as member       |
| role        | string  | No       | Member role (default: member)  |
| permissions | object  | No       | Custom permissions object      |

### Response
```json
{
    "data": {
        "id": 1,
        "user_id": 1,
        "project_id": 1,
        "role": "member",
        "permissions": {
            "view": true,
            "create": true,
            "update": false,
            "delete": false
        },
        "created_at": "2024-04-01T00:00:00.000000Z",
        "updated_at": "2024-04-01T00:00:00.000000Z",
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com"
        }
    }
}
```

## Update Project Member

### Request
```http
PUT /api/v1/projects/{project_id}/members/{user_id}
```

### Request Body
| Parameter    | Type    | Required | Description                    |
|-------------|---------|----------|--------------------------------|
| role        | string  | No       | Member role                    |
| permissions | object  | No       | Custom permissions object      |

### Response
Same as Add Project Member response

## Remove Project Member

### Request
```http
DELETE /api/v1/projects/{project_id}/members/{user_id}
```

### Response
```json
{
    "message": "Member removed successfully"
}
```

## Get Member Permissions

### Request
```http
GET /api/v1/projects/{project_id}/members/{user_id}/permissions
```

### Response
```json
{
    "data": {
        "view": true,
        "create": true,
        "update": false,
        "delete": false
    }
}
```

## Available Roles
The following roles are available for project members:
- owner: Full access to project
- admin: Can manage project and members
- member: Basic project access
- guest: View-only access

Each role comes with predefined permissions, but these can be customized per member. 

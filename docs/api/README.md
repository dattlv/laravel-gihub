# API Documentation

## Overview
This documentation provides information about the Project Management System API endpoints, authentication, and usage.

## Table of Contents
1. [Authentication](#authentication)
2. [Projects](#projects)
3. [Project Members](#project-members)
4. [Project Categories](#project-categories)
5. [Sprints](#sprints)

## Base URL
```
https://api.example.com/v1
```

## Authentication
All API requests require authentication using Laravel Sanctum. Include the authentication token in the request header:

```
Authorization: Bearer {your-token}
```

## Rate Limiting
API requests are limited to 60 requests per minute per user.

## Error Handling
The API uses standard HTTP response codes:
- 200: Success
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 422: Validation error
- 500: Server error

## Endpoints Overview
Each section below details the available endpoints for different resources:
- Projects: CRUD operations for projects
- Project Members: Managing project team members
- Project Categories: Managing project categories
- Sprints: Managing project sprints 

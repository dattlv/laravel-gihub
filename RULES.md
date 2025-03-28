# Quy tắc và Quy ước Phát triển

## 1. Quy ước Đặt tên
### PHP/Laravel
- Tên class: PascalCase (UserController, OrderService)
- Tên method: camelCase (getUserById, createOrder)
- Tên biến: camelCase (userCount, orderTotal)
- Tên constant: SCREAMING_SNAKE_CASE (APP_VERSION, USER_TYPES)
- Tên file: PascalCase cho class (UserController.php)
- Tên route: kebab-case (user-profile, create-order)
- Tên database: snake_case (users, order_items)

### JavaScript/Frontend
- Component names: PascalCase (UserProfile, OrderList)
- Variables/Functions: camelCase (getUserData, calculateTotal)
- Constants: SCREAMING_SNAKE_CASE (API_ENDPOINT)
- File names: PascalCase for components (UserProfile.vue)
- CSS classes: kebab-case (user-card, order-container)

## 2. Cấu trúc Thư mục 
project/
├── app/
│ ├── Http/
│ │ ├── Controllers/
│ │ ├── Middleware/
│ │ └── Requests/
│ ├── Models/
│ ├── Services/
│ └── Repositories/
├── resources/
│ ├── js/
│ ├── css/
│ └── views/
└── tests/
├── Unit/
└── Feature/

## 3. Coding Standards
### PHP
- Tuân thủ PSR-12
- Sử dụng type hints và return types
- Docblock cho methods và classes
- Maximum line length: 120 characters

### JavaScript
- Sử dụng ES6+ features
- Prefer const over let
- Async/await over promises
- Maximum line length: 100 characters

## 4. Database
- Tên bảng: số nhiều, snake_case
- Foreign keys: singular_model_id
- Timestamps: created_at, updated_at
- Soft deletes: deleted_at
- Index names: idx_{table}_{column}

## 5. Git
- Branch naming: feature/, bugfix/, hotfix/
- Commit message format: 
  - feat: new feature
  - fix: bug fix
  - docs: documentation
  - style: formatting
  - refactor: code restructure
  - test: adding tests
  - chore: maintenance

## 6. Testing
- Unit tests cho business logic
- Feature tests cho endpoints
- Naming convention: test_should_do_something
- Coverage minimum: 80%

## 7. Documentation
- API documentation using OpenAPI/Swagger
- README.md cho mỗi module chính
- Inline comments cho complex logic
- PHPDoc cho public methods
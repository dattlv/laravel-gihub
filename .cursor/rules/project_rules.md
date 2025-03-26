# Quy tắc phát triển dự án Laravel

## Quy tắc chung

1. **Tuân thủ PSR-12** - Tuân thủ chuẩn PSR-12 về coding style.
2. **Ngôn ngữ trong mã nguồn** - Sử dụng tiếng Anh cho tất cả mã nguồn, comment, tên biến, tên lớp...
3. **Đặt tên có ý nghĩa** - Đặt tên biến, lớp, phương thức theo chức năng cụ thể và dễ hiểu.
4. **Không viết tắt** - Tránh sử dụng viết tắt trừ khi là những từ viết tắt phổ biến (ví dụ: HTTP, URL).
5. **Duy trì độ phức tạp thấp** - Mỗi phương thức không nên quá 20-25 dòng. Nếu dài hơn, cân nhắc tách thành nhiều phương thức.

## Kiến trúc ứng dụng

1. **Mô hình MVC** - Tuân thủ nghiêm ngặt mô hình MVC:
   - Models: Chỉ chứa logic liên quan đến dữ liệu và quan hệ
   - Controllers: Xử lý request, gọi service và trả về response
   - Views: Chỉ chứa logic hiển thị

2. **Sử dụng Services** - Tạo thêm lớp Services để chứa logic nghiệp vụ phức tạp:
   ```
   app/Services/UserService.php
   app/Services/OrderService.php
   ```

3. **Repositories** - Sử dụng Repositories để tách biệt logic truy cập dữ liệu:
   ```
   app/Repositories/UserRepository.php
   app/Repositories/OrderRepository.php
   ```

4. **Request Validation** - Sử dụng Form Request Validation cho mọi request có dữ liệu:
   ```
   app/Http/Requests/StoreUserRequest.php
   app/Http/Requests/UpdateUserRequest.php
   ```

5. **Resources** - Sử dụng API Resources để chuẩn hóa response:
   ```
   app/Http/Resources/UserResource.php
   app/Http/Resources/OrderResource.php
   ```

## Database

1. **Migrations** - Tuân thủ quy tắc đặt tên migrations:
   ```
   yyyy_mm_dd_hhmmss_create_table_name_table.php
   yyyy_mm_dd_hhmmss_add_column_to_table_name_table.php
   ```

2. **Relationships** - Đặt tên relationships rõ ràng:
   ```php
   // Thay vì
   return $this->hasMany(Comment::class);
   
   // Nên viết
   return $this->hasMany(Comment::class, 'post_id', 'id');
   ```

3. **Seeder và Factory** - Tạo Seeder và Factory cho mỗi Model để thuận tiện trong quá trình phát triển và kiểm thử.

4. **Foreign Keys** - Luôn sử dụng foreign key constraints trong migrations.

## Routes

1. **Route Groups** - Nhóm routes theo chức năng và middleware:
   ```php
   Route::middleware(['auth'])->prefix('admin')->group(function () {
       // Admin routes
   });
   ```

2. **Route Names** - Đặt tên route theo format: `resource.action`:
   ```php
   Route::get('/users', [UserController::class, 'index'])->name('users.index');
   ```

3. **API Routes** - Sử dụng resource routes với API:
   ```php
   Route::apiResource('users', UserApiController::class);
   ```

## Controllers

1. **Resource Controllers** - Ưu tiên sử dụng resource controllers với các action chuẩn (index, create, store, show, edit, update, destroy).

2. **Single Action Controllers** - Sử dụng single action controllers cho các action phức tạp.

3. **Thin Controllers** - Controller chỉ nên xử lý request và trả về response, logic nghiệp vụ nên đặt trong Services.

## Models

1. **Fillable & Guarded** - Luôn khai báo fillable hoặc guarded:
   ```php
   protected $fillable = ['name', 'email', 'password'];
   ```

2. **Accessors & Mutators** - Sử dụng accessors/mutators thay vì xử lý trực tiếp dữ liệu:
   ```php
   public function getFullNameAttribute()
   {
       return "{$this->first_name} {$this->last_name}";
   }
   ```

3. **Scopes** - Sử dụng query scopes để tái sử dụng các query phổ biến:
   ```php
   public function scopeActive($query)
   {
       return $query->where('status', 'active');
   }
   ```

4. **Relationships** - Khai báo tất cả relationships trong model.

## Views

1. **Blade Components** - Sử dụng Blade Components để tái sử dụng UI:
   ```php
   <x-alert type="error" :message="$message"/>
   ```

2. **Layouts** - Sử dụng layouts để tránh lặp code:
   ```php
   @extends('layouts.app')
   ```

3. **Partials** - Tách các phần UI phức tạp thành partials:
   ```php
   @include('partials.header')
   ```

4. **Không có logic phức tạp** - Views chỉ nên chứa logic đơn giản. Logic phức tạp nên xử lý trước trong Controller/Service.

## JavaScript/CSS

1. **Modules** - Tổ chức JavaScript theo module:
   ```
   resources/js/components/
   resources/js/pages/
   resources/js/utils/
   ```

2. **SCSS/Tailwind** - Sử dụng SCSS hoặc Tailwind CSS theo quy tắc:
   ```
   resources/scss/components/
   resources/scss/layouts/
   resources/scss/pages/
   ```

3. **Asset Compilation** - Sử dụng Vite cho biên dịch assets.

## Testing

1. **Unit Tests** - Viết unit tests cho tất cả Services và Repositories:
   ```
   tests/Unit/Services/UserServiceTest.php
   ```

2. **Feature Tests** - Viết feature tests cho tất cả Controllers:
   ```
   tests/Feature/Controllers/UserControllerTest.php
   ```

3. **Test Coverage** - Đảm bảo coverage tối thiểu 90% cho code.

4. **Factories** - Sử dụng Model Factories cho tests thay vì tạo dữ liệu trực tiếp.

## Security

1. **Validation** - Validate tất cả dữ liệu đầu vào từ người dùng.

2. **SQL Injection** - Sử dụng Eloquent hoặc Query Builder với binding parameters.

3. **XSS Protection** - Sử dụng `{{ $var }}` thay vì `{!! $var !!}` trừ khi cần thiết.

4. **CSRF Protection** - Đảm bảo tất cả forms đều có CSRF token.

5. **Mass Assignment** - Luôn sử dụng $fillable hoặc $guarded.

## Performance

1. **Eager Loading** - Sử dụng eager loading để tránh N+1 query:
   ```php
   User::with('posts', 'comments')->get();
   ```

2. **Caching** - Cache dữ liệu hay được truy xuất:
   ```php
   Cache::remember('users', 3600, function () {
       return User::all();
   });
   ```

3. **Query Optimization** - Sử dụng indexes cho các cột thường xuyên được query.

4. **Queues** - Sử dụng queues cho các tác vụ nặng và không cần xử lý ngay:
   ```php
   ProcessPodcast::dispatch($podcast);
   ```

## Logging & Monitoring

1. **Logging** - Log tất cả exceptions và thông tin quan trọng:
   ```php
   Log::error('Something went wrong: ' . $exception->getMessage());
   ```

2. **Monitoring** - Sử dụng các công cụ monitoring như Laravel Telescope trong quá trình phát triển.

## Git

1. **Branching** - Tuân thủ quy tắc Git Flow:
   - `main`: Production code
   - `develop`: Development code
   - `feature/name`: Feature branches
   - `hotfix/name`: Hotfix branches

2. **Commit Messages** - Tuân thủ format:
   ```
   [type]: Short description
   
   Detailed description if needed
   ```
   Trong đó `type` có thể là: feat, fix, docs, style, refactor, test, chore

3. **Pull Requests** - Tạo Pull Request cho mỗi feature hoặc fix, kèm mô tả chi tiết.

## Deployment

1. **CI/CD** - Sử dụng CI/CD để tự động hóa testing và deployment.

2. **Environments** - Phân biệt rõ các môi trường:
   - Development
   - Staging
   - Production

3. **Configuration** - Sử dụng environment variables cho configuration.

4. **Zero Downtime** - Deployment không gây gián đoạn dịch vụ.

## Documentation

1. **PHPDoc** - Viết PHPDoc cho tất cả classes và methods:
   ```php
   /**
    * Get the user's full name.
    *
    * @return string
    */
   public function getFullName()
   {
       // ...
   }
   ```

2. **README** - Duy trì README.md cập nhật với hướng dẫn cài đặt và sử dụng.

3. **API Documentation** - Sử dụng Swagger/OpenAPI để tài liệu hóa API.

## Dependencies

1. **Composer** - Chỉ sử dụng các package đáng tin cậy và được duy trì.

2. **Version Lock** - Lock version của dependencies trong composer.lock và package-lock.json.

3. **Dependency Injection** - Sử dụng dependency injection thay vì tạo instances trực tiếp. 

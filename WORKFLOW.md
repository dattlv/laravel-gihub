# Development Workflow

## 1. Task Management Flow với Agent AI

### 1.1 Khởi tạo Task
1. Đọc và phân tích task từ TASK.md
   - Hiểu rõ mục tiêu, yêu cầu và acceptance criteria
   - Xác định các file và component cần thay đổi
   - Xác định các dependency liên quan

2. Sử dụng Agent AI để phân tích task
   - Prompt: "Phân tích task [ID_TASK] trong file TASK.md và liệt kê các bước cần thực hiện"
   - Prompt: "Xác định các file cần sửa đổi cho task [ID_TASK]"

3. Tạo branch mới
   - Format: `feature/ID_TASK_mô_tả_ngắn_gọn`
   - Ví dụ: `feature/TASK-123_implement_user_authentication`
   - Hoặc: `bugfix/TASK-456_fix_login_validation`
   - Hoặc: `hotfix/TASK-789_security_vulnerability`
   - Hoặc: `release/v1.2.3`

### 1.2 Lập kế hoạch với Agent AI
1. Tạo chiến lược triển khai
   - Prompt: "Tạo roadmap chi tiết các bước để thực hiện [ID_TASK]"
   - Prompt: "Phân tích architectural impact của task [ID_TASK]"

2. Dự đoán các thách thức
   - Prompt: "Xác định các potential challenges và edge cases cho task [ID_TASK]"
   - Prompt: "Gợi ý các giải pháp cho edge cases trong task [ID_TASK]"

3. Thiết lập checkpoints
   - Xác định các milestone nhỏ có thể kiểm tra
   - Prompt: "Chia task [ID_TASK] thành các subtasks có thể kiểm tra riêng lẻ"

### 1.3 Triển khai Task
1. Viết code theo quy ước trong RULES.md
   - Sử dụng Agent AI để generation và completion:
   - Prompt: "Tạo đoạn code [mô tả chức năng] theo quy ước trong RULES.md"
   - Prompt: "Refactor đoạn code này để tuân thủ quy ước trong RULES.md"

2. Code generation với context
   - Prompt: "Tạo Model [tên model] với các trường [danh sách trường] theo chuẩn Laravel"
   - Prompt: "Tạo Controller để xử lý [mô tả chức năng] với các methods: [danh sách methods]"
   - Prompt: "Tạo migration cho bảng [tên bảng] với cấu trúc [mô tả cấu trúc]"

3. Xác nhận các bước hoàn thành
   - Kiểm tra lại từng subtask đã hoàn thành
   - Sử dụng Agent AI để kiểm tra việc triển khai:
   - Prompt: "Xem xét triển khai của subtask [tên subtask] và đánh giá tính đầy đủ"

### 1.4 Testing với Agent AI
1. Tạo test cases
   - Prompt: "Tạo unit tests cho class [tên class] theo TDD"
   - Prompt: "Tạo feature tests cho endpoint [tên endpoint] bao gồm happy path và error cases"

2. Kiểm tra edge cases
   - Prompt: "Kiểm tra các edge cases có thể xảy ra cho [chức năng]"
   - Prompt: "Tạo test cases cho error handling của [chức năng]"

3. Đảm bảo coverage
   - Prompt: "Kiểm tra và đề xuất các test cases bổ sung để tăng coverage cho [component]"

### 1.5 Code Review với Agent AI
1. Self-review
   - Prompt: "Review code của [file/function] theo quy ước trong RULES.md"
   - Prompt: "Kiểm tra security vulnerabilities trong [file]"
   - Prompt: "Kiểm tra performance issues trong [function]"

2. Chuẩn bị PR
   - Prompt: "Tạo mô tả PR cho task [ID_TASK] bao gồm các thay đổi chính và hướng dẫn testing"
   - Prompt: "Tạo danh sách các thay đổi chính trong PR này"

3. Tối ưu hóa code
   - Prompt: "Đề xuất cách tối ưu hóa [đoạn code]"
   - Prompt: "Kiểm tra duplicate code và đề xuất cách refactor"

### 1.6 Báo cáo và Documentation
1. Cập nhật TASK.md
   - Prompt: "Tạo nội dung cập nhật cho TASK.md để đánh dấu task [ID_TASK] là hoàn thành"
   - Prompt: "Tạo release notes cho task [ID_TASK]"

2. Cập nhật documentation
   - Prompt: "Tạo documentation cho API [tên API] bao gồm endpoints, parameters và responses"
   - Prompt: "Tạo hướng dẫn sử dụng cho feature [tên feature]"

3. Ghi chú kỹ thuật
   - Prompt: "Tạo technical notes giải thích cách triển khai [chức năng]"
   - Prompt: "Tạo troubleshooting guide cho [component]"

### 1.7 Ví dụ tương tác hoàn chỉnh với Agent AI
Task: TASK-123 - Implement User Authentication
Prompt cho Agent AI
Tôi cần triển khai task TASK-123 về "User Authentication" với các yêu cầu:
Tạo form đăng nhập với email và password
Validate input
Xử lý authentication sử dụng Laravel Sanctum
Tạo API endpoints: /api/login, /api/logout, /api/me
Thêm middleware authentication cho protected routes
Hãy:
Phân tích task và xác định các file cần thay đổi
Đề xuất roadmap triển khai
Tạo code cho Controller xử lý authentication
Tạo tests cho các endpoints
Review code để đảm bảo tuân thủ RULES.md
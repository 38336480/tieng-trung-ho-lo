# TIẾNG TRUNG HỒ LÔ

Website tiếng Trung với giao diện màu chủ đạo `rgb(21 86 78)` và khu vực quản trị đăng ký.

## Chạy local

1. Cài Node.js và MySQL.
2. Chạy SQL trong `database/schema.sql` bằng MySQL.
3. Copy `.env.example` thành `.env`, điền mật khẩu MySQL.
4. Mở terminal tại thư mục dự án và chạy:

```bash
npm install
npm start
```

5. Website: http://localhost:3000
6. Admin: http://localhost:3000/admin

## Chức năng hiện có
- Trang chủ responsive.
- Khóa học lấy từ MySQL.
- Form đăng ký tư vấn lưu vào MySQL.
- Admin xem danh sách đăng ký.
- Tìm kiếm/lọc đăng ký.
- Đổi trạng thái đăng ký.
- Xem chi tiết.
- Xóa đăng ký.
- Dashboard thống kê.
- Database đã có bảng cho khóa học, lịch khai giảng, giáo viên, bài viết, học viên để phát triển tiếp.

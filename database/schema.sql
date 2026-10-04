CREATE DATABASE IF NOT EXISTS tieng_trung_ho_lo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tieng_trung_ho_lo;
CREATE TABLE IF NOT EXISTS dang_ky (
 id INT AUTO_INCREMENT PRIMARY KEY,
 ho_ten VARCHAR(150) NOT NULL,
 so_dien_thoai VARCHAR(30) NOT NULL,
 email VARCHAR(150),
 khoa_hoc VARCHAR(150),
 hinh_thuc VARCHAR(50),
 trinh_do VARCHAR(100),
 thoi_gian_mong_muon VARCHAR(150),
 noi_dung TEXT,
 trang_thai ENUM('Mới','Đang tư vấn','Đã đăng ký','Hoàn thành','Không liên hệ được','Hủy') DEFAULT 'Mới',
 ghi_chu TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS khoa_hoc (
 id INT AUTO_INCREMENT PRIMARY KEY,
 ten_khoa VARCHAR(150) NOT NULL,
 mo_ta TEXT,
 hoc_phi VARCHAR(100),
 thoi_luong VARCHAR(100),
 hinh_thuc VARCHAR(100),
 doi_tuong VARCHAR(255),
 hinh_anh VARCHAR(500),
 hien_thi TINYINT DEFAULT 1,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS lich_khai_giang (
 id INT AUTO_INCREMENT PRIMARY KEY,
 khoa_hoc_id INT,
 ngay_khai_giang DATE,
 gio_hoc VARCHAR(100),
 lich_hoc VARCHAR(100),
 hinh_thuc VARCHAR(50),
 so_luong INT DEFAULT 0,
 trang_thai VARCHAR(50) DEFAULT 'Đang mở',
 FOREIGN KEY (khoa_hoc_id) REFERENCES khoa_hoc(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS giao_vien (
 id INT AUTO_INCREMENT PRIMARY KEY,
 ho_ten VARCHAR(150) NOT NULL,
 chuyen_mon VARCHAR(255),
 kinh_nghiem VARCHAR(255),
 gioi_thieu TEXT,
 hinh_anh VARCHAR(500),
 hien_thi TINYINT DEFAULT 1
);
CREATE TABLE IF NOT EXISTS bai_viet (
 id INT AUTO_INCREMENT PRIMARY KEY,
 tieu_de VARCHAR(255) NOT NULL,
 danh_muc VARCHAR(100),
 mo_ta TEXT,
 noi_dung LONGTEXT,
 hinh_anh VARCHAR(500),
 trang_thai ENUM('Bản nháp','Đã xuất bản') DEFAULT 'Bản nháp',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS hoc_vien (
 id INT AUTO_INCREMENT PRIMARY KEY,
 ho_ten VARCHAR(150) NOT NULL,
 so_dien_thoai VARCHAR(30),
 email VARCHAR(150),
 khoa_hoc VARCHAR(150),
 trinh_do VARCHAR(100),
 trang_thai VARCHAR(50) DEFAULT 'Đang học',
 ghi_chu TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO khoa_hoc(ten_khoa,mo_ta,hoc_phi,thoi_luong,hinh_thuc,doi_tuong) VALUES
('Tiếng Trung cho người mới bắt đầu','Làm quen phát âm, pinyin, từ vựng và giao tiếp cơ bản.','Liên hệ','8 tuần','Online / Offline','Học sinh, sinh viên, người mới bắt đầu'),
('Tiếng Trung giao tiếp','Tập trung nghe - nói và phản xạ trong tình huống thực tế.','Liên hệ','10 tuần','Online / Offline','Người đi làm, người cần giao tiếp'),
('Luyện thi HSK 1-3','Lộ trình từ cơ bản đến luyện đề theo cấp độ HSK.','Liên hệ','12 tuần','Online / Offline','Học viên cần thi HSK');

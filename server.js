
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let pool;

async function db() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tieng_trung_ho_lo',
      waitForConnections: true,
      connectionLimit: 10,
      charset: 'utf8mb4'
    });
  }

  return pool;
}

// Kiểm tra máy chủ và kết nối cơ sở dữ liệu
app.get('/api/kiem-tra', async (req, res) => {
  try {
    const p = await db();
    await p.query('SELECT 1');

    res.json({
      ok: true,
      message: 'Máy chủ Tiếng Trung Hồ Lô đang hoạt động'
    });
  } catch (e) {
    console.error('Lỗi kiểm tra cơ sở dữ liệu:', e.message);
    res.status(500).json({
      ok: false,
      message: 'Không thể kết nối cơ sở dữ liệu'
    });
  }
});

// Lấy danh sách khóa học
app.get('/api/khoa-hoc', async (req, res) => {
  try {
    const p = await db();
    const [rows] = await p.query(
      'SELECT * FROM khoa_hoc WHERE hien_thi = 1 ORDER BY id DESC'
    );

    res.json(rows);
  } catch (e) {
    console.error('Lỗi lấy khóa học:', e.message);
    res.status(500).json({ message: 'Không thể tải danh sách khóa học' });
  }
});

// Thống kê đăng ký
app.get('/api/thong-ke', async (req, res) => {
  try {
    const p = await db();

    const [[a]] = await p.query(
      'SELECT COUNT(*) AS total FROM dang_ky'
    );
    const [[b]] = await p.query(
      "SELECT COUNT(*) AS total FROM dang_ky WHERE trang_thai = 'Mới'"
    );
    const [[c]] = await p.query(
      "SELECT COUNT(*) AS total FROM dang_ky WHERE trang_thai = 'Đang tư vấn'"
    );
    const [[d]] = await p.query(
      "SELECT COUNT(*) AS total FROM dang_ky WHERE trang_thai = 'Đã đăng ký'"
    );

    res.json({
      tong: a.total,
      moi: b.total,
      dangTuVan: c.total,
      daDangKy: d.total
    });
  } catch (e) {
    console.error('Lỗi thống kê:', e.message);
    res.status(500).json({ message: 'Không thể tải thống kê' });
  }
});

// Thêm đăng ký khóa học
app.post('/api/dang-ky', async (req, res) => {
  try {
    const {
      ho_ten,
      so_dien_thoai,
      email,
      khoa_hoc,
      hinh_thuc,
      trinh_do,
      thoi_gian_mong_muon,
      noi_dung
    } = req.body;

    if (!ho_ten || !so_dien_thoai) {
      return res.status(400).json({
        message: 'Vui lòng nhập họ tên và số điện thoại'
      });
    }

    const p = await db();

    const [result] = await p.execute(
      `INSERT INTO dang_ky
      (ho_ten, so_dien_thoai, email, khoa_hoc, hinh_thuc,
       trinh_do, thoi_gian_mong_muon, noi_dung)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ho_ten,
        so_dien_thoai,
        email || null,
        khoa_hoc || null,
        hinh_thuc || null,
        trinh_do || null,
        thoi_gian_mong_muon || null,
        noi_dung || null
      ]
    );

    res.json({
      ok: true,
      id: result.insertId,
      message: 'Đăng ký thành công'
    });
  } catch (e) {
    console.error('Lỗi đăng ký:', e.message);
    res.status(500).json({ message: 'Đăng ký chưa thành công' });
  }
});

// Xem danh sách đăng ký
app.get('/api/dang-ky', async (req, res) => {
  try {
    const p = await db();
    const [rows] = await p.query(
      'SELECT * FROM dang_ky ORDER BY created_at DESC'
    );

    res.json(rows);
  } catch (e) {
    console.error('Lỗi danh sách đăng ký:', e.message);
    res.status(500).json({ message: 'Không thể tải danh sách đăng ký' });
  }
});

// Cập nhật trạng thái đăng ký
app.put('/api/dang-ky/:id', async (req, res) => {
  try {
    const p = await db();
    const { trang_thai, ghi_chu } = req.body;

    await p.execute(
      'UPDATE dang_ky SET trang_thai = ?, ghi_chu = ? WHERE id = ?',
      [trang_thai, ghi_chu || '', req.params.id]
    );

    res.json({ ok: true });
  } catch (e) {
    console.error('Lỗi cập nhật đăng ký:', e.message);
    res.status(500).json({ message: 'Không thể cập nhật đăng ký' });
  }
});

// Xóa đăng ký
app.delete('/api/dang-ky/:id', async (req, res) => {
  try {
    const p = await db();

    await p.execute(
      'DELETE FROM dang_ky WHERE id = ?',
      [req.params.id]
    );

    res.json({ ok: true });
  } catch (e) {
    console.error('Lỗi xóa đăng ký:', e.message);
    res.status(500).json({ message: 'Không thể xóa đăng ký' });
  }
});

// Trang quản trị
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`TIẾNG TRUNG HỒ LÔ đang chạy tại cổng ${PORT}`);
});

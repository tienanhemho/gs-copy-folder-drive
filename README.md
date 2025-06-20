# Google Drive Folder Sync Script

## Mô tả

Đây là một đoạn script sử dụng Google Apps Script để **đồng bộ hóa nội dung giữa hai thư mục trên Google Drive**. Script cung cấp các chức năng như:

- In ra thông tin các file trong một thư mục
- Đồng bộ hóa toàn bộ file và thư mục con từ thư mục nguồn sang thư mục đích
- Bỏ qua các file hình ảnh (`.jpeg`, `.png`)
- So sánh tên, kích thước và ngày cập nhật để quyết định có cần sao chép lại file không

## Các hàm chính

### `myFunction()`

Hàm kiểm tra đơn giản:
- In ra log `"Hi there"`
- Trả về chuỗi `"Hello, world!"`

### `start1()`

Hàm dùng để:
- Lấy tất cả các file trong thư mục có ID: `1_oG9T3LvNYZWLz1CBY0U4cVoPHOD0KqC`
- In ra thông tin từng file: tên, dung lượng, loại MIME, và trạng thái cập nhật (so với thời điểm hiện tại)

### `sync_folder()`

Hàm khởi động quy trình đồng bộ:
- Xác định thư mục nguồn và thư mục đích bằng ID
- Nếu hai thư mục có cùng tên, gọi hàm `copyFolder()` để bắt đầu sao chép nội dung

### `copyFolder(source, target)`

Hàm đệ quy sao chép nội dung từ `source` sang `target`:
- Lấy toàn bộ file và thư mục con của cả hai thư mục
- Đối với file:
  - Nếu là hình ảnh (`.jpeg` hoặc `.png`), bỏ qua
  - Nếu tên trùng, kiểm tra thời gian cập nhật và kích thước:
    - Nếu file cũ hơn hoặc giống nhau, không sao chép
    - Nếu file mới hơn hoặc khác kích thước, xóa bản cũ và sao chép bản mới
- Đối với thư mục con:
  - Nếu đã tồn tại ở thư mục đích, gọi đệ quy sao chép nội dung tiếp theo
  - Nếu chưa có, tạo mới rồi sao chép tiếp

## Cách sử dụng

1. Mở Google Apps Script tại [script.google.com](https://script.google.com)
2. Tạo một project mới và dán toàn bộ mã vào
3. Thay thế các ID thư mục bằng thư mục Google Drive thật của bạn
4. Chạy `sync_folder()` để bắt đầu quá trình đồng bộ

> ⚠️ **Lưu ý bảo mật**: Script có quyền truy cập, chỉnh sửa và xóa file trên Google Drive. Hãy đảm bảo bạn hiểu rõ tác động trước khi sử dụng.

## License

MIT License

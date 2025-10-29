// bad-variable-example.ts
// ❌ File intentionally violates naming conventions

// Không rõ ràng: 'a', 'b', 'data', 'info' không nói lên ý nghĩa gì
let a = 0;
let b = true;
const data = [1, 2, 3];
let info = "abc";

// Biến toàn cục (không dùng const/let/var scope rõ ràng)
count = 100; // ❌ implicit global

// Tên biến không mô tả mục đích
function calc(x, y) {
  return x + y; // ❌ function name quá chung
}

// Vi phạm chuẩn: viết hoa không đúng quy tắc
let MAXvalue = 500; // ❌ sai chuẩn SCREAMING_SNAKE_CASE
let User_name = "admin"; // ❌ snake_case lẫn PascalCase

// Hàm có biến mơ hồ
function handle(d, v) {
  let t = new Date();
  console.log("Processing", d, v, t);
}

// Không dùng camelCase thống nhất
const user_details_list = [
  { Name: "John", Age: 25 },
  { Name: "Alice", Age: 30 },
];

// Biến magic number
const TIMEOUT = 1234; // ❌ không nói rõ đơn vị (ms, s?

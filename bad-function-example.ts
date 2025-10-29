// bad-function-example.ts
// ❌ Code intentionally violates naming & clarity rules

// Không rõ mục đích, chỉ có 1 từ mơ hồ
function run(x, y) {
  return x + y;
}

// Tên hàm mập mờ, không biết làm gì
function handle() {
  // handle cái gì? dữ liệu? lỗi? event?
  console.log("done");
}

// Dùng viết tắt không phổ biến, thiếu ý nghĩa
function calcUsrDtls(id) {
  // calcUsrDtls = calculate user details? unclear
  return fetch(`/api/usr?id=${id}`);
}

// Sai casing (PascalCase thay vì camelCase)
Function GetData() {
  // ❌ Function keyword sai, casing sai
  console.log("fetching data...");
}

// Viết hoa ngẫu nhiên, không nhất quán
function ProcessOrder_() {
  console.log("processing order...");
}

// Tên có hậu tố thừa, không mô tả hành vi
function dataFunction1() {
  console.log("bad name");
}

// Hàm không mô tả nghiệp vụ, không comment rõ
function doStuff(a, b) {
  let tmp = a * b;
  console.log(tmp);
  return tmp;
}

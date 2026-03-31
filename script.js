const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("list-container");

// 1. Hàm lưu dữ liệu vào ngăn kéo "tasks"
function saveData() {
  localStorage.setItem("tasks", todoList.innerHTML);
}

// 2. Hàm lấy dữ liệu ra khi mở trang
function showTask() {
  const savedData = localStorage.getItem("tasks");
  if (savedData) {
    todoList.innerHTML = savedData;
  }
}

// Chạy hàm hiển thị ngay khi tải trang
showTask();

addBtn.addEventListener("click", () => {
  const taskText = input.value; // Lấy nội dung đã nhập

  if (taskText !== "") {
    const li = document.createElement("li"); // Tạo thẻ li mới
    // Sử dụng innerHTML để chèn cả chữ và nút xóa vào trong li
    li.innerHTML = `
    <span class="status-icon"></span>
        <span class="task-content">${taskText}</span>
        <button class="delete-btn">Xóa</button>
    `;

    todoList.appendChild(li); // Thêm vào danh sách hiển thị
    input.value = ""; // Xóa ô nhập để sẵn sàng cho việc tiếp theo
    saveData(); // Lưu lại sau khi thêm
  }
});

// Người gác cổng này sẽ lo liệu cho cả thẻ cũ (từ localStorage) và thẻ mới
todoList.addEventListener("click", (ev) => {
  // Nếu click vào nút Xóa
  if (ev.target.classList.contains("delete-btn")) {
    ev.target.parentElement.remove();
    saveData();
  }
  // Nếu click vào dòng chữ (thẻ span hoặc chính thẻ li)
  else if (ev.target.classList.contains("status-icon")) {
    const targetLi = ev.target.closest("li");
    targetLi.classList.toggle("completed");
    saveData();
  }
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

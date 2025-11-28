// ===== Simple LocalStorage User "Database" =====

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// REGISTER USER
function registerUser(name, email, password) {
  let users = getUsers();

  if (users.some(u => u.email === email)) {
    return { success: false, message: "Email already exists." };
  }

  users.push({ name, email, password });
  saveUsers(users);

  return { success: true, message: "Registration successful!" };
}

// LOGIN USER
function loginUser(email, password) {
  let users = getUsers();

  let found = users.find(u => u.email === email && u.password === password);

  if (!found) {
    return { success: false, message: "Invalid email or password." };
  }

  localStorage.setItem("authUser", JSON.stringify(found));
  return { success: true, message: "Login successful!" };
}

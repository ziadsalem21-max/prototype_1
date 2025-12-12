// ===== Simple LocalStorage User "Database" =====
// Enhanced with better validation and user sessions

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem("loopLearningUsers")) || [];
    } catch (error) {
        console.error('Error reading users:', error);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("loopLearningUsers", JSON.stringify(users));
}

// REGISTER USER
function registerUser(name, email, password) {
    let users = getUsers();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: "Please enter a valid email address." };
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        return { success: false, message: "Email already exists. Please sign in." };
    }
    
    // Create user object
    const user = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password, // Note: In production, hash this password!
        createdAt: new Date().toISOString(),
        lastLogin: null
    };
    
    users.push(user);
    saveUsers(users);
    
    return { 
        success: true, 
        message: "Account created successfully! Welcome to Loop Learning." 
    };
}

// LOGIN USER
function loginUser(email, password) {
    let users = getUsers();
    
    // Find user
    let user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return { success: false, message: "Invalid email or password." };
    }
    
    // Update last login
    user.lastLogin = new Date().toISOString();
    saveUsers(users);
    
    // Set current session
    localStorage.setItem("currentUser", JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
    }));
    
    return { 
        success: true, 
        message: "Login successful! Redirecting...",
        user: {
            name: user.name,
            email: user.email
        }
    };
}

// LOGOUT USER
function logoutUser() {
    localStorage.removeItem("currentUser");
    return { success: true, message: "Logged out successfully." };
}

// GET CURRENT USER
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("currentUser"));
    } catch (error) {
        return null;
    }
}

// CHECK IF USER IS LOGGED IN
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        registerUser,
        loginUser,
        logoutUser,
        getCurrentUser,
        isLoggedIn,
        getUsers,
        saveUsers
    };
}
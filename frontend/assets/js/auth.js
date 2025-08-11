document.addEventListener("DOMContentLoaded", function () {
    // SIGNUP
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());
            try {
                const response = await fetch("http://127.0.0.1:5000/api/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                alert(result.message || "Signup response received");
                if (response.ok) {
                    // Close modal on success
                    document.getElementById("signupModal").reset();
                    const signupModal = bootstrap.Modal.getInstance(document.getElementById("signupModal"));
                    signupModal.hide();
                }
                console.log("Signup successful")
            } catch (error) {
                alert("Signup failed!");
                console.error(error);
            }
        });
    }

    // LOGIN
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());
            try {
                const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                alert(result.message || "Login response received");

                if (response.ok) {
                    localStorage.setItem("user", JSON.stringify(result.user));
                    document.getElementById("loginForm").reset();
                    const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
                    loginModal.hide();
                }
            } catch(error) {
                alert("Login failed");
                console.error(error);
            }
        });
    }

    // Handle switching from login to signup modal
    const openSignup = document.getElementById("openSignup");
    if (openSignup) {
        openSignup.addEventListener("click", (e) => {
            e.preventDefault();
            const loginModal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
            loginModal.hide();

            setTimeout(() => {
                const signupModal = new bootstrap.Modal(document.getElementById("signupModal"));
                signupModal.show();
            }, 300);
        });
    }
});

async function handleLogin() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token); // Store login token
            alert("Login successful!");
            location.reload();
        } else {
            alert(data.message || "Login failed.");
        }
    } catch (err) {
        alert("Server error");
        console.error(err);
    }
}

// Loading header
fetch("/TastyNest/components/header.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load navbar")
        }
        return response.text();
    })
    .then(html => {
        document.getElementById("navbar-placeholder").innerHTML = html;
        setTimeout(() => {
            // login modal loading
            const loginBtn = document.getElementById('loginBtn');
            if (loginBtn) {
                loginBtn.addEventListener('click', function () {
                    if (!document.querySelector('#exampleModal')) {
                        fetch('/TastyNest/components/login-modal.html')
                            .then(response => response.text())
                            .then(data => {
                                document.getElementById('login-modal-container').innerHTML = data;
                                const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
                                modal.show();

                                // Signup modal loading
                                const signupLink = document.getElementById('openSignup');
                                if (signupLink) {
                                    signupLink.addEventListener('click', function (e) {
                                        e.preventDefault();
                                        const loginModalEl = document.getElementById('exampleModal');
                                        const loginModal = bootstrap.Modal.getInstance(loginModalEl)
                                        loginModal.hide();
                                        // Check is signup modal is already present
                                        if (!document.querySelector('#signupModal')) {
                                            fetch('/TastyNest/components/signup-modal.html')
                                                .then(res => res.text())
                                                .then(data => {
                                                    document.getElementById('login-modal-container').insertAdjacentHTML('beforeend', data);
                                                    const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
                                                    signupModal.show();
                                                });
                                        } else {
                                            const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
                                            signupModal.show();
                                        }
                                    })
                                }
                            });
                    } else {
                        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
                        modal.show();
                    }
                });
            }
            // contact modal
            const contactLink = document.getElementById('contactLink');
            if (contactLink) {
                contactLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    // Check if already loaded
                    if (!document.querySelector('#contactModal')) {
                        fetch('/TastyNest/contact.html')
                            .then(res => res.text())
                            .then(data => {
                                document.getElementById('contact-modal-container').insertAdjacentHTML('beforeend', data);
                                const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
                                contactModal.show();
                            });
                    } else {
                        const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
                        contactModal.show();
                    }
                });
            }
        },0);
    })
    .catch(error => {
        console.error("Error loading navbar: ", error);
    })
    .finally(() => {
        document.body.classList.remove("hidden");
    })

// Loading footer
fetch("/TastyNest/components/footer.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load footer")
        }
        return response.text();
    })
    .then(html => {
        document.getElementById("footer-placeholder").outerHTML = html;
    })
    .catch(error => {
        console.error("Error loading footer: ", error);
    })
// Loading carousel
fetch("/TastyNest/components/carousel.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load carousel")
        }
        return response.text();
    })
    .then(html => {
        document.getElementById("carousel-placeholder").outerHTML = html;
    })
    .catch(error => {
        console.error("Error loading carousel: ", error);
    })
fetch("/TastyNest/components/testimonials.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load testimonials")
        }
        return response.text();
    })
    .then(html => {
        document.getElementById("testimonials-placeholder").outerHTML = html;
    })
    .catch(error => {
        console.error("Error loading testimonials: ", error);
    })


    // slide container function which is on home page navbar

    function loadUserInfo() {
  const name = localStorage.getItem("userName") || "Guest";
  const avatar = localStorage.getItem("userAvatar") || "https://i.pravatar.cc/50";
  document.getElementById("userName").textContent = `Hello, ${name} 👋`;
  document.getElementById("userAvatar").src = avatar;
}

function askUserInfo() {
  let name = prompt("Enter your name:");
  let avatar = prompt("Enter image URL for your profile:");
  if (name) localStorage.setItem("userName", name);
  if (avatar) localStorage.setItem("userAvatar", avatar);
  loadUserInfo();
}

window.onload = loadUserInfo;

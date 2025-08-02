// Loading header
fetch("/TastyNest/components/header.html")
    .then(response=>{
        if(!response.ok) {
            throw new Error("Failed to load navbar")
        }
        return response.text();
    })
    .then(html=> {
        document.getElementById("navbar-placeholder").outerHTML = html;
    })
    .catch(error => {
        console.error("Error loading navbar: ", error);
    })
    .finally(()=>{
        document.body.classList.remove("hidden");
    })
// Loading footer
fetch("/TastyNest/components/footer.html")
    .then(response=>{
        if(!response.ok) {
            throw new Error("Failed to load footer")
        }
        return response.text();
    })
    .then(html=> {
        document.getElementById("footer-placeholder").outerHTML = html;
    })
    .catch(error => {
        console.error("Error loading footer: ", error);
    })
// Loading carousel
fetch("/TastyNest/components/carousel.html")
    .then(response=>{
        if(!response.ok) {
            throw new Error("Failed to load carousel")
        }
        return response.text();
    })
    .then(html=> {
        document.getElementById("carousel-placeholder").outerHTML = html;
    })
    .catch(error => {
        console.error("Error loading carousel: ", error);
    })
fetch("/TastyNest/components/testimonials.html")
    .then(response=>{
        if(!response.ok) {
            throw new Error("Failed to load testimonials")
        }
        return response.text();
    })
    .then(html=> {
        document.getElementById("testimonials-placeholder").outerHTML = html;
    })
    .catch(error => {
        console.error("Error loading testimonials: ", error);
    })
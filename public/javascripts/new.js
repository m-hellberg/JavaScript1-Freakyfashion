const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    
    event.preventDefault();

    const formData = new FormData(event.target); 
 
    const product = {
        name: formData.get("name"),
        description: formData.get("description"),
        image: formData.get("image"),
        brand: formData.get("brand"),
        sku: formData.get("sku"),
        price: formData.get("price"),
        publicationDate: formData.get("publicationDate"),
        slug: formData.get("slug")
    }
    
    fetch("/admin/products/new", {
        method: "POST",
        body: formData
    })
    
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error);
            });
        }
        return response.json();
    })
    .then(data => {
        alert(data.message); 
        
        window.location.href = "/admin/products";
    })
    .catch(error => {
        alert(error.message); 
    });
});
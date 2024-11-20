
const tbody = document.querySelector("tbody");

const loadProductsButton = document.querySelector('.load-products-button');

loadProductsButton.addEventListener('click', (event) => {
  
  event.preventDefault();
  
  fetch("/admin/products/api/products")
    
    .then(response => response.json())
    .then(products => {
      
      tbody.innerHTML = '';
      
      products.forEach(product => {
        
        const tr = document.createElement("tr");
        tbody.appendChild(tr);
      
        const tableColumns = [
          `${product.name}`,
          `${product.sku}`,
          `${product.price}`,
          `<a href="#" class="edit-icon">
                <i class="fa-solid fa-pen-to-square"></i>
              </a>
              <a href="#" class="trash-icon" data-id="${product.id}">
                <i class="fa-solid fa-trash-can"></i>
              </a>`
        ];
        
        tableColumns.forEach(tableColumn => {
          const column = document.createElement ('td');
          column.innerHTML = tableColumn;
          tr.appendChild(column);
        });
        
        const trashIcon = tr.querySelector('.trash-icon');
        trashIcon.addEventListener('click', (event) => {
          event.preventDefault();
          const productId = trashIcon.getAttribute('data-id');

          const userConfirmed = confirm("Är du säker på att du vill ta bort den här produkten?");
          
          if (userConfirmed) {
            fetch(`/admin/products/api/products/${productId}`, { method: 'DELETE' })
              .then(() => {
                tr.remove(); 
              });
          }
        });
      });
    });
})
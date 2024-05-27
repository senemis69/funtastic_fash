document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

function loadProducts() {
    fetch('php/backend.php?action=getProducts')
        .then(response => response.json())
        .then(data => {
            let productList = document.getElementById('product-list');
            productList.innerHTML = '';
            data.products.forEach(product => {
                let productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <img src="uploads/${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <a href="product.html?id=${product.id}">View Details</a>
                    <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
}

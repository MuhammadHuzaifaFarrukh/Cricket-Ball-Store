document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year Update
    // This finds the element where the year should be and updates it to the current year
    const yearElement = document.querySelector('footer p');
    if (yearElement) 
    {
        const currentYear = new Date().getFullYear();
        // This regex specifically replaces the "2025" in your footer text while keeping the rest
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }

    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });

        // Close nav when a link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            });
        });
    }

    // Product Data (You would fetch this from a database in a real e-commerce store)
    const products = [
        {
            id: 1,
            name: "Kookaburra Kahuna Ball",
            brand: "Kookaburra",
            color: "Red",
            price: 45.00,
            image: "assets/images/kookabura kahuna.png"
        },
        {
            id: 2,
            name: "Kookaburra Turf Ball",
            brand: "Kookaburra",
            color: "White",
            price: 50.00,
            image: "assets/images/kookabura turf.png"
        },
        {
            id: 3,
            name: "Kookaburra Aura Ball",
            brand: "Kookaburra",
            color: "Pink",
            price: 55.00,
            image: "assets/images/kookabura aura.png"
        },
        {
            id: 4,
            name: "Duke Legend Ball",
            brand: "Duke",
            color: "Red",
            price: 48.00,
            image: "assets/images/dukes legend.png"
        },
        {
            id: 5,
            name: "Duke Regent Ball",
            brand: "Duke",
            color: "White",
            price: 52.00,
            image: "assets/images/dukes regent.png"
        },
        {
            id: 6,
            name: "Duke Gem Ball",
            brand: "Duke",
            color: "Pink",
            price: 58.00,
            image: "assets/images/dukes gem.png"
        },
        {
            id: 7,
            name: "SG Test Ball",
            brand: "SG",
            color: "Red",
            price: 42.00,
            image: "assets/images/sg test.png"
        },
        {
            id: 8,
            name: "SG Club Ball",
            brand: "SG",
            color: "White",
            price: 47.00,
            image: "assets/images/sg club.png"
        },
        {
            id: 9,
            name: "SG Pink Ball",
            brand: "SG",
            color: "Pink",
            price: 53.00,
            image: "assets/images/sg pink.png"
        }
    ];

    const productList = document.getElementById('product-list');
    const brandFilter = document.getElementById('brand-filter');
    const colorFilter = document.getElementById('color-filter');
    const searchInput = document.getElementById('search-input');
    const cartCount = document.getElementById('cart-count');

    let cart = []; // Simple in-memory cart for demonstration

    function displayProducts(filteredProducts) {
        if (!productList) return;
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productCard);
        });
        addAddToCartListeners();
    }

    function filterProducts() {
        const selectedBrand = brandFilter.value;
        const selectedColor = colorFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        const filtered = products.filter(product => {
            const matchesBrand = selectedBrand === "" || product.brand === selectedBrand;
            const matchesColor = selectedColor === "" || product.color === selectedColor;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                  product.brand.toLowerCase().includes(searchTerm) ||
                                  product.color.toLowerCase().includes(searchTerm);
            return matchesBrand && matchesColor && matchesSearch;
        });
        displayProducts(filtered);
    }

    function addAddToCartListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.onclick = null;
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.id);
                const productToAdd = products.find(p => p.id === productId);
                if (productToAdd) {
                    cart.push(productToAdd);
                    updateCartCount();
                    alert(`${productToAdd.name} added to cart!`);
                }
            });
        });
    }

    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    // Initial display of products and event listeners for filters
    if (productList) {
        displayProducts(products);
        brandFilter.addEventListener('change', filterProducts);
        colorFilter.addEventListener('change', filterProducts);
        searchInput.addEventListener('input', filterProducts);
    }
});


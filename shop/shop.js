document.addEventListener('DOMContentLoaded', () => {
    const colorInputs = document.querySelectorAll('.color input[type="checkbox"]');
    const sizeInputs = document.querySelectorAll('.size input[type="checkbox"]');
    const ratingRange = document.getElementById('myRange');
    const priceInputs = document.querySelectorAll('.price input[type="checkbox"]');
    const searchInput = document.getElementById('search');
    const itemOptions = document.querySelectorAll('.item-options li');

    const applyFilterButton = document.querySelector('.apply-filter');
    const menProductBox = document.querySelector('.men-product');
    const womenProductBox = document.querySelector('.women-product');
    const electronicProductBox = document.querySelector('.electronic-product');
    const jewelleryProductBox = document.querySelector('.jewellery-product');

    let products = []; // Array to store all products

    

    // Fetch products from the FakeStoreAPI
    async function fetchProducts() {
        const endpoint = 'https://fakestoreapi.com/products';

        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            products = data.map((product) => {
                // Add random color and size properties to each product
                const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
                const sizes = ['S', 'M', 'L'];

                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

                return {
                    ...product,
                    color: randomColor,
                    size: randomSize,
                };
            });

            renderProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Render the products based on the filter criteria
    function renderProducts() {
        const colorFilters = Array.from(colorInputs)
            .filter((input) => input.checked)
            .map((input) => input.value);
        const sizeFilters = Array.from(sizeInputs)
            .filter((input) => input.checked)
            .map((input) => input.value);
        const minRating = parseInt(ratingRange.value) / 10;
        const priceFilters = Array.from(priceInputs)
            .filter((input) => input.checked)
            .map((input) => input.value);

        const filteredProducts = products.filter((product) => {
            const matchesColors =
                colorFilters.length === 0 || colorFilters.includes(product.color);
            const matchesSizes =
                sizeFilters.length === 0 || sizeFilters.includes(product.size);
            const matchesRating = product.rating.rate >= minRating;
            const matchesPrice =
                priceFilters.length === 0 ||
                priceFilters.includes(getPriceRange(product.price));

            return (
                matchesColors && matchesSizes && matchesRating && matchesPrice
            );
        });

        menProductBox.innerHTML = '';
        womenProductBox.innerHTML = '';
        electronicProductBox.innerHTML = '';
        jewelleryProductBox.innerHTML = '';

        filteredProducts.forEach((product) => {
            const productElement = createProductElement(product);

            if (product.category.toLowerCase() === "men's clothing") {
                menProductBox.appendChild(productElement);
            } else if (product.category.toLowerCase() === "women's clothing") {
                womenProductBox.appendChild(productElement);
            } else if (product.category.toLowerCase() === 'electronics') {
                electronicProductBox.appendChild(productElement);
            } else if (product.category.toLowerCase() === 'jewelery') {
                jewelleryProductBox.appendChild(productElement);
            }
        });
    }

    // Create a product for rendering
    function createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.classList.add('pro');
        productElement.innerHTML = `
        <div class="pro-img">
            <img src="${product.image}" alt="${product.title}" srcset="">
        </div>
        <div class="pro-info">
            <h3 class="pro-title">${product.title}</h3>
            <div>
                <p class="pro-price">Price: </p><span>${product.price}</span>
            </div>
            <div class="size-color">
                <div>
                    <p class="pro-color">Color: </p><span>${product.color}</span>
                </div>
                <div>
                    <p class="pro-size">Size: </p><span>${product.size}</span>
                </div>
            </div>
            <div>
                <p class="pro-rating">Rating: </p><span>${product.rating.rate}</span>
            </div>
            <button class="cart-btn btn">Add to Cart</button>
        </div>`;

        const addToCartButton = productElement.querySelector('.cart-btn');
        addToCartButton.addEventListener('click', () => addToCart(product));

        return productElement;
    }

    function addToCart(product) {
        // Get the existing cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the product to the cart items
        cartItems.push(product);

        // Save the updated cart items to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Get the price range label based on the price value
    function getPriceRange(price) {
        if (price <= 25) {
            return 'range1';
        } else if (price <= 50) {
            return 'range2';
        } else if (price <= 100) {
            return 'range3';
        } else {
            return 'range4';
        }
    }

    // Event listener for the Apply Filter button
    applyFilterButton.addEventListener('click', renderProducts);

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm.length > 0) {
            const filteredProducts = products.filter((product) =>
                product.title.toLowerCase().includes(searchTerm)
            );
            renderProducts(filteredProducts);
        } else {
            renderProducts();
        }
    });

    // Event listener for item options
    itemOptions.forEach((option) => {
        option.addEventListener('click', () => {
            const category = option.classList[0];

            if (category === 'all') {
                renderProducts();
            } else {
                const filteredProducts = products.filter(
                    (product) =>
                        product.category.toLowerCase() === category.toLowerCase()
                );
                renderProducts(filteredProducts);
            }
        });
    });

    // Fetch the products when the page loads
    fetchProducts();
});

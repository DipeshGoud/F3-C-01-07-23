// Retrieve cart items from local storage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Remove an item from the cart
function removeFromCart(itemId) {
    const cartItems = getCartItems();

    const itemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);

        saveCartItems(cartItems);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-container');

    // Load cart items from local storage
    function loadCartItems() {
        const cartItems = getCartItems();

        cartContainer.innerHTML = '';

        cartItems.forEach((item) => {
            const cartItemElement = createCartItemElement(item);
            cartContainer.appendChild(cartItemElement);
        });
    }

    // Create a cart item element for rendering
    function createCartItemElement(item) {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">Price: $${item.price}</p>
            </div>
            <button class="remove-from-cart btn" data-id="${item.id}">Remove</button>
        `;

        const removeButton = cartItemElement.querySelector('.remove-from-cart');
        removeButton.addEventListener('click', () => removeFromCart(item.id));

        return cartItemElement;
    }
    loadCartItems();
});

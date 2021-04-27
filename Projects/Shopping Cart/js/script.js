let cart = document.querySelectorAll('.add-cart');
let quantity = 0;

let products = [

]

for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener('click', () => {
        cartQuantity();
    })
}

function cartQuantity() {
    quantity = localStorage.getItem('cartNumbers');
    quantity = parseInt(quantity);
    localStorage.setItem('cartNumbers', 1);
}
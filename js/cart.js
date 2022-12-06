//1. Create an even handler once the page loaded – your cart html page
//window.onload = function() {   // inside here, we will formulate our cart logic
   

//2. We initialize our cartItems array and load the contents of the     sessionStorage
window.onload = function(){
    let cartItems = [];
    init();

    function init(){
        //cartItems = JSON.parse(sessionStorage.getItem('cart')).items || [];
        if (JSON.parse(sessionStorage.getItem('cart')).items.length > 0) {
            cartItems = JSON.parse(sessionStorage.getItem('cart')).items;
        } else {
            cartItems = [];
        }
        console.log('Cart Items contains', cartItems);
        loadItems(cartItems);
        // add event listener button
        bindEvents();
    }

//3. We now create a function that loads that displays the cart items
function loadItems(items) {
    console.log(items);
    let pEl = document.getElementById('cart-items-list');
    pEl.innerHTML = '';
    var itemsTotal = 0;
    let item = '';
    for (var i = 0; i < items.length; i++) {
        console.log(items[i]);
        let itemTotal = items[i].item.price * items[i].amount;
        item += '<tr>';
     //   item += '<td>' + items[i].item.id + '</td>';
        item += '<td>' + items[i].item.name + '</td>';
        item += '<td>₱' + items[i].item.price + '</td>';
        item += '<td>' + items[i].amount + '</td>';
        item += '<td>₱' + itemTotal + '</td>';
        item +=
            '<td> <button data-item-id="' +
            items[i].item.id + '" class="btn btn-danger remove-item-btn">X</button></td>';
        item +='</tr>';
        itemsTotal += itemTotal;
     }
     pEl.innerHTML = item;
     let deliveryFee = 100; 
     document.getElementById('total').innerHTML = itemsTotal; 
     document.getElementById('alltotal').innerHTML = itemsTotal + deliveryFee; 
}

//4. Test your work and it should result to a table rendered on a page. We now have to add and event handler once the Remove button is clicked

function bindEvents(){
    document.querySelectorAll(".remove-item-btn").forEach(function (el) {
        el.addEventListener('click', function (event) {
            let id = event.target.dataset.itemId;
            console.log( "Called", id);
            console.log( "Called bindEvents");
            removeItem(id);
            console.log( "Called removed");
        });
    });
}

//5. Finally, we create a function that removes an item from the sessionStorage

function removeItem(id) {
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].item.id === id) {
            cartItems.splice(i, 1);    //remove item from array
            sessionStorage.setItem(
                'cart',
                JSON.stringify({items: cartItems})

            );
            init();
            console.log( "Called Item remove now the break");
            break;
        }
    }
}
  

}






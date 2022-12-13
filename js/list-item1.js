//1. Let us first create a static list of products.

const products = [ {
    "id": "1",
    "img": "img/1.png",
    "name": "NutriCleanse Herbal Capsule 500mg (60 Caps)",
    "price": " 300"
    },
  /*{
    "id": "2",
    "img": "img/2.png",
    "name": "Nutri Cleanse",
    "price": " 350"
    },
    {
        "id": "3",
    "img": "img/3.png",
    "name": "Oil Herbal",
    "price": " 650"
    }  */  
];

//2. create a event handler that runs after the page loads 
window.onload = function(){


//3.  initialize cartItems and display products
    let items = [];
    let cartItems = [];
    getItems();
    init();

    function init() {
        console.log("Function init was called");
        if (localStorage.cart) {
            cartItems = JSON.parse(localStorage.getItem('cart')).items;      
        } else {
            localStorage.setItem('cart', JSON.stringify({items: [] }))
        }
        updateCartIndicator();
    }
//4. Let us build up our getItems( ) and createItems() function
    function getItems() {
        items = [...products];
        createItems(products);

//7. Update your getItems() function to include bindEvents( ) function
        bindEvents();
    }
    function createItems(data) {
        let itemList = document.querySelector('#items-list');
         itemList.innerHTML = '';
        let item = '';
        for (let i = 0; i < data.length; i++) {
            item += '<div class="col-md-12">';
            item += '<div class="thumbnail">';
            item +=
                '<img src="' + data[i].img + '" alt="' + data[i].name + '" />';
            item += '<div class="caption">';
            item +=
             '<h3>' + 
        //     data[i].name + 
         //    '<span  class = "label label-default">$' +
           //  data[i].price + '</span></h3>';
           //  item += 
           '<br>' +
             '<div class = "paraBtn"><button data-item-id="' + 
              data[i].id +
             '" class="btn btn-primary add-to-cart" role="button">Add to<i class="fa-solid fa-cart-shopping"></i></button>';
             //item += '</div></div></div>';
        }
        itemList.innerHTML = item;
    }
    //5. Test your functions and examine if the data is loaded on the page.
    // then
    //6. Add EventListener to the Add To Cart Button 
    function bindEvents() {
        document.querySelectorAll('.add-to-cart').forEach(function (el) {
            el.addEventListener('click', function (event) {
                const id = event.target.dataset.itemId;
                console.log('id = ' + id);
                const button = this;
                button.innerHTML = 'Adding. . .';
                button.setAttribute('disabled', true);
                setTimeout(function() {
                    button.innerHTML = 'Add to <i class="fa-solid fa-cart-shopping"></i>';
                    button.removeAttribute('disabled');
                    addItem(id);
                    updateCartIndicator();
                }, 500)
            });
        });
    }
    //8. Create our addItem() function
    function addItem(id) {
        let itemObj = items.filter(function (item) {
            return item.id === id;    
        }) [0];
        let itemInCart = cartItems.filter(function (product) {
            //console.log(item);
            return product.id === id;    
        }) [0];
        if (itemInCart) {
            itemInCart.amount++;
        }else{
            cartItems.push({ item: itemObj, amount: 1});
        }
        localStorage.setItem('cart', JSON.stringify({items: cartItems}));
    }
    //9. Now we create our updateCartIndicator( )

    function updateCartIndicator() {
        let itemsTotal = 0;
        for (let i = 0; i<cartItems.length; i++) {
            itemsTotal +=cartItems[i]. amount;
        }
        document.getElementById('cart-items-num').innerHTML = itemsTotal;
    }
    
}
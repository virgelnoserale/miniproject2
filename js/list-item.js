//1. Let us first create a static list of products.

const products = [ {
    "id": "1",
    "img": "img/1.png",
    "name": "Isulin Coffee",
    "price": " 300",
    "info" : "Helo Wolrd isaaa"
    },
  {
    "id": "2",
    "img": "img/2.png",
    "name": "Nutri Cleanse",
    "price": " 350",
    "info" : "Helo Wolrd duwaa"
    },
    {
     "id": "3",
    "img": "img/3.png",
    "name": "Oil Herbal",
    "price": " 650",
    "info" : "Helo Wolrd tuloooo"
    }  
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
        if (sessionStorage.cart) {
            cartItems = JSON.parse(sessionStorage.getItem('cart')).items;      
        } else {
            sessionStorage.setItem('cart', JSON.stringify({items: [] }))
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
            item += '<div class="col-sm-6 col-md-4">';
            item += '<div class="thumbnail">';
            item += '<img src="' + data[i].img + '""' + data[i].name + '" "' + data[i].info +'"/>';
            item += '<div class="caption">';
            item +=
             '<h5>' + 
             data[i].name +
             '<br>' +
             '<span  class = "label label-default"> ₱' +
            data[i].price + '</span></h5>';
            
            item +='<p class = "info">'
             + data[i].info + '</p>';
            
            item +=  '<p><button data-item-id="' +  //view product
            '" class="btn btn-info view-product-descrip" role="button">View</button> <button data-item-id="' + 

            data[i].id +  //add to cart
          '" class="btn btn-info add-to-cart" role="button">Cart it</button>   </p>';
            
            
             
             
              item += '</div></div></div>';
             


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
                button.innerHTML = 'Loading...';
                button.setAttribute('disabled', true);
                setTimeout(function() {
                    button.innerHTML = 'Cart it';
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
        sessionStorage.setItem('cart', JSON.stringify({items: cartItems}));
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
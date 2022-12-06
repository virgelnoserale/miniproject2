let x = 0;
let photos= [];
let interval = 5000;

photos[0] = 'img/products/coffee/1.png';
photos[1] = 'img/products/coffee/2.png';
photos[2] = 'img/products/coffee/3.png';

function slider(){
    document.getElementById("slide-product-details").src = photos[x];
    if(x<photos.length-1){
        x++;
    }else{
        x=0;
    }
    setTimeout("slider()", interval);
}
onload = slider;
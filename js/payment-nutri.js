function totalPrice(num){
    let deliveryFee = 85;
    num = parseInt(num);
    document.getElementById("sub-result").innerHTML= num * 300;
    document.getElementById("total-result").innerHTML= num * 300 + deliveryFee;
}
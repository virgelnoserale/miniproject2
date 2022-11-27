function totalPrice(num){
    let deliveryFee = 85;
    num = parseInt(num);
    document.getElementById("sub-result").innerHTML= num * 249;
    document.getElementById("total-result").innerHTML= num * 249 + deliveryFee;
}
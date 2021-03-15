var itemQuantity;
var price = document.getElementsByClassName('price')[0]
var itemPrice = parseFloat(price.innerText)

document.querySelector(".plus").addEventListener('click', function (){

    itemQuantity = document.getElementsByClassName('quantity')[0].value;
    price.innerText = Math.round(itemQuantity * itemPrice * 100) / 100
})

document.querySelector(".minus").addEventListener('click', function (){

    itemQuantity = document.getElementsByClassName('quantity')[0].value;
    price.innerText = Math.round(itemQuantity * itemPrice * 100) / 100
})

var quantityInputs = document.querySelector(".quantity")
quantityInputs.addEventListener('change', function(event){
        var input = event.target
        if(isNaN(input.value) || input.value <= 0){
            input.value = 1
        }
        updateItemPrice()
    })


function updateItemPrice(){
    itemQuantity = document.getElementsByClassName('quantity')[0].value
    price.innerText = Math.round(itemQuantity * itemPrice * 100) / 100
}




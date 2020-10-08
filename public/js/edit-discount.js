const options = document.querySelectorAll('#edit-category option');
const categoryRatioInput = document.querySelector('#edit-category .ratio');
const productRatioInput = document.querySelector('#editProductDiscount .discountRatio')
const addButtons = document.getElementsByClassName('product-card');
let choosenProduct = null;

const manipulateRatio = event => {
    let ratio = event.target.dataset.ratio;
    categoryRatioInput.value = ratio;
}

options.forEach(option => {
    option.addEventListener("click", manipulateRatio)
});

const onProductClick = event => {
    const currDiv = document.getElementById(event.target.dataset.id);
    if(choosenProduct){
        document.getElementById(choosenProduct).classList.remove('choosenProduct');
    }
    currDiv.classList.add('choosenProduct');
    choosenProduct = event.target.dataset.id;
    productRatioInput.value = currDiv.dataset.ratio;

}

for(let button of addButtons){
    button.addEventListener("click", onProductClick)
}
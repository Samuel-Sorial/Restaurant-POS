const options = document.querySelectorAll('#edit-category option');
const categoryRatioInput = document.querySelector('#edit-category .ratio');
const productRatioInput = document.querySelector('#editProductDiscount .discountRatio')
const addButtons = document.getElementsByClassName('product-card');
const prodId = document.querySelector('.prodId');
let choosenProduct = null;
let choosenCategory = null;

const manipulateRatio = event => {
    let ratio = event.target.dataset.ratio;
    choosenCategory = event.target.value;
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
    prodId.value = currDiv.dataset.id;
}

for(let button of addButtons){
    button.addEventListener("click", onProductClick)
}

document.getElementById('deleteCategoryDiscount').addEventListener("click", (event) => {
    let sure = confirm('Are you sure you want to delete this discount?');
    if(sure){
        fetch( `http://` + window.location.host + `/admin/manage-discount/delete-category-${choosenCategory}`, {
            method: 'DELETE'})
        .then()
        .catch(err=> console.log(err));
        }
});

document.getElementById('deleteProductDiscount').addEventListener("click", (event) => {
    let sure = confirm('Are you sure you want to delete this discount?');
    if(sure){
        fetch( `http://` + window.location.host + `/admin/manage-discount/delete-product-${choosenProduct}`, {
            method: 'DELETE'})
        .then()
        .catch(err=> console.log(err));
        }
});
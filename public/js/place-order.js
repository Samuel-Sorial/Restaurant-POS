const products = [];

const addButtons = document.getElementsByClassName('product-card');

const productTable = document.querySelector("tbody");

const submitButton = document.querySelector('button.hidden');

const givenDiscount = document.querySelector('.row.hidden');

const overAllCalculation = document.querySelector('div.hidden-calc');

const onClickProduct = (event) => {
    const id = event.target.dataset.id;
    const children = document.getElementById(id).children;
    if(products.length == 0){
        displaySubmitButtonAndDiscount();
    }
    let product = {};
    if(alreadyAdded(id)){
        product = products.find(e => e.id == id);
    }else{
        product = {
        id: id,
        name: children.item(0).innerText,
        price:children.item(1).innerText.slice(1),
        discount: 0,
        count: 1
        }
    }
    addProductToTable(product);
    displayOverAllCalculation();
}

for(let button of addButtons){
    button.addEventListener("click", onClickProduct);
}


const addProductToTable = (product) => {
    if(alreadyAdded(product.id)){
        incrementCount(product);
        return calculateOverAll();
    }
    const row = productTable.insertRow(products.length);
    const deleteButton = row.insertCell();
    addDeleteButton(deleteButton, product);
    row.insertCell().innerText = product.name;
    row.insertCell().innerText = "$" + product.price;
    const count = row.insertCell();
    count.innerHTML = '<input type="number" min="1" value="1" autocomplete="off">';
    count.onchange = displayOverAllCalculation;
    const discount = row.insertCell();
    discount.innerHTML = '<input type="number" min="0" max="1" step=".01" value="0" autocomplete="off">';
    discount.onchange = displayOverAllCalculation;
    deleteButton.addEventListener("click", (event)=> {
        products.splice(products.indexOf(product),1);
        removeProductFromTable(product);
    });
    products.push(product);
    calculateOverAll();
}
const calculateOverAll = () => {
    let overall = 0;
    let totalDiscount = 0;
    for(let i = 0 ; i < productTable.rows.length; i++){
        let currPrice = parseFloat(productTable.rows.item(i).cells.item(2).innerText.slice(1));
        let currCount = parseFloat(productTable.rows.item(i).cells.item(3).children.item(0).value);
        let currDiscount = parseFloat(productTable.rows.item(i).cells.item(4).children.item(0).value);
        overall += currPrice * currCount;
        totalDiscount += currDiscount * currCount * currPrice;
    }
    totalDiscount += parseFloat(document.querySelector('.manual-discount input').value);
    return {overall: precise(overall), totalDiscount: precise(totalDiscount), total: precise(overall - totalDiscount)};
}
const precise = (x) => {
    return Number.parseFloat(x).toFixed(2);
}
const displayOverAllCalculation = () => {
    overAllCalculation.className = "overall-product";
    const calculation = calculateOverAll();
    overAllCalculation.children.item(0).innerText = `Overall: $${calculation.overall}`;
    overAllCalculation.children.item(1).innerText = `Total Discount: $${calculation.totalDiscount}`;
    overAllCalculation.children.item(2).innerText = `Total after the discount: $${calculation.total}`;
}
const displaySubmitButtonAndDiscount = () => {
    submitButton.className = "btn btn-primary btn-lg btn-block";
    givenDiscount.className= "row manual-discount";
    givenDiscount.onchange = displayOverAllCalculation;
}
// product => void
// increment the count of the current product object and displaying it to the screen
const incrementCount = (product) => {
    const cellOfCount = document.querySelector('.prod'+product.id).parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
    const input = cellOfCount.children.item(0);
    input.value = parseInt(input.value) + 1;
    product.count +=1;
}

// cell dom object, product => void
// attach delete button for this specific product
const addDeleteButton = (cell, product) => {
    cell.innerHTML = `<svg class="delete-product prod${product.id}" data-id=${product.id} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-backspace" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M6.603 2h7.08a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-7.08a1 1 0 0 1-.76-.35L1 8l4.844-5.65A1 1 0 0 1 6.603 2zm7.08-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zM5.829 5.146a.5.5 0 0 0 0 .708L7.976 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
    </svg>`;
}

// product => void
// delete product from the screen
const removeProductFromTable = (product) => {
    const svg = document.querySelector('.prod'+product.id);
    svg.parentElement.parentElement.remove();
}

// id => boolean
// returns if the product is already an item of the order or not
const alreadyAdded = (id) => {
    for(let prod of products){
        if(id == prod.id){
            return true;
        }
    }
    return false;
}

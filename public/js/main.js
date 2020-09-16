const products = [];

const addButtons = document.getElementsByClassName('product-card');

const productTable = document.querySelector("tbody");

for(let button of addButtons){
    button.addEventListener("click", (event)=> {
        const id = event.target.id;
        addProductToTable(id);
    })
}


const addProductToTable = (id) => {
    const row = productTable.insertRow(products.length);
    row.insertCell().innerText = id;
    row.insertCell().innerText = 'test';
}
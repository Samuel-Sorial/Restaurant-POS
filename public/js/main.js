const products = [];

const addButtons = document.getElementsByClassName('product-card');

const productTable = document.querySelector("tbody");

for(let button of addButtons){
    button.addEventListener("click", (event)=> {
        const id = event.target.dataset.id;
        const children = document.getElementById(id).children;
        const product = {
            id: id,
            name: children.item(0).innerText,
            price:children.item(1).innerText.slice(1)
        }
        addProductToTable(product);
    })
}


const addProductToTable = (product) => {
    const row = productTable.insertRow(products.length);
    row.insertCell().innerText = product.id;
    row.insertCell().innerText = product.name;
    row.insertCell().innerText = "$" + product.price;
    products.push(product);
}
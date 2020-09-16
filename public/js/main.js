const products = [];

const addButtons = document.getElementsByClassName('product-card');

const productTable = document.querySelector("tbody");

for(let button of addButtons){
    button.addEventListener("click", (event)=> {
        const id = event.target.dataset.id;
        const children = document.getElementById(id).children;
        let product = {};
        if(alreadyAdded(id)){
            product = products.find(e => e.id == id);
        }else{
            product = {
                id: id,
                name: children.item(0).innerText,
                price:children.item(1).innerText.slice(1),
                count: 1
            }
        }
        addProductToTable(product);
    })
}


const addProductToTable = (product) => {
    if(alreadyAdded(product.id)){
        const cellOfCount = document.querySelector('.prod'+product.id).parentElement.nextElementSibling.nextElementSibling.nextElementSibling;
        const input = cellOfCount.children.item(0);
        input.value = parseInt(input.value) + 1;
        product.count +=1;
        return;
    }
    const row = productTable.insertRow(products.length);
    const deleteButton = row.insertCell();
    deleteButton.innerHTML = `<svg class="delete-product prod${product.id}" data-id=${product.id} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-backspace" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M6.603 2h7.08a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-7.08a1 1 0 0 1-.76-.35L1 8l4.844-5.65A1 1 0 0 1 6.603 2zm7.08-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zM5.829 5.146a.5.5 0 0 0 0 .708L7.976 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
    </svg>`;
    row.insertCell().innerText = product.name;
    row.insertCell().innerText = "$" + product.price;
    const count = row.insertCell();
    count.innerHTML = '<input type="number" value="1">';
    const discount = row.insertCell();
    discount.innerHTML = '<input type="number" value="0">';
    deleteButton.addEventListener("click", (event)=> {
        products.splice(products.indexOf(product),1);
        removeProductFromTable(product);
    });
    products.push(product);
}

const removeProductFromTable = (product) => {
    const svg = document.querySelector('.prod'+product.id);
    svg.parentElement.parentElement.remove();
}

const alreadyAdded = (id) => {
    for(let prod of products){
        if(id == prod.id){
            return true;
        }
    }
    return false;
}

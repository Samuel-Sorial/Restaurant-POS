const addButtons = document.getElementsByClassName('product-card');
const onClickProduct = (event) => {
    const id = event.target.dataset.id;
    window.location.href = `http://localhost:3000/admin/manage-product-${id}`;
}

for(let button of addButtons){
    button.addEventListener("click", onClickProduct);
}
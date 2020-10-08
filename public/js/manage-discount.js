const addButtons = document.getElementsByClassName('product-card');

const choosenProducts = [];


const onProductClick = event => {
    const currDiv = document.getElementById(event.target.dataset.id);
    currDiv.classList.toggle('choosenProduct');
    let currIndex = choosenProducts.indexOf(currDiv.id);
    if(currIndex != -1){
        choosenProducts.splice(currIndex,1);
    }else{
        choosenProducts.push(currDiv.id);
    }
}

const onAddClick = event => {
    const formData = new FormData(document.querySelector('#addProductDiscount'));
    const ratio = formData.get('ratio');
    const encoded ={
        name: name,
        ratio: ratio,
        products : choosenProducts
    };
    fetch(`http://` + window.location.host + `/admin/manage-discount`, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(encoded),
        redirect:'follow'
    }).catch(err => console.log(err));
}


document.querySelector('.submitDiscount').addEventListener('click', onAddClick);

for(let button of addButtons){
    button.addEventListener("click", onProductClick )
}
const products = [];

const addButtons = document.getElementsByClassName('product-card');

const productTable = document.querySelector('tbody');

const submitButton = document.querySelector('button.hidden');

const givenDiscount = document.querySelector('.row.hidden');

const overAllCalculation = document.querySelector('div.hidden-calc');

const onClickProduct = (event) => {
  const id = event.target.dataset.id;
  const children = document.getElementById(id).children;
  if (products.length == 0) {
    displaySubmitButtonAndDiscount();
  }
  let product = {};
  if (alreadyAdded(id)) {
    product = products.find((e) => e.id == id);
  } else {
    product = {
      id: id,
      name: children.item(0).innerText,
      price: children.item(1).innerText.slice(1),
      ratio: document.getElementById(id).dataset.ratio,
      discount: document.getElementById(id).dataset.discount,
      count: 1,
    };
  }
  addProductToTable(product);
  displayOverAllCalculation();
};

for (let button of addButtons) {
  button.addEventListener('click', onClickProduct);
}

const addProductToTable = (product) => {
  if (alreadyAdded(product.id)) {
    incrementCount(product);
    return calculateOverAll();
  }
  const row = productTable.insertRow(products.length);
  const deleteButton = row.insertCell();
  addDeleteButton(deleteButton, product);
  row.insertCell().innerText = product.name;
  row.insertCell().innerText = '$' + product.price;
  const count = row.insertCell();
  count.innerHTML = `<input data-id=${product.id} type="number" min="1" value="1" autocomplete="off">`;
  count.oninput = updateProducts;
  deleteButton.addEventListener('click', (event) => {
    products.splice(products.indexOf(product), 1);
    removeProductFromTable(product);
  });
  products.push(product);
  calculateOverAll();
};

const updateProducts = (event) => {
  products.find((product) => product.id == event.target.dataset.id).count =
    event.target.value;
  displayOverAllCalculation();
};

let deliveryTaxs = 5;
const calculateOverAll = () => {
  let overall = 0;
  let totalDiscount = 0;
  for (let product of products) {
    if (product.ratio == 0) {
      overall += product.price * product.count;
    } else {
      overall +=
        product.price * (((product.count - 1) * product.ratio) / 100 + 1);
    }
    if (product.discount) {
      totalDiscount += (product.price * product.discount * product.count) / 100;
    }
  }
  if (document.querySelector('#exampleCheck1').checked) {
    overall += deliveryTaxs;
  }
  totalDiscount += parseFloat(
    document.querySelector('.manual-discount input').value
  );
  totalDiscount += document.querySelector('.usePoints').value / 10;
  return {
    overall: precise(overall),
    totalDiscount: precise(totalDiscount),
    total: precise(overall - totalDiscount),
  };
};
const precise = (x) => {
  return Number.parseFloat(x).toFixed(2);
};
const displayOverAllCalculation = () => {
  overAllCalculation.className = 'overall-product';
  const calculation = calculateOverAll();
  overAllCalculation.children.item(
    0
  ).innerText = `Overall: $${calculation.overall}`;
  overAllCalculation.children.item(
    1
  ).innerText = `Total Discount: $${calculation.totalDiscount}`;
  overAllCalculation.children.item(
    2
  ).innerText = `Total after the discount: $${calculation.total}`;
};
const displaySubmitButtonAndDiscount = () => {
  submitButton.className = 'btn btn-primary btn-lg btn-block';
  givenDiscount.className = 'row manual-discount';
  givenDiscount.onchange = displayOverAllCalculation;
};
// product => void
// increment the count of the current product object and displaying it to the screen
const incrementCount = (product) => {
  const cellOfCount = document.querySelector('.prod' + product.id).parentElement
    .nextElementSibling.nextElementSibling.nextElementSibling;
  const input = cellOfCount.children.item(0);
  input.value = parseInt(input.value) + 1;
  product.count += 1;
  console.log('here');
};

// cell dom object, product => void
// attach delete button for this specific product
const addDeleteButton = (cell, product) => {
  cell.innerHTML = `<svg class="delete-product prod${product.id}" data-id=${product.id} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-backspace" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M6.603 2h7.08a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-7.08a1 1 0 0 1-.76-.35L1 8l4.844-5.65A1 1 0 0 1 6.603 2zm7.08-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zM5.829 5.146a.5.5 0 0 0 0 .708L7.976 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
    </svg>`;
};

// product => void
// delete product from the screen
const removeProductFromTable = (product) => {
  const svg = document.querySelector('.prod' + product.id);
  svg.parentElement.parentElement.remove();
  displayOverAllCalculation();
};

// id => boolean
// returns if the product is already an item of the order or not
const alreadyAdded = (id) => {
  for (let prod of products) {
    if (id == prod.id) {
      return true;
    }
  }
  return false;
};

const phoneNumber = document.querySelector('.phoneNumber');

const checkPhoneNumber = async (number) => {
  let valid = await fetch(
    `http://` + window.location.host + `/check-number-${number}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  );
  if (valid.status != 200) {
    phoneNumber.setAttribute('style', 'width: 150px; border: 2px solid red;');
    alert("Can't find any client with this number, please fill his data");
  } else {
    phoneNumber.setAttribute(
      'style',
      ' width: 150px; border: 2px solid #97f497;'
    );
    updateData(await findSuggestions(number));
  }
};

const phoneNumberHandler = async (event) => {
  let value = phoneNumber.value;
  if (value.length == 11) {
    checkPhoneNumber(value);
  } else {
    autoComplete(event);
  }
};

phoneNumber.addEventListener('input', phoneNumberHandler);
const findSuggestions = async (number) => {
  let suggestions = await fetch(
    `http://` + window.location.host + `/find-numbers-${number}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  );
  suggestions = await suggestions.json();
  return suggestions;
};
const phonesList = document.querySelector('#phonesList');
const editUserName = document.querySelector('.userName');
const editAddress = document.querySelector('.userAddress');

const createSuggestion = (number) => {
  const option = document.createElement('option');
  option.value = number.phoneNumber;
  option.innerText = number.phoneNumber;
  phonesList.appendChild(option);
};

const autoComplete = async (event) => {
  if (event.target.value.length > 3 && event.target.value.length < 11) {
    phonesList.innerHTML = '';
    let suggestions = await findSuggestions(event.target.value);
    for (let suggestion of suggestions) {
      createSuggestion(suggestion);
    }
  }
};
let currentClient = null;

const updateData = (currs) => {
  for (let curr of currs) {
    if (curr.phoneNumber == phoneNumber.value) {
      editUserName.value = curr.name;
      editAddress.value = curr.address;
      currentClient = curr;
      document.querySelector('.availablePoints').innerText = curr.points;
      document.querySelector('.usePoints').max = curr.points;
    }
  }
};

document
  .querySelector('.usePoints')
  .addEventListener('input', displayOverAllCalculation);

document.querySelector('#exampleCheck1').onchange = (event) => {
  displayOverAllCalculation();
};
const placeOrder = async () => {
  const isDelivery = document.querySelector('#exampleCheck1').checked;
  const prices = calculateOverAll();
  if (products.length == 0) {
    alert('No products added!');
    return;
  }
  if (isDelivery) {
    if (validateClient()) {
      if (prices.total < 0) {
        alert('Discount cant be more than the total!!!');
        return;
      }
      if (
        document.querySelector('.usePoints').value >
        document.querySelector('.usePoints').attributes.max.value
      ) {
        alert('You cant use more points than client has!');
        return;
      }
      sendRequest(
        isDelivery,
        prices,
        {
          number: phoneNumber.value,
          username: editUserName.value,
          address: editAddress.value,
          usedPoints: document.querySelector('.usePoints').value,
        },
        products
      );
    } else {
      alert(
        'To make order with delivery, you should add the data of the customer'
      );
    }
  } else {
    if (prices.total < 0) {
      alert('Discount cant be more than the total!!!');
      return;
    }
    sendRequest(
      isDelivery,
      prices,
      {
        number: phoneNumber.value,
        username: editUserName.value,
        address: editAddress.value,
        usedPoints: document.querySelector('.usePoints').value,
      },
      products
    );
  }
};

submitButton.addEventListener('click', placeOrder);

const validateClient = () => {
  return phoneNumber.value && editUserName.value && editAddress.value;
};

const sendRequest = async (delivery, prices, clientData, products) => {
  const reqBody = {
    delivery: delivery,
    prices: prices,
    client: clientData,
    products: products,
  };
  await fetch(`http://` + window.location.host + `/place-order`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(reqBody),
  })
    .then((result) => location.reload())
    .catch((err) => console.log(err));
};

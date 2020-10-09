const addPhoneNumber = document.querySelector('#addClient .phoneNumber');
const editPhoneNumber = document.querySelector('#editClient .phoneNumber');
const phonesList = document.querySelector('#phonesList');
const editUserName = document.querySelector('#editClient .name');
const editAddress = document.querySelector('#editClient .address')

const checkPhoneNumber = async number => {
    let valid = await fetch(`http://` + window.location.host + `/check-number-${number}`, {
        method: "GET",
        cache: "no-cache"
    });
    if(valid.status != 200){
        addPhoneNumber.setAttribute("style", "border: 2px solid #97f497;")
    }else{
        addPhoneNumber.setAttribute("style","border: 2px solid red;")
    }
}

const addPhone = async event =>{
    let value = addPhoneNumber.value;
    if(value.length == 11){
        checkPhoneNumber(value);
    }
}

addPhoneNumber.addEventListener("change", addPhone);
addPhoneNumber.addEventListener("blur", addPhone);


const findSuggestions = async number => {
    let suggestions = await fetch(`http://` + window.location.host + `/find-numbers-${number}`,{
        method: "GET",
        cache: "no-cache"
    });
    suggestions = await suggestions.json();
    return suggestions;
}

const createSuggestion = number => {
    const option = document.createElement('option');
    option.value = number.phoneNumber;
    option.innerText = number.phoneNumber;
    phonesList.appendChild(option);
}

const autoComplete = async event => {
    if(event.target.value.length > 3 && event.target.value.length < 11){
        phonesList.innerHTML ="";
        let suggestions = await findSuggestions(event.target.value);
        for(let suggestion of suggestions){
            createSuggestion(suggestion);
        }
    }
    updateData( await findSuggestions(event.target.value));
}
const updateData = (suggestions) =>{
    for(let suggest of suggestions){
        if(suggest.phoneNumber == editPhoneNumber.value){
            editUserName.value = suggest.name;
            editAddress.value = suggest.address;
        }
    }
}

editPhoneNumber.addEventListener('input', autoComplete);


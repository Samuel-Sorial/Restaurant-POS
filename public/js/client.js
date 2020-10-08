const addPhoneNumber = document.querySelector('#addClient .phoneNumber');

const checkPhoneNumber = async number => {
    let valid = await fetch(`http://` + window.location.host + `/check-number-${number}`, {
        method: "GET",
        cache: "no-cache"
    });
    console.log(valid);
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
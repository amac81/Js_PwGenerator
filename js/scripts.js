// Element selection
const openGeneratPassword = document.querySelector("#open-generate-password");
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElem = document.querySelector("#generated-password");
const generateOptionsElem = document.querySelector("#pw-generate-options");

const pwLengthOption = document.querySelector("#pw-length");
const pwLettersOption = document.querySelector("#letters-checkbox");
const pwNumbersOption = document.querySelector("#numbers-checkbox");
const pwSymbolsOption = document.querySelector("#symbols-checkbox");
const pwCopyButton = document.querySelector("#pw-copy");
const pwAutoFillButton = document.querySelector("#pw-autofill");

const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const inputPasswordConfirmation = document.querySelector("#password-confirmation");

const showPasswordElem = document.querySelector("#pw-eye");
const showPasswordConfirmationElem = document.querySelector("#pw-confirmation-eye");

// Functions
const getLetterLowerCase = () => {
    //26 letters in alphabet
    //97 = "a"
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 97);
}

const getLetterUpperCase = () => {
    //26 letters in alphabet
    //65 = "A"
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 65);
}

const getNumber = () => {
    //0-10
    return Math.floor(Math.random() * 10 ).toString();
}

const getSymbol = () => {
    const symbols = "(){}[]=<>,.!@#$%&*+-";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const passwordGenerate = (pwLength, ... [generators]) => {
    let password = "";
    const myGenerators = generators;

    //random function execution
    for(i = 0; i < pwLength ; i = i + myGenerators.length){
        myGenerators.forEach(() => {
            const randomValue = myGenerators[Math.floor(Math.random() * myGenerators.length)](); //to execute
            password += randomValue; 
        });
    }
    password = password.slice(0, pwLength);
    return password;
}

//console.log(window.innerWidth)

const clearPasswordInputFields = () => {
    inputPassword.value = "";
    inputPasswordConfirmation.value = "";
}

const toggleGeneratorDiv = () => {
    generateOptionsElem.classList.toggle("hide");
    
    if(generatedPasswordElem.innerText){
        generatedPasswordElem.style.display = "none";
    }
        
    inputPassword.focus();
}

// Events

openGeneratPassword.addEventListener("click", ()=> {
    toggleGeneratorDiv();
    clearPasswordInputFields();
});

pwLengthOption.addEventListener("blur", (e) => {
    //1 character minimum
    //20 characters maximum
    (e.target.value>20) ? (e.target.value = 20) : (e.target.value);
    (e.target.value<1) ? (e.target.value = 1) : (e.target.value);
});

generatePasswordButton.addEventListener("click", (e)=> {
   e.preventDefault();

   const pwLength = pwLengthOption.value;

   let generatorsToCall = [];

   pwLettersOption.checked ? generatorsToCall.push(getLetterLowerCase, getLetterUpperCase) : null;
   pwNumbersOption.checked ? generatorsToCall.push(getNumber) : null;
   pwSymbolsOption.checked ? generatorsToCall.push(getSymbol) : null;

   generatedPasswordElem.style.display = "block";
   if(generatorsToCall.length!=0){
         const generatedPw = passwordGenerate(pwLength, generatorsToCall);
        
         generatedPasswordElem.querySelector("h4").innerText = generatedPw;
    }
    else {
        generatedPasswordElem.querySelector("h4").innerText = "";
    }
});

pwCopyButton.addEventListener("click", (e) => {
    e.preventDefault();
    const password = generatedPasswordElem.querySelector("h4").innerText;

    //copy to clipboard
    navigator.clipboard.writeText(password).then(() => {
        pwCopyButton.innerText = "Password copied"
    })
});

pwAutoFillButton.addEventListener("click", (e) => {
    e.preventDefault();
    const password = generatedPasswordElem.querySelector("h4").innerText;

    //fill password and password confirmation fields
    inputPassword.value = password;
    inputPasswordConfirmation.value = password;
    toggleGeneratorDiv();

});

showPasswordElem.addEventListener("mousedown", (e) => {
    e.preventDefault();
    inputPassword.type ="text";
});

showPasswordElem.addEventListener("mouseup", (e) => {
    e.preventDefault();
    inputPassword.type ="password";
});

showPasswordConfirmationElem.addEventListener("mousedown", (e) => {
    e.preventDefault();
    inputPasswordConfirmation.type ="text";
});

showPasswordConfirmationElem.addEventListener("mouseup", (e) => {
    e.preventDefault();
    inputPasswordConfirmation.type ="password";
});
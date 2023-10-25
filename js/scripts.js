// Element selection
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElem = document.querySelector("#generated-password");

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

const passwordGenerate = (pwLength, getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    let password = "";
    const myGenerators = [
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    ];

    //random function execution
    for(i = 0; i < pwLength ; i = i + myGenerators.length){
        myGenerators.forEach(() => {
            const randomValue = myGenerators[Math.floor(Math.random() * myGenerators.length)](); //to execute
            password += randomValue; 
        });
    }
    password = password.slice(0, pwLength);
    console.log(password);

}

console.log(window.innerWidth)

// Events
generatePasswordButton.addEventListener("click", ()=> {
   passwordGenerate(4, getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);
});
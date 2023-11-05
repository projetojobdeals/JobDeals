const form = document.getElementById('form-api')
const name = document.getElementById('name');
const email = document.getElementById('email');
const cnpj = document.getElementById('cnpj');
const url = "https://localhost:7197/api/User";

form.addEventListener('submit', (e) => {
    e.preventDefault();    

    const validationResult = checkInputs(); // Recebe o resultado da função checkInputs
    console.log(validationResult)
    if (validationResult.isValid) {
        setInputs(validationResult); // Passa o resultado da validação para setInputs
    }
})

function checkInputs(){
    const nameValue = name.value;
    const emailValue = email.value;
    const cnpjValue = cnpj.value;

    if (nameValue === ''){
        setErrorFor(name, "O nome é obrigatório.");
    } else {
        setSuccessFor(name)
    }

    if (emailValue === ''){
        setErrorFor(email, "O email é obrigatório.");
    } else if (!checkEmail(emailValue)){
        setErrorFor(email, "Por favor, insira um email válido.")
    } else {
        setSuccessFor(email)
    }

    if (cnpjValue === '') {
        setErrorFor(cnpj, "O CNPJ é obrigatório.");
    } else if (!checkCNPJ(cnpjValue)) {
        setErrorFor(cnpj, "CNPJ inválido.");
    } else {
        setSuccessFor(cnpj);
    }

    const formControls = form.querySelectorAll('.input-box');

    const formIsValid = [ ... formControls].every(formControl => {
        return (formControl.className === "input-box success");
    });

    return {
        isValid: formIsValid,
        nameValue: nameValue,
        emailValue: emailValue,
        cnpjValue: cnpjValue,
    };
}

function setErrorFor(input, message){
    const inputBox = input.parentElement;
    const small = inputBox.querySelector("small");

    //Adicionar a mensagem de erro
    small.innerText = message;

    //Adicionar a classe de erro
    inputBox.className = "input-box error";
}

function setSuccessFor (input){
    const inputBox = input.parentElement;

    //Adicionar a classe de sucesso
    inputBox.className = "input-box success";
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
}

function applyCnpjMask(input) {
    const cnpjValue = input.value.replace(/\D/g, '');
    let formattedCnpj = '';

    for (let i = 0; i < cnpjValue.length; i++) {
        if (i === 2 || i === 5) {
            formattedCnpj += '.' + cnpjValue[i];
        } else if (i === 8) {
            formattedCnpj += '/' + cnpjValue[i];
        } else if (i === 12) {
            formattedCnpj += '-' + cnpjValue[i];
        } else {
            formattedCnpj += cnpjValue[i];
        }
    }

    input.value = formattedCnpj;
}

function checkCNPJ(cnpj) {
    // Remova caracteres não numéricos do CNPJ
    cnpj = cnpj.replace(/[^\d]+/g,'');

    // Verifique o tamanho correto do CNPJ (14 dígitos)
    if (cnpj.length !== 14) {
        return false;
    }

    // Verifique se todos os dígitos são iguais (isso é um CNPJ inválido)
    if (/^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    // Calcula o segundo dígito verificador
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;

    return true;
}

function setInputs(validationResult){

    const {
        nameValue,
        emailValue,
        cnpjValue,
    } = validationResult;

    const userData = {
        "name": nameValue,
        "email": emailValue,
        "cnpj": cnpjValue
    };

    function addNewUser() {
        axios.post(url, userData)
            .then(response => {
                alert("Usuário Salvo")
                redirect();
            })
            .catch(error => console.log(error))
    }

    addNewUser()
}

function redirect() {
    window.location.href = '/profile.html';
}
const form = document.getElementById('form-api');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');

form.addEventListener('submit', (e) => {
    e.preventDefault();    

    checkInputs();
})

function checkInputs(){
    const firstnameValue = firstname.value;
    const lastnameValue = lastname.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const confirmpasswordValue = confirmpassword.value;

    if (firstnameValue === ''){
        setErrorFor(firstname, "O nome é obrigatório.");
    } else {
        setSuccessFor(firstname)
    }

    if (lastnameValue === ''){
        setErrorFor(lastname, "O sobrenome é obrigatório.");
    } else {
        setSuccessFor(lastname)
    }

    if (emailValue === ''){
        setErrorFor(email, "O email é obrigatório.");
    } else if (!checkEmail(emailValue)){
        setErrorFor(email, "Por favor, insira um email válido.")
    } else {
        setSuccessFor(email)
    }

    if (passwordValue === ''){
        setErrorFor(password, "A senha é obrigatória.");
    } else if (passwordValue.length < 8){
        setErrorFor(password, "A senha precisa ter no mínimo 8 caracteres.")
    } else {
        setSuccessFor(password)
    }

    if (confirmpasswordValue === ''){
        setErrorFor(confirmpassword, "A confirmação de senha é obrigatória.");
    } else if (confirmpasswordValue.length < 8){
        setErrorFor(confirmpassword, "A confirmação de senha está incorreta")
    } else if (confirmpasswordValue != passwordValue){
        setErrorFor(confirmpassword, "As senhas não conferem.")
    } else {
        setSuccessFor(confirmpassword)
    }


    const formControls = form.querySelectorAll('.input-box');

    const formIsValid = [ ... formControls].every(formControl => {
        return (formControl.className === "input-box success");
    });

    if (formIsValid) {
        console.log("O formulário está 100% válido.")
    }
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


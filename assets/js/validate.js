//Campos a validar:
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');
const cnpj = document.getElementById('cnpj');



function validate(item){
    item.setCustomValidity('');
    item.checkValidity();

    if (item == confirmpassword){
        if (item.value === password.value) item.setCustomValidity('');

        else item.setCustomValidity('As Senhas Digitadas não são iguais. Verifique e corrija.');
    }
}

function maskCNPJ() {
    let strCNPJ = cnpj.value;
    if (strCNPJ.length == 2 || strCNPJ.length == 6) {cnpj.value += "."}
    else if (strCNPJ.length == 10) {cnpj.value += "/"}
    else if (strCNPJ.length == 15) {cnpj.value += "-"}
}


//Solicita validação a cada alteração na entrada
firstname.addEventListener('input', function() {validate(firstname)});
lastname.addEventListener('input', function() {validate(lastname)});
email.addEventListener('input', function() {validate(email)});
password.addEventListener('input', function() {validate(password)});
confirmpassword.addEventListener('input', function() {validate(confirmpassword)});
cnpj.addEventListener('input', function() {maskCNPJ()});


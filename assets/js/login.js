const form = document.getElementById('form-api');
const email = document.getElementById('email');
const password = document.getElementById('password');
const url = "https://localhost:7197/v1/login";
let authToken = null;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailValue = email.value;
    const passwordValue = password.value;

    const userData = {
        "email": emailValue,
        "password": passwordValue,
    };

    loginUser(userData);
});

function loginUser(userData) {
    axios.post(url, userData)
        .then(response => {
            alert("Login Feito com Sucesso");

            authToken = response.data.token;
            makeAuthorizedRequest();
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Erro desconhecido");
            }
        });
}  

function makeAuthorizedRequest() {
    if (authToken) {
        axios.get("https://localhost:7197/authenticated", {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        })
        .then(response => {
            window.location.href = "profile.html";
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                window.location.href = "login.html";
            } else {
                console.log(error)
            }
        });
    } else {
        alert("Você precisa fazer login primeiro.");
    }
}
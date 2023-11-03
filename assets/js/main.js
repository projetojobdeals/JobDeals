const url = "https://localhost:7197/api/User";

function getUser() {
    axios.get(url)
        .then(response => {
            const data = response.data
            //getName.textContent = JSON.stringify(data)
        })
        .catch(error => console.log(error))
}

getUser()

function getOneUser() {
    axios.get(`${url}/14`)
        .then(response => {
            const data = response.data;
            username = data.firstName + " " + data.lastName;
            getName.textContent = username;
        })
        .catch(error => console.log(error))
}

getOneUser()

function updateUser() {
    axios.put(`${url}/13`, userData)
        .then(response => {
            alert("Usuário Atualizado")
        })
        .catch(error => console.log(error))
}

//updateUser()

function deleteUser() {
    axios.delete(`${url}/16`)
        .then(response => {
            alert("Usuário Deletado")
        })
        .catch(error => console.log(error))
}

//deleteUser()

document.getElementById('form-api').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = document.forms['form-api'];

    const firstName = form.elements['firstname'].value;
    const lastName = form.elements['lastname'].value;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;

    const userData = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
    };

    function addNewUser() {
        axios.post(url, userData)
            .then(response => {
                alert("Usuário Salvo")
            })
            .catch(error => console.log(error))
    }

    //addNewUser()
})
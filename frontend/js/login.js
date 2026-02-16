document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (token) {
        window.location.replace("home.html");
        return;
    }
    document.getElementById('loginForm').addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if(!validateForm){
            return;
        }

        try {

            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.name);
                window.location.replace("home.html");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log("Error", error)
        }
    });

});

function validateForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const emailErr = document.getElementById('emailErr');
    const passErr = document.getElementById('passErr');

    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    let isValid = true;

    emailErr.innerText = "";
    passErr.innerText = "";

    if(!mailRegex.test(email)){
        emailErr.innerText = "*enter valid email";
        isValid = false;
    }

    if(!passwordRegex.test(password)){
        passErr.innerText = "*enter password";
        isValid = false;
    }

    return isValid;

}
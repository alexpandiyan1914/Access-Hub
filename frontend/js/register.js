document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");
    if (token) {
        window.location.replace("home.html");
        return;
    }

    document.getElementById('registerForm').addEventListener("submit", async function (event) {
        event.preventDefault();

        if(!validateForm){
            return;
        }

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration Sucessfull");
                window.location.href = "login.html";
            } else {
                alert(data.message);
            }

            console.log(data);
        } catch (error) {
            console.error("Error", error);
        }
    });
});


function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const nameErr = document.getElementById('nameErr');
    const emailErr = document.getElementById('emailErr');
    const passErr = document.getElementById('passErr');

    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    let isValid = true;

    nameErr.innerText = "";
    emailErr.innerText = "";
    passErr.innerText = "";

    if(!name){
        nameErr.innerText = "*please enter name";
        isValid = false;
    }

    if(!mailRegex.test(email)){
        emailErr.innerText = "*enter valid email";
        isValid = false;
    }

    if(!passwordRegex.test(password)){
        passErr.innerHTML = "*Password must have <br> Minimum 8 characters <br> At least one lowercase letter <br> At least one uppercase letter <br> At least one number <br> At least one special character ";
        isValid = false;
    }

    return isValid;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('userForm').addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        let isLoginSuccessfull = false;

        if (!email || !password) {
            alert("Please enter Email & Password");
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
                alert("Login Sucessfull");
                window.location.href = "home.html";
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log("Error", error)
        }




    });

});
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

        if (!email || !password) {
            alert("Please enter Email & Password");
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
                alert("Login Sucessfull");
                window.location.replace("home.html");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log("Error", error)
        }




    });

});
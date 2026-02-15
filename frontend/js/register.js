document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");
    if (token) {
        window.location.replace("home.html");
        return;
    }
    
    document.getElementById('registerForm').addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!name || !email || !password) {
            alert("Please fill the form");
            return;
        }

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


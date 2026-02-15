document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) {
        window.location.replace("login.html");
        return;
    }

    document.getElementById("welcomeUser").innerText = `Hello, ${username}`;

    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.replace("login.html");
    });

    document.getElementById('delete-acc').addEventListener("click", async () => {

        const confirmDelete = confirm("Are you sure you want to delete your account ?")

        if(!confirmDelete){
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/delete-account", {
                method: 'DELETE',
                headers:{
                    "authorization":token
                }
            });

            const data =  await response.json();

            if(response.ok){
                alert("Account deleted Succesfully");
                localStorage.removeItem("token");
                window.location.replace("register.html");
            }else{
                alert(data.message);
            }
        }catch(error){
            console.log("something went wrong");
        }
    });

});
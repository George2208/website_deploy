function darkMode() {
	document.body.classList.toggle("dark-mode");
	if(document.body.classList.contains("dark-mode"))
		localStorage.setItem("darkmode", "true");
	else
		localStorage.setItem("darkmode", "false");
}

window.onload = function(){
	if (typeof(Storage) !== "undefined" && localStorage.getItem("darkmode") == "true") {
		document.body.classList.add("dark-mode");
	}
}

document.getElementById("form").addEventListener("submit", async function(e){
    e.preventDefault()
    var checkbox = document.getElementsByName('chb')
    var checkboxVect = []
    for(var i = 0; i < checkbox.length; i++)
        if(checkbox[i].checked)
            checkboxVect.push(checkbox[i].value)
    const obj = {
        username: document.getElementById("user").value,
        password: document.getElementById("pass").value,
        mail: document.getElementById("mail").value,
        newpassword: document.getElementById("newpass").value,
        confirm: document.getElementById("cpass").value
    }
    const res = await fetch("/update", {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
    })
    ress = await res.json()
    alert(ress.res)
    if(res.status == 201){
        localStorage.setItem("password", ress.pass)
        window.location.href = "index.html";
    }
})

async function listeners(){
    const email = document.getElementById("mail")
    const password = document.getElementById("newpass")
    const cpassword = document.getElementById("cpass")

    async function check(){
        console.log("check")
        const re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!._-])[a-zA-Z0-9?!._-]+$/);
        if(cpassword.value) {
            if(re.test(cpassword.value)){
                if(cpassword.value==password.value)
                    cpassword.style.borderColor = "green";
                else cpassword.style.borderColor = "yellow";}
            else cpassword.style.borderColor = "red";}
        else cpassword.style.borderColor = "inherit";}

    email.addEventListener("input", function(){
        const re = new RegExp(/^[a-zA-z0-9_-]+(\.[a-zA-z0-9_-]+)*@([a-zA-Z0-9]+\.)+[a-zA-Z]+$/);
        if(email.value) {
            if(re.test(email.value))
                email.style.borderColor = "green";
            else email.style.borderColor = "red";}
        else email.style.borderColor = "inherit";})

    password.addEventListener("input", function(){
        check()
        const re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!._-])[a-zA-Z0-9?!._-]+$/);
        if(password.value) {
            if(re.test(password.value))
                password.style.borderColor = "green";
            else password.style.borderColor = "red";}
        else password.style.borderColor = "inherit";})

    cpassword.addEventListener("input", function(){check()})

}listeners()
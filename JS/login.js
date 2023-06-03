const API_URL = "http://localhost:3000";
const registerFormEl = document.querySelector("#register-form");
registerFormEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const formEl = e.target;
  const data = {
    username: formEl.username.value.trim(),
    phoneNumber: formEl.phoneNumber.value.trim(),
    password: formEl.password.value.trim(),
    image : formEl.image.value
  };
  registerUser(data);
});
async function registerUser(data) {
  console.log(data);
  const { username, phoneNumber, password } = data;
  if (username.length < 1) {
    alert("Enter username");
  } else if (password.length < 7) {
    alert("Password must be higer than 7");
  } else if (phoneNumber.length < 4) {
    alert("Phone number must be higher than 4");
  } else {
    const req = await fetch(`${API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await req.json();
    alert("Succesfully registerd")
  }
}
const loginFormEl = document.querySelector("#login-form");
loginFormEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const formEl = e.target;
  const data = {
    phoneNumber: formEl.phoneNumber.value.trim(),
    password: formEl.password.value.trim(),
  };
  loginUser(data);
});
async function loginUser(data) {
  const { phoneNumber, password } = data;
  if (password.length < 7) {
    alert("Password must be higer than 7");
  } else if (phoneNumber.length < 4) {
    alert("Phone number must be higher than 4");
  } else {
    const req = await fetch(`${API_URL}/users?phoneNumber=${phoneNumber}&password=${password}`,);
    const response = await req.json();
    const user=response[0]
    if(user){
        localStorage.setItem("userId",user.id)
        alert("You successfully loged in")
        window.location.href="/"
    }else{
        alert("Make sure your credentials are correct")
    }
  }
}
$(".message a").click(function () {
  $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});


const API_URL = "https://nev-app-messenger.herokuapp.com";
// const API_URL = "http://localhost:3000";
const registerFormEl = document.querySelector("#register-form");
registerFormEl.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formEl = e.target;
  const data = {
    username: formEl.username.value.trim(),
    phoneNumber: formEl.phoneNumber.value.trim(),
    password: formEl.password.value.trim(),
    image: null,
  };

  const fileInput = formEl.querySelector('input[type="file"]');
  if (fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    data.image = await readFileAsDataURL(file);
  }
  registerUser(data);
});
async function registerUser(data) {
  console.log(data);
  const { username, phoneNumber, password } = data;
  if (username.length < 1) {
    alert("İstifadəçi adı qısadı");
  } else if (password.length < 7) {
    alert("Şifrə 7 simvoldan ibarət olmalıdır");
  } else if (phoneNumber.length < 4) {
    alert("Telefon nömrəsi 4 dən azdı");
  } else {
    const req = await fetch(`${API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await req.json();
    alert("Uğurlu Qeydiyyat !")
  }
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
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
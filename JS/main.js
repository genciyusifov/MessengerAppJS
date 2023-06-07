

const API_URL = "https://limitless-dawn-20327.herokuapp.com/"
// function getRandomNumberBetween(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

const usernameEl = document.querySelector("#username");
async function getUser() {
  const userId = localStorage.getItem("userId");
  const req = await fetch(`${API_URL}/users?id=${userId}`);
  const response = await req.json();
  const user = response[0];

  console.log(user);
  return user;
}
async function main() {
  const user = await getUser();
  if (!user) {
    window.location.href = "/login.html";
  } else {
    window.user = user;
  }
  usernameEl.innerHTML = user.username;
}
main();
const chatEl = document.querySelector("#chat");
const contactEl = document.querySelector(".contactList");
const chatFormEl = document.querySelector("#chat-form");
class MessageCtrl {
  constructor({
    createdAt = new Date(),
    updatedAt = new Date(),
    text = "",
    userObj,
  }) {
    this.createdAt = new Date(createdAt.toString());
    this.updatedAt = new Date(updatedAt.toString());
    this.text = text;
    this.userObj = userObj;
    this.isSender = user.id === this.userObj.id;
    this.image = userObj.image; 
  }
  get PPURL() {
    let image = "";
      image = this.userObj.image;
    return  image;
  }
  
  // get PPURL() {
  //   const person = getRandomNumberBetween(1, 30);
  //   return `https://xsgames.co/randomusers/assets/avatars/male/${person}.jpg`;
  // }

  get diffClass() {
    let myClass = "";
    if (this.isSender) {
      myClass = "sent";
    } else {
      myClass = "received";
    }
    return myClass;
  }
  get formatDate() {
    return moment(this.createdAt).format("HH:mm");
  }
  get statusText() {
    let result = "";
    if (this.isSender) {
      result = "Sent";
    } else result = "Received";
    return result;
  }
  get name() {
    let result = "";
    if (this.isSender) {
      result = "You";
      // result.style.color = "white"
    } else result = this.userObj.username;
    return result;
  }
  get render() {
    return /*html*/ `
        <div class="message  ${this.diffClass} flex flex-row">
       
          <div class="avatar"><img style="min-width:60px"src="${this.PPURL}" alt="Avatar"></div>
          <div>
            <p class="author font-semibold" style="color:white;">${this.name}</p>
            <div class="content">
              <div class="text">${this.text}</div>
              <div class="metadata">
                <div class="time font-bold">${this.formatDate}</div>
                <p class="sender ">${this.statusText}</div>
              </div>
          </div>
         
        </div>
        </div>
        
        `;
  }
}

class UserCtrl {
  constructor({ username = "", phone = "", id = 0,image }) {
    this.username = username;
    this.phone = phone;
    this.id = id;
    this.image = image
  }
}
async function getMessages() {
  const req = await fetch(
    "http://localhost:3000/messages"
  );
  return await req.json();
}
async function getUserById(id) {
  const req = await fetch(`${API_URL}/users?id=${id}`);
  const response = await req.json();
  const user = response[0];
  console.log(user);
  return user;
}

async function renderMessages() {
  chatEl.innerHTML = ""
  let messages = await getMessages();

  let newMessages = [];
  for (let index = 0; index < messages.length; index++) {
    const message = messages[index];
    const user = await getUserById(message.userId);
    const newMessage = new MessageCtrl({ ...message, userObj: new UserCtrl(user), image: user.image });
    newMessages.push(newMessage);
  }

  newMessages.sort((b, a) => {
    // console.log("a", a)
    return a.createdAt.getTime() > b.createdAt.getTime()
  }).map((message) => {
    renderNewMessage(message)
  });
}
renderMessages();
function addMessage({ text }) {
  const req  = fetch(
    "http://localhost:3000/messages",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        userId: user.id,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      }),
    }
  );
}
function renderNewMessage(message) {
  message = new MessageCtrl(message)
  chatEl.innerHTML += message.render;
  contactEl.innerHTML += `<div class="contactInfo">
  <img src="${this.PPURL}">
  <div class="contactDetails">
    <h3>${message.userObj.username}</h3>
    <p>${message.text}</p>
  </div>
</div>`

}
chatFormEl.addEventListener("submit", async (e) => {
  const formEl = e.target;
  e.preventDefault();
  const req = addMessage({
    text: formEl.text.value.trim(),
  });
  const newMessage = await req.json()
  renderNewMessage(newMessage)
});
    




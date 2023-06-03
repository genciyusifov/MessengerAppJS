const API_URL ="http://localhost:3000";
function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const usernameEl = document.querySelector("#username");
async function getUser() {
  const userId = localStorage.getItem("userId");
  const req = await fetch(`${API_URL}/users?id=${userId}`);
  const response = await req.json();
  const user = response[0];
  return user;
}
async function main() {
  const user = await getUser();
  if (!user) {
    window.location.href = "/login";
  } else {
    window.user = user;
  }
  usernameEl.innerHTML = user.username;
}
main();
const chatEl = document.querySelector("#chat");
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

    this.isSender = user.id===this.userObj.id;
  }
  get PPURL() {
    let image = "";
    if (this.isSender) {
      image = this.userObj.image ;
    } else {
      image = "received" ;
    }
    return image ;
  }
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
    } else result = this.userObj.username;
    return result;
  }
  get render() {
    return /*html*/ `
        <div class="message  ${this.diffClass} flex flex-row">
       
          <div class="avatar"><img class="rounded-full object-cover" src="${this.PPURL}" alt="Avatar"></div>
          <div>
            <p class="author font-semibold">${this.name}</p>
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
  constructor({ username = "", phone = "", id = 0 }) {
    this.username = username;
    this.phone = phone;
    this.id = id;
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
  return user;
}

async function renderMessages() {
  chatEl.innerHTML=""
  let messages = await getMessages();
  
  let newMessages = [];
  for (let index = 0; index < messages.length; index++) {
    const message = messages[index];
    const user = await getUserById(message.userId);
    const newMessage=new MessageCtrl({ ...message, userObj: new UserCtrl(user) })
    newMessages.push(newMessage);
  }

  newMessages.sort((b,a)=>{
    console.log("a",a)
    return a.createdAt.getTime()>b.createdAt.getTime()
  }).map((message) => {
    renderNewMessage(message)
  });
}
renderMessages();
function addMessage({ text }) {
  const req = fetch(
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
function renderNewMessage(message){
  message=new MessageCtrl(message)
  chatEl.innerHTML += message.render;
}
chatFormEl.addEventListener("submit", async (e) => {
  const formEl = e.target;
  e.preventDefault();
  const req=await addMessage({
    text: formEl.text.value.trim(),
  });
  const newMessage=await req.json()
  renderNewMessage(newMessage)
});

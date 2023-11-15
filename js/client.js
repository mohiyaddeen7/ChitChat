const socket = io("http://localhost:8000");

const form = document.getElementById("sendBox");

const messageInput = document.getElementById("messageInp");
const messageSection = document.querySelector(".messageSection");

let sendMessage = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage = messageInput.value;
  appendFunc("You : " + sendMessage, "right");
  socket.emit("send-message", sendMessage);
  messageInput.value = "";
  messageSection.scrollTo(0,messageSection.scrollHeight)
});


const userName = prompt("Enter your Name to join");

const appendFunc = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  if (position === "right") {
    messageElement.classList.add("rightMesage");
  } else {
    messageElement.classList.add("leftMesage");
  }
  messageSection.append(messageElement);
};

socket.emit("new-user-joined", userName);

socket.on("user-joined", (data) => {
  appendFunc(data + " joined the chat", "right");
});

socket.on("receive", (data) => {
  appendFunc(data.userName + " : " + data.message, "left");
});


socket.on("leftEvent",message=>{
    appendFunc(message+" left the chat", "left")
})
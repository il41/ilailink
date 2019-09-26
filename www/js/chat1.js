const socket = io();
const chat = document.querySelector('#chat');
const userField = document.querySelector('#user');
const messageField = document.querySelector('#message');
const button = document.querySelector('#enterbutton');
let focus = document.createElement('div');
focus.id="focus";
button.addEventListener('click',()=>{
  let data= {};
  data.username=userField.value;
  data.message=messageField.value;
  socket.emit('client chat',data);
  messageField.value="";
  let focus = document.getElementById("focus");
  let chatWindow = document.getElementById("chat");
  chatWindow.scrollTop = chatWindow.scrollHeight;
  focus.focus();

})



//sending is socket.emit
//listening is socket.on

socket.on('load recent',(history)=>{
  history.forEach((item)=>{
    newChat(item);
  })
})

socket.on('server chat',(msg)=>{
  newChat(msg);
  console.log(msg);
});


function newChat(msg){
  let chatUser= document.createElement('span');
  chatUser.className='chat-user';
  let chatMsg= document.createElement('span');
  chatMsg.className='chat-message';
  let chatDiv = document.createElement('div');
  chatDiv.className='chat-frame';
  chatUser.textContent=msg.username;
  chatMsg.textContent+=": "+msg.message;
  chatUser.style.color=nameToColor(msg.username);
  // chatUser.style.backgroundColor=nameToColor2(msg.username);
  // chatUser.style.color="rgba(20,140,255)";
  chatDiv.appendChild(chatUser);
  chatDiv.appendChild(chatMsg);
  chat.appendChild(chatDiv);
  chat.appendChild(focus);
}


function nameToColor(name){
  let r = Math.abs(name.charCodeAt(0)-94);
  let g = Math.abs(name.charCodeAt(1)-94);
  let b = Math.abs(name.charCodeAt(name.length-1)-94);
  return "rgb("+r*10+","+g*10+","+b*10+")";
}

// function nameToColor2(name){
//   let r = Math.abs(name.charCodeAt(0)-94);
//   let g = Math.abs(name.charCodeAt(1)-94);
//   let b = Math.abs(name.charCodeAt(name.length-1)-94);
//   return "rgb("+r*g*b*r+","+g*g*b*r+","+b*g*b*r+")";
// }

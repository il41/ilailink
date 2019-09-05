const socket = io();
const chat = document.querySelector('#chat');
const userField = document.querySelector('#user');
const messageField = document.querySelector('#message');
const button = document.querySelector('#enterbutton');

button.addEventListener('click',()=>{
  let data= {};
  data.username=userField.value;
  data.message=messageField.value;
  socket.emit('client chat',data);
  messageField.value="";
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
  chatDiv.appendChild(chatUser);
  chatDiv.appendChild(chatMsg);
  chat.appendChild(chatDiv);
}

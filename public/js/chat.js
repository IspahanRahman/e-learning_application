var socket=io()
var messages = document.getElementById("messages");

// (function(){
//     $("form").submit(function(e){
//         let li=document.createElement("li")
//         //prevent page loading
//         e.preventDefault();

//         socket.emit("chat message",$("#message").val())

//         messages.appendChild(li).append($("#message").val())
//         let span=document.createElement("span")
//         messages.appendChild(span).append("by " + "Anonymous " + ":" + " just now")
//         messages.scrollTop=messages.scrollHeight
//         $("#message").val("")

//         return false
//     })

//     socket.on("received",date=>{
//         let li=document.createElement("li")
//         let span=document.createElement("span")
//         var messages=document.getElementById('messages')
//         messages.appendChild(li).append(data.message)
//         messages.appendChild(li).append("by" + "Anonymous"  + ":" + "just now")
//         messages.scrollTop=messages.scrollHeight
//         console.log("hello bingo!")
//     })
// })

// //fetching inital chat messages from the database
// (function(){
//     fetch("/message")
//     .then(data=>{
//         return data.json();
//     })
//     .then(json=>{
//         json.map(data=>{
//             let li=document.createElement("li")
//             let span=domcument.createElement("span")

//             messages.appendChild(li).apend(data.message);
//             messages
//             .appendChild(span)
//             .apend("by" + data.sender + ": " + formatTimeAgo(data.createdAt))
//             messages.scrollTop=messages.scrollHeight

//         })
//     })
// })

//is typing 

let messageInput=document.getElementById("message")
let typing=document.getElementById("typing")

//isTypnig event

messageInput.addEventListener("keypress",()=>{
    socket.emit("typing",{user:"Someone",message:"is typing....."})
})

socket.on("notifying",data=>{
    typing.innerText=data.user+" "+data.message
    console.log(data.user + data.message)
})

//stop typing
messageInput.addEventListener("keyup",()=>{
    socket.emit("stopTyping","")
})

socket.on("notifyStopTyping",()=>{
    typing.innerText=""
})


function addMessages(message){
  let li=document.createElement("li")
  //prevent page loading
  e.preventDefault();

  socket.emit("chat message",$("#message").val())

  messages.appendChild(li).append($("#message").val())
  let span=document.createElement("span")
  messages.appendChild(span).append("by " + "Anonymous " + ":" + " just now")
  messages.scrollTop=messages.scrollHeight
  $("#message").val("")
}

function getMessages(){
  $.get('http://localhost:8080/chat/messages', (data) => {
	data.forEach(addMessages);
  })
}

function sendMessage(message){
  $.post('http://localhost:8080/chat/message', message)
  $("#name").val("");
  $("#message").val("");
}

socket.on('message',addMessages)
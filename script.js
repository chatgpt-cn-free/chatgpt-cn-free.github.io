import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyCVVmXYADavtT2VUHlXYE4f2eA6SsC1Llg",
authDomain: "chatgpt-cn-free.firebaseapp.com",
projectId: "chatgpt-cn-free",
storageBucket: "chatgpt-cn-free.firebasestorage.app",
messagingSenderId: "1064840278974",
appId: "1:1064840278974:web:f992349f55fb6db030bfef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const chat=document.getElementById("chat");

function add(text,cls){
let d=document.createElement("div");
d.className="msg "+cls;
d.innerText=text;
chat.appendChild(d);
chat.scrollTop=chat.scrollHeight;
}

window.send=async function(){
let t=document.getElementById("msg").value;
document.getElementById("msg").value="";
add(t,"user");

await addDoc(collection(db,"messages"),{
text:t,
sender:"user",
time:Date.now()
});

add("AI is thinking...","ai");
}

const q=query(collection(db,"replies"),orderBy("time"));

onSnapshot(q,(snap)=>{
snap.docChanges().forEach(c=>{
if(c.type==="added"){
add(c.doc.data().text,"ai");
}
})
})

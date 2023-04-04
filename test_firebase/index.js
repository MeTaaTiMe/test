const database = firebase.database();
document.getElementById("btn").addEventListener("click",firebase_send);
function firebase_send(){
    let text=document.getElementById("txt").value
    database.ref(document.getElementById("name").value).set({txt:text});
    console.log("send");
}
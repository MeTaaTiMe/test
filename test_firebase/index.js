const database = firebase.database();
document.getElementById("btn").addEventListener("click",firebase_send());
function firebase_send(){
    database.ref(document.getElementById("name").value).set({txt:document.getElementById("txt").value});
    console.log("send");
}
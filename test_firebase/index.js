const database = firebase.database();

document.getElementById("btn").addEventListener("click",firebase_send);
function firebase_send(){
    let text=document.getElementById("txt").value
    database.ref(document.getElementById("name").value).set(text);
    console.log("send");
}

document.getElementById("readbtn").addEventListener("click",firebase_read);
function firebase_read(){
    let text=database.ref(document.getElementById("key").value).on('value', (snapshot) => {
        const data = snapshot.val();
        updateStarCount(postElement, data);
    }).val;
    document.getElementById("readtext").innerText=text;
}
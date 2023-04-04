document.getElementById("makeKey").addEventListener("click",setKey);
let k1,k2,c1,c2;
async function setKey(){
    k1=await makeKey();
    k2=await makeKey();
    let k1_private=await getPrivateKey(k1);
    let k1_public=await getPublicKey(k1);
    let k2_private=await getPrivateKey(k2);
    let k2_public=await getPublicKey(k2);
    let keyText="";
    keyText+="Aの秘密鍵(PKCS#8):";
    for(i=0;i<k1_private.length;i++){
        if(i%20==0)keyText+="<br>";
        keyText+=k1_private[i].toString(16).padStart(2, '0');
        if(i!=k1_private.length-1)keyText+=":";
    }
    keyText+="<br>Aの公開鍵:";
    for(i=0;i<k1_public.length;i++){
        if(i%20==0)keyText+="<br>";
        keyText+=k1_public[i].toString(16).padStart(2, '0');
        if(i!=k1_public.length-1)keyText+=":";
    }
    keyText+="<br>Bの秘密鍵(PKCS#8):";
    for(i=0;i<k2_private.length;i++){
        if(i%20==0)keyText+="<br>";
        keyText+=k2_private[i].toString(16).padStart(2, '0');
        if(i!=k2_private.length-1)keyText+=":";
    }
    keyText+="<br>Bの公開鍵:";
    for(i=0;i<k2_public.length;i++){
        if(i%20==0)keyText+="<br>";
        keyText+=k2_public[i].toString(16).padStart(2, '0');
        if(i!=k2_public.length-1)keyText+=":";
    }
    c1=await makeCommonKey(k1_private,k2_public);
    c2=await makeCommonKey(k2_private,k1_public);
    let c1_data=await getCommonKeyData(c1);
    let c2_data=await getCommonKeyData(c2);
    keyText+="<br>Aの秘密鍵とBの公開鍵から作ったAの持つ共通鍵:";
    for(i=0;i<c1_data.length;i++){
        if(i%20==0)keyText+="<br>";
        keyText+=c1_data[i].toString(16).padStart(2, '0');
        if(i!=c1_data.length-1)keyText+=":";
    }
    keyText+="<br>Bの秘密鍵とAの公開鍵から作ったBの持つ共通鍵:";
    for(i=0;i<c2_data.length;i++){
        if(i%20==0)keyText+="<br>";
        keyText+=c2_data[i].toString(16).padStart(2, '0');
        if(i!=c2_data.length-1)keyText+=":";
    }
    document.getElementById("key").innerHTML=keyText;
}

document.getElementById("send").addEventListener("click",sendMessage);
async function sendMessage(){
    let message=document.getElementById("message").value
    let showMessage="";
    showMessage+="Aの共通鍵で送られた文字列:<br>";
    let encodedMessage=await encode(c1,message);
    showMessage+=new TextDecoder().decode(encodedMessage);
    showMessage+="<br>Bの共通鍵で復号された文字列:<br>";
    showMessage+=await decode(c2,encodedMessage);
    document.getElementById("messageText").innerHTML=showMessage;
}
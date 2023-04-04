async function makeKey(){
    return await crypto.subtle.generateKey({name:"ECDH",namedCurve:"P-256"},true,["deriveKey","deriveBits"]);
}

async function getPublicKey(key){
    return new Uint8Array(await crypto.subtle.exportKey("raw",key.publicKey));
}

async function getPrivateKey(key){
    return new Uint8Array(await crypto.subtle.exportKey("pkcs8",key.privateKey));
}

async function makeCommonKey(myPrivateKey,otherPublicKey){
    let privateKey=await crypto.subtle.importKey("pkcs8",myPrivateKey.buffer,{name: "ECDH",namedCurve:"P-256"},true,["deriveKey","deriveBits"]);
    let publicKey=await crypto.subtle.importKey("raw",otherPublicKey.buffer,{name: "ECDH",namedCurve:"P-256"},true,[]);
    return await crypto.subtle.deriveKey({name:"ECDH",public:publicKey}, privateKey, {name:"AES-GCM",length:256}, true, ["encrypt", "decrypt"]);
}

async function getCommonKeyData(key){
    return new Uint8Array(await crypto.subtle.exportKey("raw",key))
}

async function dataToCommonKey(data){
    return await crypto.subtle.importKey("raw",data.buffer,{name:"AES-GCM",length:256}, true, ["encrypt", "decrypt"]);
}

async function encode(key, message){
    let data=new TextEncoder().encode(message);
    let aes = {
        name: "AES-GCM",
        iv: crypto.getRandomValues(new Uint8Array(16)),
        tagLength: 128
    };
    let result = await crypto.subtle.encrypt(aes, key, data);
    let buffer = new Uint8Array(aes.iv.byteLength + result.byteLength);
    buffer.set(aes.iv, 0);
    buffer.set(new Uint8Array(result), aes.iv.byteLength);
    return buffer;
}

async function decode(key, message){
    let aes = {
        name: "AES-GCM",
        iv: message.subarray(0, 16),
        tagLength: 128
    };
    let data =new Uint8Array(await crypto.subtle.decrypt(aes, key, message.subarray(16)));
    return new TextDecoder().decode(data)
}
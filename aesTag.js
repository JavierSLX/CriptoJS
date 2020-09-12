const crypto = require("crypto");

let iv = "marquesada466"; //Largo debe de ser entre 7 y 13 caracteres
let key = crypto.randomBytes(32);

function encrypt(text)
{   
    let cipher = crypto.createCipheriv("aes-256-ccm", key, iv, {authTagLength: 16});
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return {text: encrypted, tag: cipher.getAuthTag().toString("base64")};
}

function decrypt(text, tag)
{
    let decipher = crypto.createDecipheriv("aes-256-ccm", key, iv, {authTagLength: 16});
    decipher.setAuthTag(tag);
    let decText = decipher.update(text, "hex", "utf8");
    decText += decipher.final("utf8");

    return decText;
}

let response = encrypt("Hola mundo");
console.log(response.tag);
console.log(response.text);
console.log(decrypt(response.text, Buffer.from(response.tag, "base64")));
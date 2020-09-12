const crypto = require("crypto");

let password = "marquesada?466";
let plainText = "Hola mundo!";
let iv = "aw90rela942f65u2"; //Una cadena que debe de tener 16 caracteres

function sha1(input)
{
    return crypto.createHash("sha1").update(input).digest();
}

function passwordDeriveBytes(password, salt, iterations, len)
{
    let key = Buffer.from(password + salt);
    for(i = 0; i < iterations; i++)
        key = sha1(key);

    if(key.length < len)
    {
        let hx = passwordDeriveBytes(password, salt, iterations - 1, 20);
        for (let counter = 1; key.length < len; ++counter)
            key = Buffer.concat([key, sha1(Buffer.concat([Buffer.from(counter.toString()), hx]))]);
    }

    return Buffer.alloc(len, key);
}

function encrypt(text)
{
    let key = passwordDeriveBytes(password, "", 100, 32);
    console.log(key.toString("hex"));

    let cipher = crypto.createCipheriv("aes-256-cbc", key, Buffer.from(iv));

    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");

    return encrypted;
}

function decrypt(text)
{
    let key = passwordDeriveBytes(password, "", 100, 32);

    let decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(iv));

    let decrypted = decipher.update(text, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

let textEnc = encrypt(plainText);
console.log(textEnc);
console.log(decrypt(textEnc));
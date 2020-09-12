const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const encrypt = (text, pkPath) => {
    return new Promise((resolve, reject) => {
        const absPkPath = path.resolve(pkPath);
        fs.readFile(absPkPath, 'utf8', (error, pk) => {
            if(error)
                return reject(error);

            const buffer = Buffer.from(text, 'utf8');
            const encrypted = crypto.publicEncrypt(pk, buffer);
            resolve(encrypted.toString('base64'));
        });
    });
}

encrypt("Hola Mundo, esto es un texto encriptado.", "public.pem").then(str => console.log(str)).catch(error => console.log(error));
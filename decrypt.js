const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const decrypt = (text, privateKeyPath, passphrase) => {
    return new Promise((resolve, reject) => {
        const absPkPath = path.resolve(privateKeyPath);
        fs.readFile(absPkPath, 'utf8', (error, pk) => {
            if(error)
                return reject(error);

            const buffer = Buffer.from(text, 'base64');

            try
            {
                const decrypt = crypto.privateDecrypt({
                    key: pk.toString(),
                    passphrase
                }, buffer);

                resolve(decrypt.toString("utf8"));
            }catch(error)
            {
                reject(error.reason);
            }
        });
    });
}

decrypt("kgO363fCPtGrUp+ZeMABJr0wITwkkDKnSsVuQ0myUp8/GHqflDsBAe6cEaW/bC+4DrX6pqBNs9NBEZef6u3F7k70zACZ06TPDAy5DXNFn2qKqs8jx+DkqaDKLBhhEHU5LclsP7jBYanz+9HJ9eACzAMKERpJUXkmhnkQ3BqEUlm2rFqNW9vJqnrs0TmAUFqCouO3K+Ex0CBTeebZ+FbTSwV/98jvRfoqQIKWyFB22Fx31xiwcnTSQVdPzeob6mSEcfPjF07s5CeQA2QXIE/K5a1xFhXS6mUh3pea4j8tVzqI4UGKGbDttZGbj4gR8Uh0Um0d6e5viTdUojBZLPytPmu22eN8jkSQWsReKsBg6YkMruaDQUEq1Iv7CghPHW/pOpPMkMwL2NV4VFyWTxSmkjI9Ez4i68ucqEsFKz2c0u5/bnbGlgOKeq+88JIHC2KtUL45we7w0wi43V0g9lRhe3u866LOCdGjjz6AWL3qSvfbDTvG8QrvaLqyw3PpN2T+QIEHnqbgjXuZcDSphH+2Xvi/7ATaffC3Iw3NJ0xJZHYJ67j4wnzRz6eQiGbRNx28YGVKd5UlKZpIZfeyYLBnGW8Z0XEk7tenYlTj26u05peNKNVQ0EOu9dYCT8c7PBJhqwcbMbkxY+7rOlCD2qUzeAxzVILRmIlRH5cCr9RYeUY=",
"private.pem", "12345").then(str => console.log(str)).catch(error => console.log(error));
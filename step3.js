const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    });
}

async function webCat(url, out) {
    try {
        const response = await axios.get(url);
        handleOutput(response.data, out);
    } catch (err) {
        console.error(`Error fetching ${url}:\n  ${err}`);
        process.exit(1);
    }
}

function handleOutput(data, out) {
    if (out) {
        fs.writeFile(out, data, 'utf8', (err) => {
            if (err) {
                console.error(`Couldn't write ${out}:\n  ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

// Check if the --out argument is provided
let out;
let pathOrUrl;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    pathOrUrl = process.argv[4];
} else {
    pathOrUrl = process.argv[2];
}

// Determine if the argument is a file path or URL
if (pathOrUrl.startsWith('http')) {
    webCat(pathOrUrl, out);
} else {
    cat(pathOrUrl, out);
}

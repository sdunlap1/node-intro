const fs = require('fs');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n  ${err}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

// Get the file path from the command-line arguments
const filePath = process.argv[2];

// Call the cat function with the provided file path
cat(filePath);

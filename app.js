// Require the fs module
const fs = require('fs');
const readline = require('readline');

// Get the command line arguments and extract the filename from the arguments
const args = process.argv.slice(2);
const filename = args[0];

// Create a readable stream to read the file line by line
const readStream = fs.createReadStream(filename, 'utf-8');
const rl = readline.createInterface({
  input: readStream,
  output: process.stdout,
  terminal: false
});

const groups = {}; // Create an empty object to hold the anagram groups

// Listen for 'line' event to process each line in the file
rl.on('line', (line) => {
  // Sort the letters of the word and join them back together e.g (car -> acr)
  const sorted = line.split('').sort().join('').replace('\r', '');

  // If the sorted letters haven't been seen before, create a new empty array for them
  if (!groups[sorted]) {
    groups[sorted] = [];
  }
  // Add the word to the array of anagrams for the current sorted letters
  groups[sorted].push(line);
});

// Listen for 'close' event to handle end of file
rl.on('close', () => {
  const writeStream = fs.createWriteStream('output.txt'); // Create a writable stream to write the output to a file
  const output = []; // Create an array to hold the output strings

  // Loop through each set of sorted letters in the object
  for (let sorted of Object.keys(groups)) {
    const group = groups[sorted]; // Get the array of anagrams for the current set of sorted letters
    writeStream.write(group.join(' ') + '\n'); // Write the joined anagrams to the writable stream
    output.push(group.join(' ')); // Push the joined anagrams to the output array
  }

  writeStream.end(); // Close the writable stream after writing is complete
  console.log('Anagram groups written to output.txt'); // Print a message to indicate completion
  console.log(output.join('\n')); // Print the output to the console
});

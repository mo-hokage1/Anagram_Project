// Require the fs module
const fs = require('fs');

// Get the command line arguments and extract the filename from the arguments
const args = process.argv.slice(2);
const filename = args[0];

// Read the file and if there's an error, log the error message
fs.readFile(filename, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the file contents into an array of words
  const words = data.trim().split('\n');
  const groups = {};  // Create an empty object to hold the anagram groups

  for (let word of words) {
    // Sort the letters of the word and join them back together e.g (car -> acr)
    const sorted = word.split('').sort().join('').replace('\r', '');

    // If the sorted letters haven't been seen before, create a new empty array for them
    if (!groups[sorted]) {
      groups[sorted] = [];
    }
    // Add the word to the array of anagrams for the current sorted letters
    groups[sorted].push(word);
  }

  const result = [];

  // Loop through each set of sorted letters in the object
  for (let sorted of Object.keys(groups)) {
    const group = groups[sorted]; // Get the array of anagrams for the current set of sorted letters
    result.push(group.join(' ')); // Join the anagrams into a single string, separated by spaces
  }

   // Create a new array that removes any carriage return characters and commas from the result
  const output = result.map(str => str.replace(/\r/g, '').replace(/,/g, '') + '\n');;
  console.log(output.join('')); // Print the output to the console as strings
});

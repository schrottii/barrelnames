var output = document.getElementById("output");

let content = readFileSync("file", 'utf-8').split('\n')
console.log(content);

output.innerHTML = content;
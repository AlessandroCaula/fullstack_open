const http = require("http");

const app = http.createServer((server, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("PhoneBook Backend");
});

const PORT = 3001;
app.listen(PORT);
console.log(`server running at port ${PORT}`);

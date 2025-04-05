# Table of Contents

- [Part 3](#part-3)
  - [3a - Node.js and Express](#3a---nodejs-and-express)
    - [Simple Web Server](#simple-web-server)
    - [Express](#express)
    - [Web and Express](#web-and-express)
    - [REST](#rest)
    - [Fetching a Single Resource](#fetching-a-single-resource)
    - [Deleting Resources](#deleting-resources)
    - [Postman](#postman)
    - [The Visual Studio Code REST Client](#the-visual-studio-code-rest-client)
    - [Receiving Data](#receiving-data)
    - [About HTTP Request Types](#about-http-request-types)
    - [Middleware](#middleware)
  - [3b - Deploying App to Internet](#3b---deploying-app-to-internet)
    - [Same Origin Policy and CORS](#same-origin-policy-and-cors)
    - [Application to the Internet](#application-to-the-internet)
    - [Frontend Product Build](#frontend-product-build)
    - [Serving Static Files from the Backend](#serving-static-files-from-the-backend)
    - [The Whole App to the Internet](#the-whole-app-to-the-internet)
    - [Streamlining Deploying of the Frontend](#streamlining-deploying-of-the-frontend)
    - [Proxy](#proxy)
  - [3c - Saving Data to MongoDB](#3c---saving-data-to-mongodb)
    - [Debugging Node Applications](#debugging-node-applications)
      - [Visual Studio Code](#visual-studio-code)
      - [Chrome Dev Tools](#chrome-dev-tools)
      - [Question Everything](#question-everything)
    - [MongoDB](#mongodb)
    - [Schema](#schema)
    - [Creating and Saving Objects](#creating-and-saving-objects)
    - [Fetching Objects from the Database](#fetching-objects-from-the-database)
    - [Connecting the Backend to a Database](#connecting-the-backend-to-a-database)
    - [Defining Environment Variables Using the Dotenv Library](#defining-environment-variables-using-the-dotenv-library)
    - [Using Database in Route Handlers](#using-database-in-route-handlers)
    - [Verifying Frontend and Backend Integration](#verifying-frontend-and-backend-integration)
  - [3d - Validation and ESLint](#3d---validation-and-eslint)
    - [Error Handling](#error-handling)
    - [Moving Error Handling into Middleware](#moving-error-handling-into-middleware)
    - [The Order of Middleware Loading](#the-order-of-middleware-loading)
    - [Other Operations](#other-operations)
    - [Deploying the Database Backend to Production](#deploying-the-database-backend-to-production)
    - [Lint](#lint)
    - [Formatting the Configuration File](#formatting-the-configuration-file)
    - [Running the Linter](#running-the-linter)
    - [Adding More Style Rules](#adding-more-style-rules)

# Part 3 

## 3a - Node.js and Express

In this part, our focus shifts towards the backend: that is, towards implementing functionality on the server side of the stack.

We will be building our backend on top of [NodeJS](https://nodejs.org/en/), which is a JavaScript runtime based on Google's Chrome V8 JavaScript engine.

This course material was written with version _v22.3.0_ of Node.js. Please make sure that your version of Node is at least as new as the version used in the material (you can check the version by running `node -v` in the command line).

As mentioned in part 1, browsers don't yet support the newest features of JavaScript, and that is why the code running in the browser must be _transpiled_ with e.g. babel. The situation with JavaScript running in the backend is different. The newest version of Node supports a large majority of the latest features of JavaScript, so we can use the latest features without having to transpile our code.

Our goal is to implement a backend that will work with the notes application from part 2. However, let's start with the basics by implementing a classic "hello world" application.

**Notice** that the applications and exercises in this part are not all React applications, and we will not use the create `vite@latest -- --template react` utility for initializing the project for this application.

We had already mentioned npm back in part 2, which is a tool used for managing JavaScript packages. In fact, npm originates from the Node ecosystem.

Let's navigate to an appropriate directory, and create a new template for our application with the `npm init` command. We will answer the questions presented by the utility, and the result will be an automatically generated _package.json_ file at the root of the project that contains information about the project.

```json
{
  "name": "backend",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Matti Luukkainen",
  "license": "MIT"
}
```

The file defines, for instance, that the entry point of the application is the _index.js_ file.

Let's make a small change to the _scripts_ object by adding a new script command.

```json
{
  // ...
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  // ...
}
```

Next, let's create the first version of our application by adding an _index.js_ file to the root of the project with the following code:

```js
console.log("hello world");
```

We can run the program directly with Node from the command line:

```bash
node index.js
```

Or we can run it as an <u>npm script</u>

```bash
npm start
```

The start npm script works because we defined it in the package.json file:

```json
{
  // ...
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  // ...
}
```

Even though the execution of the project works when it is started by calling `node index.js` from the command line, it's customary for npm projects to execute such tasks as npm scripts.

By default, the _package.json_ file also defines another commonly used npm script called _npm test_. Since our project does not yet have a testing library, the `npm test` command simply executes the following command:

```json
echo "Error: no test specified" && exit 1
```

### Simple web server

Let's change the application into a web server by editing the `index.js` file as follows:

```js
const http = require("http");

const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
```

Once the application is running, the following message is printed in the console:

```bash
Server running on port 3001
```

We can open our humble application in the browser by visiting the address http://localhost:3001:

![alt text](assets/image.png)

The server works the same way regardless of the latter part of the URL. Also the address http://localhost:3001/foo/bar will display the same content.

**NB** If port 3001 is already in use by some other application, then starting the server will result in the following error message:

```bash
➜  hello npm start

> hello@1.0.0 start /Users/mluukkai/opetus/_2019fullstack-code/part3/hello
> node index.js

Server running on port 3001
events.js:167
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE :::3001
    at Server.setupListenHandle [as _listen2] (net.js:1330:14)
    at listenInCluster (net.js:1378:12)
```

You have two options. Either shut down the application using port 3001 (the JSON Server in the last part of the material was using port 3001), or use a different port for this application.

Let's take a closer look at the first line of the code:

```js
const http = require("http");
```

In the first row, the application imports Node's built-in web server module. This is practically what we have already been doing in our browser-side code, but with a slightly different syntax:

```js
import http from "http";
```

These days, code that runs in the browser uses ES6 modules. Modules are defined with an export and included in the current file with an import.

Node.js uses [CommonJS](https://en.wikipedia.org/wiki/CommonJS) modules. The reason for this is that the Node ecosystem needed modules long before JavaScript supported them in the language specification. Currently, Node also supports the use of ES6 modules, but since the support is not quite perfect yet, we'll stick to CommonJS modules.

CommonJS modules function almost exactly like ES6 modules, at least as far as our needs in this course are concerned.

The next chunk in our code looks like this:

```js
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
});
```

The code uses the `createServer` method of the http module to create a new web server. An _event handler_ is registered to the server that is called _every time_ an HTTP request is made to the server's address http://localhost:3001/.

The request is responded to with the status code 200, with the _Content-Type_ header set to _text/plain_, and the content of the site to be returned set to _Hello World_.

The last rows bind the http server assigned to the `app` variable, to listen to HTTP requests sent to port 3001:

```js
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
```

The primary purpose of the backend server in this course is to offer raw data in JSON format to the frontend. For this reason, let's immediately change our server to return a hardcoded list of notes in the JSON format:

```js
const http = require("http");

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
```

Let's restart the server (you can shut the server down by pressing `Ctrl+C` in the console) and let's refresh the browser.

The _application/json_ value in the _Content-Type_ header informs the receiver that the data is in the JSON format. The `notes` array gets transformed into JSON formatted string with the `JSON.stringify(notes)` method. This is necessary because the response.end() method expects a string or a buffer to send as the response body.

When we open the browser, the displayed format is exactly the same as in part 2 where we used [json-server](https://github.com/typicode/json-server) to serve the list of notes:

![alt text](assets/image1.png)

### Express

Implementing our server code directly with Node's built-in http web server is possible. However, it is cumbersome, especially once the application grows in size.

Many libraries have been developed to ease server-side development with Node, by offering a more pleasing interface to work with the built-in http module. These libraries aim to provide a better abstraction for general use cases we usually require to build a backend server. By far the most popular library intended for this purpose is [Express](https://expressjs.com/).

Let's take Express into use by defining it as a project dependency with the command:

```bash
npm install express
```

The dependency is also added to our package.json file:

```js
{
  // ...
  "dependencies": {
    "express": "^4.21.2"
  }
}
```

The source code for the dependency is installed in the _node_modules_ directory located at the root of the project. In addition to Express, you can find a great number of other dependencies in the directory:

![alt text](assets/image2.png)

These are the dependencies of the Express library and the dependencies of all of its dependencies, and so forth. These are called the transitive dependencies of our project.

Version 4.21.2 of Express was installed in our project. What does the caret in front of the version number in package.json mean?

```json
"express": "^4.21.2"
```

The versioning model used in npm is called [semantic versioning](https://docs.npmjs.com/about-semantic-versioning).

The caret in the front of _^4.21.2_ means that if and when the dependencies of a project are updated, the version of Express that is installed will be at least _4.21.2_. However, the installed version of Express can also have a larger _patch_ number (the last number), or a larger _minor_ number (the middle number). The major version of the library indicated by the first _major_ number must be the same.

We can update the dependencies of the project with the command:

```bash
npm update
```

Likewise, if we start working on the project on another computer, we can install all up-to-date dependencies of the project defined in _package.json_ by running this next command in the project's root directory:

```bash
npm install
```

If the _major_ number of a dependency does not change, then the newer versions should be backwards compatible. This means that if our application happened to use version 4.99.175 of Express in the future, then all the code implemented in this part would still have to work without making changes to the code. In contrast, the future 5.0.0 version of Express may contain changes that would cause our application to no longer work.

### Web and Express

Let's gat back to our application and make the following changes:

```js
const express = require('express')
const app = express()

let notes = [
  ...
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

To get the new version of our application into use, first we have to restart it.

The application did not change a whole lot. Right at the beginning of our code, we're importing `express`, which this time is a _function_ that is used to create an Express application stored in the `app` variable:

```js
const express = require("express");
const app = express();
```

Next, we define two _routes_ to the application. The first one defines an event handler that is used to handle HTTP GET requests made to the application's/root:

```js
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
```

The event handler function accepts two parameters. The first [request](https://expressjs.com/en/4x/api.html#req) parameter contains all of the information of the HTTP request, and the second [response](https://expressjs.com/en/4x/api.html#res) parameter is used to define how the request is responded to.

In our code, the request is answered by using the send method of the `response` object. Calling the method makes the server respond to the HTTP request by sending a response containing the string `<h1>Hello World!</h1>` that was passed to the `send` method. Since the parameter is a string, Express automatically sets the value of the _Content-Type_ header to be _text/html_. The status code of the response defaults to 200.

We can verify this from the Network tab in developer tools.

The second route defines an event handler that handles HTTP GET requests made to the _notes_ path of the application:

```js
app.get("/api/notes", (request, response) => {
  response.json(notes);
});
```

The request is responded to with the json method of the `response` object. Calling the method will send the **notes** array that was passed to it as a JSON formatted string. Express automatically sets the _Content-Type_ header with the appropriate value of _application/json_.

![alt text](assets/image3.png)

Next, let's take a quick look at the data sent in JSON format.

In the earlier version where we were only using Node, we had to transform the data into the JSON formatted string with the `JSON.stringify` method:

```js
response.end(JSON.stringify(notes));
```

With Express, this is no longer required, because this transformation happens automatically.

It's worth noting that JSON is a string and not a JavaScript object like the value assigned to `notes`.

The experiment shown below illustrates this point:

![alt text](assets/image4.png)

The experiment above was done in the interactive node-repl. You can start the interactive node-repl by typing in `node` in the command line. The repl is particularly useful for testing how commands work while you're writing application code. I highly recommend this!

### Automatic Change Tracking

If we change the application's code, we first need to stop the application from the console (`ctrl + c`) and then restart it for the changes to take effect. Restarting feels cumbersome compared to React's smooth workflow, where the browser automatically updates when the code changes.

You can make the server track our changes by starting it with the `--watch` option:

```bash
node --watch index.js
```

Now, changes to the application's code will cause the server to restart automatically. Note that although the server restarts automatically, you still need to refresh the browser. Unlike with React, we do not have, nor could we have, a hot reload functionality that updates the browser in this scenario (where we return JSON data).

Let's define a custom npm script in the package.json file to start the development server:

```json
{
  // ..
  "scripts": {
    "start": "node index.js",

    "dev": "node --watch index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  // ..
}
```

We can now start the server in development mode with the command

```bash
npm run dev
```

Unlike when running the start or test scripts, the command must include _run_.

### REST

Let's expand our application so that it provides the same RESTful HTTP API as [json-server](https://github.com/typicode/json-server#routes).

Representational State Transfer, aka REST, was introduced in 2000 in Roy Fielding's [dissertation](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm). REST is an architectural style meant for building scalable web applications.

We are not going to dig into Fielding's definition of REST or spend time pondering about what is and isn't RESTful. Instead, we take a more narrow view by only concerning ourselves with how RESTful APIs are typically understood in web applications. The original definition of REST is not even limited to web applications.

We mentioned in the previous part that singular things, like notes in the case of our application, are called resources in RESTful thinking. Every resource has an associated URL which is the resource's unique address.

One convention for creating unique addresses is to combine the name of the resource type with the resource's unique identifier.

Let's assume that the root URL of our service is _www.example.com/api._

If we define the resource type of note to be notes, then the address of a note resource with the identifier 10, has the unique address _www.example.com/api/notes/10_.

The URL for the entire collection of all note resources is _www.example.com/api/notes_.

We can execute different operations on resources. The operation to be executed is defined by the HTTP _verb_:

![alt text](assets/image5.png)

This is how we manage to roughly define what REST refers to as a uniform interface, which means a consistent way of defining interfaces that makes it possible for systems to cooperate.

This way of interpreting REST falls under the second level of RESTful maturity in the Richardson Maturity Model. According to the definition provided by Roy Fielding, we have not defined a REST API. In fact, a large majority of the world's purported "REST" APIs do not meet Fielding's original criteria outlined in his dissertation.

In some places (see e.g. Richardson, Ruby: RESTful Web Services) you will see our model for a straightforward CRUD API, being referred to as an example of resource-oriented architecture instead of REST. We will avoid getting stuck arguing semantics and instead return to working on our application.

### Fetching a single resource

Let's expand our application so that it offers a REST interface for operating on individual notes. First, let's create a [route](https://expressjs.com/en/guide/routing.html) for fetching a single resource.

The unique address we will use for an individual note is of the form _notes/10_, where the number at the end refers to the note's unique id number.

We can define [parameters](https://expressjs.com/en/guide/routing.html#route-parameters) for routes in Express by using the colon syntax:

```js
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);
  response.json(note);
});
```

New `app.get('/api/notes/:id', ...)` will handle will handle all HTTP GET requests that are of the form _/api/notes/SOMETHING_, where _SOMETHING_ is an arbitrary string.

The _id_ parameter in the route of a request can be accessed through the <u>request</u> object.

```js
const id = request.params.id;
```

The now familiar `find` method of array is used to find the note with an id that matches the parameter. The note is then returned to the sender of the request.

We can now test our application by going to http://localhost:3001/api/notes/1 in our browser:

![alt text](assets/image6.png)

However, there's another problem with our application.

If we search for a note with an id that does not exist, the server responds with:

![alt text](assets/image7.png)

The HTTP status code that is returned is 200, which means that the response succeeded. There is no data sent back with the response, since the value of the content-length header is 0, and the same can be verified from the browser.

The reason for this behavior is that the `note` variable is set to `undefined` if no matching note is found. The situation needs to be handled on the server in a better way. If no note is found, the server should respond with the status code <u>404 not found</u> instead of 200.

Let's make the following change to our code:

```js
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
```

Since no data is attached to the response, we use the status method for setting the status and the end method for responding to the request without sending any data.

The if-condition leverages the fact that all JavaScript objects are `truthy`, meaning that they evaluate to true in a comparison operation. However, `undefined` is `falsy` meaning that it will evaluate to false.

Our application works and sends the error status code if no note is found. However, the application doesn't return anything to show to the user, like web applications normally do when we visit a page that does not exist. We do not need to display anything in the browser because REST APIs are interfaces that are intended for programmatic use, and the error status code is all that is needed.

Anyway, it's possible to give a clue about the reason for sending a 404 error by [overriding the default NOT FOUND message](https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express/36507614#36507614).

### Deleting resources

Next, let's implement a route for deleting resources. Deletion happens by making an HTTP DELETE request to the URL of the resource:

```js
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});
```

If deleting the resource is successful, meaning that the note exists and is removed, we respond to the request with the status code <u>204 no content</u> and return no data with the response.

There's no consensus on what status code should be returned to a DELETE request if the resource does not exist. The only two options are 204 and 404. For the sake of simplicity, our application will respond with 204 in both cases.

### Postman

So how do we test the delete operation? HTTP GET requests are easy to make from the browser. We could write some JavaScript for testing deletion, but writing test code is not always the best solution in every situation.

Many tools exist for making the testing of backends easier. One of these is a command line program [curl](https://curl.se/). However, instead of curl, we will take a look at using [Postman](https://www.postman.com/) for testing the application.

Let's install the Postman desktop client [from here](https://www.postman.com/downloads/) and try it out:

![alt text](assets/image8.png)

NB: Postman is also available on VS Code which can be downloaded from the Extension tab on the left -> search for Postman -> First result (Verified Publisher) -> Install You will then see an extra icon added on the activity bar below the extensions tab. Once you log in, you can follow the steps below.

Using Postman is quite easy in this situation. It's enough to define the URL and then select the correct request type (DELETE).

The backend server appears to respond correctly. By making an HTTP GET request to http://localhost:3001/api/notes we see that the note with the id 2 is no longer in the list, which indicates that the deletion was successful.

Because the notes in the application are only saved to memory, the list of notes will return to its original state when we restart the application.

### The Visual Studio Code REST client

If you use Visual Studio Code, you can use VS Code [REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) plugin instead of Postman.

Once the plugin is installed, using it is very simple. We make a directory at the root of the application named _requests_. We save all the REST client requests in the directory as files that end with the _.rest_ extension.

Let's create a new _get_all_notes.rest_ file and define the request that fetches all notes.

![alt text](assets/image14.png)

By clicking the Send Request text, the REST client will execute the HTTP request and the response from the server is opened in the editor.

### Receiving data

Next, let's make it possible to add new notes to the server. Adding a note happens by making an HTTP POST request to the address http://localhost:3001/api/notes, and by sending all the information for the new note in the request body in JSON format.

To access the data easily, we need the help of the Express [json-parser](https://expressjs.com/en/api.html) that we can use with the command `app.use(express.json())`.

Let's activate the json-parser and implement an initial handler for dealing with the HTTP POST requests:

```js
const express = require("express");
const app = express();

app.use(express.json());

//...

app.post("/api/notes", (request, response) => {
  const note = request.body;
  console.log(note);
  response.json(note);
});
```

The event handler function can access the data from the body property of the `request` object.

Without the json-parser, the _body_ property would be undefined. The json-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the _body_ property of the `request` object before the route handler is called.

For the time being, the application does not do anything with the received data besides printing it to the console and sending it back in the response.

Before we implement the rest of the application logic, let's verify with Postman that the data is in fact received by the server. In addition to defining the URL and request type in Postman, we also have to define the data sent in the body:

![alt text](assets/image9.png)

**NOTE**: When programming the backend, _keep the console running the application visible at all times_. The development server will restart if changes are made to the code, so by monitoring the console, you will immediately notice if there is an error in the application's code:

![alt text](assets/image10.png)

Similarly, it is useful to check the console to make sure that the backend behaves as we expect it to in different situations, like when we send data with an HTTP POST request. Naturally, it's a good idea to add lots of `console.log` commands to the code while the application is still being developed.

A potential cause for issues is an incorrectly set _Content-Type_ header in requests. This can happen with Postman if the type of body is not defined correctly:

![alt text](assets/image11.png)

**The Content-Type header is set to text/plain:**

![alt text](assets/image12.png)

The server appears to only receive an empty object:

![alt text](assets/image13.png)

The server will not be able to parse the data correctly without the correct value in the header. It won't even try to guess the format of the data since there's a massive amount of potential Content-Types.

If you are using VS Code, then you should install the REST client from the previous chapter now, if you haven't already. The POST request can be sent with the REST client like this:

![alt text](assets/image15.png)

We created a new _create_note.rest_ file for the request. The request is formatted according to the [instructions in the documentation](https://github.com/Huachao/vscode-restclient/blob/master/README.md#usage).

One benefit that the REST client has over Postman is that the requests are handily available at the root of the project repository, and they can be distributed to everyone in the development team. You can also add multiple requests in the same file using `###` separators:

```rest
GET http://localhost:3001/api/notes/

###
POST http://localhost:3001/api/notes/ HTTP/1.1
content-type: application/json

{
    "name": "sample",
    "time": "Wed, 21 Oct 2015 18:27:50 GMT"
}
```

Postman also allows users to save requests, but the situation can get quite chaotic especially when you're working on multiple unrelated projects.

> **Important sidenote**  
> Sometimes when you're debugging, you may want to find out what headers have been set in the HTTP request. One way of accomplishing this is through the get method of the `request` object, that can be used for getting the value of a single header. The `request` object also has the _headers_ property, that contains all of the headers of a specific request.
>
> Problems can occur with the VS REST client if you accidentally add an empty line between the top row and the row specifying the HTTP headers. In this situation, the REST client interprets this to mean that all headers are left empty, which leads to the backend server not knowing that the data it has received is in the JSON format.
>
> You will be able to spot this missing Content-Type header if at some point in your code you print all of the request headers with the console.log(request.headers) command.

Let's return to the application. Once we know that the application receives data correctly, it's time to finalize the handling of the request:

```js
app.post("/api/notes", (request, response) => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;

  const note = request.body;
  note.id = String(maxId + 1);

  notes = notes.concat(note);

  response.json(note);
});
```

We need a unique id for the note. First, we find out the largest id number in the current list and assign it to the `maxId` variable. The id of the new note is then defined as `maxId + 1` as a string. This method is not recommended, but we will live with it for now as we will replace it soon enough.

The current version still has the problem that the HTTP POST request can be used to add objects with arbitrary properties. Let's improve the application by defining that the content property may not be empty. The important property will be given a default value of false. All other properties are discarded:

```js
const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});
```

The reason you need to use the spread operator `(...)` in `Math.max(...notes.map(n => Number(n.id)))` is that the `Math.max()` function expects individual arguments, not an array.

- `notes.map(n => Number(n.id))` creates an array of numbers (e.g., `[1, 2, 3]`).
- `Math.max()` does not accept an array as input. Instead, it expects individual numbers as arguments (e.g., `Math.max(1, 2, 3)`).
- The spread operator `(...)` is used to "spread" the elements of the array into individual arguments for `Math.max()`.

The logic for generating the new id number for notes has been extracted into a separate `generateId` function.

If the received data is missing a value for the _content_ property, the server will respond to the request with the status code <u>400 bad request</u>:

```js
if (!body.content) {
  return response.status(400).json({
    error: "content missing",
  });
}
```

Notice that calling return is crucial because otherwise the code will execute to the very end and the malformed note gets saved to the application.

If the content property has a value, the note will be based on the received data. If the _important_ property is missing, we will default the value to _false_. The default value is currently generated in a rather odd-looking way:

```js
important: body.important || false,
```

If the data saved in the `body` variable has the _important_ property, the expression will evaluate its value and convert it to a boolean value. If the property does not exist, then the expression will evaluate to false which is defined on the right-hand side of the vertical lines.

> To be exact, when the important property is false, then the `body.important || false` expression will in fact return the _false_ from the right-hand side...

You can find the code for our current application in its entirety in the part3-1 branch of this [GitHub repository](https://github.com/fullstack-hy2020/part3-notes-backend/tree/part3-1).

If you clone the project, run the `npm install` command before starting the application with `npm start` or `npm run dev`.

One more thing before we move on to the exercises. The function for generating IDs looks currently like this:

```js
const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};
```

The function body contains a row that looks a bit intriguing:

```js
Math.max(...notes.map((n) => Number(n.id)));
```

What exactly is happening in that line of code? `notes.map(n => n.id)` creates a new array that contains all the ids of the notes in number form. Math.max returns the maximum value of the numbers that are passed to it. However, `notes.map(n => Number(n.id))` is an _array_ so it can't directly be given as a parameter to `Math.max`. The array can be transformed into individual numbers by using the "three dot" spread syntax `...`.

### About HTTP request types

[The HTTP standard](https://www.rfc-editor.org/rfc/rfc9110.html#name-common-method-properties) talks about two properties related to request types, **safety** and **idempotency**.

The HTTP GET request should be _safe_:

> In particular, the convention has been established that the GET and HEAD methods SHOULD NOT have the significance of taking an action other than retrieval. These methods ought to be considered "safe".

Safety means that the executing request must not cause any _side effects_ on the server. By side effects, we mean that the state of the database must not change as a result of the request, and the response must only return data that already exists on the server.

Nothing can ever guarantee that a GET request is _safe_, this is just a recommendation that is defined in the HTTP standard. By adhering to RESTful principles in our API, GET requests are always used in a way that they are _safe_.

The HTTP standard also defines the request type HEAD, which ought to be safe. In practice, HEAD should work exactly like GET but it does not return anything but the status code and response headers. The response body will not be returned when you make a HEAD request.

All HTTP requests except POST should be _idempotent_:

> Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property

This means that if a request does not generate side effects, then the result should be the same regardless of how many times the request is sent.

If we make an HTTP PUT request to the URL _/api/notes/10_ and with the request we send the data `{ content: "no side effects!", important: true }`, the result is the same regardless of how many times the request is sent.

Like safety for the GET request, _idempotence_ is also just a recommendation in the HTTP standard and not something that can be guaranteed simply based on the request type. However, when our API adheres to RESTful principles, then GET, HEAD, PUT, and DELETE requests are used in such a way that they are idempotent.

POST is the only HTTP request type that is neither _safe_ nor _idempotent_. If we send 5 different HTTP POST requests to _/api/notes_ with a body of `{content: "many same", important: true}`, the resulting 5 notes on the server will all have the same content.

### Middleware

The Express json-parser used earlier is a [middleware](https://expressjs.com/en/guide/using-middleware.html).

Middleware are functions that can be used for handling `request` and `response` objects.

The json-parser we used earlier takes the raw data from the requests that are stored in the `request` object, parses it into a JavaScript object and assigns it to the `request` object as a new property _body_.

In practice, you can use several middlewares at the same time. When you have more than one, they're executed one by one in the order that they were listed in the application code.

Let's implement our own middleware that prints information about every request that is sent to the server.

Middleware is a function that receives three parameters:

```js
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
```

At the end of the function body, the `next` function that was passed as a parameter is called. The `next` function yields control to the next middleware.

Middleware is used like this:

```js
app.use(requestLogger);
```

Remember, middleware functions are called in the order that they're encountered by the JavaScript engine. Notice that `json-parser` is listed before `requestLogger`, because otherwise _request.body_ will not be initialized when the logger is executed!

Middleware functions have to be used before routes when we want them to be executed by the route event handlers. Sometimes, we want to use middleware functions after routes. We do this when the middleware functions are only called if no route handler processes the HTTP request.

Let's add the following middleware after our routes. This middleware will be used for catching requests made to non-existent routes. For these requests, the middleware will return an error message in the JSON format.

```js
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
```

## 3b - Deploying app to internet

Next, let's connect the frontend we made in part 2 to our own backend.

In the previous part, the frontend could ask for the list of notes from the json-server we had as a backend, from the address http://localhost:3001/notes. Our backend has a slightly different URL structure now, as the notes can be found at http://localhost:3001/api/notes. Let's change the attribute **baseUrl** in the frontend notes app at _src/services/notes.js_ like so:

Now frontend's GET request to http://localhost:3001/api/notes does not work for some reason.

What's going on here? We can access the backend from a browser and from postman without any problems.

### Same origin policy and CORS

The issue lies with a thing called `same origin policy`. A URL's origin is defined by the combination of protocol (AKA scheme), hostname, and port.

```json
http://example.com:80/index.html

protocol: http
host: example.com
port: 80
```

When you visit a website (e.g. http://example.com), the browser issues a request to the server on which the website (example.com) is hosted. The response sent by the server is an HTML file that may contain one or more references to external assets/resources hosted either on the same server that _example.com_ is hosted on or a different website. When the browser sees reference(s) to a URL in the source HTML, it issues a request. If the request is issued using the URL that the source HTML was fetched from, then the browser processes the response without any issues. However, if the resource is fetched using a URL that doesn't share the same origin(scheme, host, port) as the source HTML, the browser will have to check the `Access-Control-Allow-origin` response header. If it contains `*` on the URL of the source HTML, the browser will process the response, otherwise the browser will refuse to process it and throws an error.

The **same-origin policy** is a security mechanism implemented by browsers in order to prevent session hijacking among other security vulnerabilities.

In order to enable legitimate cross-origin requests (requests to URLs that don't share the same origin) W3C came up with a mechanism called **CORS**(Cross-Origin Resource Sharing). According to Wikipedia:

> Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos. Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy.

The problem is that, by default, the JavaScript code of an application that runs in a browser can only communicate with a server in the same origin. Because our server is in localhost port 3001, while our frontend is in localhost port 5173, they do not have the same origin.

Keep in mind, that same-origin policy and CORS are not specific to React or Node. They are universal principles regarding the safe operation of web applications.

We can allow requests from other _origins_ by using Node's [cors](https://github.com/expressjs/cors) middleware.

In your backend repository, install cors with the command

```bash
npm install cors
```

take the middleware to use and allow for requests from all origins:

```js
const cors = require("cors");

app.use(cors());
```

**Note**: When you are enabling cors, you should think about how you want to configure it. In the case of our application, since the backend is not expected to be visible to the public in the production environment, it may make more sense to only enable cors from a specific origin (e.g. the front end).

Now most of the features in the frontend work! The functionality for changing the importance of notes has not yet been implemented on the backend so naturally that does not yet work in the frontend. We shall fix that later.

You can read more about CORS from [Mozilla's page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).

The setup of our app now looks as follows

![alt text](assets/image16.png)

The react app running in the browser now fetches the data from node/express-server that runs in localhost:3001.

### Application to the Internet

Now that the whole stack is ready, let's move our application to Internet.

There is an ever-growing number of services that can be used to host an app on the internet. The developer-friendly services like PaaS (i.e. Platform as a Service) take care of installing the execution environment (eg. Node.js) and could also provide various services such as databases.

For a decade, [Heroku](https://www.heroku.com/) was dominating the PaaS scene. Unfortunately the free tier Heroku ended at 27th November 2022. This is very unfortunate for many developers, especially students. Heroku is still very much a viable option if you are willing to spend some money. They also have a student program that provides some free credits.

We are now introducing two services [Fly.io](https://fly.io/) and [Render](https://render.com/). Fly.io offers more flexibility as a service, but it has also recently become paid. Render offers some free compute time, so if you want to complete the course without costs, choose Render. Setting up Render might also be easier in some cases, as Render does not require any installations on your own machine.

There are also some other free hosting options that work well for this course, at least for all parts other than part 11 (CI/CD) which might have one tricky exercise for other platforms.

Some course participants have also used the following services:

- [Replit](https://replit.com/)

- [CodeSandBox](https://codesandbox.io/)

#### Fly.io

Look at the [Course](https://fullstackopen.com/en/part3/deploying_app_to_internet)

#### Render

The following assumes that the sign in has been made with a GitHub account.

After signing in, let us create a new "web service":

![alt text](assets/image17.png)

The app repository is then connected to Render:

![alt text](assets/image18.png)

The connection seems to require that the app repository is public.

Next we will define the basic configurations. If the app is not at the _root_ of the repository the _Root directory_ needs to be given a proper value:

![alt text](assets/image19.png)

After this, the app starts up in the Render. The dashboard tells us the app state and the url where the app is running:

![alt text](assets/image20.png)

Fortunately, it is also possible to manually redeploy the app.

Also, the app logs can be seen in the dashboard.

We notice now from the logs that the app has been started in the port 10000. The app code gets the right port through the environment variable PORT so it is essential that the file _index.js_ has been updated in the backend as follows:

```js
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Frontend product build

So far we have been running React code in _development mode_. In development mode the application is configured to give clear error messages, immediately render code changes to the browser, and so on.

When the application is deployed, we must create a production build or a version of the application that is optimized for production.

A production build for applications created with Vite can be created with the command `npm run build`.

Let's run this command from the root of the notes frontend project that we developed in Part 2.

This creates a directory called _dist_ which contains the only HTML file of our application (_index.html_) and the directory _assets_. Minified version of our application's JavaScript code will be generated in the dist directory. Even though the application code is in multiple files, all of the JavaScript will be minified into one file. All of the code from all of the application's dependencies will also be minified into this single file.

### Serving static files from the backend

One option for deploying the frontend is to copy the production build (the _dist_ directory) to the root of the backend directory and configure the backend to show the frontend's _main page_ (the file _dist/index.html_) as its main page.

We begin by copying the production build of the frontend to the root of the backend. With a Mac or Linux computer, the copying can be done from the frontend directory with the command

```bash
cp -r dist ../backend
```

The backend directory should now look as follows:

![alt text](assets/image21.png)

To make Express show static content, the page _index.html_ and the JavaScript, etc., it fetches, we need a built-in middleware from Express called static.

When we add the following amidst the declarations of middlewares

```js
app.use(express.static("dist"));
```

whenever Express gets an HTTP GET request it will first check if the _dist_ directory contains a file corresponding to the request's address. If a correct file is found, Express will return it.

Now HTTP GET requests to the address _www.serversaddress.com/index.html_ or _www.serversaddress.com_ will show the React frontend. GET requests to the address _www.serversaddress.com/api/notes_ will be handled by the backend code.

Because of our situation, both the frontend and the backend are at the same address, we can declare `baseUrl` as a [relative](https://www.w3.org/TR/WD-html40-970917/htmlweb.html#h-5.1.2) URL. This means we can leave out the part declaring the server.

```js
import axios from "axios";

const baseUrl = "/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// ...
```

After the change, we have to create a new production build of the frontend and copy it to the root of the backend directory.

The application can now be used from the backend address http://localhost:3001:

When we use a browser to go to the address http://localhost:3001, the server returns the _index.html_ file from the _dist_ directory. The contents of the file are as follows:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
    <script type="module" crossorigin src="/assets/index-5f6faa37.js"></script>
    <link rel="stylesheet" href="/assets/index-198af077.css" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

The file contains instructions to fetch a CSS stylesheet defining the styles of the application, and one _script_ tag that instructs the browser to fetch the JavaScript code of the application - the actual React application.

The React code fetches notes from the server address http://localhost:3001/api/notes and renders them to the screen. The communication between the server and the browser can be seen in the _Network_ tab of the developer console:

![alt text](assets/image22.png)

The setup that is ready for a product deployment looks as follows:

![alt text](assets/image23.png)

Unlike when running the app in a development environment, everything is now in the same node/express-backend that runs in localhost:3001. When the browser goes to the page, the file _index.html_ is rendered. That causes the browser to fetch the production version of the React app. Once it starts to run, it fetches the json-data from the address localhost:3001/api/notes.

### The whole app to the internet

After ensuring that the production version of the application works locally, we are ready to move the whole application to the selected host service.

**In the case of Render**, commit the changes, and push the code to GitHub again. Make sure the directory _dist_ is not ignored by git on the backend. A push to GitHub might be enough. If the automatic deployment does not work, select the "manual deploy" from the Render dashboard.

**Deployed app** -> https://notes-fullstack-course.onrender.com/

The application works perfectly, except we haven't added the functionality for changing the importance of a note to the backend yet.

Our application saves the notes to a variable. If the application crashes or is restarted, all of the data will disappear.

The application needs a database. Before we introduce one, let's go through a few things.

The setup now looks like as follows:

![alt text](assets/image24.png)

### Streamlining deploying of the frontend

To create a new production build of the frontend without extra manual work, let's add some npm-scripts to the `package.json` of the backend repository.

#### Render

Note: When you attempt to deploy your backend to Render, make sure you have a separate repository for the backend and deploy that github repo through Render, attempting to deploy through your Fullstackopen repository will often throw "ERR path ....package.json".

In case of Render, the scripts look like the following

```json
{
  "scripts": {
    //...
    "build:ui": "rm -rf dist && cd ../frontend && npm run build && cp -r dist ../backend",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push"
  }
}
```

The script `npm run build:ui` builds the frontend and copies the production version under the backend repository. `npm run deploy:full` contains also the necessary _git_ commands to update the backend repository.

Note that the directory paths in the script build:ui depend on the location of the frontend and backend directories in the file system.

### Proxy

Changes on the frontend have caused it to no longer work in development mode (when started with command `npm run dev`), as the connection to the backend does not work.

This is due to changing the backend address to a relative URL:

```js
const baseUrl = "/api/notes";
```

Because in development mode the frontend is at the address _localhost:5173_, the requests to the backend go to the wrong address _localhost:5173/api/notes_. The backend is at _localhost:3001_.

If the project was created with Vite, this problem is easy to solve. It is enough to add the following declaration to the _vite.config.js_ file of the frontend directory.

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
```

After restarting, the React development environment will act as proxy. If the React code makes an HTTP request to a path starting with http://localhost:5173/api, the request will be forwarded to the server at http://localhost:3001. Requests to other paths will be handled normally by the development server.

Now the frontend is also working correctly. It functions both in development mode and in production mode together with the server. Since from the frontend's perspective all requests are made to http://localhost:5173, which is the single origin, there is no longer a need for the backend's cors middleware. Therefore, we can remove references to the cors library from the backend's _index.js_ file and remove _cors_ from the project's dependencies:

```bash
npm remove cors
```

We have now successfully deployed the entire application to the internet. There are many other ways to implement deployments. For example, deploying the frontend code as its own application may be sensible in some situations, as it can facilitate the implementation of an automated deployment pipeline. A deployment pipeline refers to an automated and controlled way to move code from the developer's machine through various tests and quality control stages to the production environment. This topic is covered in part 11 of the course.

The current backend code can be found on [Github](https://github.com/fullstack-hy2020/part3-notes-backend/tree/part3-3), in the branch part3-3. The changes in frontend code are in part3-1 branch of the [frontend repository](https://github.com/fullstack-hy2020/part2-notes-frontend/tree/part3-1).

## 3c - Saving data to MongoDB

Before we move into the main topic of persisting data in a database, we will take a look at a few different ways of debugging Node applications.

### Debugging Node applications

Debugging Node applications is slightly more difficult than debugging JavaScript running in your browser. Printing to the console is a tried and true method, and it's always worth doing. Some people think that more sophisticated methods should be used instead, but I disagree. Even the world's elite open-source developers use this method.

#### Visual Studio Code

The Visual Studio Code debugger can be useful in some situations. You can launch the application in debugging mode like this (in this and the next few images, the notes have a field `date` which has been removed from the current version of the application):

![alt text](assets/image25.png)

Note that the application shouldn't be running in another console, otherwise the port will already be in use.

**NB** A newer version of Visual Studio Code may have `Run` instead of `Debug`. Furthermore, you may have to configure your `launch.json` file to start debugging. This can be done by choosing `Add Configuration...` on the drop-down menu, which is located next to the green play button and above `VARIABLES` menu, and select `Run "npm start"` in a debug `terminal`. For more detailed setup instructions, visit Visual Studio Code's [Debugging documentation](https://code.visualstudio.com/docs/debugtest/debugging).

#### Chrome dev tools

Debugging is also possible with the Chrome development console by starting your application with the command:

```bash
node --inspect index.js
```

You can access the debugger by clicking the green icon - the node logo - that appears in the Chrome developer console:

![alt text](assets/image26.png)

The debugging view works the same way as it did with React applications. The Sources tab can be used for setting breakpoints where the execution of the code will be paused.

![alt text](assets/image27.png)

All of the application's console.log messages will appear in the Console tab of the debugger. You can also inspect values of variables and execute your own JavaScript code.

![alt text](assets/image28.png)

#### Question everything

Debugging Full Stack applications may seem tricky at first. Soon our application will also have a database in addition to the frontend and backend, and there will be many potential areas for bugs in the application.

When the application "does not work", we have to first figure out where the problem actually occurs. It's very common for the problem to exist in a place where you didn't expect it, and it can take minutes, hours, or even days before you find the source of the problem.

The key is to be systematic. Since the problem can exist anywhere, _you must question everything_, and eliminate all possibilities one by one. Logging to the console, Postman, debuggers, and experience will help.

When bugs occur, the worst of all possible strategies is to continue writing code. It will guarantee that your code will soon have even more bugs, and debugging them will be even more difficult. The [Jidoka](https://leanscape.io/principles-of-lean-13-jidoka/) (stop and fix) principle from Toyota Production Systems is very effective in this situation as well.

### MongoDB

To store our saved notes indefinitely, we need a database. Most of the courses taught at the University of Helsinki use relational databases. In most parts of this course, we will use [MongoDB](https://www.mongodb.com/) which is a [document database](https://en.wikipedia.org/wiki/Document-oriented_database).

The reason for using Mongo as the database is its lower complexity compared to a relational database. Part 13 of the course shows how to build Node.js backends that use a relational database.

Document databases differ from relational databases in how they organize data as well as in the query languages they support. Document databases are usually categorized under the [NoSQL](https://en.wikipedia.org/wiki/NoSQL) umbrella term.

Read now the chapters on [collections](https://www.mongodb.com/docs/manual/core/databases-and-collections/) and [documents](https://www.mongodb.com/docs/manual/core/document/) from the MongoDB manual to get a basic idea of how a document database stores data.

Naturally, you can install and run MongoDB on your computer. However, the internet is also full of Mongo database services that you can use. Our preferred MongoDB provider in this course will be [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database?tck=exp-815).

Once you've created and logged into your account, let's create a new cluster using the button visible on the front page. From the view that opens, select the free plan, determine the cloud provider and data center, and create the cluster:

![alt text](assets/image29.png)

The provider selected is _AWS_ and the region is _Stockholm (eu-north-1)_. Note that if you choose something else, your database connection string will be slightly different from this example. Wait for the cluster to be ready, which will take a few minutes.

**NB** do not continue before the cluster is ready.

Let's use the _security_ tab for creating user credentials for the database. Please note that these are not the same credentials you use for logging into MongoDB Atlas. These will be used for your application to connect to the database.

![alt text](assets/image30.png)

Next, we have to define the IP addresses that are allowed access to the database. For the sake of simplicity we will allow access from all IP addresses:

![alt text](assets/image30.png)

Note: In case the modal menu is different for you, according to MongoDB documentation, adding 0.0.0.0 as an IP allows access from anywhere as well.

Finally, we are ready to connect to our **database**. To do this, we need the database connection string, which can be found by selecting _Connect_ and then _Drivers_ from the view, under the _Connect to your application section_:

![alt text](assets/image32.png)

The view displays the _MongoDB URI_, which is the address of the database that we will supply to the MongoDB client library we will add to our application:

![alt text](assets/image33.png)

The address looks like this:

```
mongodb+srv://alecaula:<db_password>@cluster0.ksork.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

We are now ready to use the database.

We could use the database directly from our JavaScript code with the official [MongoDB Node.js driver library](https://mongodb.github.io/node-mongodb-native/), but it is quite cumbersome to use. We will instead use the [Mongoose](https://mongoosejs.com/index.html) library that offers a higher-level API.

Mongoose could be described as an object document mapper (ODM), and saving JavaScript objects as Mongo documents is straightforward with this library.

Let's install Mongoose in our notes project backend:

```bash
npm install mongoose
```

Let's not add any code dealing with Mongo to our backend just yet. Instead, let's make a practice application by creating a new file, _mongo.js_ in the root of the notes backend application:

```js
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
```

**NB**: Depending on which region you selected when building your cluster, the _MongoDB URI_ may be different from the example provided above. You should verify and use the correct URI that was generated from MongoDB Atlas.

The code also assumes that it will be passed the password from the credentials we created in MongoDB Atlas, as a command line parameter. We can access the command line parameter like this:

```js
const password = process.argv[2];
```

When the code is run with the command 

```
node mongo.js yourPassword
```

Mongo will add a new document to the database.

NB: Please note the password is the password created for the database user, not your MongoDB Atlas password. Also, if you created a password with special characters, then you'll need to [URL encode that password](https://www.mongodb.com/docs/atlas/troubleshoot-connection/#special-characters-in-connection-string-password).

We can view the current state of the database from the MongoDB Atlas from _Browse collections_, in the Database tab.

![alt text](assets/image34.png)

As the view states, the _document_ matching the note has been added to the notes collection in the _myFirstDatabase_ database.

![alt text](assets/image35.png)

Let's destroy the default database test and change the name of the database referenced in our connection string to _noteApp_ instead, by modifying the URI:

```js
const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;
```

Let's run our code again:

![alt text](assets/image36.png)

The data is now stored in the right database. The view also offers the _create database_ functionality, that can be used to create new databases from the website. Creating a database like this is not necessary, since MongoDB Atlas automatically creates a new database when an application tries to connect to a database that does not exist yet.

### Schema

After establishing the connection to the database, we define the [schema](https://mongoosejs.com/docs/guide.html#schemas) for a note and the matching [model](https://mongoosejs.com/docs/models.html):

```js
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);
```

First, we define the schema of a note that is stored in the `noteSchema` variable. The schema tells Mongoose how the note objects are to be stored in the database.

In the `Note` model definition,

```js
const Note = mongoose.model("Note", noteSchema);
```

the first "Note" parameter is the singular name of the model. The name of the collection will be the lowercase plural notes, because the Mongoose convention is to automatically name collections as the plural (e.g. notes) when the schema refers to them in the singular (e.g. Note).

Document databases like Mongo are schemaless, meaning that the database itself does not care about the structure of the data that is stored in the database. It is possible to store documents with completely different fields in the same collection.

The idea behind Mongoose is that the data stored in the database is given a _schema at the level of the application_ that defines the shape of the documents stored in any given collection.

### Creating and saving objects

Next, the application creates a new note object with the help of the Note model:

```js
const note = new Note({
  content: "HTML is Easy",
  important: false,
});
```

Models are _constructor functions_ that create new JavaScript objects based on the provided parameters. Since the objects are created with the model's constructor function, they have all the properties of the model, which include methods for saving the object to the database.

Saving the object to the database happens with the appropriately named `save` method, which can be provided with an event handler with the `then` method:

```js
note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
```

When the object is saved to the database, the event handler provided to `then` gets called. The event handler closes the database connection with the command `mongoose.connection.close()`. If the connection is not closed, the connection remains open until the program terminates.

The result of the save operation is in the `result` parameter of the event handler. The result is not that interesting when we're storing one object in the database. You can print the object to the console if you want to take a closer look at it while implementing your application or during debugging.

Let's also save a few more notes by modifying the data in the code and by executing the program again.

**NB**: Unfortunately the Mongoose documentation is not very consistent, with parts of it using callbacks in its examples and other parts, other styles, so it is not recommended to copy and paste code directly from there. Mixing promises with old-school callbacks in the same code is not recommended.

### Fetching object from the database

Let's comment out the code for generating new notes and replace it with the following:

```js
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
```

![alt text](assets/image37.png)

The objects are retrieved from the database with the find method of the `Note` model. The parameter of the method is an object expressing search conditions. Since the parameter is an empty object `{}`, we get all of the notes stored in the notes collection.

The search conditions adhere to the Mongo search query [syntax](https://www.mongodb.com/docs/manual/reference/operator/).

We could restrict our search to only include important notes like this:

```js
Note.find({ important: true }).then((result) => {
  // ...
});
```

### Connecting the backend to a database

Now we have enough knowledge to start using Mongo in our notes application backend.

Let's get a quick start by copy-pasting the Mongoose definitions to the index.js file:

```js
const mongoose = require("mongoose");

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);
```

Let's change the handler for fetching all notes to the following form:

```js
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});
```

Let's start the backend with the command `node --watch index.js yourpassword` so we can verify in the browser that the backend correctly displays all notes saved to the database:

![alt text](assets/image38.png)

The application works almost perfectly. The frontend assumes that every object has a unique _id_ in the id field. We also don't want to return the mongo versioning field `__v` to the frontend.

One way to format the objects returned by Mongoose is to modify the `toJSON` method of the schema, which is used on all instances of the models produced with that schema. Modification can be done as follows:

```js
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
```

Even though the _\_id_ property of Mongoose objects looks like a string, it is in fact an object. The `toJSON` method we defined transforms it into a string just to be safe. If we didn't make this change, it would cause more harm to us in the future once we start writing tests.

No changes are needed in the handler:

```js
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});
```

The code automatically uses the defined `toJSON` when formatting notes to the response.

### Moving db configuration to its own module

Before we refactor the rest of the backend to use the database, let's extract the Mongoose-specific code into its own module.

Let's create a new directory for the module called _models_, and add a file called _note.js_:

```js
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
```

There are some changes in the code compared to before. The database connection URL is now passed to the application via the MONGODB_URI environment variable, as hardcoding it into the application is not a good idea:

```js
const url = process.env.MONGODB_URI;
```

There are many ways to define the value of an environment variable. For example, we can define it when starting the application as follows:

```bash
MONGODB_URI="your_connection_string_here" npm run dev
```

We will soon learn a more sophisticated way to define environment variables.

The way that the connection is made has changed slightly:

```js
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
```

The method for establishing the connection is now given functions for dealing with a successful and unsuccessful connection attempt. Both functions just log a message to the console about the success status:

![alt text](assets/image39.png)

Defining Node modules differs slightly from the way of defining ES6 modules in part 2.

The public interface of the module is defined by setting a value to the `module.exports` variable. We will set the value to be the Note model. The other things defined inside of the module, like the variables `mongoose` and `url` will not be accessible or visible to users of the module.

Importing the module happens by adding the following line to _index.js_:

```js
const Note = require("./models/note");
```

### Defining environment variables using the dotenv library

A more sophisticated way to define environment variables is to use the [dotenv](https://github.com/motdotla/dotenv#readme) library. You can install the library with the command:

```bash
npm install dotenv
```

To use the library, we create a _.env_ file at the root of the project. The environment variables are defined inside of the file, and it can look like this:

```env
MONGODB_URI=mongodb+srv://fullstack:thepasswordishere@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
```

We also added the hardcoded port of the server into the `PORT` environment variable.

**The .env file should be gitignored right away since we do not want to publish any confidential information publicly online!**

The environment variables defined in the .env file can be taken into use with the expression `require('dotenv').config()` and you can reference them in your code just like you would reference normal environment variables, with the `process.env.MONGODB_URI` syntax.

Let's load the environment variables at the beginning of the index.js file so that they are available throughout the entire application. Let's change the index.js file in the following way:

```js
require("dotenv").config();
const express = require("express");

const Note = require("./models/note");

const app = express();
// ..

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

It's important that _dotenv_ gets imported before the _note_ model is imported. This ensures that the environment variables from the _.env_ file are available globally before the code from the other modules is imported.

#### Important note about defining environment variables in Fly.io and Renderer

**Render users**: When using Render, the database url is given by defining the proper env in the dashboard:

![alt text](assets/image40.png)

Set just the URL starting with _mongodb+srv://..._ to the value field.

### Using database in route handlers

Next, let's change the rest of the backend functionality to use the database.

Creating a new note is accomplished like this:

```js
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});
```

The note objects are created with the `Note` constructor function. The response is sent inside of the callback function for the `save` operation. This ensures that the response is sent only if the operation succeeded. We will discuss error handling a little bit later.

The `savedNote` parameter in the callback function is the saved and newly created note. The data sent back in the response is the formatted version created automatically with the `toJSON` method:

```js
response.json(savedNote);
```

Using Mongoose's [findById](<https://mongoosejs.com/docs/api/model.html#Model.findById()>) method, fetching an individual note gets changed into the following:

```js
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});
```

### Verifying frontend and backend integration

When the backend gets expanded, it's a good idea to test the backend first with **the browser, Postman or the VS Code REST client**. Next, let's try creating a new note after taking the database into use:

Only once everything has been verified to work in the backend, is it a good idea to test that the frontend works with the backend. It is highly inefficient to test things exclusively through the frontend.

It's probably a good idea to integrate the frontend and backend one functionality at a time. First, we could implement fetching all of the notes from the database and test it through the backend endpoint in the browser. After this, we could verify that the frontend works with the new backend. Once everything seems to be working, we would move on to the next feature.

Once we introduce a database into the mix, it is useful to inspect the state persisted in the database, e.g. from the control panel in MongoDB Atlas. Quite often little Node helper programs like the _mongo.js_ program we wrote earlier can be very helpful during development.

You can find the code for our current application in its entirety in the part3-4 branch of this [GitHub repository](https://github.com/fullstack-hy2020/part3-notes-backend/tree/part3-4).

### A true full stack developer's oath

It is again time for the exercises. The complexity of our app has now taken another step since besides frontend and backend we also have a database. There are indeed really many potential sources of error.

So we should once more extend our oath:

Full stack development is _extremely_ hard, that is why I will use all the possible means to make it easier

- I will have my browser developer console open all the time
- I will use the network tab of the browser dev tools to ensure that frontend and backend are communicating as I expect
- I will constantly keep an eye on the state of the server to make sure that the data sent there by the frontend is saved there as I expect
- _I will keep an eye on the database: does the backend save data there in the right format_
- I progress with small steps
- I will write lots of `console.log` statements to make sure I understand how the code behaves and to help pinpoint problems
- If my code does not work, I will not write more code. Instead, I start deleting the code until it works or just return to a state when everything was still working

### Error handling

If we try to visit the URL of a note with an id that does not exist e.g. http://localhost:3001/api/notes/5c41c90e84d891c15dfa3431 where 5c41c90e84d891c15dfa3431 is not an id stored in the database, then the response will be `null`.

Let's change this behavior so that if a note with the given id doesn't exist, the server will respond to the request with the HTTP status code 404 not found. In addition let's implement a simple `catch` block to handle cases where the promise returned by the `findById` method is _rejected_:

```js
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })

    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });
});
```

If no matching object is found in the database, the value of `note` will be `null` and the `else` block is executed. This results in a response with the status code _404 not found_. If a promise returned by the `findById` method is rejected, the response will have the status code _500 internal server error_. The console displays more detailed information about the error.

On top of the non-existing note, there's one more error situation that needs to be handled. In this situation, we are trying to fetch a note with the wrong kind of `id`, meaning an `id` that doesn't match the Mongo identifier format.

If we make the following request, we will get the error message shown below:

```bash
Method: GET
Path:   /api/notes/someInvalidId
Body:   {}
---
{ CastError: Cast to ObjectId failed for value "someInvalidId" at path "_id"
    at CastError (/Users/mluukkai/opetus/_fullstack/osa3-muisiinpanot/node_modules/mongoose/lib/error/cast.js:27:11)
    at ObjectId.cast (/Users/mluukkai/opetus/_fullstack/osa3-muisiinpanot/node_modules/mongoose/lib/schema/objectid.js:158:13)
    ...
```

Given a malformed id as an argument, the `findById` method will throw an error causing the returned promise to be rejected. This will cause the callback function defined in the `catch` block to be called.

Let's make some small adjustments to the response in the `catch` block:

```js
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});
```

If the format of the id is incorrect, then we will end up in the error handler defined in the `catch` block. The appropriate status code for the situation is [400 Bad Request](https://www.rfc-editor.org/rfc/rfc9110.html#name-400-bad-request) because the situation fits the description perfectly:

> The 400 (Bad Request) status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).

We have also added some data to the response to shed some light on the cause of the error.

When dealing with Promises, it's almost always a good idea to add error and exception handling. Otherwise, you will find yourself dealing with strange bugs.

It's never a bad idea to print the object that caused the exception to the console in the error handler:

```js
.catch(error => {
  console.log(error)
  response.status(400).send({ error: 'malformatted id' })
})
```

The reason the error handler gets called might be something completely different than what you had anticipated. If you log the error to the console, you may save yourself from long and frustrating debugging sessions. Moreover, most modern services where you deploy your application support some form of logging system that you can use to check these logs. As mentioned, Fly.io is one.

Every time you're working on a project with a backend, _it is critical to keep an eye on the console output of the backend_. If you are working on a small screen, it is enough to just see a tiny slice of the output in the background. Any error messages will catch your attention even when the console is far back in the background:

### Moving error handling into middleware

We have written the code for the error handler among the rest of our code. This can be a reasonable solution at times, but there are cases where it is better to implement all error handling in a single place. This can be particularly useful if we want to report data related to errors to an external error-tracking system like [Sentry](https://sentry.io/welcome/) later on.

Let's change the handler for the _/api/notes/:id_ route so that it passes the error forward with the `next` function. The next function is passed to the handler as the third parameter:

```js
app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});
```

The error that is passed forward is given to the `next` function as a parameter. If `next` was called without an argument, then the execution would simply move onto the next route or middleware. If the `next` function is called with an argument, then the execution will continue to the _error handler middleware_.

Express [error handlers](https://expressjs.com/en/guide/error-handling.html) are middleware that are defined with a function that accepts _four parameters_. Our error handler looks like this:

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);
```

The error handler checks if the error is a _CastError_ exception, in which case we know that the error was caused by an invalid object id for Mongo. In this situation, the error handler will send a response to the browser with the response object passed as a parameter. In all other error situations, the middleware passes the error forward to the default Express error handler.

Note that the error-handling middleware has to be the last loaded middleware, also all the routes should be registered before the error-handler!

### The order of middleware loading

The execution order of middleware is the same as the order that they are loaded into Express with the `app.use` function. For this reason, it is important to be careful when defining middleware.

```js
app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);

app.post("/api/notes", (request, response) => {
  const body = request.body;
  // ...
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  // ...
};

// handler of requests with result to errors
app.use(errorHandler);
```

The json-parser middleware should be among the very first middleware loaded into Express. If the order was the following:

```js
app.use(requestLogger); // request.body is undefined!

app.post("/api/notes", (request, response) => {
  // request.body is undefined!
  const body = request.body;
  // ...
});

app.use(express.json());
```

Then the JSON data sent with the HTTP requests would not be available for the logger middleware or the POST route handler, since the `request.body` would be `undefined` at that point.

It's also important that the middleware for handling unsupported routes is loaded only after all the endpoints have been defined, just before the error handler. For example, the following loading order would cause an issue:

```js
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

app.get("/api/notes", (request, response) => {
  // ...
});
```

Now the handling of unknown endpoints is ordered _before the HTTP request handler_. Since the unknown endpoint handler responds to all requests with _404 unknown endpoint_, no routes or middleware will be called after the response has been sent by unknown endpoint middleware. The only exception to this is the error handler which needs to come at the very end, after the unknown endpoints handler.

### Other operations

Let's add some missing functionality to our application, including deleting and updating an individual note.

The easiest way to delete a note from the database is with the [findByIdAndDelete](<https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete()>) method:

```js
app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});
```

In both of the "successful" cases of deleting a resource, the backend responds with the status code _204 no content_. The two different cases are deleting a note that exists, and deleting a note that does not exist in the database. The `result` callback parameter could be used for checking if a resource was actually deleted, and we could use that information for returning different status codes for the two cases if we deem it necessary. Any exception that occurs is passed onto the error handler.

Let's implement the functionality to update a single note, allowing the importance of the note to be changed. The note updating is done as follows:

```js
app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});
```

The note to be updated is first fetched from the database using the `findById` method. If no object is found in the database with the given id, the value of the variable `note` is `null`, and the query responds with the status code _404 Not Found_.

If an object with the given id is found, its `content` and `important` fields are updated with the data provided in the request, and the modified note is saved to the database using the `save()` method. The HTTP request responds by sending the updated note in the response.

One notable point is that the code now has nested promises, meaning that within the outer `.then` method, another [promise chain](https://javascript.info/promise-chaining) is defined:

```js
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      // Promise chain
      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
```

Usually, this is not recommended because it can make the code difficult to read. In this case, however, the solution works because it ensures that the `.then` block following the `save()` method is only executed if a note with the given id is found in the database and the `save()` method is called. In the fourth part of the course, we will explore the async/await syntax, which offers an easier and clearer way to handle such situations.

After testing the backend directly with Postman or the VS Code REST client, we can verify that it seems to work. The frontend also appears to work with the backend using the database.

You can find the code for our current application in its entirety in the part3-5 branch of [this GitHub repository](https://github.com/fullstack-hy2020/part3-notes-backend/tree/part3-5).

## 3d - Validation and ESLint

There are usually constraints that we want to apply to the data that is stored in our application's database. Our application shouldn't accept notes that have a missing or empty content property. The validity of the note is checked in the route handler:

```js
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "content missing" });
  }

  // ...
});
```

If the note does not have the _content_ property, we respond to the request with the status code _400 bad request_.

One smarter way of validating the format of the data before it is stored in the database is to use the [validation](https://mongoosejs.com/docs/validation.html) functionality available in Mongoose.

We can define specific validation rules for each field in the schema:

```js
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});
```

The _content_ field is now required to be at least five characters long and it is set as required, meaning that it can not be missing. We have not added any constraints to the _important_ field, so its definition in the schema has not changed.

The _minLength_ and _required_ validators are [built-in](https://mongoosejs.com/docs/validation.html#built-in-validators) and provided by Mongoose. The Mongoose [custom validator](https://mongoosejs.com/docs/validation.html#custom-validators) functionality allows us to create new validators if none of the built-in ones cover our needs.

If we try to store an object in the database that breaks one of the constraints, the operation will throw an exception. Let's change our handler for creating a new note so that it passes any potential exceptions to the error handler middleware:

```js
app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});
```

Let's expand the error handler to deal with these validation errors:

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
```

When validating an object fails, we return the following default error message from Mongoose:

![alt text](assets/image41.png)

### Deploying the database backend to production

The application should work almost as-is in Fly.io/Render. We do not have to generate a new production build of the frontend since changes thus far were only on our backend.

The environment variables defined in dotenv will only be used when the backend is not in production mode, i.e. Fly.io or Render.

For production, we have to set the database URL in the service that is hosting our app.

When using Render, the database url is given by defining the proper env in the dashboard:

![alt text](assets/image42.png)

The Render Dashboard shows the server logs:

![alt text](assets/image43.png)

You can find the code for our current application in its entirety in the part3-6 branch of this [GitHub repository](https://github.com/fullstack-hy2020/part3-notes-backend/tree/part3-6).

<hr style="border: 2px solid rgb(236, 158, 40);">

#### Exercise 3.19 - 3.21

##### 3.19\*: Phonebook database, step 7

Expand the validation so that the name stored in the database has to be at least three characters long.

Expand the frontend so that it displays some form of error message when a validation error occurs. Error handling can be implemented by adding a `catch` block as shown below:

```js
personService
    .create({ ... })
    .then(createdPerson => {
      // ...
    })
    .catch(error => {
      // this is the way to access the error message
      console.log(error.response.data.error)
    })
```

You can display the default error message returned by Mongoose, even though they are not as readable as they could be:

NB: On update operations, mongoose validators are off by default. [Read the documentation](https://mongoosejs.com/docs/validation.html) to determine how to enable them.

##### 3.20\*: Phonebook database, step 8

Add validation to your phonebook application, which will make sure that phone numbers are of the correct form. A phone number must:

- have length of 8 or more
- be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers
  - eg. 09-1234556 and 040-22334455 are valid phone numbers
  - eg. 1234556, 1-22334455 and 10-22-334455 are invalid

Use a [Custom validator](https://mongoosejs.com/docs/validation.html#custom-validators) to implement the second part of the validation.

If an HTTP POST request tries to add a person with an invalid phone number, the server should respond with an appropriate status code and error message.

##### 3.21 Deploying the database backend to production

Generate a new "full stack" version of the application by creating a new production build of the frontend, and copying it to the backend directory. Verify that everything works locally by using the entire application from the address http://localhost:3001/.

Push the latest version to Fly.io/Render and verify that everything works there as well.

<hr style="border: 2px solid rgb(236, 158, 40);">

### Lint

Before we move on to the next part, we will take a look at an important tool called [lint](<https://en.wikipedia.org/wiki/Lint_(software)>). Wikipedia says the following about lint:

> Generically, lint or a linter is any tool that detects and flags errors in programming languages, including stylistic errors. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code.

In compiled statically typed languages like Java, IDEs like NetBeans can point out errors in the code, even ones that are more than just compile errors. Additional tools for performing [static analysis](https://en.wikipedia.org/wiki/Static_program_analysis) like [checkstyle](https://checkstyle.sourceforge.io/), can be used for expanding the capabilities of the IDE to also point out problems related to style, like indentation.

In the JavaScript universe, the current leading tool for static analysis (aka "linting") is [ESlint](https://eslint.org/).

Let's add ESLint as a _development dependency_ for the backend. Development dependencies are tools that are only needed during the development of the application. For example, tools related to testing are such dependencies. When the application is run in production mode, development dependencies are not needed.

Install ESLint as a development dependency for the backend with the command:

```bash
npm install eslint @eslint/js --save-dev
```

The contents of the package.json file will change as follows:

```json
{
  //...
  "dependencies": {
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongoose": "^8.11.0"
  },

  "devDependencies": {
    "@eslint/js": "^9.22.0",
    "eslint": "^9.22.0"
  }
}
```

The command added a _devDependencies_ section to the file and included the packages _eslint_ and _@eslint/js_, and installed the required libraries into the _node_modules_ directory.

After this we can initialize a default ESlint configuration with the command:

```bash
npx eslint --init
```

We will answer all of the questions:

![alt text](assets/image44.png)

The configuration will be saved in the generated `eslint.config.mjs` file.

### Formatting the Configuration File

Let's reformat the configuration file _eslint.config.mjs_ from its current form to the following:

```js
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
  },
];
```

So far, our ESLint configuration file defines the `files` option with `["*/.js"]`, which tells ESLint to look at all JavaScript files in our project folder. The `languageOptions` property specifies options related to language features that ESLint should expect, in which we defined the `sourceType` option as "commonjs". This indicates that the JavaScript code in our project uses the CommonJS module system, allowing ESLint to parse the code accordingly.

The `globals` property specifies global variables that are predefined. The spread operator applied here tells ESLint to include all global variables defined in the `globals.node` settings such as the `process`. In the case of browser code we would define here `globals.browser` to allow browser specific global variables like `window`, and `document`.

Finally, the `ecmaVersion` property is set to "latest". This sets the ECMAScript version to the latest available version, meaning ESLint will understand and properly lint the latest JavaScript syntax and features.

We want to make use of [ESLint's recommended](https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations) settings along with our own. The `@eslint/js` package we installed earlier provides us with predefined configurations for ESLint. We'll import it and enable it in the configuration file:

```js
import globals from "globals";

import js from "@eslint/js";
// ...

export default [
  js.configs.recommended,
  {
    // ...
  },
];
```

We've added the `js.configs.recommended` to the top of the configuration array, this ensures that ESLint's recommended settings are applied first before our own custom options.

Let's continue building the configuration file. Install a [plugin](https://eslint.style/packages/js) that defines a set of code style-related rules:

```
npm install --save-dev @stylistic/eslint-plugin-js
```

Import and enable the plugin, and add these four code style rules:

```js
import globals from "globals";
import js from "@eslint/js";

import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
  {
    // ...

    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "single"],
      "@stylistic/js/semi": ["error", "never"],
    },
  },
];
```

The [plugins](https://eslint.org/docs/latest/use/configure/plugins) property provides a way to extend ESLint's functionality by adding custom rules, configurations, and other capabilities that are not available in the core ESLint library. We've installed and enabled the `@stylistic/eslint-plugin-js`, which adds JavaScript stylistic rules for ESLint. In addition, rules for indentation, line breaks, quotes, and semicolons have been added. These four rules are all defined in the [Eslint styles plugin](https://eslint.style/packages/js).

### Running the Linter

Inspecting and validating a file like `index.js` can be done with the following command:

```
npx eslint index.js
```

It is recommended to create a separate `npm script` for linting:

```js
{
  // ...
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "echo \"Error: no test specified\" && exit 1",

    "lint": "eslint ."
    // ...
  },
  // ...
}
```

Now the `npm run lint` command will check every file in the project.

Files in the `dist` directory also get checked when the command is run. We do not want this to happen, and we can accomplish this by adding an object with the [ignores](https://eslint.org/docs/latest/use/configure/ignore) property that specifies an array of directories and files we want to ignore.

```js
// ...
export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    // ...
  },
  {
    ignores: ["dist/**"],
  },
];
```

This causes the entire `dist` directory to not be checked by ESlint.

Lint has quite a lot to say about our code:

![alt text](assets/image45.png)

A better alternative to executing the linter from the command line is to configure an `eslint-plugin` to the editor, that runs the linter continuously. By using the plugin you will see errors in your code immediately. You can find more information about the Visual Studio ESLint plugin [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

The VS Code ESlint plugin will underline style violations with a red line.

This makes errors easy to spot and fix right away.

### Adding More Style Rules

ESlint has a vast array of [rules](https://eslint.org/docs/latest/rules/) that are easy to take into use by editing the `eslint.config.mjs` file.

Let's add the [eqeqeq](https://eslint.org/docs/latest/rules/eqeqeq) rule that warns us if equality is checked with anything but the triple equals operator. The rule is added under the rules field in the configuration file.

```js
export default [
  // ...
  rules: {
    // ...

   eqeqeq: 'error',
  },
  // ...
]
```

While we're at it, let's make a few other changes to the rules.

Let's prevent unnecessary [trailing spaces](https://eslint.org/docs/latest/rules/no-trailing-spaces) at the ends of lines, require that [there is always a space before and after curly braces](https://eslint.org/docs/latest/rules/object-curly-spacing), and also demand a consistent use of whitespaces in the function parameters of arrow functions.

```js
export default [
  // ...
  rules: {
    // ...
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
  },
]
```

Our default configuration takes a bunch of predefined rules into use from:

```js
// ...
export default [
  js.configs.recommended,
  // ...
]
```

This includes a rule that warns about `console.log` commands which we don't want to use. Disabling a rule can be accomplished by defining its "value" as 0 or `off` in the configuration file. Let's do this for the `no-console` rule in the meantime.

```js
[
  {
    // ...
    rules: {
      // ...
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
]
```

Disabling the no-console rule will allow us to use console.log statements without ESLint flagging them as issues. This can be particularly useful during development when you need to debug your code. Here's the complete configuration file with all the changes we have made so far:

```js
import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
]
```

__NB__ when you make changes to the `eslint.config.mjs` file, it is recommended to run the linter from the command line. This will verify that the configuration file is correctly formatted.

If there is something wrong in your configuration file, the lint plugin can behave quite erratically.

Many companies define coding standards that are enforced throughout the organization through the ESlint configuration file. It is not recommended to keep reinventing the wheel over and over again, and it can be a good idea to adopt a ready-made configuration from someone else's project into yours. Recently many projects have adopted the Airbnb [Javascript style guide](https://github.com/airbnb/javascript) by taking Airbnb's [ESlint](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) configuration into use.

You can find the code for our current application in its entirety in the part3-7 branch of this [GitHub repository](https://github.com/fullstack-hy2020/part3-notes-backend/tree/part3-7).

<hr style="border: 2px solid rgb(236, 158, 40);">

#### Exercise 3.22

##### Lint configuration

Add ESlint to your application and fix all the warnings.

<hr style="border: 2px solid rgb(236, 158, 40);">

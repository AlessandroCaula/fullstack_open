The seventh part of the course touches on several different themes. First, we'll get familiar with React Router. React Router helps us divide the application into different views that are shown based on the URL in the browser's address bar. After this, we'll look at a few more ways to add CSS styles to React applications. During the entire course, we've used Vite to build all of our applications. It is also possible to configure the whole toolchain yourself, and in this part we will see how this can be done with a tool called Webpack. We shall also have a look at hook functions and how to define a custom hook.

# Table of Contents

- [Part 7](#part-7)

# Part 7

## Part 7a - React Router

The exercises in this seventh part of the course differ a bit from the ones before. In this and the next chapter, as usual, there are [exercises related to the theory of the chapter](https://fullstackopen.com/en/part7/react_router#exercises-7-1-7-3).

In addition to the exercises in this and the next chapter, there are a series of exercises in which we'll be revising what we've learned during the whole course, by expanding the BlogList application, which we worked on during parts 4 and 5.

### Application navigation structure

Following part 6, we return to React without Redux.

It is very common for web applications to have a navigation bar, which enables switching the view of the application.

Our app could have a main page

![alt text](assets/image1.png)

and separate pages for showing information on notes and users:

![alt text](assets/image2.png)

In an [old school web app](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#traditional-web-applications), changing the page shown by the application would be accomplished by the browser making an HTTP GET request to the server and rendering the HTML representing the view that was returned.

In single-page apps, we are, in reality, always on the same page. The Javascript code run by the browser creates an illusion of different "pages". If HTTP requests are made when switching views, they are only for fetching JSON-formatted data, which the new view might require for it to be shown.

The navigation bar and an application containing multiple views are very easy to implement using React.

Here is one way:

```js
import { useState }  from 'react'
import ReactDOM from 'react-dom/client'

const Home = () => (
  <div> <h2>TKTL notes app</h2> </div>
)

const Notes = () => (
  <div> <h2>Notes</h2> </div>
)

const Users = () => (
  <div> <h2>Users</h2> </div>
)

const App = () => {
  const [page, setPage] = useState('home')

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'home') {
      return <Home />
    } else if (page === 'notes') {
      return <Notes />
    } else if (page === 'users') {
      return <Users />
    }
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <a href="" onClick={toPage('home')} style={padding}>
          home
        </a>
        <a href="" onClick={toPage('notes')} style={padding}>
          notes
        </a>
        <a href="" onClick={toPage('users')} style={padding}>
          users
        </a>
      </div>

      {content()}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

Each view is implemented as its own component. We store the view component information in the application state called page. This information tells us which component, representing a view, should be shown below the menu bar.

However, the method is not very optimal. As we can see from the pictures, the address stays the same even though at times we are in different views. Each view should preferably have its own address, e.g. to make bookmarking possible. The _back_ button doesn't work as expected for our application either, meaning that _back_ doesn't move you to the previously displayed view of the application, but somewhere completely different. If the application were to grow even bigger and we wanted to, for example, add separate views for each user and note, then this self-made _routing_, which means the navigation management of the application, would get overly complicated.

### React Router

Luckily, React has the [React Router](https://reactrouter.com/) library which provides an excellent solution for managing navigation in a React application.

Let's change the above application to use React Router. First, we install React Router with the command:

```
npm install react-router-dom
```

The routing provided by React Router is enabled by changing the application as follows:

```js
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Router>
  )
}
```

Routing, or the conditional rendering of components _based on the URL_ in the browser, is used by placing components as children of the _Router_ component, meaning inside _Router_ tags.

Notice that, even though the component is referred to by the name _Router_, we are talking about [BrowserRouter](https://reactrouter.com/en/main/router-components/browser-router), because here the import happens by renaming the imported object:

```js
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
```

According to the [v5 docs](https://v5.reactrouter.com/web/api/BrowserRouter):

> _BrowserRouter_ is a _Router_ that uses the HTML5 history API (pushState, replaceState and the popState event) to keep your UI in sync with the URL.

Normally the browser loads a new page when the URL in the address bar changes. However, with the help of the [HTML5 history API](https://css-tricks.com/using-the-html5-history-api/), _BrowserRouter_ enables us to use the URL in the address bar of the browser for internal "routing" in a React application. So, even if the URL in the address bar changes, the content of the page is only manipulated using Javascript, and the browser will not load new content from the server. Using the back and forward actions, as well as making bookmarks, is still logical like on a traditional web page.

Inside the router, we define _links_ that modify the address bar with the help of the [Link](https://reactrouter.com/en/main/components/link) component. For example:

```js
<Link to="/notes">notes</Link>
```

creates a link in the application with the text _notes_, which when clicked changes the URL in the address bar to _/notes_.

Components rendered based on the URL of the browser are defined with the help of the component [Route](https://reactrouter.com/en/main/route/route). For example,

```js
<Route path="/notes" element={<Notes />} />
```

defines that, if the browser address is _/notes_, we render the _Notes_ component.

We wrap the components to be rendered based on the URL with a [Routes](https://reactrouter.com/en/main/components/routes) component

```js
<Routes>
  <Route path="/notes" element={<Notes />} />
  <Route path="/users" element={<Users />} />
  <Route path="/" element={<Home />} />
</Routes>
```

The Routes works by rendering the first component whose _path_ matches the URL in the browser's address bar.

### Parameterized route

Let's examine a slightly modified version from the previous example. The complete code for the updated example can be found [here](https://github.com/fullstack-hy2020/misc/blob/master/router-app-v1.js).



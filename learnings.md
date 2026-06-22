# Project Learnings

## Vite

### Creating a vite project

To create a vite project run the `npx create-vite` command. From there, you can select which frameworks, libraries and/or languages you want to create the project with.

## React

### React Routing

Traditionally, websites are made as multi-page applications. They use multiple HTML pages and the page that is shown is determined by the URL path, e.g. "/login" may load the login.html page and "/checkout" may load the checkout.html page.

React produces single page applications (SPAs), where there is only 1 HTML file. In this project, all the components are loaded into the single index.html page. To create the effect of routing to different pages in React, you can use the React Router.

#### Installation

To install React Router for use in web applications, use the command: `npm install react-router-dom`  
There is also `react-router-native` which is used in React Native and simply `react-router` which installs the common functionality between the dom and native versions.

#### Usage (Simple)

The 3 primary compoments for React Router are `<BrowserRouter>`, `<Routes>` and `<Route>`.  
`<BrowserRouter>` allows its child components to use the `<Routes>` and `<Route>` components. It usually wraps around the main component that forms your application (as seen in the main.jsx file).

The `<Routes>` component contains multiple `<Route>` which will display different components depending on the URL:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/auth" element={<Auth />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

The "path" attribute determines the URL and the "element" attribute determines which component is loaded when that URL is called.  
A path of \* will display a component if the URL being called does not match any other URL specified.  
The path `path="/"` could also simply be replaced by the word `index`

For more usage examples, refer to the React Router documentation: https://reactrouter.com/start/declarative/routing

When using react Router, it is recommended to use react's `<Link>` component, rather than the standard `<a>` element:

```JSX
Use: <Link to="/home">Home</Link>
Not: <a href="/home">Home</a>
```

### React Properties

Your custom react components can have custom properties that allow you to pass data from one component to another. This makes your components more reusable.

On the component element, properties look like HTML attributes. In the component function itself, the properties can be accessed using the "props" object which is passed in as a method argument:

```JSX
/* Element: */
<ChatMessage message="hello world" sender="jeff" />

/* Function: */
export default function ChatMessage(props) {
  const message = props.message;
  const sender = props.sender;

  return <div>{sender} said: {message}</div>
}

/* Props object value: */
{
  message: "hello world",
  sender: "jeff"
}
```

You can use props in this manner or use JavaScript destructing as a shortcut to get the values from your props object directly.  
For example, this code that uses destructuring will create a "message" and "sender" variable with the value of "props.message" and "props.sender" respectively:

```JSX
const {message, sender} = props;
```

Which means it is the same as this code:

```JSX
const message = props.message;
const sender = props.sender;
```

For an even shorter shortcut, you can destructure the props object directly as the function's argument:

```JSX
export default function ChatMessage({message, sender}) {
  return <div>{sender} said: {message}</div>
}
```

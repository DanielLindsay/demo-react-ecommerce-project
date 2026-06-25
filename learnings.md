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

### React Hook Form

Docs: https://react-hook-form.com/

React Hook Form is a react hook that others an alternative implementation to handle forms in React.

For simple form implements, you will typically rely on 3 things: register, handleSubmit and formState:

```JSX
import { useForm } from "react-hook-form"; // Import the "useForm" hook from reach hook form

function ExampleComponent() {
    const {register, handleSubmit, formState: {errors}} = useForm();

    return <div></div>
}
```

#### Register & Validation

You can use the "register" function to register your input/component into the form so that Reach Hook Form can handle the form validation and submission.

For example, the following code registers the value of the inputs into variables called "firstName" and "lastName":

```JSX
<form>
  <input {...register("firstName")} placeholder="First Name"/>
  <input {...register("lastName")} placeholder="Last Name"/>
</form>
```

To add validation to the inputs, you supply a second argument to the register function which contains the validation definition (https://react-hook-form.com/get-started#Applyvalidation):

```JSX
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("firstName", { required: true, maxLength: 20 })} />
  <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
  <input type="number" {...register("age", { min: 18, max: 99 })} />
  <input type="submit" />
</form>
```

#### Submitting the Form

To submit the form (and simultaneously validate the form data), you must use the handleSubmit() method on the <form> element, like so:

```JSX
function onFormSubmit() {
  alert("Form submitted")
}

<form onSubmit={handleSubmit(onFormSubmit)}>
  <input {...register("firstName")} />
  <input type="submit" />
</form>
```

The handleSubmit() method should be given the name of another method, "onFormSubmit" in this case, which is the method that will actually deal with the form data, once the handleSubmit() method has finished validating the data and updating the formState.

To access the data in the form, you can use the "data" method argument which accessible in the method that is called after handleSubmit():

```JSX
function onFormSubmit(data) {
 alert(`The first name is ${data.firstName}`)
}

<form onSubmit={handleSubmit(onFormSubmit)}>
 <input {...register("firstName")} />
 <input type="submit" />
</form>
```

#### Getting Validation Errors

To get the validation errors, you can use the "errors" object from the formState (https://react-hook-form.com/get-started#Handleerrors).
The formState will place any error information inside the "errors" object, matching the name of the registered form field. For example `register("firstName")` will have its errors sorted under `errors.firstName`:

```JSX
<form onSubmit={handleSubmit(onFormSubmit)}>
  <input {...register("firstName")} />
  {errors.firstName && <p role="alert">{errors.firstName.message}</p>}

  <input type="submit" />
</form>
```

### React State

Docs: https://react.dev/learn/state-a-components-memory

State allows your data (variables, arrays, objects, etc.) to be recognized and remembered by your React components. This allows state data to affect the composition of your React components. If you are displaying a state variable on your page, for example, if you update that state variable, the changes will be reflected on the page.

To use state variables, you need to use the `useState()` react hook, like so:

```JSX
const [name, setName] = useState(null);
```

You need to supply 3 pieces of information: the variable name, the setter method and the default value:

1. The first value in the array is the state variable name ("name" in this case).
2. The second value is the setter method that is used to update the state ("setName" in this case). You DO NOT have to create this method, simply give it the proper name according to the naming convention, which is "set" followed by the variable name with a capitalized first letter.
3. The useState() hook itself takes 1 paramter and this is the state variable's default value ("null" in this case). if you want your state variable to have a default value, pass it into the useState() hook.

Example:

```JSX
import { useState } from "react"

export default function ExampleComponent() {
    // state hook used and default value set
    const [count, setCount] = useState(0);

    function incrementCount() {
      // state variable setter method used
      setCount(count + 1);
    }

    // state variable displayed
    return <button onClick={incrementCount}>Count: {count}</button>
}
```

#### Working with Arrays

If your state variable is an array and you want to update it, you should do so in a way that does not mutate the array directly, as advised by React: https://react.dev/learn/updating-arrays-in-state.  
Remember, let React update your state, not you.

If you want to add data to a state variable array, you can use the spread operator `...` which create a copy of the array, then append your additional data onto the copy:

```JSX
import { useState } from "react"

export default function ExampleComponent() {
    const [books, setBooks] = useState(["book 1", "book 2"]);

    function addBook() {
      setBooks([...books, "book 3"]);
    }

    return <div></div>
}
```

### React Hooks

React hooks are special functions that allow you to use React features inside of them like React state and lifecycle features.
The naming convention for hooks is that they must start with "use", e.g. useState() or useNavigate().

There are a couple of rules for React hooks:

1. You can call hooks at the top level of your component. You cannot call them from inside another function.  
   Correct:

```JSX
import { useState } from "react"

export default function ExampleComponent() {
    const [name, setName] = useState(null);

    function innerFunction() {
      setName("Joe");
    }

    return <div></div>
}
```

Incorrect:

```JSX
import { useState } from "react"

export default function ExampleComponent() {
    function innerFunction() {
      const [name, setName] = useState(null);
      setName("Joe");
    }

    return <div></div>
}
```

2. You can only call a hook from inside a component or other hooks.

### React Context

Docs: https://react.dev/learn/passing-data-deeply-with-context
Useful video: https://www.youtube.com/watch?v=n7xQVRpYHYY

React Context allows you to pass properties and state variables between components.

As explained above, you can pass data between components using [React properties](#react-properties). This is most useful when you need to pass data down the component tree one level at a time. If you want to pass data across the same component tree level or down multiple levels at once, React Context may be more useful.

#### Using Context

To create a context, use the `createContext()` method:

```JSX
import { createContext } from 'react'

const ItemContext = React.createContext();
```

Now that you have created the "ItemContext" content, you can use a context provider component. The context provider component is named using the name of the context plus ".Provider", so `<ItemContext.Provider>` in this case. Any child components of this provider will have access to the context data.  
To pass data to the child components using the context provider, you need to use the "value" property:

```JSX
{/*Inside the App.jsx file*/}

import { createContext } from 'react'

const ItemContext = React.createContext();

export default function App() {
  const items = {food: 'Pizza', drink: 'Soda'};

  return (
    <ItemContext.Provider value={items}>
      <Kitchen />
      <DiningRoom />
    </ItemContext.Provider>
  );
}
```

Then, to access the data from within the child components, you use the `useContext()` hook and pass in the name of the context (you will need to make the context exportable first, e.g. `export const ItemContext = React.createContext();`):

```JSX
{/*Inside the Kitchen.jsx file*/}
import { useContext } from 'react'

export default function Kitchen() {
  const items = useContext(Context);

  return <p>Serving: {items.food} and {items.drink}</p>;
}

{/*Inside the DiningRoom.jsx file*/}
import { useContext } from 'react'

export default function DiningRoom() {
  const items = useContext(Context);

  return <p>Serving: {items.food}</p>;
}
```

Note that if you are passing in multiple items into your context, you need to use double curly brackets for the "value" propery, for example:

```JSX
{/*Inside the App.jsx file*/}
import { createContext, useState } from 'react'

const ItemContext = React.createContext();

export default function App() {
  const [items, setItems] = useState({food: 'Pizza', drink: 'Soda'});

  return (
    <ItemContext.Provider value={{items, setItems}}>
      <Kitchen />
      <DiningRoom />
    </ItemContext.Provider>
  );
}

{/*Inside the Kitchen.jsx file*/}
import { useContext } from 'react'

export default function Kitchen() {
  const {items, setItems} = useContext(Context);

  return <p>Serving: {items.food} and {items.drink}</p>;
}
```

#### Centralizing Context

In the previous examples, the context is implemented in the App.jsx file in the App component. When the context is small this may be fine, but as your context grows or you want to add multiple contexts to the same file, this could get out-of-hand.  
Instead, you can contain all the context information in its own file:

```JSX
{/*Inside the ItemContext.jsx file*/}
import { createContext, useContext, useState } from "react";

const ItemContext = createContext(null);

export default function ItemProvider({ children }) {
    const [items, setItems] = useState({food: 'Pizza', drink: 'Soda'});

    function getTotalCalories() {
      // Method logic
    }

    function clearItems() {
      // Method logic
    }

    return (
        <ItemContext.Provider value={{ items, getTotalCalories, clearItems }}>{children}</ItemContext.Provider>
    )
}

// This is a custom React hook
// It is used to export the ItemContext with explicitly doing so
// Instead, users can import the useItems() hook to get access to the context
export function useItems() {
    const context = useContext(ItemContext);

    return context;
}
```

In this file, the ItemContext is not exported as it is exposed using a custom React hook called `useItems()`.
Also, the ItemProvider component passes the context data to its child components.

With this implementation, the App and Kitchen components will look like this:

```JSX
{/*Inside the App.jsx file*/}
import ItemProvider from './ItemContext';

export default function App() {
  return (
    <ItemProvider>
      <Kitchen />
      <DiningRoom />
    </ItemProvider>
  );
}

{/*Inside the Kitchen.jsx file*/}
import { useItems } from './ItemContext';

export default function Kitchen() {
  const { items, getTotalCalories, clearItems } = useItems();

  return <p>Serving: {items.food} and {items.drink}</p>;
}
```

---
marp: true
---

# Reducers

---

### The limitations of `useState`

No restrictions. It's the wild west.

```js
const App = () => {
  const [count, setCount] = useState(0);

  setCount("Hello"); // Whyyyyy? Makes no sense!
};
```

---

### The limitations of `useState`

It spreads your application logic around

```js
const App = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            Count: {count}
            <Game count={count} setCount={setCount} />
            <Reset setCount={setCount} />
        </>
    );
};

const Game = ({ count, setCount }) => {
  // Some logic here:
    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </>
    );
};

const Reset = ({ setCount }) => {
    // Some other logic here:
    return (
        <>
            <button onClick={() => setCount(0)}>Reset</button>
        </>
    );
};
```

---

### Introducing: `useReducer`

This is a _powerful_ but _complex_ tool

---

### `useReducer` demo

```js
// All of our logic is contained here.
// There is no other way to change the state.
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      throw new Error("Unrecognized action");
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <>
      Count: {state}
      <Game dispatch={dispatch} />
      <Reset dispatch={dispatch} />
    </>
  );
};

const Game = ({ dispatch }) => {
  return (
    <>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </>
  );
};

const Reset = ({ dispatch }) => {
  return (
    <>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </>
  );
};
```

---

# Terminology

### `action`

An `action` is a regular JavaScript object that has a `type` key. It usually decribes an event. It can also carry data.

```js
{ type: 'INCREMENT' }

{ type: 'WIN_GAME' }

{
    type: 'submit-registration',
    username: 'seriousbanker123',
    password: 'passw0rd',
    agreedToTerms: true,
}

{
    type: 'registration-failure',
    message: 'Your password is too insecure.',
}
```

---

# Terminology

### `reducer`

A function that takes the current `state` and an `action`, and uses that information to produce a new `state`.

You never call this function yourself. You pass it to `useReducer`

---

By convention, `reducer` often take this form:

```js
const reducer = (state, action) => {
    switch (action.type) {

        case "some-action": {
            // return some new state
        }

        case "some-other-action": {
            // return some other new state
        }

        default: {
            // If no action matches, this must be a mistake
            throw new Error("whoopsie");
        }
    }
}
```

The `switch` statement is a popular convention, but it's optional. You can write `reducer` however you want.

---

Another example:

```js
const reducer = (state, action) => {

    if (action.type === "some-action") {
        return "hiiii";
    } 
    else if (action.type === "some-other-action") {
        return "byeee";
    } 
    else {
        throw new Error("whoopsie");
    }
};
```

---

# Terminology

### `dispatch`

When you call `useReducer`, you get two things out:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

The first item in that array is the state.

The second item is `dispatch`. It takes an `action` as an argument, and it calls the `reducer` function. This will trigger a re-render.

---

# Immutable updates

It's important that you don't _mutate_ the existing state:

```js
// 🚨 don't do this:
const reducer = (state, action) => {
    switch (action.type) {
        
        case "updateUserInfo": {
            state.firstName = action.firstName;
            state.lastName = action.lastName;

            return state;
        }
    }
}
```

---

# Fixing it

Always return a new object.

```js
const initialState = {
    numOfBeans: 2,
    numOfButtons: 0,
};

const reducer = (state, action) => {
    switch(action.type) {

        case "increment-beans": {
            return {
                numOfButtons: state.numOfButtons,
                numOfBeans: state.numOfBeans + 0.5,
            }
        }
    }
};
```

---

### Pro-tip: Spread operator

```js
const initialState = {
    numOfBeans: 2,
    numOfButtons: 0,
    numOfBananas: 10,
    numOfBlasters: 8,
};

const reducer = (state, action) => {
    switch(action.type) {

        case "increment-beans": {
            return {
                ...state, // <--- 👀
                numOfBeans: state.numOfBeans + 0.5,
            }
        }
    }
};
```

---

# Quiz

What does the following output to the console?

```js
const obj = {
    numOfBeans: 2,
    numOfButtons: 0,
};

const grantHalfBean = (someObject) => {
    someObject.numOfBeans += 0.5;
    return someObject;
}

const updatedObj = grantHalfBean(obj);

console.log(obj === updatedObj);
```

---

You must produce a **new value** from the reducer, so that React knows it has to update!

---

# Demo

```jsx live=true
const initialState = {
    numOfBeans: 2,
    numOfButtons: 0,
};

const reducer = (state, action) => {
    switch(action.type) {

        case "increment-beans": {
            return {
                ...state,
                numOfButtons: state.numOfButtons + 1,
                numOfBeans: state.numOfBeans + 2,
            }
        }
    }
};

const App = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    console.log(state);

    return (
        <div>
            <h1>
                {state.numOfBeans} Beans,
                {state.numOfButtons} Buttons.
            </h1>
            <button
                onClick={() => {
                    dispatch({
                        type: "increment-beans",
                    })}
                }
            >
                Click
            </button>
        </div>
    );
};

render(<App />);
```

---

# Exercises

Update these objects to use `useReducer`, with a single immutable object

---

```jsx
const Game = () => {
    const [points, setPoints] = useState(0);
    const [status, setStatus] = useState("idle");

    return (
        <>
            Your score: {points}.
            {status === "playing" && (
                <>
                <button onClick={() => setPoints(points + 1)}>🍓</button>
                <button onClick={() => setPoints(points - 1)}>💀</button>
                </>
            )}
            <button onClick={() => setStatus("playing")}>Start game</button>
        </>
    );
};
```

---

```jsx
import sendDataToServer from "./some-madeup-place";
import FormField from "./some-other-madeup-place";

const SignUpForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <form onSubmit={sendDataToServer}>
            <FormField
                label="First Name"
                value={firstName}
                onChange={(ev) => setFirstName(ev.target.value)}
            />
            <FormField
                label="Last Name"
                value={lastName}
                onChange={(ev) => setLastName(ev.target.value)}
            />
            <FormField
                label="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
            />

            <button type="submit">Submit</button>
            <button
                onClick={(ev) => {
                    ev.preventDefault();

                    setFirstName("");
                    setLastName("");
                    setEmail("");
                }}
            >
                Reset
            </button>
        </form>
    );
};
```

---

# `useState` vs `useReducer`

`useReducer` is good when the logic to update state is non-trivial (**global to the app**), or you have a complex state shape (**lots of related data**).

`useState` is good for small and simple bits of state (**local to a component**).

No hard rules though. Learn both, but use whichever you want.

---

# `useReducer` and `useContext`

Because _global state_ often has _non-trivial logic_, these two hooks/patterns are frequently used together.

---

```jsx
// UserContext.js
export const UserContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {

        case "login": {
            return action.user;
        }

        case "logout": {
            return null;
        }

        case "change-email": {
            return {
                ...state,
                email: action.email,
            };
        }

        default: {
            throw new Error("unrecognized action: " + action.type);
        }
    }
}

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, null);

    // dispatching function
    const userLogin = (data) => {
        dispatch({
            type: "login",
            ...data
        })
    }

    return (
        <UserContext.Provider value={{ state, actions: {userLogin} }}>
            {children}
        </UserContext.Provider>
    );
};
```

---

# Exercises

Finish writing the following context components with `useReducer`

---

```js
export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState({
        aditya: false,
        bodhi: false,
        chetan: false,
    });

    // We need actions to:
    // - mark a student as "present"
    // - mark a student as "absent",
    // - add a student to the class.

    return (
        <StudentContext.Provider value={{ state }}>
            {children}
        </StudentContext.Provider>
    );
};
```

---

- https://reactjs.org/docs/hooks-reference.html#usereducer

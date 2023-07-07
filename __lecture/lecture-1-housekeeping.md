---
marp: true
---

# Reducers and NPM Ecosystem

---

# Housekeeping:

### Context components

It's common convention to create a component file to deal exclusively with a certain context.

---

```jsx
export const UserContext = createContext("user");

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
```

---

With this component created, we _import the provider_ to make that state globally available.

```jsx
import ReactDOM from 'react-dom';
import App from './components/App';
import UserProvider from "./UserContext";

const rootElement = document.getElementById('root');

ReactDOM.render(
    <UserProvider>
        <App />
    </UserProvider>,
    rootElement);
```

---

Then, we can access that state anywhere!

```jsx
import { UserContext } from "./UserContext";

const Navigation = () => {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <ul>
        {!user && (
          <li>
            <LoginDialogTrigger />
          </li>
        )}
      </ul>
    </nav>
  );
};
```

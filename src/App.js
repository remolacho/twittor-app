import React, {useState} from "react"
import SignInSignUp from "./pages/SignInSignUp"

function App() {
    const [user, setUser] = useState(    null);

    return (
        <div>
            {user ? (
                <h1>No logueado...</h1>

            ) : (
                <SignInSignUp />
            )}
        </div>
    )
}

export default App;

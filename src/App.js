import React, {useState} from "react"
import SignInSignUp from "./pages/SignInSignUp"

function App() {
    const [user, setUser] = useState(    {user: {
            name: "Jonathan"
        }
    })

    return (
        <div>
            {user ? (
                <SignInSignUp />
            ) : (
               <h1>No logueado...</h1>
            )}
        </div>
    )
}

export default App;

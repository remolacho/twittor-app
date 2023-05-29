import React, {useState} from "react"
import SignInSignUp from "./pages/SignInSignUp"
import {ToastContainer} from "react-toastify"

function App() {
    const [user, setUser] = useState(    null);

    return (
        <div>
            {user ? (
                <h1>No logueado...</h1>
            ) : (
                <SignInSignUp />
            )}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default App;

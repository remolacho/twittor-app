import React, {useState, useEffect} from "react"
import SignInSignUp from "./pages/SignInSignUp"
import {ToastContainer} from "react-toastify"
import {AuthContext} from "./utils/contexts"
import {isExpiredToken, isUserLoggedApi} from "./services/users/auth";

function App() {
    const [user, setUser] = useState(null);
    const [loadUser, setLoadUser] = useState(false);
    const [refreshLogin, setRefreshLogin] = useState(false);

    useEffect(() => {
        setUser(isUserLoggedApi());
        setLoadUser(true);
        setRefreshLogin(false);
    }, [refreshLogin])

    if (!loadUser) return null;

    return (
        <AuthContext.Provider value={user}>
            { user ? <h1>Estas logueado...</h1> : <SignInSignUp setRefreshLogin={setRefreshLogin}/> }

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
        </AuthContext.Provider>
    )
}

export default App;

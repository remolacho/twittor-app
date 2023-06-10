import React, {useState, useEffect} from "react"
import SignInSignUp from "./pages/SignInSignUp"
import {ToastContainer} from "react-toastify"
import {AuthContext} from "./utils/contexts"
import {isUserLoggedApi} from "./services/users/auth";
import Routing from "./routers/Routing";

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
            { user ? <Routing/> : <SignInSignUp setRefreshLogin={setRefreshLogin}/> }

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

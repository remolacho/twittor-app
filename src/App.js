import React, {useState, useEffect} from "react"
import SignInSignUp from "./pages/users/SignInSignUp"
import {ToastContainer} from "react-toastify"
import {AuthContext} from "./utils/contexts"
import {userLoggedApi} from "./services/users/auth";
import Routing from "./routers/Routing";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadUser, setLoadUser] = useState(false);
    const [callLogin, setCallLogin] = useState(false);

    useEffect(() => {
        setCurrentUser(userLoggedApi());
        setLoadUser(true);
        setCallLogin(false);
    }, [callLogin])

    if (!loadUser) return null;

    return (
        <AuthContext.Provider value={currentUser}>
            {
                currentUser ?
                    <Routing setCallLogin={setCallLogin} callLogin={callLogin}/>
                :
                    <SignInSignUp setCallLogin={setCallLogin}/>
            }

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

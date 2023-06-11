import React, {useState, useEffect} from "react"
import SignInSignUp from "./pages/SignInSignUp"
import {ToastContainer} from "react-toastify"
import {AuthContext} from "./utils/contexts"
import {userLoggedApi} from "./services/users/auth";
import Routing from "./routers/Routing";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadUser, setLoadUser] = useState(false);
    const [refreshLogin, setRefreshLogin] = useState(false);

    useEffect(() => {
        setCurrentUser(userLoggedApi());
        setLoadUser(true);
        setRefreshLogin(false);
    }, [refreshLogin])

    if (!loadUser) return null;

    return (
        <AuthContext.Provider value={currentUser}>
            {
                currentUser ?
                    <Routing setRefreshLogin={setRefreshLogin} />
                :
                    <SignInSignUp setRefreshLogin={setRefreshLogin}/>
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

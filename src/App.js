import React, {useState} from "react"

function App() {
    const [user, setUser] = useState(null)

    return (
        <div>
            {user ? <h1>Estas loguado</h1> : <h1>No estas logueado</h1>}
        </div>
    )
}

export default App;

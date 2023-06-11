import Error404 from "../pages/Error404"
import Home from "../pages/Home"
import Profile from "../pages/users/Profile";

export default [
    {
        path: "users/profile/:userId",
        exact: true,
        page: Profile
    },
    {
        path: "/",
        exact: true,
        page: Home
    },
    {
        path: "*",
        page: Error404
    }
]

import Error404 from "../pages/Error404"
import Home from "../pages/Home"
import Profile from "../pages/users/Profile";
import Contacts from "../pages/users/Contacts";

export default [
    {
        path: "users/contacts",
        exact: true,
        page: Contacts
    },
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

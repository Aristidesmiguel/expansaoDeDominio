
import { Dashboard, Home, Login, SingIn } from "@/pages";
import { routerApp} from "@/utils/constants";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PageCollection } from "@/myComponents";



export const router = createBrowserRouter(
    [
        {
            path: routerApp.home,
            element: <Home/>,
            errorElement: <div>Error ola</div>,
        },
        {
            path: routerApp.login,
            element: <Login/>,
        },
        {
            path: routerApp.cadastrar,
            element: <SingIn/>,
        },
        {
            path: routerApp.dashboard,
            element: <ProtectedRoute><Dashboard/></ProtectedRoute>,
        },
        {
            path: `${routerApp.dashboard}/:id`,
            element: <ProtectedRoute><PageCollection/></ProtectedRoute>,
        },
    ]
)
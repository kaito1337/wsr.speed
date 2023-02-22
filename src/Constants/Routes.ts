import { Home } from "../UI/Pages/Home";
import { Login } from "../UI/Pages/Login";
import { Register } from "../UI/Pages/Register";


interface IRoutes{
    path: string;
    page: () => JSX.Element;
}

export const Routes: IRoutes[] = [
    {
        path: '/',
        page: Register 
    },
    {
        path: '/login',
        page: Login
    },
    {
        path: '/home',
        page: Home
    }
]
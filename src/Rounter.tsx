import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Booking } from "./pages/Booking";
import { Contact } from "./pages/Contact";
import { Menu } from "./pages/Menu";
import { AdminPage } from "./pages/AdminPage";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./pages/Layout";
import { Test } from "./pages/Test";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFound />, 
        children: [
            {
                path: '/',
                element: <Home />,
                index: true,
            },
            {
                path: '/menu',
                element: <Menu />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/booking',
                element: <Booking />,
            },
            {
                path: '/test',
                element: <Test />
            }
        ]
    },
    {
        path: '/admin_page',
        element: <AdminPage />
    }
])
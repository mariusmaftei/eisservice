import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import RootLayout from "./components/RootLayout/RootLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AdminPage from "./pages/admin/AdminPage";
import CategoriesPage from "./pages/categories/CategoriesPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={route} />;
}
export default App;

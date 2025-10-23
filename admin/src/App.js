import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext.js";
import RootLayout from "./components/RootLayout/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.js";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.js";
import AuthPage from "./pages/auth/AuthPage.js";
import AccessDeniedPage from "./pages/access-denied/AccessDeniedPage.js";
import NotFoundPage from "./pages/404/NotFoundPage.js";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CategoriesPage from "./pages/categories/CategoriesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/access-denied",
    element: <AccessDeniedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
}
export default App;

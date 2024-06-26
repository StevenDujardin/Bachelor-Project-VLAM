import { Navigate, Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/useAuth";
import { ProtectedRoute } from "./ProtectedRoute";
import { Home } from "../pages/Home";
import { OverOns } from "../pages/OverOns";
import Login from "../pages/login";

import { ReceptenOverview } from "../pages/ReceptenOverview";
import { Recept } from "../pages/Recept";
import { BestPractice } from "../pages/BestPractice";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ReceptEdit } from "../pages/ReceptEdit";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <div className="flex flex-col justify-center">
          <Outlet /> {/* This renders the current route's element */}
        </div>
      </main>
      <Footer />
      <ScrollRestoration/>
    </div>
  );
};

const Routes = () => {
  const { isLoggedIn } = useAuth();

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/over-ons",
      element: <OverOns />,
    },
    {
      path: "/recepten",
      element: <ReceptenOverview />,
    },
    {
      path: "/recepten/:recipe_id",
      element: <Recept />,
    },
    {
      path: "/best-practices",
      element: <BestPractice />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        
        {
          path: "/recepten/:recipe_id/edit",
          element: <ReceptEdit />,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
      ],
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    {
      path: "/", // Wrap all routes under a single parent path
      element: <Layout />, // Apply the layout with header and footer here
      children: [
        ...routesForPublic,
        ...(!isLoggedIn ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />, // Catch-all route to redirect unknown paths to "/"
    },
  ]);
  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import RootLayout from "./layout/RootLayout";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/:id",
      element: <Details />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;

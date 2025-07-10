import { Routes, Route, Navigate } from "react-router-dom";
import { routeNames, routes } from "./routes/routes";
import { Suspense } from "react";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import Navbar from "./components/navbar/navbar";
import RouteLoader from "./routes/routeLoader";
import "./assets/languages/i18n"; // Ensure i18n is initialized

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Suspense fallback={<div>Loading app...</div>}>
          <Routes>
            {routes.map((route) => {
              const Component = route.component;

              const element =
                route.name === "login" ? (
                  <RouteLoader route={route}>
                    <Component />
                  </RouteLoader>
                ) : (
                  <ProtectedRoute>
                    <Navbar />
                    <RouteLoader route={route}>
                      <Component />
                    </RouteLoader>
                  </ProtectedRoute>
                );

              return (
                <Route key={route.name} path={route.path} element={element} />
              );
            })}
            <Route
              path="*"
              element={<Navigate to={`/${routeNames.notFound}`} />}
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

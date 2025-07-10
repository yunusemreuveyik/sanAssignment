import { Routes, Route, Navigate } from "react-router-dom";
import { routeNames, routes } from "./routes/routes";
import { Suspense } from "react";
import ProtectedRoute from "./components/protextedRoute/protectedRoute";
import Navbar from "./components/navbar/navbar";
import { usePrefetchTranslations } from "./assets/languages/usePrefetchTranslations";

export default function App() {
  usePrefetchTranslations();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route) => {
              const Component = route.component;

              const element =
                route.name === "login" ? (
                  <Component />
                ) : (
                  <ProtectedRoute>
                    <Navbar />
                    <Component />
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

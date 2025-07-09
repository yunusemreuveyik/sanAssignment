import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes/routes";
import { Suspense } from "react";
import ProtectedRoute from "./components/protextedRoute/protectedRoute";

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => {
          const Component = route.component;

          const element =
            route.name === "login" ? (
              <Component />
            ) : (
              <ProtectedRoute>
                <Component />
              </ProtectedRoute>
            );

          return <Route key={route.name} path={route.path} element={element} />;
        })}
        <Route path="*" element={<Navigate to="/403" />} />
      </Routes>
    </Suspense>
  );
}

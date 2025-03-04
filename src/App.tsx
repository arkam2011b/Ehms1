import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/auth/LoginForm";
import Dashboard from "./components/dashboard/Dashboard";
import routes from "tempo-routes";

function App() {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/home" element={<Home />} />

          {/* Add more routes as needed */}

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;

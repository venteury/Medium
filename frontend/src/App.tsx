import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import { lazy } from "react";
const HomePage = lazy(() => import("./pages/Homepage.tsx"));
interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children: React.ReactNode;
}
const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/signup" element={<h1>Sign up Page</h1>} />
        <Route
          path="/"
          element={
            <ProtectedRoute redirectPath="/login" isAllowed={true}>
              <PageLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<h1>Blog Page</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

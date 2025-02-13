import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import { lazy } from "react";
const HomePage = lazy(() => import("./pages/Homepage.tsx"));
const LognIn = lazy(() => import("./pages/Login.tsx"));
const SignUp = lazy(() => import("./pages/SignUp.tsx"));
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
        <Route path="/login" element={<LognIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute
              redirectPath="/login"
              isAllowed={(localStorage.getItem("token") ?? "") !== ""}
            >
              <PageLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/my-blogs" element={<h1>My Blogs</h1>} />
          <Route path="/editor" element={<h1>CREATE / EDIT Page</h1>} />
          <Route path="/blog/:id" element={<h1>Profile Page</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

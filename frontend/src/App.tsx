import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import { lazy } from "react";
const HomePage = lazy(() => import("./pages/Homepage.tsx"));
const LognIn = lazy(() => import("./pages/Login.tsx"));
const SignUp = lazy(() => import("./pages/SignUp.tsx"));
const MyBlogs = lazy(() => import("./pages/MyBlogs.tsx"));
const EditorPage = lazy(() => import("./pages/EditorPage.tsx"));
const ReadBlog = lazy(() => import("./pages/ReadBlog.tsx"));
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
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/blog/:id" element={<ReadBlog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

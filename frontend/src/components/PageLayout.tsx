import { Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary";
import { Spin } from "antd";
import Template from "./Template";

const PageLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <ErrorBoundary navigate={navigate} key={pathname}>
        <Template>
          <Suspense
            fallback={
              <div>
                <Spin size="large" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </Template>
      </ErrorBoundary>
    </>
  );
};

export default PageLayout;

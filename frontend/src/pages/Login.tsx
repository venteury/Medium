import { Input } from "@/components/ui/input";
import { LabelInputContainer } from "@/components/SignUp";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { login } from "@/api/services/authService";

export const words = [
  {
    text: "Welcome",
    className: "text-4xl font-bold",
  },
  {
    text: "to",
    className: "text-4xl font-bold",
  },
  {
    text: "Info",
    className: "text-4xl font-bold text-[#3b71ca]",
  },
  {
    text: "Edge",
    className: "text-4xl font-bold",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let pathName = window.location.pathname;
    if (!pathName.includes("login")) {
      console.log("effect");
      const isLoggedIn = localStorage.getItem("token");
      if (isLoggedIn) {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div>
      <section className="h-screen w-screen">
        <div className=" h-full px-6 py-24">
          <TypewriterEffect
            words={words}
            cursorClassName=""
            className="flex items-center justify-center"
          />
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* <!-- Left column container with background--> */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>

            {/* <!-- Right column container with form --> */}
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12 px-5 pr-10">
              <form>
                {/* <!-- Email input --> */}
                <LabelInputContainer className="mb-6">
                  <Input
                    type="email"
                    placeholder="Email address"
                    // size="large"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=""
                  ></Input>
                </LabelInputContainer>

                {/* <!--Password input--> */}
                <LabelInputContainer className="mb-6">
                  <Input
                    autoComplete="off"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=""
                    placeholder="Password"
                    // size="large"
                  ></Input>
                </LabelInputContainer>

                {/* <!-- Remember me checkbox --> */}
                <div className="mb-6 flex items-center justify-end">
                  <p className="mx-4 mb-0 text-center text-neutral-400  dark:text-neutral-200 text-sm">
                    Don't have an account &nbsp;?&nbsp;
                    <Link to="/signup" className="text-[#3b71ca]">
                      Sign Up
                    </Link>
                  </p>
                </div>

                {/* <!-- Submit button --> */}

                <span className="w-full">
                  <button
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        const res = await login({ email, password });
                        console.log(res);
                        if (res) {
                          navigate("/", { replace: true });
                        } else {
                          console.error("Login failed");
                        }
                      } catch (error) {
                        console.error("An error occurred during login", error);
                      }
                    }}
                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Sign in
                  </button>
                </span>

                {/* <!-- Divider --> */}
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center text-neutral-400  dark:text-neutral-200 text-xs">
                    venteury ©{new Date().getFullYear()}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

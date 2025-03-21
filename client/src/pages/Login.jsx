import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/auth/authSlice";
import { TbUserSquareRounded } from "react-icons/tb";
import { FiHome } from "react-icons/fi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, errorData } = useSelector((state) => state.auth);
  const [error, setError] = useState(errorData);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setError("All fields are required");
    }
    try {
      setLoading(true);
      const resultAction = await dispatch(login(formData));
      if (login.fulfilled.match(resultAction)) {
        navigate("/auction");
      } else {
        if (resultAction.payload) {
          setError(resultAction.payload);
          setLoading(false);
        } else {
          setError("Login failed. Please try again.");
          setLoading(false);
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/auction");
    }
  }, [user, navigate]);

  return (
    <section className="py-4 md:py-8">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center justify-between w-80 md:w-96 mb-4 text-2xl font-semibold text-gray-900">
          <IoArrowBackSharp
            className="w-8 h-8"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <TbUserSquareRounded className="w-12 h-12 -mb-8 z-10" />
          <FiHome
            className="w-8 h-8"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-6 md:space-y-8 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Login
            </h1>
            {error && (
              <span className="block px-3 text-red-600 font-semibold">
                {error}
              </span>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="login"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="name@xyz.com"
                  required=""
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  required=""
                  onChange={(e) =>
                    setformData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                />
              </div>
              {loading ? (
                <button
                  className="flex items-center justify-center gap-2 text-white bg-amber-600 py-1.5 px-4 rounded  w-full border"
                  disabled
                >
                  <svg
                    className="text-gray-300 animate-spin"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="text-gray-300"
                    ></path>
                  </svg>
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-amber-600 py-1.5 px-4 rounded  w-full"
                >
                  Login
                </button>
              )}

              <p className="text-sm text-center text-gray-500">
                Not a member yet?{" "}
                <a
                  href=""
                  className="font-medium text-teal-600 hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

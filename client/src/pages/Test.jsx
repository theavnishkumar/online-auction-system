import React from "react";

const Test = () => {
  return (
    <section className="py-4 md:py-8">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://www.svgrepo.com/show/335276/oldelectrum-logo.svg"
            alt="osher.ai logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Sign In Access
            </h1>
            {error && (
          <span className="block px-3 pb-2 text-red-600 font-semibold">
            {error}
          </span>
        )}
            <form
              className="space-y-4 md:space-y-6"
              method="POST"
              action={handleSubmit}
            >
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="login"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                />
              </div>
              <div>
                <label
                  for="password"
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
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
                <a
                  href=""
                  className="text-sm font-medium text-teal-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="text-white bg-teal-600 py-1.5 px-4 rounded  w-full"
              >
                SIGN IN
              </button>

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

export default Test;

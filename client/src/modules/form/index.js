import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { BACKEND_URL } from "../../Components/config.js";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiStar, FiArrowRight } from "react-icons/fi";

function Form({ isSignin = false, setToken, setUser }) {
  const [data, setData] = useState({
    ...(!isSignin && { fullName: "" }),
    email: "",
    password: "",
    interest: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/${isSignin ? "login" : "register"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      const resData = await res.json();
      if (resData.token) {
        localStorage.setItem("user:token", resData.token);
        localStorage.setItem("user:details", JSON.stringify(resData.user));
        setToken(resData.token);
        setUser(resData.user);
        await navigate("/DashBoard");
      } else {
        alert(resData.message || "Authentication failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#edf2f7] flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-[#155eef]/20">
      <div className="w-full max-w-6xl min-h-[500px] h-auto lg:h-[600px] flex rounded-2xl overflow-hidden bg-white border border-[#cfdbe8] shadow-2xl shadow-[#102a43]/10">
        {/* Left Side: Dynamic Visual */}
        <div className="hidden lg:flex w-1/2 relative bg-[#10213d] overflow-hidden items-center justify-center">
          {/* Abstract background elements */}
          <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-[#155eef]/35 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#ff8a4c]/25 rounded-full blur-[120px]"></div>

          <div className="relative z-10 p-12 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
                <div className="w-24 h-24 mx-auto bg-[#155eef] rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-[#155eef]/20 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                BuddyFinder
              </h1>
              <p className="text-[#b8c7df] text-lg max-w-sm mx-auto leading-relaxed">
                Connect with the brightest minds and accelerate your
                professional growth.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-white z-10">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-3xl font-bold text-[#10213d] mb-2">
              {isSignin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-[#53627a] mb-8">
              {isSignin
                ? "Enter your details to access your dashboard."
                : "Join our community and start connecting today."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isSignin && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-violet-400 transition-colors">
                    <FiUser />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full bg-[#f5f7fb] border border-[#dfe6f0] text-[#10213d] rounded-lg pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#155eef]/20 focus:border-[#155eef] transition-all"
                    value={data.fullName}
                    onChange={(e) =>
                      setData({ ...data, fullName: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-violet-400 transition-colors">
                  <FiMail />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-[#f5f7fb] border border-[#dfe6f0] text-[#10213d] rounded-lg pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#155eef]/20 focus:border-[#155eef] transition-all"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>

              {!isSignin && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-violet-400 transition-colors">
                    <FiStar />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Main Interest or Profession"
                    className="w-full bg-[#f5f7fb] border border-[#dfe6f0] text-[#10213d] rounded-lg pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#155eef]/20 focus:border-[#155eef] transition-all"
                    value={data.interest}
                    onChange={(e) =>
                      setData({ ...data, interest: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-violet-400 transition-colors">
                  <FiLock />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    className="w-full bg-[#f5f7fb] border border-[#dfe6f0] text-[#10213d] rounded-lg pl-11 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#155eef]/20 focus:border-[#155eef] transition-all"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#155eef] hover:bg-[#0f4dcc] text-white font-semibold py-3.5 rounded-lg transition-all shadow-lg shadow-[#155eef]/20 active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : isSignin
                    ? "Sign In"
                    : "Create Account"}
                {!loading && <FiArrowRight />}
              </button>
            </form>

            <div className="mt-8 text-center text-[#53627a] text-sm">
              {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                className="text-[#155eef] font-medium hover:text-[#0f4dcc] hover:underline transition-all"
                onClick={() =>
                  navigate(`/users/${isSignin ? "sign_up" : "sign_in"}`)
                }
              >
                {isSignin ? "Sign up for free" : "Log in"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Form;

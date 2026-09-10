import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

function Taskbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#cfdbe8] bg-[#edf2f7]/95 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#155eef] flex items-center justify-center shadow-lg shadow-[#155eef]/20 group-hover:shadow-[#155eef]/35 transition-all duration-300">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-[#10213d] tracking-[-0.04em]">
            BuddyFinder
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#53627a]">
          <a href="#product" className="hover:text-[#155eef] transition-colors">Product</a>
          <a href="#about" className="hover:text-[#155eef] transition-colors">About</a>
          <a href="#blog" className="hover:text-[#155eef] transition-colors">Community</a>
          <a href="#contact" className="hover:text-[#155eef] transition-colors">Contact</a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => navigate('/users/sign_in')}
            className="px-5 py-2.5 text-sm font-semibold text-[#53627a] hover:text-[#10213d] transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/users/sign_up')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#10213d] hover:bg-[#1c3155] rounded-lg transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-[#53627a] hover:text-[#10213d] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-[#dfe6f0] bg-[#f5f7fb] px-6 py-6 space-y-4"
        >
          <div className="flex flex-col gap-4 text-[#53627a]">
            <a href="#product" className="hover:text-[#155eef]" onClick={() => setIsOpen(false)}>Product</a>
            <a href="#about" className="hover:text-[#155eef]" onClick={() => setIsOpen(false)}>About</a>
            <a href="#blog" className="hover:text-[#155eef]" onClick={() => setIsOpen(false)}>Community</a>
            <a href="#contact" className="hover:text-[#155eef]" onClick={() => setIsOpen(false)}>Contact</a>
          </div>
          <div className="flex flex-col gap-3 pt-4 border-t border-[#dfe6f0]">
            <button 
              onClick={() => navigate('/users/sign_in')}
              className="w-full px-5 py-3 text-sm font-semibold text-[#10213d] bg-white border border-[#dfe6f0] rounded-lg hover:bg-[#eef2f7] transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/users/sign_up')}
              className="w-full px-5 py-3 text-sm font-semibold text-white bg-[#155eef] rounded-lg hover:bg-[#0f4dcc] transition-colors"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Taskbar;

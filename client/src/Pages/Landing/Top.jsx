import { useNavigate } from "react-router-dom";
import Taskbar from "./Taskbar.jsx";
import Video from "./Video.jsx";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

function Top() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#edf2f7] text-[#102a43]">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60" style={{ backgroundImage: "linear-gradient(#cfdbe8 1px, transparent 1px), linear-gradient(90deg, #cfdbe8 1px, transparent 1px)", backgroundSize: "64px 64px" }}></div>
      <div className="absolute -top-32 right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#dbe8ff] blur-3xl"></div>

      <Taskbar />

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pt-32 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#cfdbe8] text-[#155eef] text-sm font-semibold mb-8 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff8a4c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff8a4c]"></span>
            </span>
            Empowering Connections for Future Success
          </motion.div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-[-0.06em] text-[#102a43] mb-8 leading-[0.98]">
            Find your people. <br className="hidden md:block" />
            <span className="text-[#155eef]">Build what matters.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#53627a] max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover opportunities, build meaningful networks, and boost your productivity. Engage with the right people, exchange skills, and achieve more together.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate("/users/sign_up")}
              className="w-full sm:w-auto px-8 py-4 bg-[#155eef] text-white rounded-lg font-bold text-lg hover:bg-[#0f4dcc] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#155eef]/20"
            >
              Start for free <FiArrowRight />
            </button>
            <button
              onClick={() => navigate("/users/sign_in")}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-[#cfdbe8] text-[#102a43] rounded-lg font-bold text-lg hover:bg-[#e4ebf3] transition-colors"
            >
              Sign In
            </button>
          </motion.div>
        </motion.div>

        {/* Video component */}
        <Video />
        
      </main>
    </div>
  );
}

export default Top;

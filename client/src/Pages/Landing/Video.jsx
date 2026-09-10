import demovideo from "../../assets/demovideo.mp4";
import { motion } from "framer-motion";

function Video() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 1, type: "spring" }}
      className="mt-20 w-full max-w-5xl bg-white border border-[#dfe6f0] rounded-t-2xl shadow-2xl shadow-[#10213d]/10 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-12 border-b border-[#dfe6f0] flex items-center px-6 gap-2 bg-white z-20">
        <div className="w-3 h-3 rounded-full bg-[#ff8a4c]"></div>
        <div className="w-3 h-3 rounded-full bg-[#f7c84b]"></div>
        <div className="w-3 h-3 rounded-full bg-[#35b779]"></div>
      </div>
      <div className="relative pt-12 w-full aspect-video bg-black">
        <video
          className="w-full h-full object-contain opacity-90"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={demovideo} type="video/mp4" />
        </video>
        
        {/* Overlay text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-8 right-8 z-30"
        >
          <div className="bg-[#10213d]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl inline-block max-w-md">
            <p className="text-white text-lg font-medium">
              <span className="text-[#ffb17f]">Search People</span> with Similar Interest
              and connect easily.
            </p>
          </div>
        </motion.div>
        
        {/* Fading bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none"></div>
      </div>
    </motion.div>
  );
}

export default Video;

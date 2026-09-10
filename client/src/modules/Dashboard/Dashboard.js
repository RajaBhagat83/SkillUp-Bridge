import { useEffect, useState } from "react";
import Avatar from "../../assets/avatar.svg";
import Input from "../input";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversations,
  messag,
  messaging,
  profiles,
  searchUsers,
  us,
  userpost,
  ViewingOwnProfiles,
} from "../../store/atoms/atom";
import { RiMegaphoneLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import goku from "../../assets/goku.jpg";
import Profile from "../input/Profile.js";
import Connection from "../Elements/Connection.js";
import Searching from "../Elements/Searching.js";
import PostPage from "../Elements/Post.js";
import Header from "../Elements/Header.js";
import { BACKEND_URL } from "../../Components/config.js";
import RagChat from "../Rag/RagChat.js";

function Dashboard({ handleLogout }) {
  const [user, setUser] = useRecoilState(us);
  const navigate = useNavigate();
  const [conversation, setConversation] = useRecoilState(conversations);
  const [profile, setProfile] = useRecoilState(profiles);
  const [searchUser, setSearchUsers] = useRecoilState(searchUsers);
  const [ViewingOwnProfile, setViewingOwnProfile] =useRecoilState(ViewingOwnProfiles);
  const [postUser, setPostuser] = useRecoilState(userpost);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user:details");
    if (user) setUser(JSON.parse(user));
  }, []);


  return (
    <div className="w-screen h-screen flex flex-col bg-[#edf2f7] dark:bg-[#0b1120] text-[#102a43] dark:text-slate-200 font-sans selection:bg-[#155eef]/20 transition-colors duration-300">
      <div className="flex flex-grow overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Connection
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 h-full relative overflow-y-auto bg-[#edf2f7] dark:bg-[#0b1120] transition-colors duration-300">
          {/* ── Header */}
          <Header
            handleLogout={handleLogout}
            setProfile={setProfile}
            profile={profile}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <main className="pt-20 sm:pt-24 px-0 sm:px-6 md:px-8 pb-12 w-full max-w-5xl mx-auto">
            <section className="mx-3 sm:mx-0 mb-6 rounded-2xl bg-[#10213d] dark:bg-[#111c31] px-5 py-5 sm:px-7 sm:py-6 text-white shadow-xl shadow-[#10213d]/10 dark:border dark:border-white/10 dark:shadow-black/20">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9abaf5]">
                    Your workspace
                  </p>
                  <h1 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                    Good to see you, {user?.fullName?.split(" ")[0] || "there"}.
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#b8c7df]">
                    Keep your network moving. Share an update, discover a new connection, or pick up a conversation.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/Search")}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-[#ff8a4c] px-4 py-2.5 text-sm font-bold text-[#10213d] transition hover:bg-[#ff9f6c] hover:-translate-y-0.5"
                >
                  Find connections
                </button>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/10 pt-4 sm:max-w-md sm:grid-cols-3">
                <div>
                  <p className="text-lg font-bold">{postUser.length}</p>
                  <p className="text-[11px] uppercase tracking-wider text-[#9abaf5]">Posts loaded</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{conversation.length}</p>
                  <p className="text-[11px] uppercase tracking-wider text-[#9abaf5]">Connections</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-lg font-bold">{user?.interest || "Open"}</p>
                  <p className="text-[11px] uppercase tracking-wider text-[#9abaf5]">Your focus</p>
                </div>
              </div>
            </section>
            {profile && (
              <div className="mb-8 transition-all duration-500 ease-out">
                <Profile
                  setProfile={setProfile}
                  profile={profile}
                  ViewingOwnProfile={ViewingOwnProfile}
                  setViewingOwnProfile={setViewingOwnProfile}
                />
              </div>
            )}

            <div className="mb-3 flex items-end justify-between px-3 sm:px-0">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#155eef]">
                  Community feed
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-[-0.02em] text-[#102a43] dark:text-white">
                  What your network is sharing
                </h2>
              </div>
              <span className="hidden text-xs font-semibold text-[#52647d] dark:text-slate-400 sm:block">
                Latest updates
              </span>
            </div>

            <div className="transition-all duration-700 ease-out rounded-3xl border border-[#cfdbe8] bg-[#e3eaf2] p-2 shadow-[0_10px_28px_rgba(16,42,67,0.06)] dark:border-white/10 dark:bg-[#0f172a] dark:shadow-black/10 sm:p-3">
              <PostPage />
            </div>
            {userpost != "" && (
              <div className="mt-8 text-center text-slate-500 dark:text-slate-400">
                {userpost[0]}
              </div>
            )}
          </main>
        </div>
      </div>
        <RagChat />
    </div>
  );
}

export default Dashboard;

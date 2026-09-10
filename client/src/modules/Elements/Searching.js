import { useEffect, useState } from "react";
import Input from "../input";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversations,
  profiles,
  searchUsers,
  us,
} from "../../store/atoms/atom";
import { useFetchMessage } from "../../utils/fetchMessage";
import { MdOutlineMessage } from "react-icons/md";
import { MdInterests, MdPerson } from "react-icons/md";
import goku from "../../assets/goku.jpg";
import { UserIcon } from "@heroicons/react/outline";
import Profile from "../input/Profile";
import CheckAuth from "./CheckAuth";
import { BACKEND_URL } from "../../Components/config";

export default function SearchUser() {
  const [user, setUser] = useRecoilState(us);
  const navigate = useNavigate();
  const [conversation, setConversation] = useRecoilState(conversations);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("interest");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const fetchMessage = useFetchMessage();
  const [searchUser, setSearchUsers] = useRecoilState(searchUsers);
  const [ViewingOwnProfile, setViewingOwnProfile] = useState(false);
  const [profile, setProfile] = useRecoilState(profiles);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${BACKEND_URL}/api/users`);
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      const term = searchTerm.trim().toLowerCase();
      setFilteredUsers(
        users.filter(
          (u) =>
            u.user[searchField]?.toLowerCase().includes(term) &&
            u.user.email !== user.email,
        ),
      );
    },500);

    return () =>clearTimeout(timer);
  }, [searchField, searchTerm, users, user.email]);

  useEffect(() => {
    if (!user?._id) return;
    let timer;
    const fetchData = async () => {
      const res = await fetch(`${BACKEND_URL}/api/conversation/${user._id}`);
      const data = await res.json();
      timer = setTimeout(() => {
        const search = searchUser.trim().toLowerCase();
        if (!search) return setConversation(data.filteredResult);
        setConversation(
          data.filteredResult.filter((item) =>
            item.user?.fullName?.toLowerCase().includes(search),
          ),
        );
      }, 500);
    };
    fetchData();
    return () => clearTimeout(timer);
  }, [user, searchUser]);

  const FetchMessages = (conversationId, receiver, openProfile = true) => {
    fetchMessage(conversationId, receiver, openProfile);
  };

  return (
    <div className="min-h-screen bg-[#edf2f7] dark:bg-[#0b1120] text-[#102a43] dark:text-slate-200 font-sans p-4 sm:p-8 pt-24 selection:bg-[#155eef]/20 transition-colors duration-300">
      <CheckAuth />

      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold text-[#10213d] dark:text-white mb-3 transition-colors">
            Find Buddies
          </h1>
          <p className="text-slate-500 dark:text-slate-400 transition-colors">
            Discover people with similar interests and start collaborating.
          </p>
        </div>

        <div className="relative mb-12 max-w-2xl mx-auto group animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="absolute inset-0 bg-[#155eef]/8 dark:bg-violet-500/20 rounded-2xl blur-xl group-focus-within:bg-[#155eef]/15 dark:group-focus-within:bg-violet-500/30 transition-all duration-500"></div>
          <div className="relative flex items-center gap-2 rounded-xl bg-white p-2 shadow-[0_8px_24px_rgba(16,42,67,0.07)] dark:bg-[#0f172a] dark:shadow-xl">
            <Input
              placeholder={
                searchField === "interest"
                  ? "Search users by interest... (e.g. React, Design)"
                  : "Search users by name..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative min-w-0 flex-1 border-0 p-2 text-lg shadow-none focus:outline-none focus:ring-0 placeholder-slate-400 dark:placeholder-slate-500 text-[#102a43] dark:text-slate-200 transition-all"
            />
            <div className="flex shrink-0 items-center gap-1" role="group" aria-label="Search by">
              <button
                type="button"
                aria-label="Search by interest"
                aria-pressed={searchField === "interest"}
                title="Search by interest"
                onClick={() => setSearchField("interest")}
                className={`rounded-lg p-2 transition-colors ${searchField === "interest" ? "bg-[#155eef] text-white dark:bg-violet-500" : "text-slate-400 hover:bg-slate-100 hover:text-[#155eef] dark:hover:bg-white/10 dark:hover:text-violet-300"}`}
              >
                <MdInterests size={21} />
              </button>
              <button
                type="button"
                aria-label="Search by name"
                aria-pressed={searchField === "fullName"}
                title="Search by name"
                onClick={() => setSearchField("fullName")}
                className={`rounded-lg p-2 transition-colors ${searchField === "fullName" ? "bg-[#155eef] text-white dark:bg-violet-500" : "text-slate-400 hover:bg-slate-100 hover:text-[#155eef] dark:hover:bg-white/10 dark:hover:text-violet-300"}`}
              >
                <MdPerson size={21} />
              </button>
            </div>
          </div>
        </div>

        {profile && (
          <div className="mb-8">
            <Profile
              setProfile={setProfile}
              profile={profile}
              ViewingOwnProfile={ViewingOwnProfile}
              setViewingOwnProfile={setViewingOwnProfile}
            />
          </div>
        )}

        {/* ── User cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map(({ user: u }, i) => (
            <div
              key={u._id}
              className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl border border-[#cfdbe8] dark:border-white/5 hover:border-[#7da7e8] dark:hover:border-violet-500/30 hover:bg-[#fbfcfe] dark:hover:bg-[#1e293b]/80 cursor-pointer transition-all duration-300 group shadow-[0_6px_18px_rgba(16,42,67,0.05)] dark:shadow-lg hover:shadow-md dark:hover:shadow-violet-500/10 animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${Math.min(i * 50, 500)}ms` }}
              onClick={() => FetchMessages("new", u, true)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={u?.profilePic ? `${u.profilePic}` : goku} loading="lazy"
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow-sm dark:shadow-md group-hover:shadow-[#155eef]/20 transition-all duration-300 border border-slate-100 dark:border-transparent"
                    alt="avatar"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-[#0f172a] ${u.isOnline ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-slate-300 dark:bg-slate-600"}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-white transition-colors truncate">
                    {u.fullName}
                  </div>
                  <div className="text-sm font-medium text-[#155eef] dark:text-violet-400/80 truncate mt-0.5 inline-block bg-[#eef4ff] dark:bg-violet-500/10 px-2 py-0.5 rounded-md border border-[#dbe8ff] dark:border-violet-500/20">
                    {u.interest}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="p-2 rounded-xl bg-violet-50 dark:bg-white/5 hover:bg-violet-100 dark:hover:bg-violet-500/20 text-violet-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-300 transition-colors"
                      onClick={(e) => {
                        navigate("/Messages");
                      }}
                    >
                      <MdOutlineMessage size={20} />
                    </div>
                    <div
                      className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/Profile/${u.receiverId}`);
                      }}
                    >
                      <UserIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-500 font-medium uppercase tracking-wider">
                    {u.isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-500">
            <div className="w-20 h-20 bg-slate-100 dark:bg-[#1e293b] rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-white/5">
              <UserIcon className="w-8 h-8 opacity-50" />
            </div>
            <p>No users found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

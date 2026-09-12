import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Profile", icon: "👤" },
    { name: "Messages", icon: "💬" },
    { name: "Analytics", icon: "📊" },
    { name: "Files", icon: "📁" },
    { name: "Portfolio", icon: "💼" },
    { name: "Saved", icon: "🔖" },
    { name: "Settings", icon: "⚙️" },
  ];

  const activities = [
    { title: "Website Project", status: "Completed", date: "Today" },
    { title: "React Dashboard", status: "In Progress", date: "Yesterday" },
    { title: "MongoDB Authentication", status: "Completed", date: "2 Days ago" },
    { title: "Portfolio Update", status: "Pending", date: "3 Days ago" },
  ];

  const handleMenuClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const API_URL =
    import.meta.env.VITE_API_URL ||
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:5000"
      : "https://mongo-db-ten-drab.vercel.app");

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch(`${API_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
      <aside className={`fixed lg:static top-0 left-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ${sidebarOpen? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-orange-400">KA Dashboard</h1>
            <p className="text-xs text-slate-400">Kanwal Afrin Sheikh</p>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button key={item.name} onClick={() => handleMenuClick(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${activePage === item.name? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-slate-300 hover:bg-slate-800"}`}>
              <span className="text-lg">{item.icon}</span><span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-5 left-4 right-4">
          <button onClick={handleLogout} disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition disabled:opacity-50">
            <span>🚪</span>{loggingOut? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <header className="h-20 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-2xl">☰</button>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">{activePage}</h2>
              <p className="text-xs sm:text-sm text-slate-400">Welcome back, Kanwal 👋</p>
            </div>
          </div>
          <div className="hidden md:block">
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-56 lg:w-72 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-orange-500" />
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">KA</div>
        </header>
        <section className="p-4 sm:p-6 lg:p-8">
          {activePage === "Dashboard" && (
            <>
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-orange-500/20 to-slate-800 border border-orange-500/20">
                <h3 className="text-2xl font-bold mb-2">Welcome to your Dashboard 🚀</h3>
                <p className="text-slate-400">Manage your projects, activities and account from here.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800"><p className="text-slate-400 text-sm">Total Projects</p><h3 className="text-3xl font-bold mt-2">12</h3><p className="text-green-400 text-sm mt-2">+12% this month</p></div>
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800"><p className="text-slate-400 text-sm">Completed</p><h3 className="text-3xl font-bold mt-2">8</h3><p className="text-green-400 text-sm mt-2">+8% this month</p></div>
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800"><p className="text-slate-400 text-sm">In Progress</p><h3 className="text-3xl font-bold mt-2">3</h3><p className="text-orange-400 text-sm mt-2">Active projects</p></div>
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800"><p className="text-slate-400 text-sm">Messages</p><h3 className="text-3xl font-bold mt-2">24</h3><p className="text-blue-400 text-sm mt-2">5 unread</p></div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800"><h3 className="text-xl font-bold">Recent Activity</h3><p className="text-sm text-slate-400 mt-1">Your latest project activity</p></div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead><tr className="border-b border-slate-800 text-left"><th className="px-6 py-4 text-slate-400 font-medium">Project</th><th className="px-6 py-4 text-slate-400 font-medium">Status</th><th className="px-6 py-4 text-slate-400 font-medium">Date</th></tr></thead>
                    <tbody>
                      {activities.map((activity, index) => (
                        <tr key={index} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50">
                          <td className="px-6 py-4">{activity.title}</td>
                          <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs ${activity.status === "Completed"? "bg-green-500/10 text-green-400" : activity.status === "In Progress"? "bg-orange-500/10 text-orange-400" : "bg-yellow-500/10 text-yellow-400"}`}>{activity.status}</span></td>
                          <td className="px-6 py-4 text-slate-400">{activity.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {activePage!== "Dashboard" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-3">{activePage}</h3>
              <p className="text-slate-400">Content for {activePage} will appear here.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;



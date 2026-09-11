import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navItems = [
    { icon: "📊", label: "Dashboard" },
    { icon: "👤", label: "Profile" },
    { icon: "✉️", label: "Messages" },
    { icon: "📈", label: "Analytics" },
    { icon: "📁", label: "Files" },
    { icon: "💼", label: "Portfolio" },
    { icon: "🔖", label: "Saved" },
    { icon: "⚙️", label: "Settings" },
  ];

  const allRows = [
    ["#1082", "Alex Mercer", "Upgraded Plan", "Completed", "bg-green-100 text-green-700"],
    ["#1081", "Jane Doe", "Support Ticket", "Pending", "bg-yellow-100 text-yellow-700"],
    ["#1080", "David Kim", "Cancelled Order", "Failed", "bg-red-100 text-red-700"],
    ["#1079", "Sarah Wilson", "Purchased Product", "Completed", "bg-green-100 text-green-700"],
    ["#1078", "John Smith", "Password Reset", "Waiting", "bg-yellow-100 text-yellow-700"],
  ];
  const rows = allRows.filter(r =>
    r[1].toLowerCase().includes(search.toLowerCase()) ||
    r[2].toLowerCase().includes(search.toLowerCase())
  );

  const cards = [
    { icon: "👥", value: "8,451", label: "Total Visitors", bg: "bg-blue-100 text-blue-600" },
    { icon: "💲", value: "$51,200", label: "Revenue", bg: "bg-green-100 text-green-600" },
    { icon: "🛒", value: "320", label: "Sales", bg: "bg-orange-100 text-orange-600" },
    { icon: "⏰", value: "99.9%", label: "Server Uptime", bg: "bg-purple-100 text-purple-600" },
  ];

  const renderContent = () => {
    if (activeTab === "Dashboard") return (
      <>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((c,i)=>(
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
              <div className={`w-14 h-14 ${c.bg} rounded-xl flex items-center justify-center text-2xl`}>{c.icon}</div>
              <div><h3 className="text-2xl font-bold">{c.value}</h3><p className="text-gray-500 text-sm">{c.label}</p></div>
            </div>
          ))}
        </section>
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b"><h3 className="text-lg font-bold">Recent Activity</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50"><tr>{["ID","User","Action","Status"].map(h=><th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
              <tbody className="divide-y">
                {rows.map((r,i)=>(
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{r[0]}</td>
                    <td className="px-6 py-4 text-sm font-medium">{r[1]}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{r[2]}</td>
                    <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${r[4]}`}>{r[3]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
    if (activeTab === "Profile") return (
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">A</div>
          <div><h2 className="text-2xl font-bold">Admin User</h2><p className="text-gray-500">admin@example.com</p>
          <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Phone</p><p className="font-semibold">+92 300 1234567</p></div>
          <div className="p-4 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Location</p><p className="font-semibold">Karachi, Pakistan</p></div>
          <div className="p-4 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Joined</p><p className="font-semibold">Jan 2024</p></div>
          <div className="p-4 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Role</p><p className="font-semibold">Administrator</p></div>
        </div>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Edit Profile</button>
      </div>
    );
    if (activeTab === "Messages") return (
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        <h3 className="text-lg font-bold mb-4">Inbox ✉️</h3>
        {[["Alex Mercer","Hey, plan upgrade ho gaya!","2m"],["Jane Doe","Support chahiye tha","1h"],["David Kim","Thanks for help","3h"]].map((m,i)=>(
          <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg border-b cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">👤</div>
            <div className="flex-1"><p className="font-semibold">{m[0]}</p><p className="text-sm text-gray-500">{m[1]}</p></div>
            <span className="text-xs text-gray-400">{m[2]}</span>
          </div>
        ))}
      </div>
    );
    if (activeTab === "Analytics") return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[["Traffic Growth","+24% this month","📈","bg-blue-500"],["Conversion Rate","3.2%","🎯","bg-green-500"],["Bounce Rate","42%","📉","bg-orange-500"],["Avg. Session","4m 32s","⏱️","bg-purple-500"]].map((a,i)=>(
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
            <div className={`w-12 h-12 ${a[3]} rounded-lg flex items-center justify-center text-white text-xl mb-3`}>{a[2]}</div>
            <p className="text-gray-500 text-sm">{a[0]}</p><p className="text-2xl font-bold">{a[1]}</p>
          </div>
        ))}
      </div>
    );
    if (activeTab === "Files") return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">My Files 📁</h3>
        {[["Project Report.pdf","2.4 MB","📄"],["Design Mockup.png","1.8 MB","🖼️"],["Data Sheet.xlsx","850 KB","📊"]].map((f,i)=>(
          <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-3">
            <span className="text-3xl">{f[2]}</span>
            <div className="flex-1"><p className="font-semibold">{f[0]}</p><p className="text-xs text-gray-500">{f[1]}</p></div>
            <button className="text-blue-600 text-sm font-semibold">Download</button>
          </div>
        ))}
      </div>
    );
    if (activeTab === "Portfolio") return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[["E-commerce Site","React + Node","🛒"],["Dashboard App","MERN Stack","📊"],["Blog Platform","Next.js","📝"]].map((p,i)=>(
          <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-5xl">{p[2]}</div>
            <div className="p-4"><p className="font-bold">{p[0]}</p><p className="text-sm text-gray-500">{p[1]}</p></div>
          </div>
        ))}
      </div>
    );
    if (activeTab === "Saved") return (
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        <h3 className="text-lg font-bold mb-4">Saved Items 🔖</h3>
        <p className="text-gray-500">Tum ne abhi kuch save nahi kiya. Koi item save karo ge to yahan dikhega.</p>
      </div>
    );
    if (activeTab === "Settings") return (
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        <h3 className="text-lg font-bold mb-6">Settings ⚙️</h3>
        {[["Email Notifications",true],["Dark Mode",false],["Auto Backup",true]].map((s,i)=>(
          <div key={i} className="flex justify-between items-center py-4 border-b">
            <span className="font-medium">{s[0]}</span>
            <div className={`w-12 h-6 rounded-full p-1 cursor-pointer ${s[1]?"bg-blue-600":"bg-gray-300"}`}>
              <div className={`w-4 h-4 bg-white rounded-full ${s[1]?"ml-auto":""}`}></div>
            </div>
          </div>
        ))}
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg">Save Changes</button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className={`fixed md:static z-20 w-64 bg-white shadow-lg h-screen transform transition-transform ${sidebarOpen?"translate-x-0":"-translate-x-full"} md:translate-x-0 flex flex-col`}>
        <div className="p-6 text-2xl font-bold border-b">Dashboard</div>
        <ul className="flex-1 p-4 space-y-1">
          {navItems.map((n,i)=>(
            <li key={i}><a onClick={()=>{setActiveTab(n.label); setSidebarOpen(false);}}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${activeTab===n.label?"bg-blue-600 text-white":"text-gray-600 hover:bg-gray-100"}`}>
              <span className="text-xl">{n.icon}</span><span>{n.label}</span></a></li>
          ))}
        </ul>
        <button onClick={()=>navigate("/login")} className="m-4 bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 font-semibold">Logout</button>
      </aside>
      <div className="flex-1">
        <header className="bg-white shadow-sm p-4 flex items-center gap-4 sticky top-0 z-10">
          <button onClick={()=>setSidebarOpen(!sidebarOpen)} className="md:hidden text-2xl">☰</button>
          <h2 className="text-xl font-bold hidden sm:block">{activeTab}</h2>
          <div className="flex-1 max-w-md ml-auto relative">
            <input value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <span className="absolute left-3 top-2.5">🔍</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:block text-sm text-gray-600">Welcome, Admin</span>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xl">👤</div>
          </div>
        </header>
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
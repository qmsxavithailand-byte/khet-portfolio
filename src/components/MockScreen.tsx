export default function ESDMockScreen() {
  const notifications = [
    { id: "ESD202606-001", status: "Open (Pending Action)", date: "20/06/2026", type: "ESD glove" },
    { id: "ESD202605-001", status: "Open (Pending Action)", date: "04/05/2026", type: "ESD glove" },
  ];

  const calDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="rounded-xl overflow-hidden border border-[#1e2d4a] shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
      {/* Browser bar */}
      <div className="bg-[#0d1520] px-4 py-2 flex items-center gap-2 border-b border-[#1e2d4a]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
        <div className="ml-2 flex-1 bg-[#1e2d4a] rounded px-3 py-0.5 text-[9px] text-[#475569]">
          script.google.com · Xavi Quality Management System
        </div>
        <div className="w-6 h-6 rounded-full bg-[#4f46e5] flex items-center justify-center text-[9px] text-white ml-2">P</div>
      </div>

      {/* Top header bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center">
        <span className="text-[10px] font-bold text-gray-800">ESD Control System Dashboard</span>
      </div>

      {/* Dashboard body */}
      <div className="flex bg-[#f5f7fa]" style={{ height: 220 }}>
        {/* Left — dark sidebar + calendar */}
        <div className="w-10 bg-[#1a2235] border-r border-[#2d3a52] flex flex-col items-center py-3 gap-4 flex-shrink-0">
          <div className="w-5 h-5 rounded bg-[#2d3a52] flex items-center justify-center text-[8px] text-[#64748b]">⌂</div>
          <div className="w-5 h-5 rounded bg-[rgba(0,212,170,0.15)] flex items-center justify-center text-[8px] text-[#00d4aa]">⚡</div>
          <div className="w-5 h-5 rounded flex items-center justify-center text-[8px] text-[#64748b]">≡</div>
          <div className="w-5 h-5 rounded flex items-center justify-center text-[8px] text-[#64748b]">👤</div>
        </div>

        {/* Calendar panel */}
        <div className="w-32 bg-white border-r border-gray-200 p-2 flex-shrink-0">
          <div className="flex items-center gap-1 mb-1.5">
            <span className="text-[8px] text-gray-400">📅</span>
            <span className="text-[8px] font-semibold text-gray-600">Calendar</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[7px] text-gray-400">‹</span>
            <span className="text-[7px] font-semibold text-gray-600">June 2026</span>
            <span className="text-[7px] text-gray-400">›</span>
          </div>
          <div className="grid grid-cols-7 gap-px mb-0.5">
            {["S","M","T","W","T","F","S"].map((d, i) => (
              <div key={i} className="text-[6px] text-center text-gray-400 font-semibold">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px">
            {[null,null,null,null,null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((d, i) => (
              <div key={i} className={`text-[6px] text-center rounded-full w-3 h-3 flex items-center justify-center mx-auto ${
                d === 27 ? "bg-[#00d4aa] text-white font-bold" : d ? "text-gray-500 hover:bg-gray-100" : ""
              }`}>
                {d || ""}
              </div>
            ))}
          </div>
          <div className="mt-2 text-[7px] text-gray-400">Notification Status:</div>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span className="text-[6px] text-gray-400">2 pending</span>
          </div>
        </div>

        {/* Center — Trend Analysis */}
        <div className="flex-1 p-2.5 flex flex-col min-w-0">
          <div className="bg-white rounded-lg border border-gray-200 p-2.5 flex-1 flex flex-col">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-[8px] text-gray-400">📊</span>
              <span className="text-[9px] font-semibold text-gray-700">ESD Trend Analysis</span>
            </div>
            {/* Filters row */}
            <div className="flex gap-1.5 mb-1.5 flex-wrap">
              {[["Year","2026"],["Month","All"],["Status","All"],["Dept","All"]].map(([label, val]) => (
                <div key={label} className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5">
                  <span className="text-[6px] text-gray-400">{label}:</span>
                  <span className="text-[6px] font-medium text-gray-600">{val}</span>
                  <span className="text-[6px] text-gray-300">▾</span>
                </div>
              ))}
              <div className="bg-[#0284c7] text-white text-[6px] px-2 py-0.5 rounded flex items-center gap-0.5">
                <span>🔍</span><span>Apply</span>
              </div>
            </div>
            {/* Chart type tabs */}
            <div className="flex gap-1 mb-2">
              <div className="bg-[#8b5cf6] text-white text-[6px] px-2 py-0.5 rounded flex items-center gap-0.5">📊 Bar Chart</div>
              <div className="text-[6px] text-gray-400 px-2 py-0.5 rounded border border-gray-200">🥧 Pie Chart</div>
              <div className="text-[6px] text-gray-400 px-2 py-0.5 rounded border border-gray-200">📈 Line Chart</div>
            </div>
            {/* Mini bar chart */}
            <div className="flex-1 flex items-end gap-1.5 px-2">
              {[
                { m: "Jan", v: 30 }, { m: "Feb", v: 18 }, { m: "Mar", v: 45 },
                { m: "Apr", v: 25 }, { m: "May", v: 38 }, { m: "Jun", v: 20 },
              ].map((b) => (
                <div key={b.m} className="flex flex-col items-center flex-1">
                  <div className="w-full rounded-t-sm bg-[#8b5cf6] opacity-80" style={{ height: `${(b.v / 50) * 36}px` }} />
                  <div className="text-[5px] text-gray-400 mt-0.5">{b.m}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Notifications */}
        <div className="w-36 bg-white border-l border-gray-200 p-2 flex-shrink-0 overflow-hidden">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[8px] text-gray-400">🔔</span>
            <span className="text-[8px] font-semibold text-gray-700">Notifications</span>
          </div>
          {notifications.map((n) => (
            <div key={n.id} className="mb-1.5 bg-[#fffbeb] border border-[#fde68a] rounded p-1.5">
              <div className="text-[7px] font-semibold text-[#92400e] mb-0.5 flex items-center gap-1">
                <span>📋</span>
                <span>Open Report</span>
                <span className="text-[#dc2626]">⚑</span>
              </div>
              <div className="text-[6px] text-[#92400e] font-medium">Pending Action</div>
              <div className="text-[6px] text-[#b45309] mt-0.5">{n.id}</div>
              <div className="text-[5px] text-[#d97706] mt-0.5 flex items-center gap-1">
                <span>{n.type}</span>
                <span>·</span>
                <span>{n.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, AlertTriangle, BarChart3, Bell, BrainCircuit, ChevronDown,
  CircleHelp, Cloud, Cpu, Gauge, LayoutDashboard, Lightbulb, Menu, MoreHorizontal,
  Power, Radio, Search, Settings, Thermometer, Users, Wifi, Wind, X, Zap
} from 'lucide-react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';
import './styles.css';

const consumptionData = [
  { day: 'Mon', usage: 18.4, baseline: 16.5 }, { day: 'Tue', usage: 21.2, baseline: 17.1 },
  { day: 'Wed', usage: 16.8, baseline: 16.4 }, { day: 'Thu', usage: 23.5, baseline: 17.8 },
  { day: 'Fri', usage: 19.6, baseline: 17.2 }, { day: 'Sat', usage: 11.2, baseline: 11.8 },
  { day: 'Sun', usage: 8.4, baseline: 9.1 }
];
const hourlyData = [
  { time: '08:00', power: 1.2 }, { time: '09:00', power: 1.7 }, { time: '10:00', power: 1.5 },
  { time: '11:00', power: 1.9 }, { time: '12:00', power: 2.4 }, { time: '13:00', power: 2.1 },
  { time: '14:00', power: 1.8 }, { time: '15:00', power: 1.6 }, { time: '16:00', power: 1.3 }
];
const occupancyData = [
  { name: 'Occupied', value: 68, color: '#1e7d72' }, { name: 'Available', value: 32, color: '#e8edf2' }
];
const readings = [
  ['Today, 10:42 AM', 'CS-204', '24', '27.4°C', '61%', '324 lux', '1.82 kW', 'Excessive'],
  ['Today, 10:27 AM', 'CS-204', '22', '27.2°C', '60%', '318 lux', '1.76 kW', 'Normal'],
  ['Today, 10:12 AM', 'CS-204', '21', '27.1°C', '60%', '305 lux', '1.68 kW', 'Normal'],
  ['Today, 09:57 AM', 'CS-204', '20', '26.8°C', '59%', '298 lux', '1.61 kW', 'Normal'],
  ['Today, 09:42 AM', 'CS-204', '18', '26.5°C', '58%', '291 lux', '1.54 kW', 'Normal']
];

function MetricCard({ icon: Icon, label, value, unit, change, tone = 'teal', note }) {
  return <div className="metric-card">
    <div className={`metric-icon ${tone}`}><Icon size={18} /></div>
    <div className="metric-copy"><span>{label}</span><strong>{value}<small>{unit}</small></strong>
      {change && <em className={change.startsWith('+') ? 'bad' : 'good'}>{change} <span>vs last hour</span></em>}
      {note && <em className="muted">{note}</em>}
    </div>
    <MoreHorizontal size={18} className="more" />
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [active, setActive] = React.useState('Dashboard');
  const nav = [
    { label: 'Dashboard', icon: LayoutDashboard }, { label: 'Live monitoring', icon: Radio },
    { label: 'Energy analytics', icon: BarChart3 }, { label: 'ML prediction', icon: BrainCircuit },
    { label: 'Recommendations', icon: Lightbulb }, { label: 'Historical data', icon: Activity }
  ];
  return <div className="app">
    <aside className={menuOpen ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><div className="brand-mark"><Zap size={19} fill="currentColor" /></div><div><b>WattWise</b><span>CLASSROOM INTELLIGENCE</span></div><button className="close-menu" onClick={() => setMenuOpen(false)}><X size={18} /></button></div>
      <div className="workspace"><span className="avatar">C2</span><div><b>Engineering Faculty</b><span>Smart Campus / Lab 02</span></div><ChevronDown size={16} /></div>
      <nav>{nav.map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'active' : ''} onClick={() => { setActive(label); setMenuOpen(false); }}><Icon size={18} /><span>{label}</span>{label === 'Recommendations' && <i>3</i>}</button>)}</nav>
      <div className="nav-divider" />
      <nav className="secondary"><button><Settings size={18} /><span>Settings</span></button><button><CircleHelp size={18} /><span>Help center</span></button></nav>
      <div className="sidebar-foot"><div className="online-dot" /><span>System operational</span><small>v1.0.4</small></div>
    </aside>
    <main>
      <header><button className="mobile-menu" onClick={() => setMenuOpen(true)}><Menu size={20} /></button><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{active}</strong></div><div className="header-actions"><div className="search"><Search size={17} /><input placeholder="Search classroom..." /></div><button className="icon-btn"><Bell size={19} /><i /></button><div className="profile"><span className="profile-avatar">AR</span><div><b>Arif Rahman</b><span>Administrator</span></div><ChevronDown size={15} /></div></div></header>
      <div className="content">
        <section className="page-intro"><div><div className="eyebrow"><span className="live-pulse" /> LIVE MONITORING</div><h1>Good morning, Arif <span>👋</span></h1><p>Here’s what’s happening in your classroom today.</p></div><div className="date-select"><span>Last updated</span><b>18 Sep 2024, 10:42 AM</b><button><ChevronDown size={16} /></button></div></section>
        <section className="metrics">
          <MetricCard icon={Users} label="Current occupancy" value="24" unit=" students" change="+14%" tone="teal" />
          <MetricCard icon={Thermometer} label="Temperature" value="27.4" unit="°C" change="+1.2%" tone="orange" />
          <MetricCard icon={Lightbulb} label="Light intensity" value="324" unit=" lux" change="-3.4%" tone="yellow" />
          <MetricCard icon={Gauge} label="Current consumption" value="1.82" unit=" kW" change="+8.7%" tone="purple" />
        </section>
        <section className="main-grid">
          <div className="panel energy-panel"><div className="panel-heading"><div><span className="label">ENERGY OVERVIEW</span><h2>Weekly consumption</h2></div><div className="heading-actions"><button className="select-btn">This week <ChevronDown size={15} /></button><button className="dots"><MoreHorizontal size={19} /></button></div></div><div className="chart-legend"><span><i className="dot teal-dot" />Actual consumption</span><span><i className="dot gray-dot" />Expected baseline</span><b>118.9 <small>kWh total</small></b></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={250}><AreaChart data={consumptionData} margin={{ top: 10, right: 5, left: -22, bottom: 0 }}><defs><linearGradient id="fillTeal" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e7d72" stopOpacity=".2" /><stop offset="100%" stopColor="#1e7d72" stopOpacity="0" /></linearGradient></defs><CartesianGrid vertical={false} stroke="#edf0f3" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8b99a7', fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#8b99a7', fontSize: 11 }} /><Tooltip contentStyle={{ border: '0', borderRadius: 10, boxShadow: '0 5px 20px #1c293711' }} /><Area type="monotone" dataKey="baseline" stroke="#b9c4cc" strokeDasharray="5 5" fill="none" strokeWidth={2} /><Area type="monotone" dataKey="usage" stroke="#1e7d72" fill="url(#fillTeal)" strokeWidth={2.5} /></AreaChart></ResponsiveContainer></div></div>
          <div className="panel status-panel"><div className="panel-heading"><div><span className="label">CLASSROOM STATUS</span><h2>CS-204 overview</h2></div><button className="dots"><MoreHorizontal size={19} /></button></div><div className="occupancy-chart"><ResponsiveContainer width="100%" height={145}><PieChart><Pie data={occupancyData} dataKey="value" innerRadius={48} outerRadius={62} startAngle={90} endAngle={-270} paddingAngle={3} stroke="none">{occupancyData.map((e) => <Cell key={e.name} fill={e.color} />)}</Pie></PieChart></ResponsiveContainer><div className="occupancy-center"><strong>68%</strong><span>occupied</span></div></div><div className="status-list"><div><span><i className="status-icon green"><Wifi size={14} /></i>ESP32 connection</span><b className="status-ok">Connected</b></div><div><span><i className="status-icon blue"><Wind size={14} /></i>Sensor network</span><b className="status-ok">4 / 4 online</b></div><div><span><i className="status-icon purple"><Cloud size={14} /></i>API & database</span><b className="status-ok">Operational</b></div></div></div>
        </section>
        <section className="lower-grid"><div className="panel prediction-panel"><div className="panel-heading"><div><span className="label">ML PREDICTION</span><h2>Energy status</h2></div><span className="confidence">94.8% confidence</span></div><div className="prediction-result"><div className="warning-icon"><AlertTriangle size={21} /></div><div><strong>Excessive consumption</strong><p>Current usage is 8.7% above the expected baseline for this occupancy.</p></div></div><div className="prediction-facts"><div><span>Occupancy</span><b>24 students</b></div><div><span>Temperature</span><b>27.4°C</b></div><div><span>Consumption</span><b>1.82 kW</b></div></div><button className="outline-btn">View prediction details <span>→</span></button></div><div className="panel live-panel"><div className="panel-heading"><div><span className="label">LIVE POWER DRAW</span><h2>Today’s usage</h2></div><span className="live-badge"><span className="live-pulse" /> LIVE</span></div><div className="power-value"><strong>1.82 <small>kW</small></strong><span className="bad">+8.7%</span></div><div className="bar-chart"><ResponsiveContainer width="100%" height={115}><BarChart data={hourlyData} margin={{ top: 5, right: 0, bottom: 0, left: -20 }}><XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#9ba6b0', fontSize: 10 }} interval={1} /><YAxis hide /><Bar dataKey="power" radius={[3, 3, 0, 0]} fill="#9ed5ce" /></BarChart></ResponsiveContainer></div></div></section>
        <section className="panel table-panel"><div className="panel-heading"><div><span className="label">RECENT READINGS</span><h2>Historical sensor data</h2></div><button className="text-btn">View all readings <span>→</span></button></div><div className="table-scroll"><table><thead><tr><th>Timestamp</th><th>Room</th><th>Occupancy</th><th>Temperature</th><th>Humidity</th><th>Light</th><th>Consumption</th><th>Prediction</th></tr></thead><tbody>{readings.map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={cell} className={i === 7 ? (cell === 'Excessive' ? 'prediction excessive' : 'prediction normal') : ''}>{i === 7 && <span className="table-status" />}{cell}</td>)}</tr>)}</tbody></table></div></section>
        <section className="recommendation"><div className="recommendation-icon"><Lightbulb size={22} /></div><div><span className="label">SMART RECOMMENDATION</span><h3>Reduce unnecessary lighting during midday hours</h3><p>Light intensity is high while occupancy is below 30%. Switching off two light zones could save an estimated <b>1.4 kWh</b> today.</p></div><button className="outline-btn">Explore recommendations <span>→</span></button></section>
        <footer><span><Cpu size={14} /> Powered by ESP32 · C# WebAPI · ML.NET</span><span>All systems normal <i className="online-dot" /></span></footer>
      </div>
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);

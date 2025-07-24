// import React, { useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';

// export default function AdminDashboard() {
//   const [vehicles, setVehicles] = useState([]);
//   const [violations, setViolations] = useState([]);
//   const [emergencies, setEmergencies] = useState([]);
//   const [activeTab, setActiveTab] = useState('vehicles');
//   const [search, setSearch] = useState({ vehicles: '', violations: '', emergencies: '' });

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   useEffect(() => {
//     if (vehicles.length || violations.length || emergencies.length) {
//       const ctx = document.getElementById('chartCanvas');
//       new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: ['Vehicles', 'Violations', 'Emergencies'],
//           datasets: [{
//             label: 'City Reports',
//             data: [vehicles.length, violations.length, emergencies.length],
//             backgroundColor: ['#3b82f6', '#ef4444', '#f59e0b']
//           }]
//         },
//         options: { responsive: true, plugins: { legend: { display: false } } }
//       });
//     }
//   }, [vehicles, violations, emergencies]);

//   const loadDashboard = async () => {
//     const [v, vio, eme] = await Promise.all([
//       fetch("http://localhost:5000/api/vehicles").then(res => res.json()),
//       fetch("http://localhost:5000/api/violations").then(res => res.json()),
//       fetch("http://localhost:5000/api/emergencies").then(res => res.json())
//     ]);
//     setVehicles(v);
//     setViolations(vio);
//     setEmergencies(eme);
//   };

//   const deleteVehicle = async (id) => {
//     if (window.confirm("Are you sure?")) {
//       await fetch(`http://localhost:5000/api/vehicles/${id}`, { method: 'DELETE' });
//       loadDashboard();
//     }
//   };

//   const exportCSV = (data, name) => {
//     let csv = '';
//     const keys = Object.keys(data[0] || {});
//     csv += keys.join(',') + '\n';
//     data.forEach(row => {
//       csv += keys.map(k => row[k]).join(',') + '\n';
//     });
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const a = document.createElement('a');
//     a.href = URL.createObjectURL(blob);
//     a.download = `${name}.csv`;
//     a.click();
//   };

//   const filterData = (data, key) => {
//     return data.filter(row => Object.values(row).join(' ').toLowerCase().includes(search[key].toLowerCase()));
//   };

//   const renderTable = (data, type) => (
//     <div>
//       <div className="flex flex-wrap justify-between mt-4 gap-2">
//         <input
//           type="text"
//           placeholder={`Search ${type}...`}
//           className="p-2 border rounded w-64"
//           value={search[type]}
//           onChange={(e) => setSearch({ ...search, [type]: e.target.value })}
//         />
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded"
//           onClick={() => exportCSV(data, `${type}Table`)}
//         >Export CSV</button>
//       </div>
//       <div className="overflow-x-auto mt-4">
//         <table className="min-w-full bg-white border rounded">
//           <thead className="bg-blue-800 text-white">
//             <tr>
//               {Object.keys(data[0] || {}).map(key => <th key={key} className="p-3 border">{key}</th>)}
//               <th className="p-3 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filterData(data, type).map((row, idx) => (
//               <tr key={idx}>
//                 {Object.values(row).map((val, i) => <td key={i} className="p-3 border">{val}</td>)}
//                 <td className="p-3 border">
//                   <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
//                   {type === 'vehicles' && (
//                     <button
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                       onClick={() => deleteVehicle(row._id)}
//                     >Delete</button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900">
//       <header className="bg-blue-900 text-white p-4 text-center">
//         <h1 className="text-xl font-semibold">Smart City Admin Panel</h1>
//       </header>

//       <main className="p-6 space-y-6">
//         <div className="flex flex-wrap gap-4 justify-between">
//           <div className="flex-1 bg-gradient-to-r from-blue-600 to-blue-900 text-white p-4 rounded shadow">
//             <h3 className="text-lg">Total Vehicles</h3>
//             <p>{vehicles.length}</p>
//           </div>
//           <div className="flex-1 bg-gradient-to-r from-blue-600 to-blue-900 text-white p-4 rounded shadow">
//             <h3 className="text-lg">Total Violations</h3>
//             <p>{violations.length}</p>
//           </div>
//           <div className="flex-1 bg-gradient-to-r from-blue-600 to-blue-900 text-white p-4 rounded shadow">
//             <h3 className="text-lg">Total Emergencies</h3>
//             <p>{emergencies.length}</p>
//           </div>
//         </div>

//         <canvas id="chartCanvas" height="100" className="w-full" />

//         <div className="flex flex-wrap gap-2">
//           {['vehicles', 'violations', 'emergencies'].map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-900 text-white' : 'bg-blue-600 text-white'}`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {activeTab === 'vehicles' && renderTable(vehicles, 'vehicles')}
//         {activeTab === 'violations' && renderTable(violations, 'violations')}
//         {activeTab === 'emergencies' && renderTable(emergencies, 'emergencies')}
//       </main>
//     </div>
//   );
// }

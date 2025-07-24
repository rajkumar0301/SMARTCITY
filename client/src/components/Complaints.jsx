// import React, { useState } from 'react';

// export default function Complaint() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     complaint: '',
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Complaint submitted:', formData);
//     // TODO: Send data to backend API
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-6">Submit a Complaint</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
//               type="text"
//               placeholder="Enter your name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               type="email"
//               className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Complaint</label>
//             <textarea
//               name="complaint"
//               value={formData.complaint}
//               onChange={handleChange}
//               required
//               rows="4"
//               className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="Enter your complaint"
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

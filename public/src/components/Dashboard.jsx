// import React, { useState } from 'react';
// import "../styles/style.css";
//  // Assuming the original styles are in this file
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.id]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:27017/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       alert(data.message || data.error);
//       if (data.message) navigate('/login'); // Optional redirect
//     } catch (err) {
//       alert('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Register</h2>
//       <form id="registerForm" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           id="name"
//           placeholder="Name"
//           required
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           id="email"
//           placeholder="Email"
//           required
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           id="phone"
//           placeholder="Phone"
//           required
//           value={formData.phone}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           id="password"
//           placeholder="Password"
//           required
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button type="submit">Register</button>
//       </form>
//       <p>
//         Already registered? <a href="/login">Login</a>
//       </p>
//     </div>
//   );
// };

// export default Register;

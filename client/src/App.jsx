import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://your-vercel-site.vercel.app'; // 🔁 Replace with your actual Vercel URL

function App() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [userId, setUserId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [complaint, setComplaint] = useState({ title: '', description: '' });

  // Create user
  const handleCreateUser = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/users`, user);
      const id = res.data.data?.[0]?.id;
      if (id) {
        setUserId(id);
        alert('User created successfully!');
      } else {
        alert('Failed to create user');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating user');
    }
  };

  // Submit feedback
  const handleSubmitFeedback = async () => {
    if (!userId) return alert('Please create user first');
    try {
      await axios.post(`${BASE_URL}/api/feedback`, {
        user_id: userId,
        message: feedback,
      });
      alert('Feedback submitted!');
      setFeedback('');
    } catch (err) {
      console.error(err);
      alert('Error submitting feedback');
    }
  };

  // Submit complaint
  const handleSubmitComplaint = async () => {
    if (!userId) return alert('Please create user first');
    try {
      await axios.post(`${BASE_URL}/api/complaints`, {
        user_id: userId,
        title: complaint.title,
        description: complaint.description,
      });
      alert('Complaint submitted!');
      setComplaint({ title: '', description: '' });
    } catch (err) {
      console.error(err);
      alert('Error submitting complaint');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Create User</h2>
      <input
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        style={{ width: '100%', marginBottom: '8px' }}
      />
      <input
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        style={{ width: '100%', marginBottom: '8px' }}
      />
      <button onClick={handleCreateUser}>Create User</button>

      <hr style={{ margin: '24px 0' }} />

      <h2>Submit Feedback</h2>
      <textarea
        placeholder="Your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        style={{ width: '100%', height: '60px', marginBottom: '8px' }}
      />
      <button onClick={handleSubmitFeedback}>Submit Feedback</button>

      <hr style={{ margin: '24px 0' }} />

      <h2>Submit Complaint</h2>
      <input
        placeholder="Title"
        value={complaint.title}
        onChange={(e) => setComplaint({ ...complaint, title: e.target.value })}
        style={{ width: '100%', marginBottom: '8px' }}
      />
      <textarea
        placeholder="Description"
        value={complaint.description}
        onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
        style={{ width: '100%', height: '60px', marginBottom: '8px' }}
      />
      <button onClick={handleSubmitComplaint}>Submit Complaint</button>
    </div>
  );
}

export default App;


















// // client/src/App.jsx

// import React, { useState } from 'react';
// import axios from 'axios';

// const BASE_URL = 'https://your-vercel-site.vercel.app'; // Replace with actual Vercel site

// function App() {
//   const [userId, setUserId] = useState('');
//   const [feedbackMsg, setFeedbackMsg] = useState('');
//   const [complaint, setComplaint] = useState({ title: '', description: '' });

//   // Create user first
//   const createUser = async () => {
//     const { data } = await axios.post(`${BASE_URL}/api/users`, {
//       name: 'Raj',
//       email: 'raj@example.com',
//     });

//     if (data?.data?.[0]?.id) {
//       setUserId(data.data[0].id);
//       alert('User created');
//     }
//   };

//   // Submit feedback
//   const sendFeedback = async () => {
//     if (!userId) return alert('Create a user first!');
//     const { data } = await axios.post(`${BASE_URL}/api/feedback`, {
//       user_id: userId,
//       message: feedbackMsg,
//     });
//     console.log('Feedback submitted:', data);
//     alert('Feedback submitted');
//   };

//   // Submit complaint
//   const sendComplaint = async () => {
//     if (!userId) return alert('Create a user first!');
//     const { data } = await axios.post(`${BASE_URL}/api/complaints`, {
//       user_id: userId,
//       title: complaint.title,
//       description: complaint.description,
//     });
//     console.log('Complaint submitted:', data);
//     alert('Complaint submitted');
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Create User</h2>
//       <button onClick={createUser}>Create User</button>
//       <br /><br />

//       <h2>Submit Feedback</h2>
//       <input
//         placeholder="Enter feedback"
//         value={feedbackMsg}
//         onChange={(e) => setFeedbackMsg(e.target.value)}
//       />
//       <button onClick={sendFeedback}>Submit Feedback</button>
//       <br /><br />

//       <h2>Submit Complaint</h2>
//       <input
//         placeholder="Title"
//         value={complaint.title}
//         onChange={(e) => setComplaint({ ...complaint, title: e.target.value })}
//       />
//       <input
//         placeholder="Description"
//         value={complaint.description}
//         onChange={(e) => setComplaint({ ...complaint, description: e.target.value })}
//       />
//       <button onClick={sendComplaint}>Submit Complaint</button>
//     </div>
//   );
// }

// export default App;

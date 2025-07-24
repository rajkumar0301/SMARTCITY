document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/otp_register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registered! Please check your email.");
    window.location.href = "verify_otp.html";
  } else {
    alert("Error: " + data.error); // shows detailed error
  }
});




// document.getElementById('registerForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.target);

//   const res = await fetch('/api/users', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: formData.get('name'),
//       email: formData.get('email'),
//       password: formData.get('password')
//     })
//   });

//   const data = await res.json();
//   alert(data.message || 'Registered!');
// });
// document.getElementById("register-form").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   const res = await fetch("/api/otp_register", {
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (res.ok) {
//     alert("OTP sent to email! Please verify.");
//     window.location.href = "verify_otp.html";
//   } else {
//     alert("Registration failed.");
//   }
// });

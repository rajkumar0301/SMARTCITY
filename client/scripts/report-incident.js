// document.getElementById('complaintForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const formData = new FormData(e.target);

//   const res = await fetch('/api/complaints', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       location: formData.get('location'),
//       description: formData.get('description')
//     })
//   });

//   const data = await res.json();
//   alert(data.message || 'Complaint submitted!');
// });


document.getElementById("incident-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    user_id: localStorage.getItem("user_id"), // from login session
    type: form.type.value,
    description: form.description.value,
    location: form.location.value,
    image_url: "", // optional if using upload
  };

  const res = await fetch("/api/report-incident", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (res.ok) {
    alert("Incident submitted successfully!");
    form.reset();
  } else {
    alert("Error: " + result.error);
  }
});

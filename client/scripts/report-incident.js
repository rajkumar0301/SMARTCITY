document.getElementById('complaintForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const res = await fetch('/api/complaints', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: formData.get('location'),
      description: formData.get('description')
    })
  });

  const data = await res.json();
  alert(data.message || 'Complaint submitted!');
});

document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const res = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: formData.get('user'),
      message: formData.get('message')
    })
  });

  const data = await res.json();
  alert(data.message || 'Feedback submitted!');
});

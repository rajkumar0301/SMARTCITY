// After successful login
fetch('/login', {
  method: 'POST',
  body: JSON.stringify({ username, password }),
  headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
.then(data => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);
  window.location.href = "/dashboard.html";
});

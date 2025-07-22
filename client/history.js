// public/history.js

const username = localStorage.getItem("username"); // assume user info stored after login

fetch(`/history/${username}`)
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#historyTable tbody");
    data.forEach(booking => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${booking.vehicleNo}</td>
        <td>${booking.slot}</td>
        <td>${booking.timeIn}</td>
        <td>${booking.timeOut || '-'}</td>
      `;
      tbody.appendChild(row);
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  if (!token || !username) {
    alert("Please log in first.");
    window.location.href = "/login.html";
    return;
  }

  fetch(`/history/${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => {
    if (res.status === 401 || res.status === 403) {
      alert("Unauthorized. Please log in again.");
      window.location.href = "/login.html";
      return;
    }
    return res.json();
  })
  .then(data => {
    const tbody = document.querySelector("#historyTable tbody");
    data.forEach(booking => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${booking.vehicleNo}</td>
        <td>${booking.slot}</td>
        <td>${booking.timeIn}</td>
        <td>${booking.timeOut || '-'}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error("Error loading booking history:", err));
});

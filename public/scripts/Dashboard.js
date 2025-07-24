const userId = "demo-user-id"; // Replace with real session ID

async function loadSlots() {
  const res = await fetch('http://localhost:27017/api/booking/slots');
  const data = await res.json();
  const gridContainer = document.getElementById('grid');
  gridContainer.innerHTML = "";

  const letters = ['A', 'B', 'C', 'D'];
  data.grid.forEach((row, i) => {
    row.forEach((slot, j) => {
      const slotBtn = document.createElement('button');
      slotBtn.textContent = letters[i] + (j + 1);
      slotBtn.className = slot === 0 ? 'free' : 'booked';
      slotBtn.disabled = slot === 1;
      slotBtn.onclick = () => bookSlot(letters[i] + (j + 1));
      gridContainer.appendChild(slotBtn);
    });
  });
}

async function bookSlot(slotId) {
  const vehicleNo = prompt("Enter your vehicle number:");
  if (!vehicleNo) return;

  const res = await fetch('http://localhost:27017/api/booking/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, vehicleNo, slotId })
  });
  const data = await res.json();
  alert(data.message || data.error);
  loadSlots();
}

loadSlots();

 if (!localStorage.getItem('logged_in')) {
    alert('Please login first.');
    window.location.href = 'otp_register.html';
  }
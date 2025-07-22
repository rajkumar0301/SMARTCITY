function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');
}

function filterTable(tableId, keyword) {
  const rows = document.querySelectorAll(`#${tableId} tbody tr`);
  rows.forEach(row => {
    const visible = Array.from(row.children).some(td =>
      td.innerText.toLowerCase().includes(keyword.toLowerCase())
    );
    row.style.display = visible ? '' : 'none';
  });
}

function exportCSV(tableId) {
  const rows = Array.from(document.querySelectorAll(`#${tableId} tr`));
  const csv = rows.map(row =>
    Array.from(row.children).map(td => `"${td.innerText}"`).join(',')
  ).join('\n');
  
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = `${tableId}.csv`;
  a.click();
}

// Dummy Chart
const ctx = document.getElementById('trafficChart');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Vehicles', 'Violations', 'Emergencies'],
    datasets: [{
      label: 'Total',
      data: [120, 45, 20],
      backgroundColor: ['green', 'red', 'orange']
    }]
  }
});


function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}
function filterTable(tableId, query) {
  const table = document.getElementById(tableId);
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const match = [...row.cells].some(cell => cell.innerText.toLowerCase().includes(query.toLowerCase()));
    row.style.display = match ? '' : 'none';
  }
}
function exportTableToCSV(tableId, filename) {
  const csv = [];
  const rows = document.querySelectorAll("#" + tableId + " tr");
  for (const row of rows) {
    const cols = row.querySelectorAll("td, th");
    const rowData = [...cols].map(col => `"${col.innerText}"`).join(",");
    csv.push(rowData);
  }
  const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(csvFile);
  downloadLink.download = filename;
  downloadLink.click();
}
// Placeholder table generation (demo)
window.onload = () => {
  document.getElementById('totalVehicles').textContent = '45';
  document.getElementById('totalViolations').textContent = '18';
  document.getElementById('totalEmergencies').textContent = '6';
  generateTable('vehicleTable', ['ID', 'Owner', 'Type'], [[1, 'John', 'Car'], [2, 'Amit', 'Bike']]);
  generateTable('violationTable', ['ID', 'Type', 'Date'], [[1, 'Speeding', '2025-07-10']]);
  generateTable('emergencyTable', ['ID', 'Type', 'Status'], [[1, 'Fire', 'Resolved']]);
};
function generateTable(id, headers, data) {
  const table = document.getElementById(id);
  table.innerHTML = '';
  const thead = table.createTHead();
  const row = thead.insertRow();
  headers.forEach(h => row.insertCell().outerHTML = '<th>' + h + '</th>');
  const tbody = table.createTBody();
  data.forEach(rowData => {
    const row = tbody.insertRow();
    rowData.forEach(cell => row.insertCell().textContent = cell);
  });
}
const apiUrl = import.meta.env.VITE_API_URL;

fetch(`${apiUrl}/api/feedback`)
  .then(response => response.json())
  .then(data => {
    console.log('Feedback:', data);
  })
  .catch(err => {
    console.error('Error fetching feedback:', err);
  });
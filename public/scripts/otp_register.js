document.getElementById("otp-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  const response = await fetch("/api/otp_register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();
  alert(result.message);
});

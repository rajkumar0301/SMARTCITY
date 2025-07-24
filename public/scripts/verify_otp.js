document.getElementById("verify-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;

  const response = await fetch("/api/verify_otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const result = await response.json();
  alert(result.message);

  if (response.ok) {
    window.location.href = "success.html"; // optional redirect
  }
});

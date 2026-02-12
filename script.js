<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wi-Fi QR Generator</title>
  <link rel="stylesheet" href="style.css">
  <link rel="icon" type="image/png" href="favicon.png">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  <style>
    /* --- Modern Responsive Styling --- */
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background: #f5f5f5;
      color: #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }

    h1 {
      margin-top: 30px;
      text-align: center;
      color: #222;
    }

    .container {
      background: #fff;
      padding: 20px 30px;
      margin: 20px;
      border-radius: 12px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.1);
      max-width: 400px;
      width: 100%;
    }

    label {
      display: block;
      margin-top: 15px;
      font-weight: bold;
    }

    input, select {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 16px;
      transition: 0.3s;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #007BFF;
      box-shadow: 0 0 5px rgba(0,123,255,0.3);
    }

    .password-wrapper {
      position: relative;
    }

    .password-wrapper button {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }

    .strength {
      margin-top: 5px;
      font-size: 14px;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .buttons button {
      flex: 1;
      margin: 0 5px;
      padding: 10px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: 0.3s;
    }

    .buttons button:hover {
      opacity: 0.9;
    }

    #generate-btn { background: #007BFF; color: #fff; }
    #download-btn { background: #28A745; color: #fff; }
    #copy-btn { background: #FFC107; color: #fff; }
    #reset-btn { background: #DC3545; color: #fff; }

    #qrcode {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      transition: transform 0.3s;
    }
  </style>
</head>

<body>
  <h1>Wi-Fi QR Generator</h1>

  <div class="container">
    <label for="ssid">Wi-Fi Name (SSID)</label>
    <input type="text" id="ssid" placeholder="Enter Wi-Fi name">

    <label for="password">Password</label>
    <div class="password-wrapper">
      <input type="password" id="password" placeholder="Enter password">
      <button type="button" onclick="togglePassword()">👁️</button>
    </div>
    <div class="strength" id="strength">Password Strength: N/A</div>

    <label for="security">Security Type</label>
    <select id="security">
      <option value="WPA">WPA/WPA2</option>
      <option value="WEP">WEP</option>
      <option value="nopass">None</option>
    </select>

    <div class="buttons">
      <button id="generate-btn" onclick="generateQR()">Generate QR</button>
      <button id="download-btn" onclick="downloadQR()">Download</button>
    </div>
    <div class="buttons">
      <button id="copy-btn" onclick="copyDetails()">Copy Details</button>
      <button id="reset-btn" onclick="resetAll()">Reset</button>
    </div>

    <div id="qrcode"></div>
  </div>

  <script>
    // ===== Modern Wi-Fi QR Generator =====
    let qrCode = null;

    const ssidInput = document.getElementById("ssid");
    const passwordInput = document.getElementById("password");
    const securityInput = document.getElementById("security");
    const qrContainer = document.getElementById("qrcode");
    const strengthText = document.getElementById("strength");

    // Password strength indicator
    passwordInput.addEventListener("input", () => {
      const pwd = passwordInput.value;
      let strength = "Weak";
      if (pwd.length > 8 && /[A-Z]/.test(pwd) && /\d/.test(pwd)) strength = "Strong";
      else if (pwd.length >= 6) strength = "Medium";
      strengthText.textContent = `Password Strength: ${strength}`;
      strengthText.style.color = strength === "Strong" ? "green" : (strength === "Medium" ? "orange" : "red");
    });

    // Generate QR code
    function generateQR() {
      const ssid = ssidInput.value.trim();
      const password = passwordInput.value;
      const security = securityInput.value;

      if (!ssid) {
        alert("⚠️ Please enter Wi-Fi name (SSID).");
        return;
      }

      qrContainer.innerHTML = "";
      const wifiString = `WIFI:T:${security};S:${ssid};P:${password};;`;

      qrCode = new QRCode(qrContainer, {
        text: wifiString,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      // Animation
      qrContainer.style.transform = "scale(0.8)";
      setTimeout(() => { qrContainer.style.transform = "scale(1)"; }, 100);
    }

    // Toggle password visibility
    function togglePassword() {
      passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    }

    // Download QR code
    function downloadQR() {
      const img = qrContainer.querySelector("img");
      if (!img) {
        alert("⚠️ Generate a QR code first.");
        return;
      }
      const link = document.createElement("a");
      link.href = img.src;
      link.download = "wifi-qr.png";
      link.click();
    }

    // Copy Wi-Fi details
    function copyDetails() {
      const ssid = ssidInput.value.trim();
      const password = passwordInput.value;

      if (!ssid) {
        alert("⚠️ Enter Wi-Fi name (SSID) before copying.");
        return;
      }

      const details = `Wi-Fi Name: ${ssid}\nPassword: ${password}`;
      navigator.clipboard.writeText(details)
        .then(() => alert("✅ Wi-Fi details copied to clipboard"))
        .catch(() => alert("⚠️ Failed to copy details"));
    }

    // Reset all
    function resetAll() {
      ssidInput.value = "";
      passwordInput.value = "";
      securityInput.value = "WPA";
      qrContainer.innerHTML = "";
      strengthText.textContent = "Password Strength: N/A";
      strengthText.style.color = "#333";
    }
  </script>
</body>
</html>

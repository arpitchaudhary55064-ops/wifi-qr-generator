let qrCode;

function generateQR() {
  const ssid = document.getElementById("ssid").value.trim();
  const password = document.getElementById("password").value;
  const security = document.getElementById("security").value;

  if (!ssid) {
    alert("Please enter Wi-Fi name");
    return;
  }

  document.getElementById("qrcode").innerHTML = "";

  const wifiString = `WIFI:T:${security};S:${ssid};P:${password};;`;

  qrCode = new QRCode(document.getElementById("qrcode"), {
    text: wifiString,
    width: 200,
    height: 200
  });
}

function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

function downloadQR() {
  const img = document.querySelector("#qrcode img");
  if (!img) {
    alert("Generate QR code first");
    return;
  }
  const link = document.createElement("a");
  link.href = img.src;
  link.download = "wifi-qr.png";
  link.click();
}

function copyDetails() {
  const ssid = document.getElementById("ssid").value;
  const password = document.getElementById("password").value;

  navigator.clipboard.writeText(
    `Wi-Fi Name: ${ssid}\nPassword: ${password}`
  );
  alert("Wi-Fi details copied");
}

function resetAll() {
  document.getElementById("ssid").value = "";
  document.getElementById("password").value = "";
  document.getElementById("qrcode").innerHTML = "";
}


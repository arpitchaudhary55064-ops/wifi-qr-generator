<style>

/* ================= GLOBAL RESET ================= */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ================= BODY ================= */

body {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #1c92d2);
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;

  color: white;
}

/* Animated Background */
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Smooth Page Fade */
body {
  animation: fadeIn 1.2s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ================= HEADING ================= */

h1 {
  margin-top: 30px;
  font-size: 28px;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 10px;
}

/* ================= CONTAINER ================= */

.container {
  width: 95%;
  max-width: 420px;
  padding: 30px;
  margin: 20px;

  border-radius: 20px;

  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  box-shadow: 0 20px 40px rgba(0,0,0,0.4);

  animation: floatCard 6s ease-in-out infinite;
}

/* Floating Effect */
@keyframes floatCard {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

/* ================= FORM ================= */

label {
  margin-top: 15px;
  display: block;
  font-weight: 600;
  font-size: 14px;
}

input, select {
  width: 100%;
  padding: 12px;
  margin-top: 6px;

  border-radius: 10px;
  border: none;

  font-size: 15px;

  background: rgba(255,255,255,0.15);
  color: white;

  transition: all 0.3s ease;
}

/* Input Focus Animation */
input:focus, select:focus {
  outline: none;
  transform: scale(1.04);
  box-shadow: 0 0 12px #00e0ff;
}

/* ================= PASSWORD BUTTON ================= */

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
  color: white;
  cursor: pointer;
}

/* ================= STRENGTH ================= */

.strength {
  margin-top: 6px;
  font-size: 13px;
}

/* ================= BUTTONS ================= */

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.buttons button {
  flex: 1;
  padding: 12px;

  border: none;
  border-radius: 12px;

  font-weight: bold;
  cursor: pointer;

  transition: all 0.3s ease;
}

/* Hover Lift Effect */
.buttons button:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.4);
}

/* Button Colors */
#generate-btn {
  background: linear-gradient(45deg,#00e0ff,#007cf0);
  color: white;
}

#download-btn {
  background: linear-gradient(45deg,#22c55e,#16a34a);
  color: white;
}

#copy-btn {
  background: linear-gradient(45deg,#facc15,#f59e0b);
  color: black;
}

#reset-btn {
  background: linear-gradient(45deg,#ef4444,#b91c1c);
  color: white;
}

/* ================= QR SECTION ================= */

#qrcode {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

/* QR Pop Animation */
.qr-animate {
  animation: popQR 0.5s ease;
}

@keyframes popQR {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}


/* ================= VARIABLES ================= */

let qrcodeObj = null;
let uploadedLogo = null;

// Default settings
let currentSettings = {
  color: "#000000",
  bgColor: "#ffffff",
  size: 200,
  ecl: "M", // Error Correction Level: L, M, Q, H
  borderStyle: "square", // square, rounded, circle
  theme: "dark"
};

/* ================= INITIALIZATION ================= */

document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
});

function initializeEventListeners() {
  // Password toggle
  const togglePassword = document.getElementById('toggle-password');
  if (togglePassword) {
    togglePassword.addEventListener('click', togglePasswordVisibility);
  }

  // Security type change
  const security = document.getElementById('security');
  if (security) {
    security.addEventListener('change', handleSecurityChange);
  }

  // Generate button
  const generateBtn = document.getElementById('generate-btn');
  if (generateBtn) {
    generateBtn.addEventListener('click', generateQR);
  }

  // Download button
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadQR);
  }

  // Copy button
  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyToClipboard);
  }

  // Reset button
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetForm);
  }

  // Logo upload
  const logoInput = document.getElementById('logo-upload');
  if (logoInput) {
    logoInput.addEventListener('change', handleLogoUpload);
  }

  // Color options
  const colorBtns = document.querySelectorAll('.qr-color-btn');
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => handleColorChange(btn));
  });

  // Size options
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => handleSizeChange(btn));
  });

  // Error correction level
  const eclBtns = document.querySelectorAll('.ecl-btn');
  eclBtns.forEach(btn => {
    btn.addEventListener('click', () => handleEclChange(btn));
  });

  // Border style
  const borderBtns = document.querySelectorAll('.border-btn');
  borderBtns.forEach(btn => {
    btn.addEventListener('click', () => handleBorderChange(btn));
  });

  // Theme options
  const themeBtns = document.querySelectorAll('.theme-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => handleThemeChange(btn));
  });

  // Customization toggle
  const customizeToggle = document.querySelector('.customize-toggle');
  if (customizeToggle) {
    customizeToggle.addEventListener('click', toggleCustomizeSection);
  }
}

/* ================= PASSWORD FUNCTIONS ================= */

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.getElementById('toggle-password');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.innerHTML = '🙈';
  } else {
    passwordInput.type = 'password';
    toggleBtn.innerHTML = '👁️';
  }
}

function handleSecurityChange() {
  const security = document.getElementById('security').value;
  const passwordInput = document.getElementById('password');
  
  if (security === 'nopass') {
    passwordInput.disabled = true;
    passwordInput.value = '';
    passwordInput.placeholder = 'No password required';
  } else {
    passwordInput.disabled = false;
    passwordInput.placeholder = 'Enter password';
  }
}

/* ================= QR GENERATE FUNCTION ================= */

function generateQR() {
  const ssid = document.getElementById('ssid').value.trim();
  const security = document.getElementById('security').value;
  const password = document.getElementById('password').value.trim();

  // Validation
  if (!ssid) {
    alert('Please enter WiFi Name (SSID)');
    return;
  }

  if (security !== 'nopass' && !password) {
    alert('Please enter password');
    return;
  }

  // Escape special characters for WiFi QR format
  const escapedSsid = ssid.replace(/([\\;,:"])/g, '\\$1');
  const escapedPassword = password.replace(/([\\;,:"])/g, '\\$1');

  // Create WiFi QR data string
  const qrData = `WIFI:T:${security};S:${escapedSsid};P:${escapedPassword};;`;

  // Clear previous QR
  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = '';
  qrContainer.classList.remove('show', 'qr-animate');

  // Get QR size
  const size = currentSettings.size;

  // Generate QR
  qrcodeObj = new QRCode(qrContainer, {
    text: qrData,
    width: size,
    height: size,
    colorDark: currentSettings.color,
    colorLight: currentSettings.bgColor,
    correctLevel: getECLLevel(currentSettings.ecl)
  });

  // Show QR with animation
  setTimeout(() => {
    qrContainer.classList.add('show', 'qr-animate');
  }, 100);

  // Add logo if uploaded
  if (uploadedLogo) {
    addLogoToQR(size);
  }

  // Update border style
  qrContainer.className = 'show';
  if (currentSettings.borderStyle === 'rounded') {
    qrContainer.style.borderRadius = '16px';
  } else if (currentSettings.borderStyle === 'circle') {
    qrContainer.style.borderRadius = '50%';
  } else {
    qrContainer.style.borderRadius = '0';
  }
}

function getECLLevel(level) {
  switch(level) {
    case 'L': return QRCode.CorrectLevel.L;
    case 'M': return QRCode.CorrectLevel.M;
    case 'Q': return QRCode.CorrectLevel.Q;
    case 'H': return QRCode.CorrectLevel.H;
    default: return QRCode.CorrectLevel.M;
  }
}

/* ================= LOGO FUNCTIONS ================= */

function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.match(/image.*/)) {
    alert('Please upload an image file');
    return;
  }

  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('File size should be less than 2MB');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedLogo = e.target.result;
    
    // Show preview
    const preview = document.getElementById('logo-preview');
    if (preview) {
      preview.src = uploadedLogo;
      preview.classList.add('show');
    }
    
    const removeBtn = document.getElementById('logo-remove');
    if (removeBtn) {
      removeBtn.classList.add('show');
    }
    
    const logoBtn = document.querySelector('.logo-btn span');
    if (logoBtn) {
      logoBtn.textContent = 'Change Logo';
    }
  };
  reader.readAsDataURL(file);
}

function removeLogo() {
  uploadedLogo = null;
  
  const logoInput = document.getElementById('logo-upload');
  if (logoInput) logoInput.value = '';
  
  const preview = document.getElementById('logo-preview');
  if (preview) {
    preview.src = '';
    preview.classList.remove('show');
  }
  
  const removeBtn = document.getElementById('logo-remove');
  if (removeBtn) removeBtn.classList.remove('show');
  
  const logoBtn = document.querySelector('.logo-btn span');
  if (logoBtn) logoBtn.textContent = 'Upload Logo';
}

function addLogoToQR(size) {
  const qrContainer = document.getElementById('qrcode');
  const qrImg = qrContainer.querySelector('img');
  
  if (!qrImg) return;

  const logoSize = size * 0.2; // 20% of QR size
  const logo = document.createElement('img');
  logo.src = uploadedLogo;
  logo.className = 'qr-logo';
  logo.style.width = logoSize + 'px';
  logo.style.height = logoSize + 'px';
  logo.style.position = 'absolute';
  logo.style.transform = 'translate(-50%, -50%)';
  logo.style.left = '50%';
  logo.style.top = '50%';
  logo.style.backgroundColor = 'white';
  logo.style.padding = '5px';
  logo.style.borderRadius = '8px';
  logo.style.objectFit = 'contain';
  
  // Remove existing logo if any
  const existingLogo = qrContainer.querySelector('.qr-logo');
  if (existingLogo) {
    existingLogo.remove();
  }
  
  qrContainer.style.position = 'relative';
  qrContainer.appendChild(logo);
}

/* ================= DOWNLOAD FUNCTION ================= */

function downloadQR() {
  const qrContainer = document.getElementById('qrcode');
  const qrCanvas = qrContainer.querySelector('canvas');
  const qrImg = qrContainer.querySelector('img');

  let dataUrl;
  
  if (qrCanvas) {
    // If using canvas (qrcodejs creates canvas by default)
    dataUrl = qrCanvas.toDataURL('image/png');
  } else if (qrImg) {
    // If using img
    dataUrl = qrImg.src;
  } else {
    alert('Please generate QR code first!');
    return;
  }

  // Create download link
  const link = document.createElement('a');
  link.download = 'wifi-qrcode.png';
  link.href = dataUrl;
  link.click();
}

/* ================= COPY FUNCTION ================= */

function copyToClipboard() {
  const ssid = document.getElementById('ssid').value.trim();
  const security = document.getElementById('security').value;
  const password = document.getElementById('password').value.trim();

  if (!ssid) {
    alert('Please enter WiFi Name first!');
    return;
  }

  const wifiString = `WIFI:T:${security};S:${ssid};P:${password};;`;
  
  navigator.clipboard.writeText(wifiString).then(() => {
    alert('WiFi QR data copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy to clipboard');
  });
}

/* ================= RESET FUNCTION ================= */

function resetForm() {
  document.getElementById('ssid').value = '';
  document.getElementById('password').value = '';
  document.getElementById('security').value = 'WPA';
  document.getElementById('password').disabled = false;
  
  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = '';
  qrContainer.classList.remove('show');
  
  // Remove logo
  removeLogo();
  
  // Reset settings
  currentSettings = {
    color: "#000000",
    bgColor: "#ffffff",
    size: 200,
    ecl: "M",
    borderStyle: "square",
    theme: "dark"
  };
}

/* ================= CUSTOMIZATION HANDLERS ================= */

function toggleCustomizeSection() {
  const toggle = document.querySelector('.customize-toggle');
  const options = document.querySelector('.customize-options');
  
  toggle.classList.toggle('active');
  options.classList.toggle('show');
}

function handleColorChange(btn) {
  // Update active class
  document.querySelectorAll('.qr-color-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  // Update settings
  currentSettings.color = btn.dataset.color;
  currentSettings.bgColor = btn.dataset.bg || '#ffffff';
}

function handleSizeChange(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  currentSettings.size = parseInt(btn.dataset.size);
}

function handleEclChange(btn) {
  document.querySelectorAll('.ecl-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  currentSettings.ecl = btn.dataset.ecl;
}

function handleBorderChange(btn) {
  document.querySelectorAll('.border-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  currentSettings.borderStyle = btn.dataset.border;
}

function handleThemeChange(btn) {
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  currentSettings.theme = btn.dataset.theme;
  
  // Apply theme colors
  applyTheme(btn.dataset.theme);
}

function applyTheme(theme) {
  const themes = {
    dark: { color: '#000000', bg: '#ffffff' },
    light: { color: '#000000', bg: '#ffffff' },
    blue: { color: '#007cf0', bg: '#e0f2fe' },
    purple: { color: '#8b5cf6', bg: '#f3e8ff' },
    red: { color: '#ef4444', bg: '#fee2e2' },
    green: { color: '#22c55e', bg: '#dcfce7' }
  };
  
  if (themes[theme]) {
    currentSettings.color = themes[theme].color;
    currentSettings.bgColor = themes[theme].bg;
  }
}
</style>


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

</style>

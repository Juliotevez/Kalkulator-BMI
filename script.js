document.getElementById("calculate").addEventListener("click", function () {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseInt(document.getElementById("age").value);
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const resultEl = document.getElementById("result");
  const bmiMeter = document.getElementById("bmiMeter");
  const indicator = document.getElementById("indicator");

  // Reset style
  resultEl.className = "result";

  if (!weight || weight <= 0 || !height || height <= 0 || !age || age <= 0) {
    resultEl.style.display = "block";
    resultEl.textContent = "Masukkan berat, tinggi, dan umur dengan benar!";
    resultEl.classList.add("obesitas");
    bmiMeter.style.display = "none";
    return;
  }

  const bmi = weight / (height / 100) ** 2;
  const bmiRounded = bmi.toFixed(1);

  let category = "";
  let message = "";

  // Klasifikasi BMI
  if (bmi < 18.5) {
    category = "Kurus";
    message =
      gender === "pria"
        ? "Kamu kurus. Tambahkan latihan beban ringan & asupan protein."
        : "Kamu kurus. Coba yoga, pilates, dan pola makan seimbang.";
    resultEl.classList.add("kurus");
  } else if (bmi < 24.9) {
    category = "Normal";
    message =
      gender === "pria"
        ? "Mantap! Jaga dengan olahraga rutin: lari, gym, atau futsal."
        : "Bagus! Jaga kesehatan dengan yoga, dance, atau jogging santai.";
    resultEl.classList.add("normal");
  } else if (bmi < 29.9) {
    category = "Kelebihan Berat";
    message =
      gender === "pria"
        ? "Sedikit berlebih. Coba rutin push-up, jogging, dan kurangi gorengan."
        : "Sedikit berlebih. Ikuti zumba, aerobik, dan kontrol kalori.";
    resultEl.classList.add("kelebihan");
  } else {
    category = "Obesitas";
    message =
      gender === "pria"
        ? "Perhatian! Cobalah cardio (sepeda/lari) dan pola makan sehat."
        : "Perhatian! Ikuti senam aerobik intensitas sedang & atur pola makan.";
    resultEl.classList.add("obesitas");
  }

  // Modifikasi saran berdasarkan umur
  if (age < 18) {
    message +=
      " Karena kamu masih remaja, pilih olahraga menyenangkan seperti basket, renang, atau bersepeda 🚴.";
  } else if (age >= 40) {
    message +=
      " Karena usiamu di atas 40, pilih olahraga ringan seperti jalan kaki, yoga, atau berenang 🧘‍♀️.";
  } else {
    message += " Olahraga intensitas sedang–berat cocok untuk usiamu 💪.";
  }

  resultEl.style.display = "block";
  resultEl.textContent = `BMI: ${bmiRounded} (${category}) → ${message}`;

  // Tampilkan BMI Meter
bmiMeter.style.display = "block";

// Map posisi indikator berdasarkan range BMI
let position = 0;
if (bmi <= 18.5) {
  // Kurus (0–18.5) → 0–25%
  position = (bmi / 18.5) * 25;
} else if (bmi <= 24.9) {
  // Normal (18.5–24.9) → 25–50%
  position = 25 + ((bmi - 18.5) / (24.9 - 18.5)) * 25;
} else if (bmi <= 29.9) {
  // Kelebihan (25–29.9) → 50–75%
  position = 50 + ((bmi - 25) / (29.9 - 25)) * 25;
} else {
  // Obesitas (30+) → 75–100%
  position = 75 + Math.min(((bmi - 30) / 10) * 25, 25);
}

});

document.getElementById("reset").addEventListener("click", function () {
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
  document.getElementById("age").value = "";
  const resultEl = document.getElementById("result");
  resultEl.style.display = "none";
  resultEl.textContent = "";
  resultEl.className = "result";

  const bmiMeter = document.getElementById("bmiMeter");
  bmiMeter.style.display = "none";
});

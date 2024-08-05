// elements
const textInput = document.getElementById("text-input");
const generateBtn = document.getElementById("generate-btn");
const qrCode = document.getElementById("qr-code");
const downloadBtn = document.getElementById("downloadBtn");

// variables
const WIDTH = 256;
const HEIGHT = 256;

// logic
function generateQrCode() {
  const text = textInput.value.trim();
  qrCode.innerHTML = "";

  if (text === "") {
    qrCode.textContent = "Please enter some text!";
    return;
  }

  new QRCode(qrCode, {
    text: text,
    width: WIDTH,
    height: HEIGHT,
  });
}

// events
document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;
    textInput.value = currentUrl;
  });
});

generateBtn.addEventListener("click", generateQrCode);

downloadBtn.addEventListener("click", () => {
  const qr = document.querySelector("canvas");
  if (!qr) {
    qrCode.textContent = "Please generate QR code first!";
    return;
  }
  const link = document.createElement("a");
  link.href = qr.toDataURL("image/png");
  link.download = "qr.png";
  link.click();
});

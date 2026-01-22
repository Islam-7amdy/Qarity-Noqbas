function sendOTP() {
  const phone = document.getElementById('phone').value;
  alert('OTP sent to ' + phone);
}

function verifyOTP() {
  const otp = document.getElementById('otp').value;
  if(otp === "1234") {
    alert('OTP verified! Redirecting to services...');
    window.location.href = 'services.html';
  } else {
    alert('Invalid OTP');
  }
}

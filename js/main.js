// shoe-store/js/main.js
// Handles interactive foot measurement tool.

(function () {
  const input = document.getElementById('cmInput');
  const button = document.getElementById('calcBtn');
  const result = document.getElementById('estimatedSize');

  // Basic conversion: US size estimate from centimeters (approx)
  // US size ≈ (cm * 2.54) / 1.75
  function estimateSize(cm) {
    const us = (cm * 2.54) / 1.75; // roughly
    // Round to nearest 0.5
    return Math.round(us * 2) / 2;
  }

  button.addEventListener('click', function () {
    const cmVal = parseFloat(input.value);
    if (isNaN(cmVal) || cmVal <= 0) {
      result.textContent = 'Please enter a valid length in cm';
      result.style.color = '#d32f2f';
      return;
    }
    const est = estimateSize(cmVal);
    result.style.color = '#222';
    result.textContent = `Estimated US Shoe Size: ${est}`;
  });
})();

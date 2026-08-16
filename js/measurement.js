/*
 * Foot Measurement Wizard
 * Placeholder implementation – no actual computer-vision.
 * Uses camera API to preview but measurement values are simulated.
 */

(function () {
  const state = {
    currentStep: 1,
    results: {},
    topStream: null,
    sideStream: null,
  };

  // Utility to show and hide steps
  function showStep(step) {
    state.currentStep = step;
    const steps = document.querySelectorAll('#measurement-wizard .step');
    steps.forEach((el) => {
      el.style.display = 'none';
      if (el.classList.contains('step-' + getStepName(step))) el.style.display = 'block';
    });
    // Update step indicator
    const stepNum = document.getElementById('step-number');
    if (stepNum) stepNum.textContent = step;
    // Camera handling
    if (step === 2) {
      if (!state.topStream) startCamera('topVideo', (stream) => (state.topStream = stream));
    } else if (step === 3) {
      if (!state.sideStream) startCamera('sideVideo', (stream) => (state.sideStream = stream));
    }
  }

  function getStepName(step) {
    const mapping = {
      1: 'prepare',
      2: 'top-view',
      3: 'side-view',
      4: 'review',
    };
    return mapping[step];
  }

  async function startCamera(id, callback) {
    const video = document.getElementById(id);
    if (!video) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: 'environment' },
      });
      video.srcObject = stream;
      video.play();
      if (callback) callback(stream);
    } catch (err) {
      console.warn('Camera error:', err);
      showCameraError(id, err);
    }
  }

  function showCameraError(id, err) {
    const container = document.getElementById('measurement-wizard');
    if (!container) return;
    const errMsg = document.createElement('p');
    errMsg.style.color = 'red';
    errMsg.textContent = `Camera access denied or unavailable for ${id}.`;
    container.appendChild(errMsg);
  }

  function stopCamera(stream) {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
  }

  // Capture handlers
  function captureTop() {
    // Simulate measurement
    state.results.top = {
      length: (20 + Math.random() * 8).toFixed(1),
      width: (8 + Math.random() * 4).toFixed(1),
    };
    showStep(3);
  }

  function captureSide() {
    // Simulate measurement
    state.results.side = {
      height: (10 + Math.random() * 5).toFixed(1),
    };
    showStep(4);
    renderReview();
  }

  function renderReview() {
    const summary = document.getElementById('measurement-summary');
    if (!summary) return;
    summary.innerHTML = '';
    if (state.results.top) {
      const liLen = document.createElement('li');
      liLen.textContent = `Foot length: ${state.results.top.length} cm`;
      summary.appendChild(liLen);
      const liWid = document.createElement('li');
      liWid.textContent = `Foot width: ${state.results.top.width} cm`;
      summary.appendChild(liWid);
    }
    if (state.results.side) {
      const liHei = document.createElement('li');
      liHei.textContent = `Foot height: ${state.results.side.height} cm`;
      summary.appendChild(liHei);
    }
    // Shoe size estimation
    const guessDiv = document.getElementById('shoe-size-guess');
    if (guessDiv && state.results.top) {
      const lengthCm = parseFloat(state.results.top.length);
      const usSize = Math.round((lengthCm - 1.72) / 0.5 * 10) / 10; // rough estimate
      guessDiv.textContent = `Estimated US Men's size: ${usSize}`;
    }
  }

  function retake() {
    // Reset measurements and go back to top view
    state.results = {};
    if (state.topStream) stopCamera(state.topStream);
    if (state.sideStream) stopCamera(state.sideStream);
    state.topStream = null;
    state.sideStream = null;
    showStep(2);
  }

  // Bind UI events
  function bindEvents() {
    const startBtn = document.getElementById('start-measure-btn');
    if (startBtn) startBtn.addEventListener('click', () => showStep(2));
    const captureTopBtn = document.getElementById('capture-top-btn');
    if (captureTopBtn) captureTopBtn.addEventListener('click', captureTop);
    const captureSideBtn = document.getElementById('capture-side-btn');
    if (captureSideBtn) captureSideBtn.addEventListener('click', captureSide);
    const retakeBtn = document.getElementById('retake-btn');
    if (retakeBtn) retakeBtn.addEventListener('click', retake);
  }

  // Initialize after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Hide original placeholder content
    const oldContent = document.querySelector('#measurement .measurement-content');
    if (oldContent) oldContent.style.display = 'none';
    // Inject wizard markup
    function createWizard() {
      const html = `
        <div id="measurement-wizard">
          <div id="wizard-header"><h3>Step <span id="step-number">1</span> of 4</h3></div>
          <div id="wizard-content">
            <div class="step step-prepare active" id="step-prepare">
              <p class="instruction">Remove shoes and socks, place your foot flat on a hard, level surface, keep toes naturally extended.</p>
              <p class="instruction">Place a reference card (e.g., a bank card) next to your foot.</p>
              <button id="start-measure-btn" class="primary-btn">Start Measurement</button>
            </div>
            <div class="step step-top-view" id="step-top-view" style="display:none;">
              <div class="video-container"><video id="topVideo" autoplay playsinline muted class="camera-video"></video>
                <div class="overlay top-guide"></div></div>
              <button id="capture-top-btn" class="primary-btn">Capture</button>
            </div>
            <div class="step step-side-view" id="step-side-view" style="display:none;">
              <div class="video-container"><video id="sideVideo" autoplay playsinline muted class="camera-video"></video>
                <div class="overlay side-guide"></div></div>
              <button id="capture-side-btn" class="primary-btn">Capture</button>
            </div>
            <div class="step step-review" id="step-review" style="display:none;">
              <div class="summary-card"><h3>Review Your Measurements</h3>
                <ul id="measurement-summary"></ul>
                <div id="shoe-size-guess" class="price-tag"></div>
              </div>
              <button id="retake-btn" class="primary-btn">Retake</button>
            </div>
          </div>
        </div>`;
      const temp = document.createElement('div');
      temp.innerHTML = html;
      return temp.firstElementChild;
    }
    const wizardEl = createWizard();
    document.getElementById('measurement').appendChild(wizardEl);
    bindEvents();
    showStep(1);
  });
})();

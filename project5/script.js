/* ==========================================================
   Secure Password Generator — script.js
   ========================================================== */
 
(() => {
  'use strict';
 
  /* ============================
     Elements
  ============================ */
  const passwordInput   = document.getElementById('password');
  const copyBtn          = document.getElementById('copy-btn');
 
  const lengthSlider     = document.getElementById('length');
  const lengthValue      = document.getElementById('length-value');
 
  const uppercaseBox     = document.getElementById('uppercase');
  const lowercaseBox     = document.getElementById('lowercase');
  const numbersBox       = document.getElementById('numbers');
  const symbolsBox       = document.getElementById('symbols');
  const excludeAmbigBox  = document.getElementById('exclude-ambiguous');
 
  const modeRadios       = document.querySelectorAll('input[name="mode"]');
 
  const strengthText     = document.getElementById('strength-text');
  const strengthFill     = document.getElementById('strength-fill');
 
  const entropyEl        = document.getElementById('entropy');
  const crackTimeEl      = document.getElementById('crack-time');
 
  const generateBtn      = document.getElementById('generate-btn');
 
  const historyList      = document.getElementById('history-list');
  const clearHistoryBtn  = document.getElementById('clear-history');
 
  const toast            = document.getElementById('toast');
 
  const optionCheckboxes = [uppercaseBox, lowercaseBox, numbersBox, symbolsBox];
 
  /* ============================
     Constants
  ============================ */
  const CHARSETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };
 
  // Characters that are easy to misread (I/l/1, O/0, etc.)
  const AMBIGUOUS_CHARS = 'Il1O0';
 
  // Small diceware-style word list (kept short on purpose — swap in the
  // full EFF list later if you want stronger passphrases).
  const WORDLIST = [
    'anchor', 'basil', 'canyon', 'delta', 'ember', 'falcon', 'granite',
    'harbor', 'ivory', 'juniper', 'kettle', 'lumen', 'meadow', 'nectar',
    'oasis', 'pebble', 'quartz', 'ridge', 'summit', 'timber', 'umbra',
    'velvet', 'willow', 'yonder', 'zephyr', 'amber', 'birch', 'cobalt',
    'drift', 'ember', 'flint', 'glacier', 'haven', 'inlet', 'jade',
    'karst', 'lagoon', 'mosaic', 'nebula', 'onyx', 'plume', 'quill',
    'raven', 'slate', 'thicket', 'usher', 'vapor', 'wren'
  ];
 
  const HISTORY_LIMIT = 6;
  const HISTORY_KEY = 'pwgen-history';
 
  // Assumed offline attack speed (guesses/sec) used for the crack-time estimate.
  // This is a rough, illustrative figure — not a security guarantee.
  const GUESSES_PER_SECOND = 1e10;
 
  /* ============================
     Secure random helpers
  ============================ */
 
  // Uniform random integer in [0, max) using crypto.getRandomValues,
  // with rejection sampling so the distribution isn't biased.
  function secureRandomInt(max) {
    const range = 256 - (256 % max);
    const bytes = new Uint8Array(1);
    let value;
    do {
      crypto.getRandomValues(bytes);
      value = bytes[0];
    } while (value >= range);
    return value % max;
  }
 
  function secureRandomChar(charset) {
    return charset[secureRandomInt(charset.length)];
  }
 
  // Fisher-Yates shuffle using secureRandomInt, so guaranteed-category
  // characters aren't always in predictable positions.
  function secureShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = secureRandomInt(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
 
  function stripAmbiguous(str) {
    return [...str].filter(ch => !AMBIGUOUS_CHARS.includes(ch)).join('');
  }
 
  /* ============================
     Password generation
  ============================ */
  function getActiveCharsets() {
    const active = [];
    if (uppercaseBox.checked) active.push(CHARSETS.uppercase);
    if (lowercaseBox.checked) active.push(CHARSETS.lowercase);
    if (numbersBox.checked) active.push(CHARSETS.numbers);
    if (symbolsBox.checked) active.push(CHARSETS.symbols);
 
    if (excludeAmbigBox.checked) {
      return active.map(stripAmbiguous).filter(set => set.length > 0);
    }
    return active;
  }
 
  function generatePassword() {
    const length = Number(lengthSlider.value);
    const charsets = getActiveCharsets();
 
    if (charsets.length === 0) {
      return null; // caller handles the "no options selected" case
    }
 
    // Guarantee at least one character from every selected category.
    const guaranteed = charsets.map(set => secureRandomChar(set));
 
    const fullCharset = charsets.join('');
    const remainingLength = Math.max(length - guaranteed.length, 0);
    const rest = Array.from({ length: remainingLength },
      () => secureRandomChar(fullCharset));
 
    return secureShuffle([...guaranteed, ...rest]).slice(0, length).join('');
  }
 
  /* ============================
     Passphrase generation
  ============================ */
  function generatePassphrase() {
    const length = Number(lengthSlider.value);
    // Map the length slider to a word count, roughly 3–8 words.
    const wordCount = Math.min(8, Math.max(3, Math.round(length / 8)));
 
    const words = Array.from({ length: wordCount }, () => {
      let word = WORDLIST[secureRandomInt(WORDLIST.length)];
      // Randomly capitalize about half the words for a bit of extra entropy.
      if (secureRandomInt(2) === 0) {
        word = word[0].toUpperCase() + word.slice(1);
      }
      return word;
    });
 
    // Tack on a 2-digit number for a little extra unpredictability.
    const suffix = String(secureRandomInt(90) + 10);
    return `${words.join('-')}-${suffix}`;
  }
 
  /* ============================
     Entropy + strength
  ============================ */
  function getCurrentMode() {
    return document.querySelector('input[name="mode"]:checked').value;
  }
 
  function calculateEntropy(password, mode) {
    if (mode === 'passphrase') {
      const wordCount = password.split('-').length - 1; // minus the number suffix
      // log2(wordlist^words) + log2(2^words for capitalization) + log2(90 for the number)
      return Math.round(
        wordCount * Math.log2(WORDLIST.length) +
        wordCount * 1 +
        Math.log2(90)
      );
    }
 
    const charsets = getActiveCharsets();
    const poolSize = charsets.join('').length || 1;
    return Math.round(password.length * Math.log2(poolSize));
  }
 
  function formatCrackTime(entropyBits) {
    const combinations = Math.pow(2, entropyBits);
    const seconds = combinations / GUESSES_PER_SECOND / 2; // average case
 
    const units = [
      { label: 'centuries', secs: 60 * 60 * 24 * 365 * 100 },
      { label: 'years', secs: 60 * 60 * 24 * 365 },
      { label: 'days', secs: 60 * 60 * 24 },
      { label: 'hours', secs: 60 * 60 },
      { label: 'minutes', secs: 60 },
      { label: 'seconds', secs: 1 }
    ];
 
    if (seconds < 1) return 'Instantly';
 
    for (const unit of units) {
      const value = seconds / unit.secs;
      if (value >= 1) {
        const rounded = value >= 100 ? Math.round(value).toLocaleString() : value.toFixed(1);
        return `${rounded} ${unit.label}`;
      }
    }
    return 'Instantly';
  }
 
  function getStrengthLevel(entropyBits) {
    if (entropyBits < 28) return { key: 'weak', label: 'Very Weak', pct: 15 };
    if (entropyBits < 36) return { key: 'fair', label: 'Weak', pct: 35 };
    if (entropyBits < 60) return { key: 'good', label: 'Reasonable', pct: 55 };
    if (entropyBits < 90) return { key: 'strong', label: 'Strong', pct: 80 };
    return { key: 'very-strong', label: 'Very Strong', pct: 100 };
  }
 
  function updateStrengthUI(entropyBits) {
    const { key, label, pct } = getStrengthLevel(entropyBits);
 
    strengthText.textContent = label;
    strengthFill.style.width = `${pct}%`;
 
    const allLevels = ['weak', 'fair', 'good', 'strong', 'very-strong'];
    strengthText.classList.remove(...allLevels);
    strengthFill.classList.remove(...allLevels);
    strengthText.classList.add(key);
    strengthFill.classList.add(key);
 
    entropyEl.textContent = `${entropyBits} Bits`;
    crackTimeEl.textContent = formatCrackTime(entropyBits);
  }
 
  /* ============================
     Options validation
  ============================ */
  // Prevents the user from unchecking every character-type box at once.
  optionCheckboxes.forEach(box => {
    box.addEventListener('change', () => {
      const anyChecked = optionCheckboxes.some(b => b.checked);
      if (!anyChecked) {
        box.checked = true; // revert the change that emptied the set
        showToast('At least one character type is required');
      }
    });
  });
 
  /* ============================
     Mode switching
  ============================ */
  function applyModeUI() {
    const mode = getCurrentMode();
    const isPassphrase = mode === 'passphrase';
 
    // Character-type options don't apply to passphrases.
    document.querySelector('.options-section').style.opacity = isPassphrase ? 0.4 : 1;
    document.querySelector('.options-section').style.pointerEvents = isPassphrase ? 'none' : 'auto';
  }
 
  modeRadios.forEach(radio => radio.addEventListener('change', () => {
    applyModeUI();
    handleGenerate();
  }));
 
  /* ============================
     Slider
  ============================ */
  lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
  });
 
  lengthSlider.addEventListener('change', handleGenerate);
 
  /* ============================
     Generate
  ============================ */
  function handleGenerate() {
    const mode = getCurrentMode();
    const result = mode === 'passphrase' ? generatePassphrase() : generatePassword();
 
    if (result === null) {
      showToast('Select at least one character type');
      return;
    }
 
    passwordInput.value = result;
    const entropyBits = calculateEntropy(result, mode);
    updateStrengthUI(entropyBits);
    addToHistory(result);
  }
 
  generateBtn.addEventListener('click', handleGenerate);
 
  /* ============================
     Copy to clipboard
  ============================ */
  async function copyPassword(value) {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      showToast('Password Copied Successfully');
    } catch (err) {
      // Fallback for browsers/contexts without Clipboard API access.
      const temp = document.createElement('textarea');
      temp.value = value;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showToast('Password Copied Successfully');
    }
  }
 
  copyBtn.addEventListener('click', () => {
    copyPassword(passwordInput.value);
    copyBtn.classList.add('copied');
    setTimeout(() => copyBtn.classList.remove('copied'), 1200);
  });
 
  /* ============================
     Toast
  ============================ */
  let toastTimer = null;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
  }
 
  /* ============================
     History
  ============================ */
  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch {
      return [];
    }
  }
 
  function saveHistory(items) {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
    } catch {
      /* localStorage unavailable — history just won't persist across reloads */
    }
  }
 
  function renderHistory(items) {
    historyList.innerHTML = '';
    items.forEach((pwd, index) => {
      const item = document.createElement('div');
      item.className = 'history-item';
 
      const span = document.createElement('span');
      span.textContent = pwd;
 
      const actions = document.createElement('div');
 
      const copyItemBtn = document.createElement('button');
      copyItemBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
      copyItemBtn.setAttribute('aria-label', 'Copy this password');
      copyItemBtn.addEventListener('click', () => copyPassword(pwd));
 
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      deleteBtn.setAttribute('aria-label', 'Remove from history');
      deleteBtn.addEventListener('click', () => removeFromHistory(index));
 
      actions.appendChild(copyItemBtn);
      actions.appendChild(deleteBtn);
 
      item.appendChild(span);
      item.appendChild(actions);
      historyList.appendChild(item);
    });
  }
 
  function addToHistory(pwd) {
    const items = loadHistory();
    items.unshift(pwd);
    const trimmed = items.slice(0, HISTORY_LIMIT);
    saveHistory(trimmed);
    renderHistory(trimmed);
  }
 
  function removeFromHistory(index) {
    const items = loadHistory();
    items.splice(index, 1);
    saveHistory(items);
    renderHistory(items);
  }
 
  clearHistoryBtn.addEventListener('click', () => {
    saveHistory([]);
    renderHistory([]);
  });
 
  /* ============================
     Init
  ============================ */
  function init() {
    lengthValue.textContent = lengthSlider.value;
    applyModeUI();
    renderHistory(loadHistory());
    handleGenerate();
  }
 
  init();
})();
 
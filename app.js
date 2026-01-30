// State
let people = [];
let selectedCharacter = null;
let selectedStyle = null;

// DOM Elements
const modal = document.getElementById('modal');
const addButton = document.getElementById('addButton');
const modalClose = document.getElementById('modalClose');
const personNameInput = document.getElementById('personName');
const characterGrid = document.getElementById('characterGrid');
const styleGrid = document.getElementById('styleGrid');
const preview = document.getElementById('preview');
const submitButton = document.getElementById('submitButton');
const peopleGrid = document.getElementById('peopleGrid');
const compatibilitySection = document.getElementById('compatibilitySection');
const compatibilityGrid = document.getElementById('compatibilityGrid');

// Initialize
function init() {
  renderCharacterGrid();
  renderStyleGrid();
  bindEvents();
  updateCompatibilitySection();
}

// Render character selection grid
function renderCharacterGrid() {
  characterGrid.innerHTML = CHARACTERS.map(char => {
    const imageUrl = getImageUrl(char.id, 'VD'); // Use VD as preview
    return `
      <button class="character-btn" data-id="${char.id}" title="${char.description}">
        ${imageUrl
          ? `<img class="char-img" src="${imageUrl}" alt="${char.name}">`
          : `<span class="char-emoji">${char.emoji}</span>`
        }
        <span class="char-name">${char.name}<br><span class="char-code">(${char.id})</span></span>
      </button>
    `;
  }).join('');
}

// Render style selection grid
function renderStyleGrid() {
  styleGrid.innerHTML = Object.values(STYLES).map(style => `
    <button class="style-btn" data-id="${style.id}" style="--style-color: ${style.color}; background-color: ${style.color}">
      <span class="style-name">${style.name} (${style.id})</span>
      <span class="style-desc">${style.description}</span>
    </button>
  `).join('');
}

// Bind events
function bindEvents() {
  addButton.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  characterGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.character-btn');
    if (btn) selectCharacter(btn.dataset.id);
  });

  styleGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.style-btn');
    if (btn) selectStyle(btn.dataset.id);
  });

  personNameInput.addEventListener('input', updateSubmitButton);
  submitButton.addEventListener('click', addPerson);
}

// Modal functions
function openModal() {
  modal.classList.add('active');
  personNameInput.value = '';
  selectedCharacter = null;
  selectedStyle = null;
  updateCharacterSelection();
  updateStyleSelection();
  updatePreview();
  updateSubmitButton();
}

function closeModal() {
  modal.classList.remove('active');
}

// Selection functions
function selectCharacter(id) {
  selectedCharacter = id;
  updateCharacterSelection();
  updatePreview();
  updateSubmitButton();
}

function selectStyle(id) {
  selectedStyle = id;
  updateStyleSelection();
  updatePreview();
  updateSubmitButton();
}

function updateCharacterSelection() {
  document.querySelectorAll('.character-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.id === selectedCharacter);
  });
}

function updateStyleSelection() {
  document.querySelectorAll('.style-btn').forEach(btn => {
    const isSelected = btn.dataset.id === selectedStyle;
    btn.classList.toggle('selected', isSelected);
  });
}

function updatePreview() {
  if (selectedCharacter && selectedStyle) {
    const char = getCharacter(selectedCharacter);
    const style = getStyle(selectedStyle);
    const imageUrl = getImageUrl(selectedCharacter, selectedStyle);

    preview.innerHTML = `
      ${imageUrl
        ? `<img src="${imageUrl}" alt="${char.name}">`
        : `<span class="preview-emoji">${char.emoji}</span>`
      }
      <span class="preview-name" style="color: ${style.color}">${getFullTypeName(selectedCharacter, selectedStyle)}</span>
    `;
    preview.style.borderColor = style.color;
    preview.classList.add('active');
  } else {
    preview.classList.remove('active');
  }
}

function updateSubmitButton() {
  const hasName = personNameInput.value.trim() !== '';
  submitButton.disabled = !(hasName && selectedCharacter && selectedStyle);
}

// Add person
function addPerson() {
  const person = {
    id: Date.now().toString(),
    name: personNameInput.value.trim(),
    characterId: selectedCharacter,
    styleId: selectedStyle,
  };

  people.push(person);
  renderPeople();
  updateCompatibilitySection();
  closeModal();
}

// Remove person
function removePerson(id) {
  people = people.filter(p => p.id !== id);
  renderPeople();
  updateCompatibilitySection();
}

// Render people cards
function renderPeople() {
  const cards = people.map(person => {
    const char = getCharacter(person.characterId);
    const style = getStyle(person.styleId);
    const imageUrl = getImageUrl(person.characterId, person.styleId);

    return `
      <div class="person-card" style="border-color: ${style.color}">
        <button class="remove-btn" onclick="removePerson('${person.id}')">&times;</button>
        <div class="card-header" style="background-color: ${style.color}15">
          <span class="person-name">${person.name}</span>
        </div>
        <div class="card-body">
          ${imageUrl
            ? `<img class="type-image" src="${imageUrl}" alt="${char.name}">`
            : `<div class="type-emoji">${char.emoji}</div>`
          }
          <div class="type-name-row">
            <span class="style-label" style="color: ${style.color}">${style.name}</span>
            <span class="character-name">${char.name}</span>
          </div>
          <p class="type-code">${person.characterId}-${person.styleId}</p>
        </div>
      </div>
    `;
  }).join('');

  peopleGrid.innerHTML = cards + `
    <button class="add-button" id="addButton" onclick="openModal()">
      <span class="plus">+</span>
      <span>追加する</span>
    </button>
  `;
}

// Update compatibility section
function updateCompatibilitySection() {
  if (people.length < 2) {
    compatibilitySection.classList.add('hidden');
    return;
  }

  compatibilitySection.classList.remove('hidden');

  const pairs = [];
  for (let i = 0; i < people.length; i++) {
    for (let j = i + 1; j < people.length; j++) {
      pairs.push({ person1: people[i], person2: people[j] });
    }
  }

  compatibilityGrid.innerHTML = pairs.map(({ person1, person2 }) => {
    const char1 = getCharacter(person1.characterId);
    const char2 = getCharacter(person2.characterId);
    const style1 = getStyle(person1.styleId);
    const style2 = getStyle(person2.styleId);
    const result = calculateCompatibility(person1.styleId, person2.styleId);
    const img1 = getImageUrl(person1.characterId, person1.styleId);
    const img2 = getImageUrl(person2.characterId, person2.styleId);

    return `
      <div class="compatibility-card" style="border-color: ${result.color}">
        <div class="pair-header">
          <div class="pair-person">
            <span class="badge" style="background-color: ${style1.color}">${style1.name}</span>
            ${img1 ? `<img src="${img1}" alt="${char1.name}">` : `<span class="emoji">${char1.emoji}</span>`}
            <span class="name">${person1.name}</span>
          </div>
          <span class="connector">×</span>
          <div class="pair-person">
            <span class="badge" style="background-color: ${style2.color}">${style2.name}</span>
            ${img2 ? `<img src="${img2}" alt="${char2.name}">` : `<span class="emoji">${char2.emoji}</span>`}
            <span class="name">${person2.name}</span>
          </div>
        </div>
        <div class="result">
          <div class="score-circle" style="border-color: ${result.color}">
            <span class="score">${result.score}</span>
            <span class="score-label">%</span>
          </div>
          <div class="result-info">
            <span class="level-badge" style="background-color: ${result.color}">${result.text}</span>
            <p class="result-desc">${result.description}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Start app
document.addEventListener('DOMContentLoaded', init);

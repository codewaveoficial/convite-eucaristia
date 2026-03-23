const confirmBtn = document.getElementById('confirmBtn');

function confirmAttendance() {
  const confirmed = localStorage.getItem('eucaristia-confirmed');
  if (confirmed === 'true') {
    alert('Presença já confirmada. Aguardamos você!');
    return;
  }

  const accepted = confirm('Deseja confirmar presença na Primeira Eucaristia da Agatha?');
  if (accepted) {
    localStorage.setItem('eucaristia-confirmed', 'true');
    confirmBtn.textContent = 'Presença confirmada ✓';
    confirmBtn.disabled = true;
    confirmBtn.classList.add('btn-confirmed');
    alert('Obrigado! Sua presença foi confirmada.');
  }
}

function updateConfirmedState() {
  if (!confirmBtn) return;
  if (localStorage.getItem('eucaristia-confirmed') === 'true') {
    confirmBtn.textContent = 'Presença confirmada ✓';
    confirmBtn.disabled = true;
  }
}

const locationBtn = document.getElementById('locationBtn');
const locationModal = document.getElementById('locationModal');
const modalCloseBtn = document.querySelector('.modal-close');

if (confirmBtn) {
  confirmBtn.addEventListener('click', confirmAttendance);
}

if (locationBtn) {
  locationBtn.addEventListener('click', () => {
    if (locationModal) {
      locationModal.classList.add('open');
      locationModal.setAttribute('aria-hidden', 'false');
    }
  });
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', () => {
    if (locationModal) {
      locationModal.classList.remove('open');
      locationModal.setAttribute('aria-hidden', 'true');
    }
  });
}

if (locationModal) {
  locationModal.addEventListener('click', (event) => {
    if (event.target === locationModal) {
      locationModal.classList.remove('open');
      locationModal.setAttribute('aria-hidden', 'true');
    }
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && locationModal && locationModal.classList.contains('open')) {
    locationModal.classList.remove('open');
    locationModal.setAttribute('aria-hidden', 'true');
  }
});

updateConfirmedState();
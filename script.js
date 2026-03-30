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

    // Enviar mensagem para WhatsApp
    const phoneNumber = '27999190332';
    const message = encodeURIComponent('Olá! Confirmo minha presença na Primeira Eucaristia da Agatha.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
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
const modalCloseBtns = document.querySelectorAll('.modal-close');

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

if (lunchBtn) {
  lunchBtn.addEventListener('click', () => {
    if (lunchModal) {
      lunchModal.classList.add('open');
      lunchModal.setAttribute('aria-hidden', 'false');
    }
  });
}

modalCloseBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

if (locationModal) {
  locationModal.addEventListener('click', (event) => {
    if (event.target === locationModal) {
      locationModal.classList.remove('open');
      locationModal.setAttribute('aria-hidden', 'true');
    }
  });
}

if (lunchModal) {
  lunchModal.addEventListener('click', (event) => {
    if (event.target === lunchModal) {
      lunchModal.classList.remove('open');
      lunchModal.setAttribute('aria-hidden', 'true');
    }
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (locationModal && locationModal.classList.contains('open')) {
      locationModal.classList.remove('open');
      locationModal.setAttribute('aria-hidden', 'true');
    }
    if (lunchModal && lunchModal.classList.contains('open')) {
      lunchModal.classList.remove('open');
      lunchModal.setAttribute('aria-hidden', 'true');
    }
  }
});


updateConfirmedState();
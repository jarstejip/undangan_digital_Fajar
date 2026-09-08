/**
 * Undangan Pernikahan Digital Bertema Jawa Elegan
 * Wira Bagus Setiawan Putra & Neerafadiya Ayunda Syakira
 */

document.addEventListener('DOMContentLoaded', () => {
  initGuestPersonalization();
  initCoverAndAudio();
  initCountdown();
  initAutoScroll();
  initClipboardCopy();
  initRsvpAndWishes();
  initBottomNavSpy();
});

/* ===================================================================
   1. PERSONALISASI NAMA TAMU DARI PARAMETER URL (?kpd= / ?to=)
   =================================================================== */
function initGuestPersonalization() {
  const urlParams = new URLSearchParams(window.location.search);
  let guestName = urlParams.get('kpd') || urlParams.get('to');
  let guestLocation = urlParams.get('di') || urlParams.get('lokasi');

  const guestElement = document.getElementById('guestNameDisplay');
  const guestLocElement = document.getElementById('guestLocationDisplay');
  const rsvpNameInput = document.getElementById('rsvpNama');

  if (guestName && guestName.trim() !== '') {
    // Bersihkan dan format nama tamu
    guestName = decodeURIComponent(guestName.trim());
    if (guestElement) {
      guestElement.textContent = guestName;
    }
    if (rsvpNameInput) {
      rsvpNameInput.value = guestName;
    }
  } else {
    if (guestElement) {
      guestElement.textContent = 'Bapak / Ibu / Keluarga';
    }
  }

  if (guestLocation && guestLocation.trim() !== '') {
    if (guestLocElement) {
      guestLocElement.textContent = 'di ' + decodeURIComponent(guestLocation.trim());
    }
  }
}

/* ===================================================================
   2. COVER BUKA UNDANGAN & PEMUTAR MUSIK GAMELAN JAWA
   =================================================================== */
function initCoverAndAudio() {
  const coverOverlay = document.getElementById('coverOverlay');
  const btnBuka = document.getElementById('btnBukaUndangan');
  const audio = document.getElementById('weddingMusic');
  const floatingAudioBtn = document.getElementById('floatingAudioBtn');
  const audioIcon = document.getElementById('audioIcon');
  let isPlaying = false;

  // Set volume lembut
  if (audio) {
    audio.volume = 0.75;
  }

  // Tombol Buka Undangan
  if (btnBuka && coverOverlay) {
    btnBuka.addEventListener('click', () => {
      // 1. Jalankan audio
      playAudio();

      // 2. Animasi geser keluar cover
      coverOverlay.classList.add('opened');

      // 3. Scroll halus ke bagian awal hero
      setTimeout(() => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    });
  }

  // Tombol Audio Melayang (Play/Pause)
  if (floatingAudioBtn) {
    floatingAudioBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }

  function playAudio() {
    if (!audio) return;
    audio.play().then(() => {
      isPlaying = true;
      if (floatingAudioBtn) {
        floatingAudioBtn.classList.remove('paused');
        floatingAudioBtn.classList.add('spin-vinyl');
      }
      updateAudioIcon(true);
    }).catch(err => {
      console.log('Audio autoplay prevented or error:', err);
    });
  }

  function pauseAudio() {
    if (!audio) return;
    audio.pause();
    isPlaying = false;
    if (floatingAudioBtn) {
      floatingAudioBtn.classList.add('paused');
    }
    updateAudioIcon(false);
  }

  function updateAudioIcon(playing) {
    if (!audioIcon) return;
    if (playing) {
      // Icon Piringan Musik / Audio Playing
      audioIcon.innerHTML = `
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      `;
    } else {
      // Icon Music Muted
      audioIcon.innerHTML = `
        <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l4.27 4.27c-.82.46-1.77.73-2.77.73-3.04 0-5.5-2.46-5.5-5.5 0-1.71.78-3.23 2-4.24L4.27 3zM14 7h4V3h-6v5.18l2 2V7z"/>
      `;
    }
  }
}

/* ===================================================================
   3. HITUNG MUNDUR (COUNTDOWN TIMER) REAL-TIME
   =================================================================== */
function initCountdown() {
  // Tanggal Pernikahan Wira & Neera: Kamis, 10 September 2026, 08:00 WIB
  const weddingDate = new Date('September 10, 2026 08:00:00 GMT+0700').getTime();

  const elDays = document.getElementById('cdDays');
  const elHours = document.getElementById('cdHours');
  const elMinutes = document.getElementById('cdMinutes');
  const elSeconds = document.getElementById('cdSeconds');

  function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      if (elDays) elDays.textContent = '00';
      if (elHours) elHours.textContent = '00';
      if (elMinutes) elMinutes.textContent = '00';
      if (elSeconds) elSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ===================================================================
   4. FITUR AUTO SCROLL (GULIR OTOMATIS AKTIF / NONAKTIF)
   =================================================================== */
function initAutoScroll() {
  const scrollBtn = document.getElementById('floatingAutoScrollBtn');
  const scrollIcon = document.getElementById('scrollIcon');
  let isAutoScrolling = false;
  let scrollInterval = null;

  if (!scrollBtn) return;

  scrollBtn.addEventListener('click', () => {
    if (isAutoScrolling) {
      stopAutoScroll();
      showToast('Auto scroll dinonaktifkan');
    } else {
      startAutoScroll();
      showToast('Auto scroll aktif');
    }
  });

  function startAutoScroll() {
    isAutoScrolling = true;
    scrollBtn.classList.add('active');
    if (scrollIcon) {
      // Icon Pause (||)
      scrollIcon.innerHTML = `
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      `;
    }

    scrollInterval = setInterval(() => {
      window.scrollBy(0, 1.2);

      // Berhenti otomatis jika mencapai akhir halaman
      if ((window.innerHeight + window.pageYOffset) >= document.documentElement.scrollHeight - 10) {
        stopAutoScroll();
        showToast('Sudah mencapai bagian akhir undangan');
      }
    }, 22);
  }

  function stopAutoScroll() {
    isAutoScrolling = false;
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
    scrollBtn.classList.remove('active');
    if (scrollIcon) {
      // Icon Panah Bawah
      scrollIcon.innerHTML = `
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      `;
    }
  }

  // Jika pengguna melakukan scroll manual dengan mousewheel atau sentuhan layar, jeda auto scroll
  window.addEventListener('wheel', () => {
    if (isAutoScrolling) {
      stopAutoScroll();
    }
  }, { passive: true });

  window.addEventListener('touchmove', () => {
    if (isAutoScrolling) {
      stopAutoScroll();
    }
  }, { passive: true });
}

/* ===================================================================
   5. SALIN NOMOR REKENING & ALAMAT (1-KLIK COPY & TOAST)
   =================================================================== */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Nomor rekening / alamat berhasil disalin!');
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Berhasil disalin ke papan klip!');
    } catch (err) {
      showToast('Gagal menyalin otomatis');
    }
    document.body.removeChild(textArea);
  }
}

function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ===================================================================
   6. BUKU TAMU / RSVP & UCAPAN RESTU (DENGAN LOCALSTORAGE)
   =================================================================== */
const DEFAULT_WISHES = [
  {
    name: 'Bapak H. Sukarno & Ibu',
    presence: 'ya',
    wishes: 'Nderek mangayubagyo awit palakramane Mas Wira kaliyan Mbak Neera. Mugi tansah pinaringan berkah saking Gusti Allah, dados keluarga ingkang sakinah, mawaddah, warahmah dumugi kaken-kaken ninen-ninen.',
    time: '1 jam yang lalu'
  },
  {
    name: 'Dimas Anggara & Istri',
    presence: 'ya',
    wishes: 'Selamat menempuh hidup baru sahabatku Wira & Neera! Semoga selalu kompak, saling melengkapi, dan dilimpahi kebahagiaan tak berujung. Sampai jumpa di hari H!',
    time: '3 jam yang lalu'
  },
  {
    name: 'Keluarga Besar Sasongko',
    presence: 'ya',
    wishes: 'Baarakallahu laka wa baaraka ‘alaika wa jama’a bainakumaa fii khair. Turut berbahagia untuk kedua mempelai dan keluarga besar.',
    time: 'Kemarin'
  },
  {
    name: 'Rian & Sarah (Jogja)',
    presence: 'ragu',
    wishes: 'Selamat Wira & Neera! Semoga lancar seluruh rangkaian acaranya hingga hari H. InsyaAllah kami usahakan hadir.',
    time: '2 hari yang lalu'
  }
];

function initRsvpAndWishes() {
  const rsvpForm = document.getElementById('rsvpForm');
  const feedContainer = document.getElementById('ucapanFeed');
  if (!rsvpForm && !feedContainer) return;

  // Muat data dari localStorage atau gunakan default
  let storedWishes = [];
  try {
    const raw = localStorage.getItem('wira_neera_ucapan');
    if (raw) {
      storedWishes = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading stored wishes:', e);
  }

  const allWishes = [...storedWishes, ...DEFAULT_WISHES];
  renderWishes(allWishes, feedContainer);

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('rsvpNama').value.trim();
      const kehadiran = document.getElementById('rsvpKehadiran').value;
      const jumlah = document.getElementById('rsvpJumlah').value;
      const ucapan = document.getElementById('rsvpUcapan').value.trim();

      if (!nama || !ucapan || !kehadiran) {
        showToast('Mohon lengkapi formulir terlebih dahulu');
        return;
      }

      const newWish = {
        name: nama,
        presence: kehadiran,
        amount: jumlah,
        wishes: ucapan,
        time: 'Baru saja'
      };

      // Simpan di local storage
      storedWishes.unshift(newWish);
      try {
        localStorage.setItem('wira_neera_ucapan', JSON.stringify(storedWishes));
      } catch (e) {
        console.error('Error saving wish to localStorage:', e);
      }

      // Prepend ke tampilan feed
      const newCard = createWishCardElement(newWish);
      if (feedContainer) {
        feedContainer.insertBefore(newCard, feedContainer.firstChild);
      }

      showToast('Matur nuwun! Ucapan & doa restu Anda telah terkirim.');
      rsvpForm.reset();
      
      // Kembalikan nama tamu jika ada di URL
      const urlParams = new URLSearchParams(window.location.search);
      const guestParam = urlParams.get('kpd') || urlParams.get('to');
      if (guestParam) {
        document.getElementById('rsvpNama').value = decodeURIComponent(guestParam);
      }
    });
  }
}

function renderWishes(wishes, container) {
  if (!container) return;
  container.innerHTML = '';
  wishes.forEach(wish => {
    const card = createWishCardElement(wish);
    container.appendChild(card);
  });
}

function createWishCardElement(wish) {
  const item = document.createElement('div');
  item.className = 'ucapan-item';

  const initial = wish.name ? wish.name.trim().charAt(0).toUpperCase() : 'T';

  let badgeText = 'Hadir';
  let badgeClass = 'ya';
  if (wish.presence === 'tidak') {
    badgeText = 'Berhalangan';
    badgeClass = 'tidak';
  } else if (wish.presence === 'ragu') {
    badgeText = 'Masih Ragu';
    badgeClass = 'ragu';
  }

  item.innerHTML = `
    <div class="ucapan-header">
      <div class="ucapan-author-info">
        <div class="ucapan-avatar">${initial}</div>
        <div>
          <div class="ucapan-name">${escapeHtml(wish.name)}</div>
          <div class="ucapan-time">${escapeHtml(wish.time)}</div>
        </div>
      </div>
      <span class="badge-hadir ${badgeClass}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        ${badgeText}
      </span>
    </div>
    <div class="ucapan-body">
      ${escapeHtml(wish.wishes)}
    </div>
  `;

  return item;
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ===================================================================
   7. SCROLL SPY FOR FLOATING BOTTOM NAVIGATION
   =================================================================== */
function initBottomNavSpy() {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    if (currentSection) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
          item.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

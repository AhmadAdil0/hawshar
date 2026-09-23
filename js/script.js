document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Data ---------- */
  const palettes = [
    ['#3a3a3a', '#1c1c1c'],
    ['#5b4a2f', '#241d12'],
    ['#3d2b2b', '#1c1414'],
    ['#8c1f3f', '#2b0f18'],
    ['#c99a3f', '#3a2c12'],
    ['#2f4a3d', '#12241d'],
    ['#4a2f4a', '#1e121e'],
    ['#2f3a4a', '#12181e'],
  ];

  const newArrivals = [
    { title: 'Blonde', artist: 'Frank Ocean', price: 39.99 },
    { title: 'AM', artist: 'Arctic Monkeys', price: 34.99 },
    { title: 'Currents', artist: 'Tame Impala', price: 36.99 },
    { title: 'Back To Black', artist: 'Amy Winehouse', price: 35.99 },
    { title: 'Rumours', artist: 'Fleetwood Mac', price: 32.99 },
    { title: 'IGOR', artist: 'Tyler, The Creator', price: 37.99 },
    { title: 'The Miseducation of Lauryn Hill', artist: 'Lauryn Hill', price: 33.99 },
    { title: 'Nevermind', artist: 'Nirvana', price: 31.99 },
  ];

  const bestSellers = [
    { title: 'Greatest Hits', artist: 'Queen', price: 38.99 },
    { title: 'The Queen Is Dead', artist: 'The Smiths', price: 34.99 },
    { title: 'Random Access Memories', artist: 'Daft Punk', price: 41.99 },
    { title: 'Diamonds', artist: 'Diamantes', price: 29.99 },
  ];

  function renderGrid(container, items) {
    if (!container) return;
    container.innerHTML = items.map((item, i) => {
      const [c1, c2] = palettes[i % palettes.length];
      return `
        <div class="product-card">
          <div class="product-cover" style="background: linear-gradient(155deg, ${c1}, ${c2})">
            <span class="disc"></span>
            <span>${item.title}</span>
            <button class="add-btn" data-title="${item.title}" aria-label="Add ${item.title} to cart">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
          <div class="product-info">
            <p class="p-title">${item.title}</p>
            <p class="p-artist">${item.artist}</p>
            <p class="p-price">$${item.price.toFixed(2)}</p>
          </div>
        </div>`;
    }).join('');
  }

  renderGrid(document.getElementById('newArrivalsGrid'), newArrivals);
  renderGrid(document.getElementById('bestSellersGrid'), bestSellers);

  /* ---------- Mobile nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mainNav.classList.remove('open');
    });
  });
  const dropdown = mainNav.querySelector('.nav-dropdown');
  if (dropdown) {
    dropdown.querySelector('a').addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });
  }

  /* ---------- Search bar ---------- */
  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  const searchClose = document.getElementById('searchClose');
  searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('open');
    if (searchBar.classList.contains('open')) {
      searchBar.querySelector('input').focus();
    }
  });
  searchClose.addEventListener('click', () => searchBar.classList.remove('open'));

  /* ---------- Hero slider ---------- */
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dotsWrap = document.getElementById('heroDots');
  const labels = ['01', '02', '03'];
  let current = 0;
  let timer;

  dotsWrap.innerHTML = slides.map((_, i) =>
    `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"><span class="bar"></span>${labels[i] || (i + 1)}</span>`
  ).join('');
  const dots = Array.from(dotsWrap.querySelectorAll('.dot'));

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    restart();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  document.getElementById('heroNext').addEventListener('click', next);
  document.getElementById('heroPrev').addEventListener('click', prev);
  dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.index))));
  restart();

  /* ---------- Cart ---------- */
  const cartCountEl = document.getElementById('cartCount');
  let cartCount = Number(cartCountEl.textContent) || 0;
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;
    cartCount += 1;
    cartCountEl.textContent = cartCount;
    showToast(`${btn.dataset.title} added to cart`);
  });

  /* ---------- Newsletter form ---------- */
  const form = document.getElementById('newsletterForm');
  const formMessage = document.getElementById('formMessage');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formMessage.textContent = "You're in! Welcome to the club.";
    form.reset();
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
});

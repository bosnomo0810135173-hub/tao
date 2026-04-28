// ===== GinDee App =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHero();
  initCategories();
  initFilters();
  renderRestaurants(restaurants);
  initModal();
  initScrollAnimations();
});

// ----- Navbar -----
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
}

// ----- Hero -----
function initHero() {
  const heroSearch = document.getElementById('heroSearch');
  const heroSearchBtn = document.getElementById('heroSearchBtn');
  if (!heroSearch) return;

  const doSearch = () => {
    const q = heroSearch.value.trim();
    if (q) {
      const filtered = restaurants.filter(r =>
        r.name.includes(q) || r.category.includes(q) ||
        r.tags.some(t => t.includes(q)) || r.location.includes(q) ||
        r.description.includes(q)
      );
      renderRestaurants(filtered);
      document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' });
      updateResultCount(filtered.length);
    } else {
      renderRestaurants(restaurants);
      updateResultCount(restaurants.length);
    }
  };

  heroSearchBtn.addEventListener('click', doSearch);
  heroSearch.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
}

// ----- Categories -----
function initCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  grid.innerHTML = categories.map(cat => `
    <a class="category-card" data-category="${cat.id}" href="#restaurants">
      <span class="icon">${cat.icon}</span>
      <h3>${cat.name}</h3>
      <p>${cat.count} ร้าน</p>
    </a>
  `).join('');

  grid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = card.dataset.category;
      setActiveFilter('category', cat);
      const filtered = cat === 'all' ? restaurants :
        restaurants.filter(r => r.category === cat || r.tags.includes(cat));
      renderRestaurants(filtered);
      updateResultCount(filtered.length);
      document.getElementById('restaurants').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ----- Filters -----
let activeCategory = 'all';
let activeType = 'all';

function initFilters() {
  const bar = document.getElementById('filterBar');
  if (!bar) return;

  bar.innerHTML = typeFilters.map(f => `
    <button class="filter-btn ${f.id === 'all' ? 'active' : ''}" data-type="${f.id}">
      ${f.name}
    </button>
  `).join('');

  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.dataset.type;
      applyFilters();
    });
  });
}

function setActiveFilter(filterType, value) {
  if (filterType === 'category') activeCategory = value;
  if (filterType === 'type') activeType = value;
}

function applyFilters() {
  let filtered = [...restaurants];
  if (activeCategory !== 'all') {
    filtered = filtered.filter(r => r.category === activeCategory || r.tags.includes(activeCategory));
  }
  if (activeType !== 'all') {
    filtered = filtered.filter(r => r.type === activeType);
  }
  renderRestaurants(filtered);
  updateResultCount(filtered.length);
}

function updateResultCount(count) {
  const el = document.getElementById('resultCount');
  if (el) el.textContent = `แสดง ${count} ร้าน`;
}

// ----- Render Restaurant Cards -----
function renderRestaurants(list) {
  const grid = document.getElementById('restaurantsGrid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;">
        <p style="font-size:3rem;margin-bottom:1rem;">🍽️</p>
        <h3 style="color:var(--text-dim);margin-bottom:0.5rem;">ไม่พบร้านที่ค้นหา</h3>
        <p style="color:var(--text-muted);">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ใหม่</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(r => {
    const stars = renderStars(r.rating);
    const badgeClass = r.type === 'ร้านลับ' ? 'hidden-gem' : r.type === 'ราคาประหยัด' ? 'budget' : '';
    const saved = getSaved().includes(r.id);
    return `
    <div class="restaurant-card" data-id="${r.id}">
      <div class="card-image">
        <img src="${r.image}" alt="${r.name}" loading="lazy">
        <span class="card-badge ${badgeClass}">${r.type}</span>
        <button class="card-save ${saved ? 'saved' : ''}" onclick="event.stopPropagation();toggleSave(${r.id},this)" title="บันทึก">
          ${saved ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="card-body">
        <div class="card-tags">${r.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>
        <h3>${r.name}</h3>
        <div class="location">📍 ${r.location}</div>
        <div class="card-meta">
          <div class="card-rating">
            <span class="stars">${stars}</span>
            <span class="rating-num">${r.rating}</span>
            <span class="rating-count">(${r.reviewCount})</span>
          </div>
          <span class="card-price">${r.priceRange} ${r.priceAvg}</span>
        </div>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.restaurant-card').forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
  });
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '⯪' : '') + '☆'.repeat(empty);
}

// ----- Save / Bookmark -----
function getSaved() {
  try { return JSON.parse(localStorage.getItem('gindee_saved') || '[]'); } catch { return []; }
}
function toggleSave(id, btn) {
  let saved = getSaved();
  if (saved.includes(id)) {
    saved = saved.filter(s => s !== id);
    btn.classList.remove('saved');
    btn.innerHTML = '🤍';
  } else {
    saved.push(id);
    btn.classList.add('saved');
    btn.innerHTML = '❤️';
  }
  localStorage.setItem('gindee_saved', JSON.stringify(saved));
}

// ----- Modal -----
function initModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(id) {
  const r = restaurants.find(r => r.id === id);
  if (!r) return;
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modalContent');
  const stars = renderStars(r.rating);

  modal.innerHTML = `
    <div class="modal-image">
      <img src="${r.image}" alt="${r.name}">
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-content">
      <h2>${r.name}</h2>
      <div class="card-rating" style="margin:0.3rem 0;">
        <span class="stars">${stars}</span>
        <span class="rating-num">${r.rating}</span>
        <span class="rating-count">(${r.reviewCount} รีวิว)</span>
      </div>
      <p style="color:var(--text-dim);margin:0.8rem 0;line-height:1.7;">${r.description}</p>
      <div class="modal-info">
        <div class="modal-info-item">📍 ${r.location}</div>
        <div class="modal-info-item">🕐 ${r.hours}</div>
        <div class="modal-info-item">📞 ${r.phone}</div>
        <div class="modal-info-item">💰 ${r.priceAvg}</div>
      </div>

      <div class="modal-section">
        <h3>🍴 เมนูแนะนำ</h3>
        <div class="menu-grid">
          ${r.menu.map(m => `
            <div class="menu-item">
              <span class="name">${m.name}</span>
              <span class="price">${m.price}</span>
            </div>`).join('')}
        </div>
      </div>

      <div class="modal-section">
        <h3>💬 รีวิวจากผู้ใช้</h3>
        <div class="reviews-list" id="reviewsList-${r.id}">
          ${r.reviews.map(rv => `
            <div class="review-item">
              <div class="review-header">
                <div class="reviewer">
                  <div class="reviewer-avatar">${rv.avatar}</div>
                  <span class="reviewer-name">${rv.name}</span>
                </div>
                <div>
                  <span class="stars" style="font-size:0.8rem">${renderStars(rv.rating)}</span>
                  <span class="review-date">${rv.date}</span>
                </div>
              </div>
              <p class="review-text">${rv.text}</p>
            </div>`).join('')}
        </div>

        <div class="review-form">
          <h4>✍️ เขียนรีวิวของคุณ</h4>
          <div class="star-input" id="starInput">
            ${[1,2,3,4,5].map(i => `<span data-val="${i}" onclick="setStarRating(${i})">☆</span>`).join('')}
          </div>
          <textarea id="reviewText" placeholder="แชร์ประสบการณ์ของคุณ..."></textarea>
          <button class="submit-btn" onclick="submitReview(${r.id})">ส่งรีวิว</button>
        </div>
      </div>
    </div>`;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

let currentStarRating = 0;
function setStarRating(val) {
  currentStarRating = val;
  document.querySelectorAll('#starInput span').forEach((s, i) => {
    s.textContent = i < val ? '★' : '☆';
    s.classList.toggle('active', i < val);
  });
}

function submitReview(restaurantId) {
  const text = document.getElementById('reviewText').value.trim();
  if (!text || !currentStarRating) {
    alert('กรุณาให้คะแนนและเขียนรีวิว');
    return;
  }
  const r = restaurants.find(r => r.id === restaurantId);
  const newReview = {
    name: "ผู้ใช้ท่านที่ " + (r.reviews.length + 1),
    avatar: "👤",
    rating: currentStarRating,
    date: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }),
    text: text
  };
  r.reviews.unshift(newReview);
  r.reviewCount++;

  // Re-render the reviews
  const list = document.getElementById(`reviewsList-${restaurantId}`);
  const rv = newReview;
  const html = `
    <div class="review-item" style="animation:fadeInUp 0.4s ease;">
      <div class="review-header">
        <div class="reviewer">
          <div class="reviewer-avatar">${rv.avatar}</div>
          <span class="reviewer-name">${rv.name}</span>
        </div>
        <div>
          <span class="stars" style="font-size:0.8rem">${renderStars(rv.rating)}</span>
          <span class="review-date">${rv.date}</span>
        </div>
      </div>
      <p class="review-text">${rv.text}</p>
    </div>`;
  list.insertAdjacentHTML('afterbegin', html);

  document.getElementById('reviewText').value = '';
  currentStarRating = 0;
  document.querySelectorAll('#starInput span').forEach(s => { s.textContent = '☆'; s.classList.remove('active'); });
  renderRestaurants(restaurants); // Update card counts
}

// ----- Scroll Animations -----
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ----- Sort -----
function sortRestaurants(by) {
  let sorted = [...restaurants];
  switch (by) {
    case 'rating': sorted.sort((a, b) => b.rating - a.rating); break;
    case 'reviews': sorted.sort((a, b) => b.reviewCount - a.reviewCount); break;
    case 'price-low': sorted.sort((a, b) => a.priceRange.length - b.priceRange.length); break;
    case 'price-high': sorted.sort((a, b) => b.priceRange.length - a.priceRange.length); break;
    default: break;
  }
  renderRestaurants(sorted);
}

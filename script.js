 const profileData = {
  name:       "Rheal Iftiqar Rozak",
  tagline:    "Full-Stack Developer & UI Designer",
  email:      "rheal.rir@gmail.com",
  phone:      "+62 821 8400 1700",
  location:   "Lampung, Indonesia",
  linkedin:   "https://linkedin.com/in/rhealiftiqar",
  github:     "https://github.com/reyal12",
  instagram:  "https://instagram.com/rhealiftiqar",
  twitter:    "https://twitter.com/rhealgti",
  available:  true,
};

const projects = [
  {
    title:       "Project Game Mobil",
    category:    "Game",
    description: "Projek membuat game mobil untuk mata kuliah c++.",
    tech:        ["HTML", "CSS", "JavaScript"],
    image:       "",  
    repoUrl:     "https://github.com/reyal12/Game-Mobil"
  },
  {
    title:       "Project E - Commerce",
    category:    "Web",
    description: "Aplikasi E commerce untuk mata kuliah Pemrosesan data terdistribusi.",
    tech:        ["Php"],
    image:       "",
    repoUrl:     "https://github.com/dindasha/ecommerce_3"
  },
  {
    title:       "Project InfoEvent",
    category:    "Mobile",
    description: "Aplikasi mobile untuk info event event yang ada di sekitar.",
    tech:        ["Kotlin"],
    image:       "",
    repoUrl:     "https://github.com/reyal12/PrakTAM_2417051029"
  },
];

const skills = [
  { name: "HTML & CSS",       pct: 50 },
  { name: "JavaScript",       pct: 50 },
  { name: "React / Vue",      pct: 50 },
  { name: "Node.js",          pct: 50 },
  { name: "UI/UX Design",     pct: 60 },
  { name: "Git & GitHub",     pct: 70 },
  { name: "Python",           pct: 65 },
  { name: "Database (SQL)",   pct: 75 },
];

const experiences = [
  {
    period:   "2024 — 2025",
    role:     "Pengurus Himakom Bidang Internal",
    company:  "HIMAKOM",
    desc:     "Menjadi ketua pelaksana forum wisuda yang diadakan 2 bulan sekali."
  },
];

const education = [
  {
    period:  "2024 — 2026",
    degree:  "S1 Ilmu Komputer",
    school:  "Universitas Lampung · Bandar Lampung",
    desc:    "Fokus pada pengembangan game dan pemrograman web. IPK 3.57/4.0"
  },
];


function initTheme() {
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  if (saved === 'light') document.body.classList.add('light-mode');
  updateThemeBtn();
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  updateThemeBtn();
}

function updateThemeBtn() {
  const isLight = document.body.classList.contains('light-mode');
  document.querySelectorAll('.btn-theme').forEach(btn => {
    btn.textContent = isLight ? '🌙' : '☀️';
    btn.title = isLight ? 'Mode Gelap' : 'Mode Terang';
  });
}

function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (
      href === page ||
      (page === '' && href === 'index.html') ||
      (page === 'index.html' && href === 'index.html')
    ) {
      a.classList.add('active');
    }
  });
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
  });
  
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      if (toggle) toggle.textContent = '☰';
    });
  });
}

function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

function initSkillBars() {
  const container = document.querySelector('.skills-list');
  if (!container) return;

  container.innerHTML = skills.map(s => `
    <div class="skill-item fade-in">
      <div class="skill-header">
        <span>${s.name}</span>
        <span class="skill-pct">${s.pct}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-fill" data-pct="${s.pct}"></div>
      </div>
    </div>
  `).join('');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.dataset.pct + '%';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-item').forEach(el => io.observe(el));
}

function renderProjects(filter = 'All') {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:var(--clr-muted);grid-column:1/-1;text-align:center;padding:3rem">Belum ada project dalam kategori ini.</p>`;
    return;
  }

  grid.innerHTML = filtered.map((p, i) => `
    <div class="project-card fade-in" style="transition-delay:${i * 0.08}s">
      <div class="card-img">
        ${p.image
          ? `<img src="${p.image}" alt="${p.title}" loading="lazy">`
          : `<div class="card-img-placeholder">🖼️</div>`}
      </div>
      <div class="card-body">
        <span class="card-tag">${p.category}</span>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-desc">${p.description}</p>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem">
          ${p.tech.map(t => `<span style="font-size:0.72rem;padding:0.25rem 0.6rem;background:var(--clr-border);border-radius:4px;color:var(--clr-muted)">${t}</span>`).join('')}
        </div>
        <div class="card-links">
          ${p.liveUrl ? `<a class="card-link" href="${p.liveUrl}" target="_blank" rel="noopener">🔗 Live Demo</a>` : ''}
          ${p.repoUrl ? `<a class="card-link" href="${p.repoUrl}" target="_blank" rel="noopener">📁 Repository</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  initFadeIn();
}

function initProjectFilter() {
  const bar = document.querySelector('.filter-bar');
  if (!bar) return;

  const categories = ['All', 'Web', 'Mobile', 'Game', 'Design', 'Other'];

  bar.innerHTML = categories.map(c => `
    <button class="filter-btn${c === 'All' ? ' active' : ''}" data-cat="${c}">${c}</button>
  `).join('');

  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.cat);
    });
  });

  renderProjects('All');
}

function renderTimeline() {
  
  const expEl = document.querySelector('.timeline-list');
  if (expEl && experiences.length > 0) {
    expEl.innerHTML = experiences.map(e => `
      <div class="timeline-item fade-in">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${e.period}</div>
        <div class="timeline-role">${e.role}</div>
        <div class="timeline-company">${e.company}</div>
        <p class="timeline-desc">${e.desc}</p>
      </div>
    `).join('');
  } else if (expEl) {
    expEl.innerHTML = '<p class="fade-in">Belum ada pengalaman kerja.</p>';
  }

  
  const eduEl = document.querySelector('.education-list');
  if (eduEl && education.length > 0) {
    eduEl.innerHTML = education.map(e => `
      <div class="timeline-item fade-in">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${e.period}</div>
        <div class="timeline-role">${e.degree}</div>
        <div class="timeline-company">${e.school}</div>
        <p class="timeline-desc">${e.desc}</p>
      </div>
    `).join('');
  } else if (eduEl) {
    eduEl.innerHTML = '<p class="fade-in">Belum ada data pendidikan.</p>';
  }

  
  initFadeIn();
}


function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const MIN_MSG_LENGTH = 20;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    form.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));

    const name    = form.querySelector('#name');
    const email   = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const msg     = form.querySelector('#message');

    if (!name.value.trim()) {
      showError(name, 'Nama tidak boleh kosong');
      valid = false;
    } else if (name.value.trim().length < 2) {
      showError(name, 'Nama minimal 2 karakter');
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'Email tidak boleh kosong');
      valid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      showError(email, 'Format email tidak valid');
      valid = false;
    }

    if (!msg.value.trim()) {
      showError(msg, 'Pesan tidak boleh kosong');
      valid = false;
    } else if (msg.value.trim().length < MIN_MSG_LENGTH) {
      showError(msg, `Pesan minimal ${MIN_MSG_LENGTH} karakter`);
      valid = false;
    }

    if (valid) {
      const success = document.querySelector('.form-success');
      if (success) success.style.display = 'block';
      form.reset();
      setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
      console.log('Form submitted:', { name: name.value, email: email.value, subject: subject?.value, message: msg.value });
    }
  });

  function showError(field, msg) {
    field.classList.add('error');
    const err = field.parentElement?.querySelector('.field-error');
    if (err) err.textContent = msg;
  }
}

function injectProfileData() {

  document.querySelectorAll('[data-name]').forEach(el => {
    el.textContent = profileData.name;
  });
  document.querySelectorAll('[data-email]').forEach(el => {
    el.textContent = profileData.email;
    if (el.tagName === 'A') el.href = `mailto:${profileData.email}`;
  });
  document.querySelectorAll('[data-phone]').forEach(el => {
    el.textContent = profileData.phone;
  });
  document.querySelectorAll('[data-location]').forEach(el => {
    el.textContent = profileData.location;
  });
  document.querySelectorAll('[data-linkedin]').forEach(el => {
    if (el.tagName === 'A') el.href = profileData.linkedin;
  });
  document.querySelectorAll('[data-github]').forEach(el => {
    if (el.tagName === 'A') el.href = profileData.github;
  });
  document.querySelectorAll('[data-instagram]').forEach(el => {
    if (el.tagName === 'A') el.href = profileData.instagram;
  });
  document.querySelectorAll('[data-cv]').forEach(el => {
    if (el.tagName === 'A') el.href = profileData.cvLink;
  });

  
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    badge.innerHTML = profileData.available
      ? `<span></span> Tersedia untuk Proyek`
      : `<span></span> Sedang Tidak Tersedia`;
    badge.style.setProperty('--dot-clr', profileData.available ? 'var(--clr-accent)' : '#ff4d4d');
  }
}


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing...');
  
  initTheme();
  setActiveNav();
  initMobileNav();
  injectProfileData();
  initSkillBars();
  renderTimeline();           
  initContactForm();
  
  
  if (document.querySelector('.filter-bar')) {
    initProjectFilter();
  }
  
  
  if (document.querySelector('.projects-grid') && !document.querySelector('.filter-bar')) {
    renderProjects('All');
  }
  
  initFadeIn();

  document.querySelectorAll('.btn-theme').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
  
  console.log('Initialization complete');
});
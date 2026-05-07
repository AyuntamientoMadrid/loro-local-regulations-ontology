const STORAGE_KEY = 'loro.lang';
const DEFAULT_LANG = 'en';
const SUPPORTED = ['en', 'es'];

function detectLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('lang');
  if (fromQuery && SUPPORTED.includes(fromQuery)) return fromQuery;
  return DEFAULT_LANG;
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function applyTranslations(content) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getByPath(content, key);
    if (typeof value !== 'string') return;
    if (el.tagName === 'META') {
      el.setAttribute('content', value);
    } else if (el.tagName === 'TITLE') {
      el.textContent = value;
      document.title = value;
    } else {
      el.textContent = value;
    }
  });
}

function renderParagraphs(containerId, paragraphs) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  (paragraphs || []).forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    container.appendChild(p);
  });
}

function renderResources(items) {
  const container = document.getElementById('resources-list');
  if (!container) return;
  container.innerHTML = '';
  (items || []).forEach(item => {
    container.insertAdjacentHTML('beforeend', `
      <article class="col-12 col-md-6 col-lg-4 resource-card-wrap">
        <div class="resource-card">
          <h3 class="resource-card__title">${item.title}</h3>
          <p class="resource-card__description">${item.description}</p>
          <ul class="resource-card__meta">
            <li><strong>License:</strong> ${item.license || '—'}</li>
            <li><strong>Format:</strong> ${item.format || '—'}</li>
            <li><strong>Status:</strong> ${item.status || '—'}</li>
          </ul>
          ${item.url
            ? `<a href="${item.url}" class="btn-madrid btn btn-sm" target="_blank" rel="noopener noreferrer">
                ${item.url_label || 'View'} <i class="bi bi-box-arrow-up-right ms-1" aria-hidden="true"></i>
              </a>`
            : ''}
        </div>
      </article>
    `);
  });
}

function renderDocumentationLinks(links) {
  const container = document.getElementById('documentation-links');
  if (!container) return;
  container.innerHTML = '';
  (links || []).forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.url || '#';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = link.label;
    li.appendChild(a);
    container.appendChild(li);
  });
}

function setupLanguageSwitcher(currentLang) {
  const button = document.getElementById('lang-switch');
  if (!button) return;
  button.addEventListener('click', () => {
    const next = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem(STORAGE_KEY, next);
    window.location.reload();
  });
}

function render(content, lang) {
  document.documentElement.setAttribute('lang', lang);
  applyTranslations(content);
  renderParagraphs('about-paragraphs', content.about?.paragraphs);
  renderParagraphs('documentation-paragraphs', content.documentation?.paragraphs);
  renderParagraphs('license-paragraphs', content.license_section?.paragraphs);
  renderParagraphs('contact-paragraphs', content.contact?.paragraphs);
  renderResources(content.resources?.items);
  renderDocumentationLinks(content.documentation?.links);

  const doiEl = document.getElementById('cite-doi-value');
  if (doiEl && content.cite?.doi_value) doiEl.textContent = content.cite.doi_value;

  const bibtexEl = document.getElementById('cite-bibtex');
  if (bibtexEl && content.cite?.bibtex) bibtexEl.textContent = content.cite.bibtex;
}

const lang = detectLang();

fetch('data/contenido.json')
  .then(r => r.json())
  .then(all => {
    const content = all[lang] || all[DEFAULT_LANG];
    render(content, lang);
    setupLanguageSwitcher(lang);
  })
  .catch(err => console.error('Error loading content', err));

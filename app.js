(() => {
  const D = window.SVL;
  const $ = s => document.querySelector(s);
  const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };

  const byId = {};
  D.venues.forEach(v => byId[v.id] = v);
  const off = new Set();           // hidden categories
  let view = 'overview';
  let zoom = 1;

  const VIEWS = D.views;
  const PLACE = D.placements;
  const inView = (id, v = view) => !!(PLACE[v] && PLACE[v][id]);

  /* ================= LEGEND ================= */
  const legend = $('#legend');
  Object.entries(D.categories).forEach(([key, c]) => {
    const b = el('button', 'lg');
    b.innerHTML = `<span class="sw" style="background:${c.color};color:${c.color}"></span>${c.label}`;
    b.onclick = () => {
      off.has(key) ? off.delete(key) : off.add(key);
      b.classList.toggle('off', off.has(key));
      apply();
    };
    legend.appendChild(b);
  });

  /* ================= PINS + LIST ================= */
  const pins = $('#pins'), vlist = $('#vlist');
  D.venues.forEach(v => {
    const c = D.categories[v.cat];

    const p = el('button', 'pin');
    p.style.color = c.color;
    p.dataset.id = v.id;
    p.setAttribute('aria-label', `Open ${v.name}`);
    p.innerHTML =
      `<span class="lbl">${v.name}</span>
       <span class="knob" style="background:${c.color}"><span class="ring"></span></span>
       <span class="stem"></span>`;
    p.onclick = () => open(v.id);
    p.onmouseenter = () => hover(v.id, true);
    p.onmouseleave = () => hover(v.id, false);
    pins.appendChild(p);

    const li = el('button', 'vi');
    li.dataset.id = v.id;
    li.innerHTML =
      `<span class="vsw" style="background:${c.color}"></span>
       <span><span class="vn">${v.name}</span><span class="vt">${v.tag}</span></span>
       <span class="arw">→</span>`;
    li.onclick = () => open(v.id);
    li.onmouseenter = () => hover(v.id, true);
    li.onmouseleave = () => hover(v.id, false);
    vlist.appendChild(li);
  });

  function hover(id, on) {
    pins.querySelector(`.pin[data-id="${id}"]`)?.classList.toggle('hot', on);
    vlist.querySelector(`.vi[data-id="${id}"]`)?.classList.toggle('hot', on);
  }

  function apply() {
    let n = 0;
    const place = PLACE[view] || {};
    D.venues.forEach(v => {
      const catOff = off.has(v.cat);
      if (!catOff) n++;
      const pos = place[v.id];
      const p = pins.querySelector(`.pin[data-id="${v.id}"]`);
      if (pos) { p.style.left = pos[0] + '%'; p.style.top = pos[1] + '%'; }
      p.classList.toggle('gone', catOff || !pos);
      const li = vlist.querySelector(`.vi[data-id="${v.id}"]`);
      li.classList.toggle('hide', catOff);
      li.classList.toggle('elsewhere', !catOff && !pos);
    });
    pins.classList.toggle('dense', !!(VIEWS[view] && VIEWS[view].dense));
    $('#vCount').textContent = `(${n})`;
  }

  /* ================= PORTFOLIO ================= */
  const pf = $('#portfolio');
  pf.appendChild(el('h2', 'ttl', D.portfolio.headline));
  D.portfolio.ramp.forEach(([k, v]) =>
    pf.appendChild(el('div', 'pr', `<span>${k}</span><span>${v}</span>`)));
  pf.appendChild(el('h2', 'ttl', 'Site and scale'));
  pf.lastChild.style.marginTop = '22px';
  D.portfolio.invest.forEach(([k, v]) =>
    pf.appendChild(el('div', 'pr', `<span>${k}</span><span>${v}</span>`)));
  pf.appendChild(el('p', 'psub',
    'Held through Savannah Lakes Holding Company, LLC across three Wyoming sub-holdings. Planning figures shown are illustrative and subject to change.'));

  /* ================= BASE MAP SWITCH ================= */
  const mapwrap = $('#mapwrap'), satwrap = $('#satwrap'), baseImg = $('#baseImg');
  $('#viewSegs').querySelectorAll('.seg').forEach(b => {
    b.onclick = () => setView(b.dataset.view);
  });

  const gm = $('#geom');
  if (gm && D.geometry) D.geometry.forEach(([k, v]) =>
    gm.appendChild(el('div', 'pr', `<span>${k}</span><span>${v}</span>`)));

  function setView(v) {
    $('#viewSegs').querySelectorAll('.seg').forEach(x =>
      x.classList.toggle('is-on', x.dataset.view === v));
    if (v === 'satellite') {
      mapwrap.style.display = 'none';
      satwrap.classList.add('on');
      $('#vTitle').textContent = 'Real satellite imagery';
      $('#vBlurb').textContent = 'Esri imagery of the actual parcel on Lake Thurmond. Master-plan markers live on the site and parcel views.';
      initLeaf();
      return;
    }
    view = v;
    const cfg = VIEWS[v];
    satwrap.classList.remove('on');
    mapwrap.style.display = '';
    $('#vTitle').textContent = cfg.title;
    $('#vBlurb').textContent = cfg.blurb;
    mapwrap.classList.add('swapping');
    setZoom(1); $('#canvas').scrollTo(0, 0);
    setTimeout(() => {
      baseImg.src = cfg.src;
      baseImg.alt = cfg.alt;
      baseImg.onload = () => { fitBase(); mapwrap.classList.remove('swapping'); };
      apply();
    }, 180);
  }

  /* ================= ZOOM / PAN ================= */

  // --- explicitly fit the base image box so the pin layer always matches the photo ---
  const fitBase = () => {
    if (!baseImg.naturalWidth || mapwrap.style.display === 'none') return;
    const canvas = $('#canvas');
    const cs = getComputedStyle(canvas);
    const availW = canvas.clientWidth  - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const availH = canvas.clientHeight - parseFloat(cs.paddingTop)  - parseFloat(cs.paddingBottom);
    const ar = baseImg.naturalWidth / baseImg.naturalHeight;
    const narrow = window.matchMedia('(max-width:1080px)').matches;
    let w, h;
    if (narrow) { w = availW; h = w / ar; }           // phones/tablets: fill width, page scrolls
    else { w = Math.min(availW, availH * ar); h = w / ar; }  // desktop: contain
    mapwrap.style.width = w + 'px';
    mapwrap.style.height = h + 'px';
  };
  baseImg.addEventListener('load', fitBase);
  window.addEventListener('resize', fitBase);
  if (baseImg.complete) fitBase();

  const setZoom = z => {
    zoom = Math.min(3, Math.max(1, z));
    mapwrap.style.transform = `scale(${zoom})`;
    mapwrap.style.cursor = zoom > 1 ? 'grab' : '';
  };
  $('#zIn').onclick = () => setZoom(zoom + .35);
  $('#zOut').onclick = () => setZoom(zoom - .35);
  $('#zFit').onclick = () => { setZoom(1); $('#canvas').scrollTo(0, 0); };

  // drag to pan when zoomed
  let drag = null;
  mapwrap.addEventListener('pointerdown', e => {
    if (zoom <= 1 || e.target.closest('.pin')) return;
    drag = { x: e.clientX, y: e.clientY, sl: $('#canvas').scrollLeft, st: $('#canvas').scrollTop };
    mapwrap.style.cursor = 'grabbing';
  });
  window.addEventListener('pointermove', e => {
    if (!drag) return;
    $('#canvas').scrollLeft = drag.sl - (e.clientX - drag.x);
    $('#canvas').scrollTop = drag.st - (e.clientY - drag.y);
  });
  window.addEventListener('pointerup', () => {
    if (drag) mapwrap.style.cursor = zoom > 1 ? 'grab' : '';
    drag = null;
  });

  /* ================= SATELLITE ================= */
  let leaf = null;
  function initLeaf() {
    if (leaf) { setTimeout(() => leaf.invalidateSize(), 60); return; }
    const [lat, lon] = D.meta.coords;
    leaf = L.map('leaf', { center: [lat, lon], zoom: 15, zoomControl: true, attributionControl: true });
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 18, attribution: 'Imagery © Esri, Maxar, Earthstar Geographics' }
    ).addTo(leaf);
    L.marker([lat, lon], {
      icon: L.divIcon({ className: '', html: '<div class="sitepin"></div>', iconSize: [20, 20], iconAnchor: [10, 10] })
    }).addTo(leaf).bindPopup('<b>Savannah Lakes Marina</b><br>99 Village Drive, McCormick, SC 29835');

    const note = el('div', 'satnote',
      `<b>Real-world site locator.</b> Esri satellite imagery of the actual parcel on Lake Thurmond — 33.8626°N, 82.3864°W. The master-plan markers live on the Photoreal and Illustrated base maps.`);
    $('#leaf').appendChild(note);
    setTimeout(() => leaf.invalidateSize(), 80);
  }

  /* ================= DETAIL PAGE ================= */
  const detail = $('#detail');

  function open(id) {
    const v = byId[id];
    if (!v) return;
    const c = D.categories[v.cat];

    const dist = D.district && D.district[id];
    if (dist && !inView(id)) setView(dist);

    $('#dChip').textContent = c.label;
    $('#dChip').style.background = c.color;
    $('#dChip').style.color = '#fff';
    $('#dName').textContent = v.name;
    $('#dTag').textContent = v.tag;
    $('#dLede').textContent = v.lede;
    $('#dEntity').textContent = v.entity;
    $('#dHeroImg').src = `assets/venues/${v.images[0]}.jpg`;
    $('#dHeroImg').alt = v.captions[0] || v.name;

    const g = $('#dGallery'); g.innerHTML = '';
    v.images.forEach((im, i) => {
      const cap = v.captions[i] || '';
      const fig = el('figure', 'gi');
      fig.innerHTML = `<img src="assets/venues/${im}.jpg" alt="${cap}" loading="lazy"><figcaption>${cap}</figcaption>`;
      fig.onclick = () => lightbox(`assets/venues/${im}.jpg`, cap);
      g.appendChild(fig);
    });

    const f = $('#dFacts'); f.innerHTML = '';
    v.facts.forEach(([k, val]) => {
      const row = el('div');
      row.innerHTML = `<dt>${k}</dt><dd>${val}</dd>`;
      f.appendChild(row);
    });

    const nl = $('#dNotes'); nl.innerHTML = '';
    (v.notes || []).forEach(t => nl.appendChild(el('li', null, t)));
    $('#dNotesH').style.display = (v.notes || []).length ? '' : 'none';

    const j = $('#dJump'); j.innerHTML = '';
    D.venues.filter(o => o.id !== v.id)
      .sort((a, b) => (a.cat === v.cat ? -1 : 0) - (b.cat === v.cat ? -1 : 0))
      .slice(0, 5)
      .forEach(o => {
        const b = el('button', 'jb');
        b.innerHTML = `<span class="vsw" style="background:${D.categories[o.cat].color}"></span>${o.name}<span class="arw">→</span>`;
        b.onclick = () => { $('#dscroll').scrollTop = 0; open(o.id); };
        j.appendChild(b);
      });

    detail.classList.add('on');
    $('#dscroll').scrollTop = 0;
    document.body.style.overflow = 'hidden';
    if (location.hash !== '#' + id) history.pushState({ id }, '', '#' + id);
  }

  function close() {
    detail.classList.remove('on');
    document.body.style.overflow = '';
    if (location.hash) history.pushState({}, '', location.pathname);
  }
  $('#dclose').onclick = close;

  window.addEventListener('popstate', () => {
    const id = location.hash.slice(1);
    id && byId[id] ? open(id) : close();
  });

  /* ================= LIGHTBOX ================= */
  function lightbox(src, cap) {
    $('#lbImg').src = src;
    $('#lbImg').alt = cap;
    $('#lbCap').textContent = cap;
    $('#lb').classList.add('on');
  }
  const closeLb = () => $('#lb').classList.remove('on');
  $('#lbx').onclick = closeLb;
  $('#lb').onclick = e => { if (e.target.id !== 'lbImg') closeLb(); };

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if ($('#lb').classList.contains('on')) closeLb();
    else if (detail.classList.contains('on')) close();
  });

  /* initial view */
  setView('overview');

  /* deep link on load */
  const start = location.hash.slice(1);
  if (start && byId[start]) open(start);
})();

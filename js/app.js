/* ============================================================
   APP · Portal Hygge Services Mallorca
   ============================================================ */

const STATE = {
  role: null,               // 'direccion' | 'equipo'
  route: "dashboard",
  prop: null, propTab: "resumen", propQ: "", propZona: "",
  incFilter: "activas", factFilter: "todas", fichDia: "hoy",
  rutaT: { yolanda: .42, toni: .55 },
  chk: [true, true, true, false, false, false, false, false],
  fichada: true,
  simMin: 0,                // minutos simulados desde las 10:42
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ============================================================
   NAVEGACIÓN
   ============================================================ */
const NAV = {
  direccion: [
    ["Operativa", [["dashboard", "Inicio", "home"], ["plan", "Planificación", "cal"], ["equipo", "Equipo en vivo", "pin"], ["fichajes", "Fichajes", "clock"], ["incidencias", "Incidencias", "alert"]]],
    ["Negocio", [["propiedades", "Propiedades", "house"], ["lavanderia", "Lavandería", "laundry"], ["propietarios", "Propietarios", "users"]]],
    ["Administración", [["informes", "Informes", "doc"], ["facturacion", "Facturación", "invoice"], ["ajustes", "Ajustes", "settings"]]],
  ],
  equipo: [
    ["Mi trabajo", [["midia", "Mi día", "sun"], ["mishoras", "Mis horas", "clock"], ["vacaciones", "Vacaciones", "cal"], ["misincidencias", "Incidencias", "alert"]]],
  ],
};

function renderNav() {
  const incAb = INCIDENCIAS.filter(i => i.estado !== "resuelta").length;
  $("#sb-nav").innerHTML = NAV[STATE.role].map(([label, items]) => `
    <div class="sb-label">${label}</div>
    ${items.map(([id, txt, ic]) => `
      <button class="sb-item ${STATE.route === id ? "active" : ""}" data-go="${id}">
        ${ICON[ic]} ${txt}
        ${id === "incidencias" && incAb ? `<span class="pill">${incAb}</span>` : ""}
      </button>`).join("")}`).join("");
  const user = STATE.role === "direccion"
    ? { n: "Dirección Hygge", r: "Administración", i: "HG", c: "var(--gold)" }
    : { n: "Cati Ginard", r: "Equipo de limpieza", i: "CG", c: "#4f8a5c" };
  $("#sb-user").innerHTML = `
    <span class="ava" style="background:${user.c}">${user.i}</span>
    <div style="flex:1"><div class="n">${user.n}</div><div class="r">${user.r}</div></div>
    <span class="out" title="Cerrar sesión">${ICON.logout}</span>`;
}

function go(route) {
  STATE.route = route;
  document.body.classList.remove("nav-open");
  closeDrawer();
  rerender();
  $("#content").scrollTop = 0; window.scrollTo({ top: 0 });
}

function rerender(keepFocus) {
  const v = VIEWS[STATE.route] || VIEWS.dashboard;
  let active = null, selStart = 0;
  if (keepFocus && document.activeElement?.tagName === "INPUT") { active = document.activeElement; selStart = active.selectionStart; }
  $("#tb-title").textContent = v.t;
  $("#tb-crumb").textContent = v.c;
  const el = $("#content");
  el.innerHTML = `<div class="section">${v.r()}</div>`;
  v.m && v.m();
  renderNav();
  if (keepFocus) { const inp = el.querySelector("input.input"); if (inp) { inp.focus(); inp.setSelectionRange(selStart, selStart); } }
}

/* delegación de clicks */
document.addEventListener("click", e => {
  const go1 = e.target.closest("[data-go]"); if (go1) { go(go1.dataset.go); return; }
  const pr = e.target.closest("[data-prop]"); if (pr) { STATE.prop = pr.dataset.prop; STATE.propTab = "resumen"; go("propdetail"); return; }
  const prg = e.target.closest("[data-prop-go]"); if (prg) { STATE.prop = prg.dataset.propGo; STATE.propTab = "resumen"; go("propdetail"); return; }
  const em = e.target.closest("[data-emp]"); if (em) { openDrawer(drawerEmpleado(S(em.dataset.emp))); return; }
  const inc = e.target.closest("[data-inc]"); if (inc) { openDrawer(drawerIncidencia(INCIDENCIAS.find(i => i.id === inc.dataset.inc))); return; }
  if (e.target.closest(".sb-user .out")) { logout(); return; }
});

/* ============================================================
   LOGIN + CANVAS "LA ISLA ENCENDIDA"
   ============================================================ */
const MALLORCA = [
  [7,60],[10,52],[15,45],[22,38],[30,30],[37,24],[44,17],[50,11],[55,7],[58.5,10],[53,17],[50,21],
  [53,23],[57,22],[60,26],[57,32],[53,37],[56,41],[62,42],[69,41],[76,38],[83,36],[90,38],[93,42],
  [91,48],[86,55],[80,62],[72,70],[63,78],[55,85],[47,84],[41,78],[35,72],[29,66],[24,68],[18,66],[12,65],[7,60],
];
const PROPS_LIGHT = [[86,40],[82,37],[88,45],[84,49],[80,44],[78,40],[76,47],[83,42],[71,44],[74,52],[68,48],[87,52]];

function inPoly(x, y, poly) {
  let ins = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) ins = !ins;
  }
  return ins;
}

let loginAnim = null;
function startLogin() {
  const cv = $("#login-canvas"), ctx = cv.getContext("2d");
  let W, H, dots = [], bokeh = [], mouse = { x: -999, y: -999 };
  const build = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // isla centrada a la derecha en desktop, centrada en móvil
    const s = Math.min(W * (W > 760 ? .52 : .94) / 100, H * .84 / 100);
    const ox = W > 760 ? W * .44 : W * .03 + (W - s * 100) / 2, oy = (H - s * 78) / 2 - s * 6;
    dots = [];
    const step = Math.max(7, s * 1.55);
    for (let gx = 0; gx <= 100; gx += step / s) for (let gy = 0; gy <= 90; gy += step / s) {
      if (inPoly(gx, gy, MALLORCA)) dots.push({ x: ox + gx * s, y: oy + gy * s, r: Math.max(1.1, s * .42), tw: Math.random() * 6.28 });
    }
    STATE._lights = PROPS_LIGHT.map(([x, y]) => ({ x: ox + x * s, y: oy + y * s, ph: Math.random() * 6.28 }));
    bokeh = Array.from({ length: 22 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 5,
      vx: (Math.random() - .5) * .12, vy: -.06 - Math.random() * .12, a: .04 + Math.random() * .1,
    }));
  };
  build();
  window.addEventListener("resize", build);
  cv.parentElement.addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  cv.parentElement.addEventListener("pointerleave", () => { mouse.x = -999; mouse.y = -999; });
  let t = 0;
  const frame = () => {
    t += .016;
    ctx.clearRect(0, 0, W, H);
    // fondo cálido
    const bg = ctx.createRadialGradient(W * .7, H * .45, 60, W * .5, H * .5, Math.max(W, H) * .75);
    bg.addColorStop(0, "#262b22"); bg.addColorStop(1, "#1c201a");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    // bokeh
    bokeh.forEach(b => {
      b.x += b.vx; b.y += b.vy;
      if (b.y < -10) { b.y = H + 10; b.x = Math.random() * W; }
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 3);
      g.addColorStop(0, `rgba(219,177,101,${b.a})`); g.addColorStop(1, "rgba(219,177,101,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 3, 0, 6.28); ctx.fill();
    });
    // puntos de la isla (linterna del ratón los calienta)
    dots.forEach(d => {
      const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y);
      const warm = Math.max(0, 1 - dist / 190);
      const tw = .5 + .5 * Math.sin(t * 1.2 + d.tw);
      const a = .16 + tw * .1 + warm * .55;
      ctx.fillStyle = warm > .04
        ? `rgba(${140 + warm * 100},${125 + warm * 45},${88 + warm * 8},${a})`
        : `rgba(126,136,118,${a})`;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r + warm * 1.2, 0, 6.28); ctx.fill();
    });
    // luces doradas = propiedades (Llevant)
    (STATE._lights || []).forEach(l => {
      const p = .62 + .38 * Math.sin(t * 1.6 + l.ph);
      const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, 14 + p * 8);
      g.addColorStop(0, `rgba(233,190,102,${.85 * p})`); g.addColorStop(.35, `rgba(214,155,61,${.35 * p})`); g.addColorStop(1, "rgba(214,155,61,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(l.x, l.y, 14 + p * 8, 0, 6.28); ctx.fill();
      ctx.fillStyle = `rgba(255,232,178,${.75 + .25 * p})`; ctx.beginPath(); ctx.arc(l.x, l.y, 2.1, 0, 6.28); ctx.fill();
    });
    loginAnim = requestAnimationFrame(frame);
  };
  frame();
}

function login(role) {
  STATE.role = role;
  STATE.route = role === "direccion" ? "dashboard" : "midia";
  $("#login").classList.add("hidden");
  $("#app").classList.add("visible");
  if (loginAnim) cancelAnimationFrame(loginAnim);
  rerender();
  startClock();
  startSim();
  setTimeout(() => toast(
    role === "direccion" ? "Bienvenida, Dirección" : "Hola, Cati",
    role === "direccion" ? "Tienes 4 check-ins esta tarde y 1 incidencia de prioridad alta." : "Tienes 3 servicios hoy. ¡Buen turno!",
    ICON.check, "ok"), 700);
}
function logout() {
  STATE.role = null;
  $("#app").classList.remove("visible");
  $("#login").classList.remove("hidden");
  startLogin();
}

/* ============================================================
   RELOJ + SIMULACIÓN EN VIVO
   ============================================================ */
function simTime() {
  const m = 42 + STATE.simMin, h = 10 + Math.floor(m / 60);
  return `${h}:${String(m % 60).padStart(2, "0")}`;
}
function startClock() {
  const tick = () => { const el = $("#tb-clock"); if (el) el.innerHTML = `lunes 13 jul · <b>${simTime()}</b>`; };
  tick();
  clearInterval(STATE._clockInt); STATE._clockInt = setInterval(tick, 4000);
}
const SIM_EVENTS = [
  { at: 2, run: () => { STATE.rutaT.toni = .85; } },
  { at: 4, run: () => {
      const toni = S("toni"); toni.estado = "mantenimiento"; toni.desde = simTime();
      toni.hoy.push({ h: simTime(), txt: "Llegada a Xalet Costa dels Pins · piscina", tipo: "tarea" });
      toast("Toni ha llegado", "Xalet Costa dels Pins · mantenimiento de piscina", ICON.pin, "ok"); } },
  { at: 7, run: () => { STATE.rutaT.yolanda = .8; } },
  { at: 10, run: () => {
      const yol = S("yolanda"); yol.estado = "limpiando"; yol.desde = simTime();
      yol.hoy.push({ h: simTime(), txt: "Llegada a Casa Betlem Mar · limpieza check-out", tipo: "tarea" });
      const t = PLAN.limpiezas.find(t => t.id === "t4"); if (t) t.estado = "encurso";
      toast("Yolanda ha llegado", "Casa Betlem Mar · empieza la limpieza", ICON.broom, "ok"); } },
  { at: 14, run: () => {
      const marta = S("marta"); marta.estado = "oficina"; marta.donde = "Oficina Artà"; marta.desde = simTime();
      marta.hoy.push({ h: simTime(), txt: "Fin del descanso · disponible", tipo: "tarea" }); } },
  { at: 18, run: () => {
      const inc = INCIDENCIAS.find(i => i.id === "i-241");
      if (inc && inc.estado !== "resuelta") { inc.estado = "resuelta"; inc.tl.push({ h: simTime(), t: "Cartucho sustituido · agua abierta y probada. Resuelta por Miquel." }); }
      const miq = S("miquel"); miq.estado = "ruta"; miq.donde = "espins"; miq.eta = "12:30"; miq.ruta = { desde: { x: 79, y: 28 }, hasta: { x: 61, y: 75 } }; miq.desde = simTime();
      STATE.rutaT.miquel = .1;
      toast("Incidencia resuelta ✓", "Fuga del grifo en Villa Son Moll · 38 min de trabajo", ICON.check, "ok"); } },
];
function startSim() {
  clearInterval(STATE._simInt);
  STATE._simInt = setInterval(() => {
    STATE.simMin += 1;
    SIM_EVENTS.filter(ev => ev.at === STATE.simMin).forEach(ev => ev.run());
    // deriva sutil de las rutas
    Object.keys(STATE.rutaT).forEach(k => { STATE.rutaT[k] = Math.min(.96, STATE.rutaT[k] + .015); });
    const hint = $("#live-hint"); if (hint) hint.textContent = "actualizado ahora mismo";
    // refresco suave solo de vistas "vivas"
    if (["equipo", "dashboard"].includes(STATE.route) && !$("#drawer").classList.contains("open") && !$("#modal-root").classList.contains("open")) rerender();
  }, 8000);
}

/* ============================================================
   TOPBAR: notificaciones, búsqueda, rol
   ============================================================ */
function renderNotifs() {
  $("#notif-list").innerHTML = NOTIFS.map(n => `
    <div class="notif"><span class="ic" style="background:var(--${n.ic}-soft);color:var(--${n.ic === "gold" ? "gold-deep" : n.ic})">${ICON[n.svg]}</span>
    <div><b>${n.b}</b><div class="t">${n.t} · ${n.hace}</div></div></div>`).join("");
}
function toggleDrop(id) {
  const el = $(id);
  const was = el.classList.contains("open");
  $$(".tb-drop").forEach(d => d.classList.remove("open"));
  if (!was) el.classList.add("open");
}
document.addEventListener("click", e => {
  if (!e.target.closest(".tb-menu")) $$(".tb-drop").forEach(d => d.classList.remove("open"));
});

function searchInput(v) {
  const box = $("#tb-results");
  const q = v.trim().toLowerCase();
  if (!q) { box.classList.remove("open"); return; }
  const props = PROPS.filter(p => (p.nombre + p.zona + p.dueno).toLowerCase().includes(q)).slice(0, 4)
    .map(p => `<button class="tb-hit" data-prop="${p.id}">${ICON.house} ${p.nombre} <span class="k">${p.zona}</span></button>`);
  const emps = STAFF.filter(s => (s.nombre + s.rol).toLowerCase().includes(q)).slice(0, 4)
    .map(s => `<button class="tb-hit" data-emp="${s.id}">${ICON.users} ${s.nombre} <span class="k">${s.rol}</span></button>`);
  box.innerHTML = [...props, ...emps].join("") || `<div class="tb-hit">Sin resultados para “${esc(v)}”</div>`;
  box.classList.add("open");
}
document.addEventListener("click", e => { if (!e.target.closest(".tb-search")) $("#tb-results")?.classList.remove("open"); });

function switchRole() {
  const to = STATE.role === "direccion" ? "equipo" : "direccion";
  STATE.role = to; STATE.route = to === "direccion" ? "dashboard" : "midia";
  $$(".tb-drop").forEach(d => d.classList.remove("open"));
  rerender();
  toast("Cambio de vista", to === "direccion" ? "Ahora ves el portal como Dirección." : "Ahora ves la app como la ve Cati (equipo).", ICON.swap);
}

/* ============================================================
   DRAWER / MODAL / TOASTS
   ============================================================ */
function openDrawer(html) { $("#drawer").innerHTML = html; $("#drawer").classList.add("open"); $("#drawer-veil").classList.add("open"); }
function closeDrawer() { $("#drawer").classList.remove("open"); $("#drawer-veil").classList.remove("open"); }

function openModal(html, wide) {
  $("#modal-root").innerHTML = `<div class="veil" onclick="closeModal()"></div><div class="modal ${wide ? "wide" : ""}">${html}</div>`;
  $("#modal-root").classList.add("open");
}
function closeModal() { $("#modal-root").classList.remove("open"); $("#modal-root").innerHTML = ""; document.body.classList.remove("printing"); }

function toast(b, t, icon = ICON.check, cls = "") {
  const el = document.createElement("div");
  el.className = "toast " + cls;
  el.innerHTML = `${icon}<div><b>${b}</b>${t ? `<span>${t}</span>` : ""}</div>`;
  $("#toasts").appendChild(el);
  setTimeout(() => { el.classList.add("bye"); setTimeout(() => el.remove(), 350); }, 4600);
}

function animateCounters() {
  $$("[data-count]").forEach(el => {
    const target = +el.dataset.count, dur = 700, t0 = performance.now();
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), ease = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * ease).toLocaleString("es-ES");
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ============================================================
   PAPELES (informes, docs, facturas)
   ============================================================ */
function paperModal(paperHTML, titulo) {
  openModal(`
    <div class="modal-head"><h3>${titulo}</h3><button class="x" onclick="closeModal()">${ICON.x}</button></div>
    <div class="modal-body" style="background:#eceada;border-radius:0 0 20px 20px">
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-bottom:14px">
        <button class="btn sm outline" style="background:#fff" onclick="printPaper()">${ICON.print} Descargar PDF</button>
        <button class="btn sm primary" onclick="toast('Documento enviado','info@hyggeservicesmallorca.com y gestoría en copia.',ICON.send);closeModal()">${ICON.send} Enviar por email</button>
      </div>
      ${paperHTML}
    </div>`, true);
}
function printPaper() { document.body.classList.add("printing"); setTimeout(() => { window.print(); document.body.classList.remove("printing"); }, 60); }

function genInforme(tipo, instant) {
  const builders = { horas: [paperHoras, "Informe de horas por empleado"], ocupacion: [paperOcupacion, "Informe de ocupación por propiedad"], liquidaciones: [paperLiquidaciones, "Liquidaciones a propietarios"] };
  const [fn, titulo] = builders[tipo];
  if (instant) { paperModal(fn(), titulo); return; }
  openModal(`
    <div class="modal-head"><h3>${titulo}</h3><button class="x" onclick="closeModal()">${ICON.x}</button></div>
    <div class="modal-body"><div class="gen-loading">
      ${ICON.doc}
      <div id="gen-txt">Leyendo fichajes y reservas del periodo…</div>
      <div class="gen-bar"><i id="gen-bar"></i></div>
    </div></div>`, true);
  const steps = [["Cruzando limpiezas con propiedades…", 45], ["Maquetando documento con tu logo…", 82], ["Listo ✓", 100]];
  setTimeout(() => { $("#gen-bar").style.width = "22%"; }, 80);
  steps.forEach(([txt, pc], i) => setTimeout(() => {
    const t = $("#gen-txt"), b = $("#gen-bar");
    if (t) { t.textContent = txt; b.style.width = pc + "%"; }
    if (pc === 100) setTimeout(() => paperModal(fn(), titulo), 320);
  }, 500 + i * 520));
}

function openPaper(tipo, propId) {
  const p = propId ? P(propId) : null;
  const map = {
    contrato: () => [paperContrato(p), "Contrato de gestión · " + p.nombre],
    liquidacion: () => [paperLiquidacionProp(p), "Liquidación junio · " + p.nombre],
    inventario: () => [paperInventario(p), "Inventario · " + p.nombre],
    licencia: () => [paperLicencia(p), "Licencia " + p.licencia],
    fichajes: () => [paperFichajes(), "Registro de jornada · hoy"],
  };
  const [html, titulo] = map[tipo]();
  paperModal(html, titulo);
}
function openFactura(num) {
  const x = FACTURAS.find(f => f.num === num);
  paperModal(paperFactura(x), "Factura " + num);
}

/* ============================================================
   ACCIONES DE NEGOCIO
   ============================================================ */
function cobrarFactura(num) {
  const x = FACTURAS.find(f => f.num === num); x.estado = "cobrada";
  toast("Factura cobrada ✓", num + " · " + eur(x.base * 1.21), ICON.check, "ok"); rerender();
}
function emitirFactura(num) {
  const x = FACTURAS.find(f => f.num === num); x.estado = "emitida";
  toast("Factura emitida", num + " enviada a " + x.cliente, ICON.send); rerender();
}
function genFacturasMes() {
  openModal(`
    <div class="modal-head"><h3>Generar facturas de julio</h3><button class="x" onclick="closeModal()">${ICON.x}</button></div>
    <div class="modal-body">
      <p style="font-size:13.5px;margin-bottom:14px">Se crearán <b>15 borradores</b> con los datos del mes: 12 de gestión a propietarios
      (limpiezas + lavandería + mantenimiento de julio) y 3 de lavandería a clientes externos (kg procesados).</p>
      <div class="legal-note" style="margin-bottom:0">${ICON.shield}<div><b>Numeración VeriFactu.</b> Las facturas quedan encadenadas y no se pueden alterar después de emitirse.</div></div>
    </div>
    <div class="modal-foot">
      <button class="btn outline" onclick="closeModal()">Cancelar</button>
      <button class="btn primary" onclick="doGenFacturas(this)">${ICON.plus} Generar 15 borradores</button>
    </div>`);
}
function doGenFacturas(btn) {
  btn.disabled = true; btn.textContent = "Generando…";
  const nuevas = [
    { num: "HSM-2026-128", cliente: "Familia Jensen · Villa Es Molí", tipo: "Propietario", concepto: "Gestión integral julio 2026 (borrador)", base: 1310, fecha: "01/08/2026", estado: "borrador" },
    { num: "HSM-2026-129", cliente: "Sra. Larsen · Finca Na Blanca", tipo: "Propietario", concepto: "Gestión integral julio 2026 (borrador)", base: 1015, fecha: "01/08/2026", estado: "borrador" },
    { num: "HSM-2026-130", cliente: "Hotel CR Suites", tipo: "Lavandería", concepto: "Lavandería julio · 1.240 kg (borrador)", base: 1736, fecha: "01/08/2026", estado: "borrador" },
  ];
  let i = 0;
  const int = setInterval(() => {
    if (i < nuevas.length) { FACTURAS.unshift(nuevas[i]); i++; return; }
    clearInterval(int); closeModal();
    toast("15 borradores creados", "3 visibles arriba como ejemplo · revisa y pulsa Emitir.", ICON.invoice, "ok");
    STATE.factFilter = "todas"; rerender();
  }, 420);
}

function asignarInc(id) {
  const i = INCIDENCIAS.find(x => x.id === id);
  i.asignada = "miquel"; i.estado = "encurso";
  i.tl.push({ h: simTime(), t: "Asignada a Miquel Alzamora desde el portal" });
  toast("Asignada a Miquel", i.titulo, ICON.wrench); closeDrawer(); rerender();
}
function resolverInc(id) {
  const i = INCIDENCIAS.find(x => x.id === id);
  i.estado = "resuelta"; i.tl.push({ h: simTime(), t: "Marcada como resuelta desde el portal" });
  toast("Incidencia resuelta ✓", i.titulo, ICON.check, "ok"); closeDrawer(); rerender();
}
function openNuevaIncidencia(desdeEquipo) {
  openModal(`
    <div class="modal-head"><h3>Nueva incidencia</h3><button class="x" onclick="closeModal()">${ICON.x}</button></div>
    <div class="modal-body">
      <div class="form-grid">
        <div class="f-field"><label>Propiedad</label>
          <select id="ni-prop">${PROPS.map(p => `<option value="${p.id}">${p.nombre}</option>`).join("")}</select></div>
        <div class="f-field"><label>Prioridad</label>
          <select id="ni-prio"><option value="baja">Baja</option><option value="media" selected>Media</option><option value="alta">Alta</option></select></div>
        <div class="f-field full"><label>¿Qué ha pasado?</label><input id="ni-tit" placeholder="Ej. Persiana atascada en el salón"></div>
        <div class="f-field full"><label>Detalle</label><textarea id="ni-desc" placeholder="Cuéntalo en una frase; con la foto suele bastar."></textarea></div>
        <div class="full"><div class="photo-drop" onclick="this.innerHTML='${ICON.check.replace(/"/g, "&quot;")}<b>foto-incidencia.jpg</b> adjunta';">${ICON.camera}Toca para hacer una foto o adjuntarla</div></div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn outline" onclick="closeModal()">Cancelar</button>
      <button class="btn danger" onclick="crearIncidencia(${desdeEquipo ? "true" : "false"})">${ICON.send} Enviar incidencia</button>
    </div>`);
}
function crearIncidencia(desdeEquipo) {
  const tit = $("#ni-tit").value.trim() || "Incidencia sin título";
  const nueva = {
    id: "i-" + (242 + INCIDENCIAS.length), propId: $("#ni-prop").value, titulo: tit, prio: $("#ni-prio").value,
    desc: $("#ni-desc").value.trim() || "Reportada desde la app con foto adjunta.",
    por: desdeEquipo ? EMP_DEMO : "laura", fecha: "Hoy · " + simTime(), estado: "abierta", asignada: null, coste: null,
    tl: [{ h: simTime(), t: "Reportada " + (desdeEquipo ? "por Cati Ginard desde la app del equipo" : "desde el portal de dirección") + " con 1 foto" }],
  };
  INCIDENCIAS.unshift(nueva);
  NOTIFS.unshift({ ic: "terra", svg: "alert", b: "Nueva incidencia · " + P(nueva.propId).nombre, t: tit, hace: "ahora" });
  renderNotifs();
  closeModal();
  toast("Incidencia enviada", "La oficina ya la tiene · " + P(nueva.propId).nombre, ICON.alert, "terra");
  rerender();
}

function openReasignar(tid) {
  const t = PLAN.limpiezas.find(x => x.id === tid);
  const disponibles = STAFF.filter(s => ["Limpieza"].includes(s.rol) && s.estado !== "vacaciones");
  openModal(`
    <div class="modal-head"><h3>Reasignar equipo · ${P(t.propId).nombre}</h3><button class="x" onclick="closeModal()">${ICON.x}</button></div>
    <div class="modal-body">
      <p class="hint" style="margin-bottom:12px">${t.ini}–${t.fin} · ${t.tipo}</p>
      <div class="check-list">
        ${disponibles.map(s => `
          <button class="check-item ${t.equipo.includes(s.id) ? "on" : ""}" data-sel="${s.id}" onclick="this.classList.toggle('on')">
            <span class="bx">${ICON.check}</span>${ava(s)}<span>${s.nombre}</span>
            <span style="margin-left:auto" class="hint">${EST[s.estado].txt}</span>
          </button>`).join("")}
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn outline" onclick="closeModal()">Cancelar</button>
      <button class="btn primary" onclick="doReasignar('${tid}')">${ICON.check} Guardar equipo</button>
    </div>`);
}
function doReasignar(tid) {
  const t = PLAN.limpiezas.find(x => x.id === tid);
  const sel = $$("#modal-root .check-item.on").map(el => el.dataset.sel);
  if (sel.length) t.equipo = sel;
  closeModal();
  toast("Equipo actualizado", P(t.propId).nombre + " · " + sel.map(id => S(id).nombre.split(" ")[0]).join(", "), ICON.users, "ok");
  rerender();
}

/* ---------- lavandería ---------- */
function avanzaPedido(id) {
  const p = LAVANDERIA.pedidos.find(x => x.id === id);
  p.estado = p.estado === "pendiente" ? "enproceso" : "listo";
  toast(p.estado === "enproceso" ? "Pedido en lavandería" : "Pedido listo para entrega", p.cliente + " · " + p.kg + " kg", ICON.laundry); rerender();
}
function entregaPedido(id) {
  const idx = LAVANDERIA.pedidos.findIndex(x => x.id === id);
  const p = LAVANDERIA.pedidos[idx];
  LAVANDERIA.pedidos.splice(idx, 1);
  toast("Entregado ✓", p.cliente + " · " + p.kg + " kg · pasa a la factura del mes", ICON.check, "ok"); rerender();
}

/* ---------- fichajes CSV ---------- */
function exportFichajesCSV() {
  const rows = [["Empleado", "Puesto", "Entrada", "Lugar", "Pausas", "Salida", "Fecha"]];
  FICHAJES.forEach(f => { const e = S(f.emp); rows.push([e.nombre, e.rol, f.entrada, f.lugar, f.pausas, f.salida || "en curso", "13/07/2026"]); });
  const csv = rows.map(r => r.map(c => `"${c}"`).join(";")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
  a.download = "fichajes-hygge-2026-07-13.csv"; a.click();
  toast("CSV exportado", "fichajes-hygge-2026-07-13.csv", ICON.down, "ok");
}

/* ---------- vista propietario ---------- */
function openVistaOwner() {
  openModal(`
    <div class="modal-head"><h3>Portal del propietario · vista previa</h3><button class="x" onclick="closeModal()">${ICON.x}</button></div>
    <div class="modal-body">${vistaOwnerHTML()}</div>`, true);
}

/* ============================================================
   EMPLEADO: fichaje, checklist, vacaciones
   ============================================================ */
function toggleFichaje() {
  if (STATE.fichada) {
    openModal(`
      <div class="modal-head"><h3>Fichar salida</h3><button class="x" onclick="closeModal()">${ICON.x}</button></div>
      <div class="modal-body"><p style="font-size:14px">Son las <b>${simTime()}</b>. ¿Cerrar la jornada de hoy?
      <br><span class="hint">Entrada 07:58 · ubicación actual: Villa Es Molí</span></p></div>
      <div class="modal-foot"><button class="btn outline" onclick="closeModal()">Seguir trabajando</button>
      <button class="btn primary" onclick="STATE.fichada=false;closeModal();toast('Salida fichada','Jornada guardada. ¡Hasta mañana!',ICON.check,'ok');rerender()">${ICON.clock} Fichar salida</button></div>`);
  } else {
    STATE.fichada = true;
    toast("Entrada fichada", simTime() + " · ubicación: Villa Es Molí", ICON.clock, "ok");
    rerender();
  }
}
function startEmpTimer() {
  const upd = () => {
    const el = $("#emp-timer"); if (!el) return;
    if (!STATE.fichada) { el.textContent = "Jornada cerrada"; return; }
    const min = 164 + STATE.simMin; // desde las 07:58
    el.textContent = Math.floor(min / 60) + " h " + String(min % 60).padStart(2, "0") + " min";
  };
  upd(); clearInterval(STATE._empInt); STATE._empInt = setInterval(upd, 4000);
}
function openChecklist(tid) {
  const t = PLAN.limpiezas.find(x => x.id === tid);
  const html = () => `
    <div class="modal-head"><h3>Checklist Hygge · ${P(t.propId).nombre}</h3><button class="x" onclick="closeModal()">${ICON.x}</button></div>
    <div class="modal-body">
      <div class="prog-ring" style="margin-bottom:14px"><span class="bar" style="flex:1"><i id="chk-bar" style="width:${STATE.chk.filter(Boolean).length / 8 * 100}%"></i></span><b id="chk-num">${STATE.chk.filter(Boolean).length}/8</b></div>
      <div class="check-list">
        ${CHECKLIST_BASE.map((c, i) => `
          <button class="check-item ${STATE.chk[i] ? "on" : ""}" onclick="tickChk(${i},this)">
            <span class="bx">${ICON.check}</span><span>${c}</span>
          </button>`).join("")}
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn outline" onclick="closeModal();rerender()">Seguir luego</button>
      <button class="btn primary" id="chk-fin" ${STATE.chk.every(Boolean) ? "" : "disabled"} onclick="closeModal();finalizarLimpieza('${tid}')">${ICON.check} Finalizar limpieza</button>
    </div>`;
  openModal(html());
}
function tickChk(i, el) {
  STATE.chk[i] = !STATE.chk[i];
  el.classList.toggle("on");
  const n = STATE.chk.filter(Boolean).length;
  $("#chk-num").textContent = n + "/8";
  $("#chk-bar").style.width = (n / 8 * 100) + "%";
  const fin = $("#chk-fin"); if (fin) fin.disabled = !STATE.chk.every(Boolean);
}
function finalizarLimpieza(tid) {
  const t = PLAN.limpiezas.find(x => x.id === tid);
  t.estado = "hecha"; t.fin = simTime();
  const p = P(t.propId);
  p.proximo = { tipo: "checkin", txt: "Lista · check-in 16:00" };
  ["cati", "ionela"].forEach(id => { const e = S(id); e.estado = "descanso"; e.donde = "Oficina Artà"; e.desde = simTime(); e.pos = { x: 33, y: 40 }; });
  NOTIFS.unshift({ ic: "ok", svg: "check", b: "Limpieza completada · " + p.nombre, t: "Checklist 8/8 con fotos · " + simTime(), hace: "ahora" });
  renderNotifs();
  toast("¡Limpieza terminada! ✨", p.nombre + " lista para el check-in de las 16:00.", ICON.check, "ok");
  rerender();
}
function pedirVacaciones() {
  const d = $("#vac-desde").value, h = $("#vac-hasta").value;
  const fmt = s => new Date(s + "T12:00").toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  $("#vac-list").insertAdjacentHTML("afterbegin",
    `<div class="set-row"><div class="tx"><b>${fmt(d)} – ${fmt(h)} 2026</b><span>solicitud nueva</span></div>
     <div class="end"><span class="chip gold"><i class="d"></i>Pendiente</span></div></div>`);
  toast("Solicitud enviada", "Dirección la verá en el portal y te llegará la respuesta aquí.", ICON.send, "ok");
}
function addChecklistStep() {
  const inp = $("#chk-new"); const v = inp.value.trim(); if (!v) return;
  CHECKLIST_BASE.push(v); STATE.chk.push(false);
  $("#chk-admin").insertAdjacentHTML("beforeend",
    `<div class="set-row"><div class="tx"><b>${CHECKLIST_BASE.length}. ${esc(v)}</b></div>
     <div class="end"><button class="btn xs outline" onclick="this.closest('.set-row').remove()">${ICON.x}</button></div></div>`);
  inp.value = "";
  toast("Paso añadido", "El equipo lo verá en su próxima limpieza.", ICON.check, "ok");
}

/* ============================================================
   MAPA: tooltips
   ============================================================ */
document.addEventListener("pointerover", e => {
  const tgt = e.target.closest("[data-tip]");
  const tip = $("#map-tip"); if (!tip) return;
  if (tgt && tgt.closest("#map-wrap")) {
    tip.innerHTML = tgt.dataset.tip;
    tip.style.left = tgt.style.left; tip.style.top = tgt.style.top;
    tip.classList.add("show");
  } else tip.classList.remove("show");
});

/* ============================================================
   CURSOR GLOW + DRAWER VEIL + HAMBURGUESA
   ============================================================ */
(function () {
  const glow = document.getElementById("cursor-glow");
  let gx = -600, gy = -600, tx = gx, ty = gy;
  document.addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; document.body.classList.add("glow-on"); });
  (function loop() { gx += (tx - gx) * .09; gy += (ty - gy) * .09; glow.style.left = gx + "px"; glow.style.top = gy + "px"; requestAnimationFrame(loop); })();
})();

/* ============================================================
   ARRANQUE
   ============================================================ */
window.addEventListener("DOMContentLoaded", () => {
  startLogin();
  renderNotifs();
  $("#hamb").addEventListener("click", () => document.body.classList.toggle("nav-open"));
  $("#overlay").addEventListener("click", () => document.body.classList.remove("nav-open"));
  $("#drawer-veil").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeModal(); closeDrawer(); } });
});

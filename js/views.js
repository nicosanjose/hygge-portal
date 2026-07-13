/* ============================================================
   VISTAS · Portal Hygge Services Mallorca
   ============================================================ */

/* ---------- helpers ---------- */
const P = id => PROPS.find(p => p.id === id);
const S = id => STAFF.find(s => s.id === id);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
const eur = n => n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const eur0 = n => Math.round(n).toLocaleString("es-ES") + " €";
const ini = nombre => nombre.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

/* ---------- iconos (línea, como los de su web) ---------- */
const I = (d, extra="") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
const ICON = {
  home:    I('<path d="M3 11.2 12 4l9 7.2"/><path d="M5.5 9.8V20h13V9.8"/><path d="M10 20v-5h4v5"/>'),
  house:   I('<path d="M3 11.2 12 4l9 7.2"/><path d="M5.5 9.8V20h13V9.8"/>'),
  grid:    I('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>'),
  users:   I('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.7-3 2.9-4.5 5.5-4.5S13.8 16 14.5 19"/><circle cx="16.8" cy="9" r="2.6"/><path d="M15.5 14.7c2.4.1 4.2 1.5 4.9 4.3"/>'),
  pin:     I('<path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 12 4.3a6.5 6.5 0 0 1 6.5 6.5C18.5 15.6 12 21 12 21Z"/><circle cx="12" cy="10.8" r="2.3"/>'),
  clock:   I('<circle cx="12" cy="12" r="8.2"/><path d="M12 7.5V12l3 2"/>'),
  cal:     I('<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M8 3.5V7M16 3.5V7M3.5 10h17"/>'),
  broom:   I('<path d="m14 4 3.5 3.5"/><path d="M10.5 7.5 16 13c-1.8 3.4-5 5.6-9.4 6.4-1 .2-1.8-.7-1.6-1.6.8-4.4 3-7.6 5.5-10.3Z"/><path d="m8.5 14.5 2.5 2.5"/>'),
  laundry: I('<rect x="4.5" y="3.5" width="15" height="17" rx="2.5"/><circle cx="12" cy="13" r="4.2"/><path d="M8.2 13a3.8 3.8 0 0 0 7.6 0"/><circle cx="8" cy="6.4" r=".4" fill="currentColor"/><circle cx="10.6" cy="6.4" r=".4" fill="currentColor"/>'),
  key:     I('<circle cx="8.5" cy="8.5" r="4.5"/><path d="m11.8 11.8 8 8"/><path d="M16.5 16.5 18.6 14.4M18.8 18.8l2-2"/>'),
  alert:   I('<path d="M12 4.5 21 19.5H3L12 4.5Z"/><path d="M12 10.5v3.6"/><circle cx="12" cy="16.9" r=".5" fill="currentColor"/>'),
  doc:     I('<path d="M7 3.5h7L19 8.5V20a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20V5A1.5 1.5 0 0 1 6.5 3.5Z" transform="translate(0,-.5)"/><path d="M14 3.5V8h4.5"/><path d="M8.5 12.5h7M8.5 16h7"/>'),
  invoice: I('<path d="M6 3.5h12V20.5l-2.4-1.6-2.4 1.6-1.2-.9-1.2.9-2.4-1.6L6 20.5Z"/><path d="M9 8h6M9 11.5h6M9 15h3.5"/>'),
  chart:   I('<path d="M4 20h16"/><rect x="6" y="11" width="3" height="6.5" rx="1"/><rect x="11" y="7" width="3" height="10.5" rx="1"/><rect x="16" y="9.5" width="3" height="8" rx="1"/>'),
  settings:I('<circle cx="12" cy="12" r="3"/><path d="M12 4v2.2M12 17.8V20M4 12h2.2M17.8 12H20M6.3 6.3l1.6 1.6M16.1 16.1l1.6 1.6M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6"/>'),
  bell:    I('<path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2.5H4.5Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
  search:  I('<circle cx="10.5" cy="10.5" r="6"/><path d="m15.5 15.5 4.5 4.5"/>'),
  check:   I('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
  x:       I('<path d="m6 6 12 12M18 6 6 18"/>'),
  route:   I('<circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="6" r="2.4"/><path d="M8.2 16.5 12 13c1.8-1.7 2.4-2.7 3.7-4.8" stroke-dasharray="1 3.4"/>'),
  sun:     I('<circle cx="12" cy="12" r="4"/><path d="M12 3.5V5.5M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18"/>'),
  coffee:  I('<path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z"/><path d="M16 10.5h1.5a2.3 2.3 0 0 1 0 4.6H16"/><path d="M8 4.5c0 1 .8 1 .8 2M11.5 4.5c0 1 .8 1 .8 2"/>'),
  wrench:  I('<path d="M14.5 6.5a4 4 0 0 0-5.6 4.6L4 16a2 2 0 1 0 2.8 2.8l4.9-4.9a4 4 0 0 0 4.6-5.6L13.5 11l-2.4-2.4Z"/>'),
  phone:   I('<path d="M6 3.5h4l1.5 4.5-2 1.5a11 11 0 0 0 5 5l1.5-2 4.5 1.5v4a1.5 1.5 0 0 1-1.7 1.5C10.8 18.6 5.4 13.2 4.5 5.2A1.5 1.5 0 0 1 6 3.5Z" transform="scale(.95) translate(.6,.6)"/>'),
  send:    I('<path d="m4 11 16-7-5 16-3.4-6.4Z"/><path d="m11.6 13.6 4-4"/>'),
  down:    I('<path d="M12 4.5v11M7.5 11.5 12 16l4.5-4.5"/><path d="M5 19.5h14"/>'),
  print:   I('<path d="M7 8V4h10v4"/><rect x="4.5" y="8" width="15" height="8" rx="2"/><path d="M7 13.5h10V20H7Z"/>'),
  plus:    I('<path d="M12 5v14M5 12h14"/>'),
  eye:     I('<path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"/><circle cx="12" cy="12" r="2.6"/>'),
  euro:    I('<path d="M17 6.5A6.8 6.8 0 0 0 6.8 12 6.8 6.8 0 0 0 17 17.5"/><path d="M4.5 10.4h8M4.5 13.6h7"/>'),
  camera:  I('<path d="M4 8.5h3l1.5-2.5h7L17 8.5h3V19H4Z"/><circle cx="12" cy="13.5" r="3.2"/>'),
  shield:  I('<path d="M12 3.5 19 6v6c0 4.6-3 7.6-7 8.5-4-.9-7-3.9-7-8.5V6Z"/><path d="m9 11.8 2.2 2.2 3.8-4"/>'),
  arrow:   I('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  back:    I('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  moon:    I('<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/>'),
  star:    I('<path d="m12 4 2.4 5 5.6.7-4.1 3.8 1.1 5.5L12 16.2 7 19l1.1-5.5L4 9.7 9.6 9Z"/>'),
  in:      I('<path d="M9 4H5.5A1.5 1.5 0 0 0 4 5.5v13A1.5 1.5 0 0 0 5.5 20H9"/><path d="M13 8l4 4-4 4M17 12H8"/>'),
  out:     I('<path d="M15 4h3.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H15"/><path d="M8 8 4 12l4 4M4 12h9"/>'),
  logout:  I('<path d="M14 4H6a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 6 20h8"/><path d="m16 8 4 4-4 4M20 12H9.5"/>'),
  swap:    I('<path d="M7 4 3.5 7.5 7 11M3.5 7.5H15M17 13l3.5 3.5L17 20M20.5 16.5H9"/>'),
};

/* estados de empleado */
const EST = {
  limpiando:     { txt:"Limpiando",      chip:"ok",    col:"#4f8a5c", icon:ICON.broom },
  mantenimiento: { txt:"Mantenimiento",  chip:"terra", col:"#b5533c", icon:ICON.wrench },
  ruta:          { txt:"En ruta",        chip:"blue",  col:"#4a7fa5", icon:ICON.route },
  descanso:      { txt:"Descanso",       chip:"gold",  col:"#c79c3d", icon:ICON.coffee },
  oficina:       { txt:"En oficina",     chip:"sage",  col:"#555f50", icon:ICON.home },
  lavanderia:    { txt:"Lavandería",     chip:"lilac", col:"#84759f", icon:ICON.laundry },
  vacaciones:    { txt:"Vacaciones",     chip:"lilac", col:"#84759f", icon:ICON.sun },
  libre:         { txt:"Fuera de turno", chip:"gray",  col:"#8b8f84", icon:ICON.moon },
};
const estadoChip = e => {
  const st = EST[e.estado];
  let extra = "";
  if (e.estado === "limpiando" || e.estado === "mantenimiento") extra = P(e.donde) ? " · " + P(e.donde).nombre : "";
  if (e.estado === "ruta") extra = " → " + (P(e.donde)?.nombre || e.donde);
  return `<span class="chip ${st.chip}"><i class="d"></i>${st.txt}${esc(extra)}</span>`;
};
const ava = (e, cls="mini-ava") => `<span class="${cls}" style="background:${e.color}">${ini(e.nombre)}</span>`;

const propEstado = p => {
  if (p.proximo.tipo === "checkout") return `<span class="chip gold"><i class="d"></i>Cambio hoy</span>`;
  if (p.proximo.tipo === "checkin")  return `<span class="chip ok"><i class="d"></i>Entrada hoy</span>`;
  if (p.proximo.tipo === "mant")     return `<span class="chip terra"><i class="d"></i>Mantenimiento</span>`;
  if (p.proximo.tipo === "limpieza") return `<span class="chip blue"><i class="d"></i>Limpieza</span>`;
  return `<span class="chip sage"><i class="d"></i>Ocupada</span>`;
};

/* ---------- charts (canvas, DPR-aware) ---------- */
function fitCanvas(c) {
  const dpr = window.devicePixelRatio || 1, r = c.getBoundingClientRect();
  c.width = r.width * dpr; c.height = r.height * dpr;
  const ctx = c.getContext("2d"); ctx.scale(dpr, dpr);
  return [ctx, r.width, r.height];
}
function drawBars(id, data, { color="#c79c3d", labels=true, hi=-1 } = {}) {
  const c = document.getElementById(id); if (!c) return;
  const [ctx, W, H] = fitCanvas(c);
  const max = Math.max(...data.map(d => d[1])) * 1.15;
  const padB = labels ? 22 : 6, padT = 8;
  const n = data.length, gap = 10, bw = Math.min(34, (W - gap * (n + 1)) / n);
  const x0 = (W - (bw * n + gap * (n - 1))) / 2;
  ctx.font = "10.5px 'Product Sans',sans-serif"; ctx.textAlign = "center";
  data.forEach((d, i) => {
    const h = (d[1] / max) * (H - padB - padT);
    const x = x0 + i * (bw + gap), y = H - padB - h;
    ctx.fillStyle = (i === hi || i === n - 1) ? color : color + "55";
    ctx.beginPath(); ctx.roundRect(x, y, bw, h, 5); ctx.fill();
    if (labels) { ctx.fillStyle = "#767b6e"; ctx.fillText(d[0], x + bw / 2, H - 7); }
    ctx.fillStyle = "#3d4237"; ctx.font = "700 10.5px 'Product Sans',sans-serif";
    ctx.fillText(d[1], x + bw / 2, y - 5);
    ctx.font = "10.5px 'Product Sans',sans-serif";
  });
}
function drawSpark(id, pts, color="#4f8a5c") {
  const c = document.getElementById(id); if (!c) return;
  const [ctx, W, H] = fitCanvas(c);
  const max = Math.max(...pts), min = Math.min(...pts);
  const X = i => 2 + i * (W - 4) / (pts.length - 1);
  const Y = v => H - 3 - ((v - min) / (max - min || 1)) * (H - 8);
  ctx.beginPath(); pts.forEach((v, i) => i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v)));
  ctx.strokeStyle = color; ctx.lineWidth = 1.8; ctx.lineJoin = "round"; ctx.stroke();
  ctx.lineTo(X(pts.length - 1), H); ctx.lineTo(X(0), H); ctx.closePath();
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, color + "33"); g.addColorStop(1, color + "00");
  ctx.fillStyle = g; ctx.fill();
}

/* ============================================================
   DASHBOARD
   ============================================================ */
function kpiDash() {
  const ocupMedia = Math.round(PROPS.reduce((a, p) => a + p.ocupacion, 0) / PROPS.length);
  const enServicio = STAFF.filter(s => !["vacaciones", "libre"].includes(s.estado)).length;
  const limpHechas = PLAN.limpiezas.filter(t => t.estado === "hecha").length;
  const limpCurso = PLAN.limpiezas.filter(t => t.estado === "encurso").length;
  const incAbiertas = INCIDENCIAS.filter(i => i.estado !== "resuelta").length;
  const factTotal = FACTURAS.reduce((a, f) => a + f.base * 1.21, 0);
  return { ocupMedia, enServicio, limpHechas, limpCurso, incAbiertas, factTotal };
}
function viewDashboard() {
  const k = kpiDash();
  const agenda = [
    ...PLAN.checkouts.map(c => ({ h: c.h, tipo: "out", txt: `Check-out · ${P(c.propId).nombre}`, sub: `${c.plazas} plazas · llaves ${P(c.propId).llave}`, done: c.hecho })),
    ...PLAN.limpiezas.map(t => ({ h: t.ini, tipo: "clean", txt: `${t.propId === "costapins" ? "Piscina" : "Limpieza"} · ${P(t.propId).nombre}`, sub: t.equipo.map(e => S(e).nombre.split(" ")[0]).join(" + ") + " · hasta " + t.fin, done: t.estado === "hecha", curso: t.estado === "encurso" })),
    ...PLAN.checkins.map(c => ({ h: c.h, tipo: "in", txt: `Check-in · ${P(c.propId).nombre}`, sub: `${c.noches} noches · vía ${c.canal}`, done: false })),
  ].sort((a, b) => a.h.localeCompare(b.h));
  const tipoIc = { out: [ICON.out, "gold"], in: [ICON.in, "ok"], clean: [ICON.broom, "sage"] };
  return `
  <div class="dash-hero">
    <div>
      <h2>Bon dia, Dirección 👋</h2>
      <div class="date">${HOY.texto} · temporada alta</div>
    </div>
    <div class="season">
      <span class="chip gold"><i class="d"></i>Ocupación julio ${k.ocupMedia}%</span>
      <span class="chip ok"><i class="d"></i>${k.enServicio} personas de turno</span>
    </div>
  </div>

  <div class="kpis">
    <div class="kpi"><div class="lab">${ICON.house} Propiedades</div><div class="val" data-count="${PROPS.length}">0</div><div class="sub">12 en gestión integral</div></div>
    <div class="kpi"><div class="lab">${ICON.chart} Ocupación julio</div><div class="val"><span data-count="${k.ocupMedia}">0</span><small>%</small></div><div class="sub"><b class="up">▲ +3 pts</b> vs junio</div><canvas class="spark" id="spark-occ" width="70" height="26" style="width:70px;height:26px"></canvas></div>
    <div class="kpi"><div class="lab">${ICON.broom} Limpiezas hoy</div><div class="val"><span data-count="${PLAN.limpiezas.length}">0</span></div><div class="sub">${k.limpHechas} hecha · ${k.limpCurso} en curso</div></div>
    <div class="kpi"><div class="lab">${ICON.alert} Incidencias abiertas</div><div class="val" data-count="${k.incAbiertas}">0</div><div class="sub">1 de prioridad alta</div></div>
    <div class="kpi"><div class="lab">${ICON.euro} Facturado julio</div><div class="val">${eur0(k.factTotal)}</div><div class="sub"><b class="up">▲ +9%</b> vs junio · IVA incl.</div></div>
  </div>

  <div class="card" style="margin-top:16px">
    <div class="card-head"><h3>Ahora mismo</h3><span class="hint" id="live-hint">actualizado hace unos segundos</span>
      <div class="right"><button class="btn sm outline" data-go="equipo">${ICON.pin} Ver mapa en vivo</button></div>
    </div>
    <div class="now-strip">
      ${STAFF.filter(s => s.estado !== "libre").map(e => `
        <button class="now-chip" data-emp="${e.id}">${ava(e)} ${e.nombre.split(" ")[0]}
          <span>· ${EST[e.estado].txt}${(e.estado === "limpiando" || e.estado === "mantenimiento") && P(e.donde) ? " en " + P(e.donde).nombre.replace("Villa ", "").replace("Finca ", "").replace("Casa ", "") : e.estado === "ruta" ? " → " + P(e.donde).nombre.replace("Casa ", "").replace("Xalet ", "") : ""}</span>
        </button>`).join("")}
    </div>
  </div>

  <div class="dash-grid">
    <div class="card">
      <div class="card-head"><h3>Agenda de hoy</h3><span class="sub">${PLAN.checkouts.length} salidas · ${PLAN.limpiezas.length} servicios · ${PLAN.checkins.length} entradas</span>
        <div class="right"><button class="btn sm outline" data-go="plan">Planificación ${ICON.arrow}</button></div></div>
      ${agenda.map(a => `
        <div class="agenda-item">
          <span class="agenda-hour">${a.h}</span>
          <span class="ic" style="background:var(--${tipoIc[a.tipo][1]}-soft);color:var(--${tipoIc[a.tipo][1] === "gold" ? "gold-deep" : tipoIc[a.tipo][1]})">${tipoIc[a.tipo][0]}</span>
          <div class="tx"><b>${esc(a.txt)}</b><span>${esc(a.sub)}</span></div>
          <span class="st">${a.done ? '<span class="chip ok">Hecho</span>' : a.curso ? '<span class="chip blue"><i class="d"></i>En curso</span>' : '<span class="chip line">Pendiente</span>'}</span>
        </div>`).join("")}
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card">
        <div class="card-head"><h3>Avisos</h3></div>
        <div class="alert-row"><span class="ic" style="background:var(--terra-soft);color:var(--terra)">${ICON.alert}</span>
          <div><b>Fuga de agua · Villa Son Moll</b><span>Miquel en el inmueble desde las 9:40</span></div>
          <button class="btn xs outline go" data-go="incidencias">Ver</button></div>
        <div class="alert-row"><span class="ic" style="background:var(--gold-soft);color:var(--gold-deep)">${ICON.invoice}</span>
          <div><b>Factura vencida · Restaurant Es Port</b><span>711,48 € · 10 días de retraso</span></div>
          <button class="btn xs outline go" data-go="facturacion">Ver</button></div>
        <div class="alert-row"><span class="ic" style="background:var(--blue-soft);color:var(--blue)">${ICON.cal}</span>
          <div><b>4 check-ins esta tarde</b><span>Primero a las 15:00 · Àtic del Port</span></div>
          <button class="btn xs outline go" data-go="plan">Plan</button></div>
      </div>
      <div class="card">
        <div class="card-head"><h3>Ocupación · 12 meses</h3></div>
        <div class="chart-box" style="height:190px"><canvas id="chart-occ"></canvas></div>
        <div class="legend"><span><i style="background:var(--gold)"></i>% de noches ocupadas (cartera Hygge)</span></div>
      </div>
    </div>
  </div>`;
}
function mountDashboard() {
  drawBars("chart-occ", OCUPACION_12M, { hi: 11 });
  drawSpark("spark-occ", OCUPACION_12M.map(d => d[1]), "#c79c3d");
  animateCounters();
}

/* ============================================================
   PROPIEDADES
   ============================================================ */
function viewProps() {
  const zonas = [...new Set(PROPS.map(p => p.zona.split(" (")[0]))];
  const q = (STATE.propQ || "").toLowerCase();
  const list = PROPS.filter(p =>
    (!STATE.propZona || p.zona.startsWith(STATE.propZona)) &&
    (!q || p.nombre.toLowerCase().includes(q) || p.zona.toLowerCase().includes(q) || p.dueno.toLowerCase().includes(q)));
  const totNoches = PROPS.reduce((a, p) => a + p.noches, 0);
  const totIng = PROPS.reduce((a, p) => a + p.ingresos, 0);
  return `
  <div class="kpis" style="margin-bottom:16px">
    <div class="kpi"><div class="lab">${ICON.house} En cartera</div><div class="val">${PROPS.length}</div><div class="sub">8 con piscina · 12 con licencia ETV</div></div>
    <div class="kpi"><div class="lab">${ICON.cal} Noches julio</div><div class="val" data-count="${totNoches}">0</div><div class="sub">sobre ${PROPS.length * 31} posibles</div></div>
    <div class="kpi"><div class="lab">${ICON.euro} Ingresos gestionados</div><div class="val">${eur0(totIng)}</div><div class="sub">julio (a día 13, proyección)</div></div>
    <div class="kpi"><div class="lab">${ICON.key} Llaves en consigna</div><div class="val">12</div><div class="sub">todas registradas</div></div>
  </div>
  <div class="toolbar">
    <input class="input" style="min-width:210px" placeholder="Buscar propiedad, zona o propietario…" value="${esc(STATE.propQ || "")}" oninput="STATE.propQ=this.value;rerender(true)">
    <select class="select" onchange="STATE.propZona=this.value;rerender()">
      <option value="">Todas las zonas</option>
      ${zonas.map(z => `<option ${STATE.propZona === z ? "selected" : ""}>${z}</option>`).join("")}
    </select>
    <div class="spacer"></div>
    <button class="btn primary sm" onclick="toast('Alta de propiedad','El formulario completo se activa en la versión final.',ICON.house)">${ICON.plus} Nueva propiedad</button>
  </div>
  <div class="props-grid">
    ${list.map(p => `
      <button class="prop-card" data-prop="${p.id}">
        <div class="prop-cover">
          <img src="${p.foto}" alt="${esc(p.nombre)}" loading="lazy">
          <span class="st">${propEstado(p)}</span>
          <span class="zona">${ICON.pin} ${esc(p.zona)}</span>
        </div>
        <div class="prop-body">
          <h4>${esc(p.nombre)}</h4>
          <div class="prop-meta">
            <span>${ICON.house} ${p.habs} hab · ${p.banos} baños</span>
            ${p.piscina ? `<span>≈ piscina</span>` : ""}
            <span>${ICON.key} ${p.llave}</span>
          </div>
          <div class="prop-occ"><span>Julio</span><span class="bar"><i style="width:${p.ocupacion}%"></i></span><b>${p.ocupacion}%</b></div>
          <div class="prop-next">${ICON.clock} ${esc(p.proximo.txt)}</div>
        </div>
      </button>`).join("")}
  </div>
  ${list.length ? "" : `<div class="empty">${ICON.search}No hay propiedades que coincidan con el filtro.</div>`}`;
}

/* ---------- calendario determinista por propiedad ---------- */
function seededDays(p) {
  let seed = [...p.id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const busy = new Set(), clean = new Set();
  let d = 1 + Math.floor(rnd() * 2), left = p.noches;
  while (left > 0 && d <= 31) {
    const stay = Math.min(3 + Math.floor(rnd() * 6), left);
    for (let i = 0; i < stay && d + i <= 31; i++) busy.add(d + i);
    d += stay; if (d <= 31) clean.add(d);
    left -= stay; d += rnd() < .55 ? 0 : 1;
  }
  return { busy, clean };
}
function calHTML(p) {
  const { busy, clean } = seededDays(p);
  const firstDow = 2; // 1 jul 2026 = miércoles
  let cells = "";
  for (let i = 0; i < firstDow; i++) cells += `<div class="cal-day out"></div>`;
  for (let d = 1; d <= 31; d++) {
    cells += `<div class="cal-day ${busy.has(d) ? "busy" : ""} ${d === HOY.dia ? "today" : ""}" title="${busy.has(d) ? "Ocupada" : "Libre"}${clean.has(d) ? " · limpieza" : ""}">${d}${clean.has(d) ? '<span class="m"></span>' : ""}</div>`;
  }
  return `<div class="cal"><div class="cal-head"><span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span></div>
  <div class="cal-grid">${cells}</div></div>
  <div class="legend" style="margin-top:12px">
    <span><i style="background:var(--gold-soft);border:1px solid var(--gold-line)"></i>Noche ocupada</span>
    <span><i style="background:var(--ok)"></i>Día de limpieza</span>
    <span><i style="background:#fff;border:1.5px solid var(--sage)"></i>Hoy</span>
  </div>`;
}

function viewPropDetail() {
  const p = P(STATE.prop); if (!p) { STATE.route = "propiedades"; return viewProps(); }
  const tab = STATE.propTab || "resumen";
  const incs = INCIDENCIAS.filter(i => i.propId === p.id);
  const oc = INFORME_JUNIO.ocupacionProps.find(o => o.propId === p.id);
  const tabs = [["resumen", "Resumen"], ["calendario", "Calendario"], ["limpiezas", "Limpiezas"], ["incidencias", `Incidencias (${incs.filter(i => i.estado !== "resuelta").length})`], ["ficha", "Ficha y ropa"], ["docs", "Documentos"]];
  let body = "";
  if (tab === "resumen") body = `
    <div class="kpis" style="margin-bottom:16px">
      <div class="kpi"><div class="lab">${ICON.cal} Noches julio</div><div class="val">${p.noches}<small>/31</small></div><div class="sub">${p.ocupacion}% de ocupación</div></div>
      <div class="kpi"><div class="lab">${ICON.clock} Horas de servicio</div><div class="val">${p.horasLimpieza}<small>h</small></div><div class="sub">limpieza + mantenimiento · julio</div></div>
      <div class="kpi"><div class="lab">${ICON.euro} Ingresos julio</div><div class="val">${eur0(p.ingresos)}</div><div class="sub">junio: ${oc ? eur0(oc.ingresos) : "—"}</div></div>
      <div class="kpi"><div class="lab">${ICON.broom} Limpiezas junio</div><div class="val">${oc ? oc.limpiezas : "—"}</div><div class="sub">${oc ? oc.horasLimp + " h de equipo" : ""}</div></div>
    </div>
    <div class="grid" style="grid-template-columns:1.4fr 1fr">
      <div class="card"><div class="card-head"><h3>Ocupación últimos 6 meses</h3></div>
        <div class="chart-box" style="height:180px"><canvas id="chart-prop"></canvas></div></div>
      <div class="card"><div class="card-head"><h3>Próximos movimientos</h3></div>
        <div class="tl">
          <div class="tl-item gold"><b>${esc(p.proximo.txt)}</b><span>hoy</span></div>
          <div class="tl-item"><b>Limpieza programada tras salida</b><span>equipo asignado por Laura</span></div>
          <div class="tl-item"><b>Entrega de ropa renting</b><span>${p.ropa.lavanderia} juegos desde lavandería</span></div>
          <div class="tl-item"><b>Revisión mensual de mantenimiento</b><span>viernes 17 jul · Miquel</span></div>
        </div></div>
    </div>`;
  if (tab === "calendario") body = `<div class="card"><div class="card-head"><h3>Julio 2026</h3>
    <span class="sub">${p.noches} noches reservadas · sincronizado con ${p.canales.join(" + ")}</span>
    <div class="right">${p.canales.map(c => `<span class="chip line">${c} · iCal</span>`).join("")}</div></div>${calHTML(p)}</div>`;
  if (tab === "limpiezas") {
    const rows = [
      ["Hoy", "Check-out → check-in", PLAN.limpiezas.find(t => t.propId === p.id) ? PLAN.limpiezas.find(t => t.propId === p.id).equipo.map(e => S(e).nombre).join(", ") : "Cati Ginard, Ionela Popescu", "2 h 15 min", PLAN.limpiezas.find(t => t.propId === p.id)?.estado === "hecha" ? "ok" : "curso"],
      ["9 jul", "Check-out → check-in", "Antònia Sureda, Fátima El Amrani", "2 h 05 min", "ok"],
      ["5 jul", "Repaso a mitad de estancia", "Yolanda Ruiz", "1 h 10 min", "ok"],
      ["2 jul", "Check-out → check-in", "Cati Ginard, Marta Riera", "2 h 20 min", "ok"],
      ["28 jun", "Limpieza a fondo", "Equipo de 3", "3 h 40 min", "ok"],
      ["24 jun", "Check-out → check-in", "Ionela Popescu, Sofía Herrera", "2 h 10 min", "ok"],
    ];
    body = `<div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Fecha</th><th>Tipo</th><th>Equipo</th><th class="num">Duración</th><th>Checklist</th></tr></thead>
      <tbody>${rows.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td class="num">${r[3]}</td>
        <td>${r[4] === "ok" ? '<span class="chip ok">100 % · con fotos</span>' : '<span class="chip blue"><i class="d"></i>En curso</span>'}</td></tr>`).join("")}</tbody></table></div>`;
  }
  if (tab === "incidencias") body = incs.length
    ? `<div class="inc-grid">${incs.map(incCardHTML).join("")}</div>`
    : `<div class="empty">${ICON.check}Sin incidencias registradas en esta propiedad.</div>`;
  if (tab === "ficha") body = `
    <div class="grid" style="grid-template-columns:1.3fr 1fr">
      <div class="card"><div class="card-head"><h3>Ficha de la propiedad</h3></div>
        <div class="facts">
          <div class="fact"><div class="k">Propietario</div><div class="v">${esc(p.dueno)}</div></div>
          <div class="fact"><div class="k">Licencia turística</div><div class="v">${p.licencia}</div></div>
          <div class="fact"><div class="k">Llave en consigna</div><div class="v">${p.llave} · oficina Artà</div></div>
          <div class="fact"><div class="k">Capacidad</div><div class="v">${p.plazas} plazas</div></div>
          <div class="fact"><div class="k">Distribución</div><div class="v">${p.habs} hab · ${p.banos} baños</div></div>
          <div class="fact"><div class="k">Piscina</div><div class="v">${p.piscina ? "Sí · mantenimiento Hygge" : "No"}</div></div>
          <div class="fact"><div class="k">Canales</div><div class="v">${p.canales.join(" + ")}</div></div>
          <div class="fact"><div class="k">Tipo</div><div class="v">${p.tipo}</div></div>
        </div></div>
      <div class="card"><div class="card-head"><h3>Ropa · renting Hygge</h3><span class="sub">juegos completos de cama y baño</span></div>
        <div class="facts" style="grid-template-columns:1fr 1fr 1fr">
          <div class="fact"><div class="k">Dotación</div><div class="v">${p.ropa.juegos}</div></div>
          <div class="fact"><div class="k">En la casa</div><div class="v">${p.ropa.circulando}</div></div>
          <div class="fact"><div class="k">En lavandería</div><div class="v">${p.ropa.lavanderia}</div></div>
        </div>
        <div style="margin-top:14px" class="prop-occ"><span>Rotación</span><span class="bar green"><i style="width:${Math.round(p.ropa.circulando / p.ropa.juegos * 100)}%"></i></span><b>${Math.round(p.ropa.circulando / p.ropa.juegos * 100)}%</b></div>
        <p class="hint" style="margin-top:12px">La ropa se repone automáticamente con cada entrega de lavandería. Stock mínimo configurado: 2 juegos.</p>
      </div>
    </div>`;
  if (tab === "docs") body = `
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Documento</th><th>Tipo</th><th>Actualizado</th><th></th></tr></thead>
      <tbody>
        <tr><td class="who">${ICON.doc} Contrato de gestión 2026</td><td>Contrato</td><td>02/01/2026</td><td class="num"><button class="btn xs outline" onclick="openPaper('contrato','${p.id}')">${ICON.eye} Ver</button></td></tr>
        <tr><td class="who">${ICON.doc} Liquidación junio 2026</td><td>Liquidación</td><td>01/07/2026</td><td class="num"><button class="btn xs outline" onclick="openPaper('liquidacion','${p.id}')">${ICON.eye} Ver</button></td></tr>
        <tr><td class="who">${ICON.doc} Inventario y dotación</td><td>Inventario</td><td>12/05/2026</td><td class="num"><button class="btn xs outline" onclick="openPaper('inventario','${p.id}')">${ICON.eye} Ver</button></td></tr>
        <tr><td class="who">${ICON.doc} Licencia ${p.licencia}</td><td>Administración</td><td>2023</td><td class="num"><button class="btn xs outline" onclick="openPaper('licencia','${p.id}')">${ICON.eye} Ver</button></td></tr>
      </tbody></table></div>`;
  return `
  <button class="btn sm outline" style="margin-bottom:14px" data-go="propiedades">${ICON.back} Propiedades</button>
  <div class="prop-hero">
    <img src="${p.foto}" alt="">
    <div class="inner">
      <div><h2>${esc(p.nombre)}</h2><div class="loc">${ICON.pin} ${esc(p.zona)} · ${esc(p.tipo)} · ${p.licencia}</div></div>
      <div class="right">${propEstado(p)}
        <button class="btn sm primary" onclick="toast('Aviso enviado','El propietario recibirá el resumen semanal por email.',ICON.send)">${ICON.send} Avisar propietario</button></div>
    </div>
  </div>
  <div class="tabs">${tabs.map(t => `<button class="tab ${tab === t[0] ? "on" : ""}" onclick="STATE.propTab='${t[0]}';rerender()">${t[1]}</button>`).join("")}</div>
  ${body}`;
}
function mountPropDetail() {
  const p = P(STATE.prop); if (!p) return;
  const oc = INFORME_JUNIO.ocupacionProps.find(o => o.propId === p.id);
  const base = oc ? oc.ocup : p.ocupacion;
  drawBars("chart-prop", [["feb", Math.max(15, base - 49)], ["mar", Math.max(20, base - 36)], ["abr", base - 21], ["may", base - 12], ["jun", base], ["jul", p.ocupacion]], { hi: 5 });
  animateCounters();
}

/* ============================================================
   EQUIPO EN VIVO
   ============================================================ */
const MAP_TOWNS = [
  { n: "Artà", x: 32, y: 38, big: true }, { n: "Capdepera", x: 63, y: 30, big: true },
  { n: "Cala Ratjada", x: 77, y: 20 }, { n: "Canyamel", x: 71, y: 45 },
  { n: "Cala Millor", x: 60, y: 72 }, { n: "Son Servera", x: 50, y: 62 },
  { n: "Colònia de St. Pere", x: 14, y: 13 }, { n: "Betlem", x: 25, y: 10 }, { n: "Cala Mesquida", x: 58, y: 9 },
];
function mapBaseSVG() {
  return `<svg class="map-base" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#dcebe7"/><stop offset="1" stop-color="#cfe3dd"/>
      </linearGradient>
      <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f3f0e4"/><stop offset="1" stop-color="#eae6d6"/>
      </linearGradient>
    </defs>
    <rect width="1000" height="640" fill="url(#sea)"/>
    <g stroke="#b9d2cb" stroke-width="1.4" fill="none" opacity=".6">
      <path d="M700 90q40 14 80 0t80 14"/><path d="M760 180q30 12 60 0t60 12"/>
      <path d="M820 300q26 10 52 0t52 10"/><path d="M780 430q30 12 60 0t60 12"/><path d="M690 560q34 12 68 0t68 12"/>
    </g>
    <path d="M0 640V96Q60 74 96 58q54-24 96-22 46 2 92-14 30-10 56 6 22 14 40 34 16 18 42 22 34 6 96 4 44-2 82 18 30 16 44 44 12 26 30 44 22 22 26 52 4 28-8 56-14 30-40 46-30 18-48 44-16 24-24 54-8 32-30 52-24 22-56 26-40 6-70 30-24 20-54 14H0Z"
      fill="url(#land)" stroke="#d8d2bd" stroke-width="2.5"/>
    <path d="M0 96Q60 74 96 58q54-24 96-22 46 2 92-14 30-10 56 6 22 14 40 34 16 18 42 22 34 6 96 4 44-2 82 18 30 16 44 44 12 26 30 44 22 22 26 52 4 28-8 56-14 30-40 46-30 18-48 44-16 24-24 54-8 32-30 52-24 22-56 26-40 6-70 30-24 20-54 14"
      fill="none" stroke="#9fb59e" stroke-width="3" opacity=".5"/>
    <g stroke="#cbc6b0" stroke-width="4" fill="none" stroke-linecap="round" opacity=".85">
      <path d="M320 244 Q470 170 630 192 Q710 152 770 128" />
      <path d="M320 244 Q220 170 140 84" />
      <path d="M630 192 Q700 240 710 288" />
      <path d="M320 244 Q420 320 500 396 Q560 428 600 460" />
      <path d="M500 396 Q590 400 706 410" />
    </g>
    <g font-family="Product Sans,sans-serif" fill="#6d7266">
      ${MAP_TOWNS.map(t => `
        <circle cx="${t.x * 10}" cy="${t.y * 6.4}" r="${t.big ? 6 : 4.5}" fill="#fff" stroke="#8f9486" stroke-width="2"/>
        <text x="${t.x * 10}" y="${t.y * 6.4 - 12}" text-anchor="middle" font-size="${t.big ? 15 : 13}" font-weight="${t.big ? 700 : 400}">${t.n}</text>`).join("")}
      <text x="855" y="70" font-size="14" fill="#8ba39b" font-style="italic">Mar Mediterráneo</text>
      <text x="30" y="612" font-size="13" fill="#9a957f">Llevant de Mallorca</text>
    </g>
  </svg>`;
}
function empMapPos(e) {
  if (e.estado === "ruta" && e.ruta) {
    const t = STATE.rutaT[e.id] ?? .45;
    return { x: e.ruta.desde.x + (e.ruta.hasta.x - e.ruta.desde.x) * t, y: e.ruta.desde.y + (e.ruta.hasta.y - e.ruta.desde.y) * t };
  }
  if (e.pos) return e.pos;
  const p = P(e.donde);
  if (p) {
    const idx = STAFF.filter(s => s.donde === e.donde && !["vacaciones", "libre"].includes(s.estado)).findIndex(s => s.id === e.id);
    return { x: p.pos.x - 2.2 + idx * 4.4, y: p.pos.y + 4 };
  }
  return { x: 34, y: 40 };
}
function viewEquipo() {
  const grupos = [
    ["Limpiando ahora", "#4f8a5c", ["limpiando"]],
    ["Mantenimiento", "#b5533c", ["mantenimiento"]],
    ["En ruta", "#4a7fa5", ["ruta"]],
    ["Lavandería y oficina", "#84759f", ["lavanderia", "oficina"]],
    ["Descanso", "#c79c3d", ["descanso"]],
    ["Vacaciones", "#9a90b5", ["vacaciones"]],
  ];
  return `
  <div class="live-grid">
    <div class="card map-card tight">
      <div class="map-wrap" id="map-wrap">
        ${mapBaseSVG()}
        <div class="map-note">Vista esquemática en tiempo real</div>
        ${PROPS.map(p => `<div class="map-pin ${["checkout", "limpieza"].includes(p.proximo.tipo) ? "busy" : ""}" style="left:${p.pos.x}%;top:${p.pos.y}%" data-tip="<b>${esc(p.nombre)}</b>${esc(p.proximo.txt)}" data-prop-go="${p.id}"><span class="ho">${ICON.house}</span></div>`).join("")}
        ${STAFF.filter(e => !["vacaciones", "libre"].includes(e.estado)).map(e => {
          const pos = empMapPos(e);
          return `<div class="map-emp ${["limpiando", "mantenimiento"].includes(e.estado) ? "working" : ""}" id="memp-${e.id}" style="left:${pos.x}%;top:${pos.y}%;--st:${EST[e.estado].col}" data-emp="${e.id}" data-tip="<b>${esc(e.nombre)}</b>${EST[e.estado].txt}${e.estado === "ruta" ? " → " + esc(P(e.donde)?.nombre || "") + " · llega " + e.eta : P(e.donde) ? " · " + esc(P(e.donde).nombre) : " · " + esc(e.donde)} · desde ${e.desde}">
            <span class="av" style="background:${e.color}">${ini(e.nombre)}</span></div>`;
        }).join("")}
        <div class="map-tip" id="map-tip"></div>
        <div class="map-legend">
          <span><i style="background:#4f8a5c"></i>Limpiando</span><span><i style="background:#b5533c"></i>Mantenim.</span>
          <span><i style="background:#4a7fa5"></i>En ruta</span><span><i style="background:#c79c3d"></i>Descanso</span>
          <span><i style="background:#84759f"></i>Lavand./Oficina</span>
        </div>
      </div>
    </div>
    <div>
      <div class="kpis" style="grid-template-columns:1fr 1fr;margin-bottom:14px">
        <div class="kpi"><div class="lab">${ICON.users} De turno</div><div class="val">${STAFF.filter(s => !["vacaciones", "libre"].includes(s.estado)).length}<small>/${STAFF.length}</small></div><div class="sub">1 de vacaciones</div></div>
        <div class="kpi"><div class="lab">${ICON.clock} Fichajes hoy</div><div class="val">${FICHAJES.length}</div><div class="sub">todos con geolocalización</div></div>
      </div>
      <div class="team-list">
        ${grupos.map(([t, col, estados]) => {
          const gente = STAFF.filter(e => estados.includes(e.estado));
          if (!gente.length) return "";
          return `<div class="team-block"><h4><i style="background:${col}"></i>${t} · ${gente.length}</h4>
            ${gente.map(e => `
              <button class="emp-row" data-emp="${e.id}">
                ${ava(e)}
                <div><div class="nm">${esc(e.nombre)}</div>
                <div class="st">${e.rol} · ${e.estado === "ruta" ? "→ " + esc(P(e.donde)?.nombre || "") : P(e.donde) ? esc(P(e.donde).nombre) : esc(e.donde)}</div></div>
                <div class="end">${e.estado === "vacaciones" ? "hasta " + e.hasta : e.estado === "ruta" ? "llega " + e.eta : "desde " + e.desde}</div>
              </button>`).join("")}</div>`;
        }).join("")}
      </div>
    </div>
  </div>`;
}

/* ---------- ficha empleado (drawer) ---------- */
function drawerEmpleado(e) {
  const st = EST[e.estado];
  return `
  <div class="drawer-head">
    ${ava(e, "mini-ava")} <div><b style="font-size:16px">${esc(e.nombre)}</b>
    <div class="hint">${e.rol} · contrato ${e.contrato} h/semana</div></div>
    <button class="x" onclick="closeDrawer()">${ICON.x}</button>
  </div>
  <div class="drawer-body">
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
      ${estadoChip(e)}
      <a class="chip line" href="tel:${e.tel.replace(/ /g, "")}">${e.tel}</a>
    </div>
    <div class="facts" style="grid-template-columns:1fr 1fr;margin-bottom:18px">
      <div class="fact"><div class="k">Hoy fichó</div><div class="v">${e.fichaje || "—"}</div></div>
      <div class="fact"><div class="k">Semana</div><div class="v">${e.horasSemana} h</div></div>
      <div class="fact"><div class="k">Mes (a día 13)</div><div class="v">${e.horasMes} h</div></div>
      <div class="fact"><div class="k">Vacaciones</div><div class="v">${e.vacaciones} días</div></div>
      ${e.limpiezasMes ? `<div class="fact"><div class="k">Limpiezas jul</div><div class="v">${e.limpiezasMes}</div></div>` : ""}
      ${e.partes ? `<div class="fact"><div class="k">Partes jul</div><div class="v">${e.partes}</div></div>` : ""}
      <div class="fact"><div class="k">Valoración interna</div><div class="v">★ ${e.valoracion}</div></div>
    </div>
    <h4 style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:12px">Jornada de hoy</h4>
    ${e.hoy.length ? `<div class="tl">${e.hoy.map(h => `<div class="tl-item ${h.tipo === "inc" ? "terra" : h.tipo === "pausa" ? "gold" : ""}"><b>${esc(h.txt)}</b><span>${h.h}</span></div>`).join("")}</div>`
      : `<div class="empty" style="padding:16px">${ICON.sun}De vacaciones hasta el ${e.hasta}.</div>`}
    <div style="display:flex;gap:8px;margin-top:20px;flex-wrap:wrap">
      <button class="btn sm outline" data-go="fichajes">${ICON.clock} Fichajes</button>
      <button class="btn sm outline" onclick="toast('Mensaje enviado','${esc(e.nombre.split(" ")[0])} lo verá en su app del equipo.',ICON.send)">${ICON.send} Mensaje</button>
      <button class="btn sm primary" onclick="toast('Tarea asignada','Se añadió al plan de ${esc(e.nombre.split(" ")[0])} de esta tarde.',ICON.check)">${ICON.plus} Asignar tarea</button>
    </div>
  </div>`;
}

/* ============================================================
   PLANIFICACIÓN
   ============================================================ */
function viewPlan() {
  const stChip = { hecha: '<span class="chip ok">Hecha</span>', encurso: '<span class="chip blue"><i class="d"></i>En curso</span>', pendiente: '<span class="chip line">Pendiente</span>' };
  return `
  <div class="toolbar">
    <span class="chip gold">${ICON.cal} Hoy · ${HOY.corto}</span>
    <span class="chip line">${PLAN.checkouts.length} salidas</span>
    <span class="chip line">${PLAN.limpiezas.length} servicios</span>
    <span class="chip line">${PLAN.checkins.length} entradas</span>
    <div class="spacer"></div>
    <button class="btn sm outline" onclick="toast('Plan de mañana generado','7 servicios repartidos entre 3 equipos según check-outs de Booking y Airbnb.',ICON.check,'ok')">${ICON.swap} Generar plan de mañana</button>
    <button class="btn sm primary" onclick="toast('Plan enviado al equipo','Cada persona ve sus tareas en su móvil al instante.',ICON.send)">${ICON.send} Enviar al equipo</button>
  </div>
  <div class="plan-cols">
    <div class="plan-col"><h4>${ICON.out} Check-outs <span class="n">${PLAN.checkouts.length}</span></h4>
      ${PLAN.checkouts.map(c => `<div class="plan-card">
        <div class="top"><b>${esc(P(c.propId).nombre)}</b><span class="hr">${c.h}</span></div>
        <div class="meta">${ICON.pin} ${esc(P(c.propId).zona)} · ${c.plazas} plazas · llaves ${P(c.propId).llave}</div>
        <div class="team">${c.hecho ? '<span class="chip ok">Salida confirmada</span>' : '<span class="chip line">Prevista</span>'}</div>
      </div>`).join("")}
    </div>
    <div class="plan-col"><h4>${ICON.broom} Limpiezas y servicios <span class="n">${PLAN.limpiezas.length}</span></h4>
      ${PLAN.limpiezas.map(t => `<div class="plan-card">
        <div class="top"><b>${esc(P(t.propId).nombre)}</b><span class="hr">${t.ini}–${t.fin}</span></div>
        <div class="meta">${esc(t.tipo)}</div>
        <div class="team">
          <span class="avs">${t.equipo.map(id => ava(S(id))).join("")}</span>
          <span class="hint">${t.equipo.map(id => S(id).nombre.split(" ")[0]).join(", ")}</span>
          <span class="act">${stChip[t.estado]}</span>
        </div>
        ${t.estado === "pendiente" ? `<div style="margin-top:9px;display:flex;gap:7px">
          <button class="btn xs outline" onclick="openReasignar('${t.id}')">${ICON.users} Reasignar</button>
          <button class="btn xs outline" data-go="equipo">${ICON.pin} Mapa</button></div>` : ""}
      </div>`).join("")}
    </div>
    <div class="plan-col"><h4>${ICON.in} Check-ins <span class="n">${PLAN.checkins.length}</span></h4>
      ${PLAN.checkins.map(c => `<div class="plan-card">
        <div class="top"><b>${esc(P(c.propId).nombre)}</b><span class="hr">${c.h}</span></div>
        <div class="meta">${c.noches} noches · reserva vía ${c.canal}</div>
        <div class="team"><span class="chip ${PLAN.limpiezas.find(t => t.propId === c.propId && t.estado !== "hecha") ? "gold" : "ok"}">${PLAN.limpiezas.find(t => t.propId === c.propId && t.estado !== "hecha") ? "Limpieza en marcha" : "Lista para entrar"}</span></div>
      </div>`).join("")}
    </div>
  </div>`;
}

/* ============================================================
   FICHAJES
   ============================================================ */
function viewFichajes() {
  const dia = STATE.fichDia || "hoy";
  const rows = dia === "hoy" ? FICHAJES : FICHAJES.map(f => ({
    ...f, pausas: "13:30–14:00", salida: ["16:02", "16:15", "16:31", "17:04", "16:44"][f.emp.length % 5],
    total: (7.5 + (f.emp.length % 3) * .25).toLocaleString("es-ES") + " h",
  }));
  const horasSemana = STAFF.reduce((a, s) => a + s.horasSemana, 0);
  return `
  <div class="legal-note">${ICON.shield}
    <div><b>Registro de jornada conforme al RD-ley 8/2019.</b> Cada fichaje guarda hora y ubicación, es inmodificable sin
    dejar rastro y se conserva 4 años. Exportable ante una inspección de trabajo en un clic.</div>
  </div>
  <div class="kpis" style="margin-bottom:16px">
    <div class="kpi"><div class="lab">${ICON.users} Fichados ${dia}</div><div class="val">${rows.length}</div><div class="sub">de ${STAFF.length - 1} en plantilla activa</div></div>
    <div class="kpi"><div class="lab">${ICON.clock} Horas esta semana</div><div class="val">${horasSemana.toLocaleString("es-ES")}<small>h</small></div><div class="sub">acumulado del equipo</div></div>
    <div class="kpi"><div class="lab">${ICON.check} Correcciones pendientes</div><div class="val">0</div><div class="sub">sin olvidos de fichaje</div></div>
  </div>
  <div class="toolbar">
    <div class="seg">
      <button class="${dia === "hoy" ? "on" : ""}" onclick="STATE.fichDia='hoy';rerender()">Hoy</button>
      <button class="${dia === "ayer" ? "on" : ""}" onclick="STATE.fichDia='ayer';rerender()">Ayer</button>
    </div>
    <div class="spacer"></div>
    <button class="btn sm outline" onclick="exportFichajesCSV()">${ICON.down} Exportar CSV</button>
    <button class="btn sm outline" onclick="openPaper('fichajes')">${ICON.print} Informe PDF</button>
  </div>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Empleado</th><th>Entrada</th><th>Lugar de fichaje</th><th>Pausas</th><th>Salida</th><th class="num">Total</th><th>Estado</th></tr></thead>
    <tbody>${rows.map(f => { const e = S(f.emp); return `
      <tr><td><span class="who">${ava(e)} ${esc(e.nombre)}</span></td>
      <td><b>${f.entrada}</b></td>
      <td><span class="chip line">${ICON.pin} ${esc(f.lugar)}</span></td>
      <td>${f.pausas}</td><td>${f.salida ? `<b>${f.salida}</b>` : "—"}</td>
      <td class="num"><b>${f.total}</b></td>
      <td>${f.salida ? '<span class="chip ok">Completo</span>' : '<span class="chip blue"><i class="d"></i>Jornada abierta</span>'}</td></tr>`; }).join("")}
    </tbody></table></div>`;
}

/* ============================================================
   INCIDENCIAS
   ============================================================ */
function incCardHTML(i) {
  const e = S(i.por), a = i.asignada ? S(i.asignada) : null;
  const stChip = { abierta: '<span class="chip terra"><i class="d"></i>Abierta</span>', encurso: '<span class="chip blue"><i class="d"></i>En curso</span>', resuelta: '<span class="chip ok">Resuelta</span>' };
  return `<button class="inc-card" data-inc="${i.id}">
    <div class="top"><span class="prio ${i.prio}"></span><h4>${esc(i.titulo)}</h4></div>
    <div class="top"><span class="chip sage">${esc(P(i.propId).nombre)}</span>${stChip[i.estado]}</div>
    <div class="desc">${esc(i.desc)}</div>
    <div class="foot">${ava(e)} ${e.nombre.split(" ")[0]} · ${i.fecha}
      <span style="margin-left:auto">${a ? "→ " + a.nombre.split(" ")[0] : "sin asignar"}</span></div>
  </button>`;
}
function viewIncidencias() {
  const f = STATE.incFilter || "activas";
  const list = INCIDENCIAS.filter(i => f === "todas" ? true : f === "activas" ? i.estado !== "resuelta" : i.estado === f);
  return `
  <div class="kpis" style="margin-bottom:16px">
    <div class="kpi"><div class="lab">${ICON.alert} Abiertas</div><div class="val">${INCIDENCIAS.filter(i => i.estado === "abierta").length}</div><div class="sub">1 sin asignar</div></div>
    <div class="kpi"><div class="lab">${ICON.wrench} En curso</div><div class="val">${INCIDENCIAS.filter(i => i.estado === "encurso").length}</div><div class="sub">Miquel en Villa Son Moll</div></div>
    <div class="kpi"><div class="lab">${ICON.check} Resueltas en julio</div><div class="val">${INCIDENCIAS.filter(i => i.estado === "resuelta").length}</div><div class="sub">tiempo medio: 1,2 días</div></div>
    <div class="kpi"><div class="lab">${ICON.euro} Coste julio</div><div class="val">${eur0(INCIDENCIAS.reduce((a, i) => a + (i.coste || 0), 0))}</div><div class="sub">repuestos y materiales</div></div>
  </div>
  <div class="toolbar">
    <div class="seg">
      ${[["activas", "Activas"], ["resuelta", "Resueltas"], ["todas", "Todas"]].map(x => `<button class="${f === x[0] ? "on" : ""}" onclick="STATE.incFilter='${x[0]}';rerender()">${x[1]}</button>`).join("")}
    </div>
    <div class="spacer"></div>
    <button class="btn primary sm" onclick="openNuevaIncidencia()">${ICON.plus} Nueva incidencia</button>
  </div>
  <div class="inc-grid">${list.map(incCardHTML).join("") || `<div class="empty">${ICON.check}Nada por aquí.</div>`}</div>`;
}
function drawerIncidencia(i) {
  const a = i.asignada ? S(i.asignada) : null;
  return `
  <div class="drawer-head"><span class="prio ${i.prio}" style="width:12px;height:12px"></span>
    <div><b style="font-size:15.5px">${esc(i.titulo)}</b><div class="hint">${esc(P(i.propId).nombre)} · ${i.fecha}</div></div>
    <button class="x" onclick="closeDrawer()">${ICON.x}</button></div>
  <div class="drawer-body">
    <p style="font-size:13.5px;margin-bottom:14px">${esc(i.desc)}</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
      <span class="chip ${i.estado === "resuelta" ? "ok" : i.estado === "encurso" ? "blue" : "terra"}"><i class="d"></i>${i.estado === "encurso" ? "En curso" : i.estado[0].toUpperCase() + i.estado.slice(1)}</span>
      <span class="chip line">Prioridad ${i.prio}</span>
      ${i.coste != null ? `<span class="chip gold">${eur0(i.coste)} estimado</span>` : ""}
      ${a ? `<span class="chip sage">${esc(a.nombre)}</span>` : ""}
    </div>
    <div class="photo-drop" style="margin-bottom:16px">${ICON.camera}2 fotos adjuntas por el equipo · toca para ampliar</div>
    <h4 style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:12px">Historial</h4>
    <div class="tl">${i.tl.map(t => `<div class="tl-item"><b>${esc(t.t)}</b><span>${t.h}</span></div>`).join("")}</div>
    <div style="display:flex;gap:8px;margin-top:20px;flex-wrap:wrap;align-items:center">
      ${i.estado !== "resuelta" ? `<button class="btn sm primary" onclick="resolverInc('${i.id}')">${ICON.check} Marcar resuelta</button>
      <span class="hint">La asignación al técnico se gestiona fuera del portal.</span>` : `<span class="chip ok">Cerrada</span>`}
    </div>
  </div>`;
}

/* ============================================================
   LAVANDERÍA (módulo retirado del panel a petición del cliente;
   se conserva la función por si se reactiva)
   ============================================================ */
function viewLavanderia_OFF() {
  const est = { pendiente: ["Pendiente", "line"], enproceso: ["En proceso", "blue"], listo: ["Listo para entrega", "ok"] };
  const cols = ["pendiente", "enproceso", "listo"];
  const colName = { pendiente: "Pendientes", enproceso: "En lavandería", listo: "Listos para salir" };
  const totCirc = LAVANDERIA.renting.reduce((a, r) => a + r.circulando, 0);
  return `
  <div class="kpis" style="margin-bottom:16px">
    <div class="kpi"><div class="lab">${ICON.laundry} Kg junio</div><div class="val">3.390</div><div class="sub"><b class="up">▲ +19%</b> vs mayo</div></div>
    <div class="kpi"><div class="lab">${ICON.route} Pedidos hoy</div><div class="val">${LAVANDERIA.pedidos.filter(p => p.cuando.startsWith("Hoy")).length}</div><div class="sub">2 rutas de reparto</div></div>
    <div class="kpi"><div class="lab">${ICON.grid} Juegos en renting</div><div class="val">${LAVANDERIA.renting.reduce((a, r) => a + r.juegos, 0)}</div><div class="sub">${totCirc} en circulación</div></div>
    <div class="kpi"><div class="lab">${ICON.users} Clientes externos</div><div class="val">3</div><div class="sub">+ 12 propiedades propias</div></div>
  </div>
  <div class="grid" style="grid-template-columns:1.5fr 1fr">
    <div class="card">
      <div class="card-head"><h3>Pedidos y rutas</h3>
        <div class="right"><button class="btn sm primary" onclick="toast('Ruta optimizada','Entregas de las 12:00 ordenadas: Es Molí → Àtic del Port → Es Pins.',ICON.route)">${ICON.route} Optimizar ruta</button></div></div>
      <div class="plan-cols" style="grid-template-columns:1fr 1fr 1fr">
        ${cols.map(cKey => `<div class="plan-col" style="background:#f6f4ec"><h4>${colName[cKey]} <span class="n">${LAVANDERIA.pedidos.filter(p => p.estado === cKey).length}</span></h4>
          ${LAVANDERIA.pedidos.filter(p => p.estado === cKey).map(p => `
            <div class="plan-card">
              <div class="top"><b>${esc(p.cliente)}</b><span class="hr">${p.kg} kg</span></div>
              <div class="meta">${p.tipo} · ${p.cuando} · ${p.id}</div>
              <div class="team"><span class="chip ${est[p.estado][1]}">${est[p.estado][0]}</span>
                <span class="act">${p.estado !== "listo" ? `<button class="btn xs outline" onclick="avanzaPedido('${p.id}')">${ICON.arrow} Avanzar</button>` : `<button class="btn xs primary" onclick="entregaPedido('${p.id}')">${ICON.check} Entregado</button>`}</span></div>
            </div>`).join("") || `<div class="hint" style="padding:8px">—</div>`}
        </div>`).join("")}
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card">
        <div class="card-head"><h3>Renting de ropa · stock</h3><span class="sub">sábanas + toallas, juegos completos</span></div>
        ${LAVANDERIA.renting.map(r => `
          <div style="padding:9px 0;border-top:1px solid var(--line-2)">
            <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px"><b>${esc(r.cliente)}</b><span class="hint">${r.circulando}/${r.juegos} fuera</span></div>
            <div class="bar"><i style="width:${Math.round(r.circulando / r.juegos * 100)}%"></i></div>
          </div>`).join("")}
        <p class="hint" style="margin-top:10px">El renting factura por juego repuesto: cada entrega queda registrada y pasa sola a la factura del mes.</p>
      </div>
      <div class="card">
        <div class="card-head"><h3>Kg procesados</h3></div>
        <div class="chart-box" style="height:170px"><canvas id="chart-kg"></canvas></div>
      </div>
    </div>
  </div>`;
}
function mountLavanderia_OFF() { drawBars("chart-kg", LAVANDERIA.kgMeses, { hi: 5 }); animateCounters(); }

/* ============================================================
   INFORMES
   ============================================================ */
function viewInformes() {
  return `
  <div class="card" style="margin-bottom:16px;display:flex;gap:14px;align-items:center;flex-wrap:wrap">
    <span class="chip gold">${ICON.cal} Periodo</span>
    <select class="select" id="rep-mes"><option>Junio 2026</option><option>Mayo 2026</option><option>Abril 2026</option></select>
    <span class="hint">Los documentos se generan con los datos de fichajes, limpiezas y reservas del periodo. Cada día 1 se envían solos por email.</span>
  </div>
  <div class="report-cards">
    <div class="report-card"><span class="ic">${ICON.users}</span>
      <h4>Horas por empleado</h4>
      <p>Horas trabajadas, extra, limpiezas y partes por cada persona del equipo. Listo para la gestoría y nóminas.</p>
      <button class="btn primary" onclick="genInforme('horas')">${ICON.doc} Generar</button></div>
    <div class="report-card"><span class="ic">${ICON.house}</span>
      <h4>Ocupación por propiedad</h4>
      <p>Noches ocupadas, % de ocupación, limpiezas realizadas, horas de equipo e ingresos gestionados de cada inmueble.</p>
      <button class="btn primary" onclick="genInforme('ocupacion')">${ICON.doc} Generar</button></div>
    <div class="report-card"><span class="ic">${ICON.euro}</span>
      <h4>Liquidaciones a propietarios</h4>
      <p>Resumen económico por propietario: ingresos, servicios prestados y neto a transferir. Uno por dueño, en su idioma.</p>
      <button class="btn primary" onclick="genInforme('liquidaciones')">${ICON.doc} Generar</button></div>
  </div>
  <div class="card" style="margin-top:16px">
    <div class="card-head"><h3>Generados anteriormente</h3></div>
    <div class="tbl-wrap" style="border:none;box-shadow:none"><table class="tbl">
      <thead><tr><th>Documento</th><th>Periodo</th><th>Generado</th><th>Enviado a</th><th></th></tr></thead>
      <tbody>
        <tr><td class="who">${ICON.doc} Horas por empleado</td><td>Mayo 2026</td><td>01/06/2026 · automático</td><td>gestoría</td><td class="num"><button class="btn xs outline" onclick="genInforme('horas',true)">${ICON.eye} Ver</button></td></tr>
        <tr><td class="who">${ICON.doc} Ocupación por propiedad</td><td>Mayo 2026</td><td>01/06/2026 · automático</td><td>dirección</td><td class="num"><button class="btn xs outline" onclick="genInforme('ocupacion',true)">${ICON.eye} Ver</button></td></tr>
        <tr><td class="who">${ICON.doc} Liquidaciones (12)</td><td>Mayo 2026</td><td>01/06/2026 · automático</td><td>12 propietarios</td><td class="num"><button class="btn xs outline" onclick="genInforme('liquidaciones',true)">${ICON.eye} Ver</button></td></tr>
      </tbody></table></div>
  </div>`;
}

/* ---------- constructores de "papel" ---------- */
function paperShell(titulo, sub, inner, sello="Documento de muestra") {
  return `<div class="paper">
    <div class="paper-head">
      <img src="assets/logo-hygge.png" alt="Hygge">
      <div class="t"><h2>${titulo}</h2><p>${sub}</p></div>
      <div class="meta">Hygge Services Mallorca S.L.<br>Costa i Llobera 53 · 07570 Artà<br>info@hyggeservicesmallorca.com</div>
    </div>
    ${inner}
    <div class="sign">
      <div>Generado automáticamente por el Portal Hygge<br>${HOY.texto}</div>
      <div class="stamp">${sello}</div>
    </div>
  </div>`;
}
function paperHoras() {
  const rows = INFORME_JUNIO.horasEmpleados.map(r => { const e = S(r.emp); return `
    <tr><td><b>${esc(e.nombre)}</b></td><td>${e.rol}</td>
    <td class="num">${r.horas} h</td><td class="num">${r.extra ? r.extra + " h" : "—"}</td>
    <td class="num">${r.limpiezas ?? "—"}</td><td class="num">${r.partes ?? "—"}</td></tr>`; }).join("");
  const tot = INFORME_JUNIO.horasEmpleados.reduce((a, r) => a + r.horas, 0);
  const totE = INFORME_JUNIO.horasEmpleados.reduce((a, r) => a + r.extra, 0);
  return paperShell("Informe de horas por empleado", "Junio 2026 · registro de jornada art. 34.9 ET",
    `<table><thead><tr><th>Empleado</th><th>Puesto</th><th class="num">Horas</th><th class="num">Extra</th><th class="num">Limpiezas</th><th class="num">Partes</th></tr></thead>
    <tbody>${rows}<tr class="total"><td colspan="2">Total equipo (12 personas)</td><td class="num">${tot.toLocaleString("es-ES")} h</td><td class="num">${totE} h</td><td class="num">${INFORME_JUNIO.horasEmpleados.reduce((a, r) => a + (r.limpiezas || 0), 0)}</td><td class="num">${INFORME_JUNIO.horasEmpleados.reduce((a, r) => a + (r.partes || 0), 0)}</td></tr></tbody></table>
    <p style="font-size:11.5px;color:var(--muted)">Fuente: fichajes con geolocalización del equipo. Las horas extra se compensan según convenio. Este informe se envía automáticamente a la gestoría el día 1 de cada mes.</p>`);
}
function paperOcupacion() {
  const rows = INFORME_JUNIO.ocupacionProps.map(r => { const p = P(r.propId); return `
    <tr><td><b>${esc(p.nombre)}</b></td><td>${esc(p.zona)}</td>
    <td class="num">${r.noches}</td><td class="num">${r.ocup}%</td><td class="num">${r.limpiezas}</td><td class="num">${r.horasLimp} h</td><td class="num">${eur(r.ingresos)}</td></tr>`; }).join("");
  const tN = INFORME_JUNIO.ocupacionProps.reduce((a, r) => a + r.noches, 0);
  const tI = INFORME_JUNIO.ocupacionProps.reduce((a, r) => a + r.ingresos, 0);
  const tH = INFORME_JUNIO.ocupacionProps.reduce((a, r) => a + r.horasLimp, 0);
  return paperShell("Informe de ocupación por propiedad", "Junio 2026 · 12 inmuebles en gestión",
    `<table><thead><tr><th>Propiedad</th><th>Zona</th><th class="num">Noches</th><th class="num">Ocup.</th><th class="num">Limpiezas</th><th class="num">Horas equipo</th><th class="num">Ingresos</th></tr></thead>
    <tbody>${rows}<tr class="total"><td colspan="2">Total cartera</td><td class="num">${tN}</td><td class="num">82%</td><td class="num">${INFORME_JUNIO.ocupacionProps.reduce((a, r) => a + r.limpiezas, 0)}</td><td class="num">${tH} h</td><td class="num">${eur(tI)}</td></tr></tbody></table>
    <p style="font-size:11.5px;color:var(--muted)">Noches según calendarios sincronizados (Airbnb, Booking, Vrbo). Ingresos gestionados brutos antes de honorarios.</p>`);
}
function paperLiquidaciones() {
  const rows = OWNERS.map(o => `<tr><td><b>${esc(o.nombre)}</b> <span style="color:var(--muted)">· ${o.pais}</span></td>
    <td>${o.props.map(p => esc(P(p).nombre)).join(", ")}</td>
    <td class="num">${eur(o.liq)}</td><td>${o.estado === "enviada" ? "Enviada ✓" : "Pendiente"}</td></tr>`).join("");
  return paperShell("Liquidaciones a propietarios", "Junio 2026 · neto a transferir tras servicios",
    `<table><thead><tr><th>Propietario</th><th>Propiedad</th><th class="num">Neto</th><th>Estado</th></tr></thead>
    <tbody>${rows}<tr class="total"><td colspan="2">Total transferido</td><td class="num">${eur(OWNERS.reduce((a, o) => a + o.liq, 0))}</td><td></td></tr></tbody></table>
    <p style="font-size:11.5px;color:var(--muted)">Cada propietario recibe su liquidación individual con el detalle de reservas, limpiezas, lavandería e incidencias del mes, en español, inglés o alemán.</p>`);
}
function paperLiquidacionProp(p) {
  const o = OWNERS.find(o => o.props.includes(p.id));
  const oc = INFORME_JUNIO.ocupacionProps.find(x => x.propId === p.id);
  return paperShell("Liquidación mensual · " + esc(p.nombre), "Junio 2026 · " + esc(o.nombre),
    `<table><thead><tr><th>Concepto</th><th class="num">Importe</th></tr></thead><tbody>
      <tr><td>Ingresos por reservas (${oc.noches} noches, ${oc.ocup}% ocupación)</td><td class="num">${eur(oc.ingresos)}</td></tr>
      <tr><td>Limpiezas check-out (${oc.limpiezas}) y lavandería renting</td><td class="num">−${eur(oc.limpiezas * 62)}</td></tr>
      <tr><td>Mantenimiento e incidencias del mes</td><td class="num">−${eur(87)}</td></tr>
      <tr><td>Honorarios de gestión Hygge</td><td class="num">−${eur(oc.ingresos * .18)}</td></tr>
      <tr class="total"><td>Neto transferido a ${esc(o.nombre)}</td><td class="num">${eur(o.liq)}</td></tr>
    </tbody></table>
    <p style="font-size:11.5px;color:var(--muted)">Transferencia emitida el 03/07/2026. Detalle de cada reserva y fotos de las limpiezas disponibles en el portal del propietario.</p>`);
}
function paperContrato(p) {
  return paperShell("Contrato de gestión integral", esc(p.nombre) + " · vigencia 2026",
    `<p style="margin-bottom:10px">Entre <b>Hygge Services Mallorca S.L.</b> y <b>${esc(p.dueno)}</b>, propietario del inmueble
    <b>${esc(p.nombre)}</b> (${esc(p.zona)}, licencia ${p.licencia}), se acuerda la gestión integral que incluye:</p>
    <table><tbody>
      <tr><td>Gestión de anuncios y reservas</td><td>Airbnb · Booking · Vrbo (calendarios sincronizados)</td></tr>
      <tr><td>Limpieza y lavandería</td><td>Tras cada salida · renting de ropa incluido</td></tr>
      <tr><td>Consigna de llaves</td><td>Llavero ${p.llave} · oficina de Artà</td></tr>
      <tr><td>Mantenimiento</td><td>Piscina/jardín ${p.piscina ? "incluido" : "no aplica"} · incidencias 24 h</td></tr>
      <tr><td>Liquidación</td><td>Mensual, con informe de ocupación y factura</td></tr>
    </tbody></table>
    <p style="font-size:11.5px;color:var(--muted)">Documento de muestra sin valor contractual, generado para la demo del portal.</p>`, "Muestra · sin valor legal");
}
function paperInventario(p) {
  return paperShell("Inventario y dotación", esc(p.nombre) + " · revisión mayo 2026",
    `<table><thead><tr><th>Elemento</th><th class="num">Unidades</th><th>Estado</th></tr></thead><tbody>
      <tr><td>Juegos de cama completos (renting)</td><td class="num">${p.ropa.juegos}</td><td>Correcto</td></tr>
      <tr><td>Juegos de toallas (renting)</td><td class="num">${p.ropa.juegos + 2}</td><td>Correcto</td></tr>
      <tr><td>Vajilla y menaje</td><td class="num">${p.plazas} servicios</td><td>2 vasos repuestos en mayo</td></tr>
      <tr><td>Kit de bienvenida Hygge</td><td class="num">1</td><td>Se repone en cada entrada</td></tr>
      <tr><td>Extintor y botiquín</td><td class="num">1 + 1</td><td>Revisión 03/2026</td></tr>
    </tbody></table>`);
}
function paperLicencia(p) {
  return paperShell("Licencia de estancia turística", p.licencia + " · " + esc(p.nombre),
    `<p>Inscripción <b>${p.licencia}</b> en el registro de estancias turísticas de las Illes Balears para el inmueble
    <b>${esc(p.nombre)}</b>, ${esc(p.zona)}, con capacidad de <b>${p.plazas} plazas</b>.</p>
    <p style="margin-top:8px">Modalidad: estancia turística en vivienda. Titular: ${esc(p.dueno)}. Gestora: Hygge Services Mallorca S.L.</p>
    <p style="font-size:11.5px;color:var(--muted);margin-top:10px">Réplica informativa para la demo; el documento oficial queda archivado en el expediente.</p>`, "Muestra");
}
function paperFichajes() {
  const rows = FICHAJES.map(f => { const e = S(f.emp); return `<tr><td><b>${esc(e.nombre)}</b></td><td>${e.rol}</td><td class="num">${f.entrada}</td><td>${esc(f.lugar)}</td><td class="num">${f.salida || "en curso"}</td></tr>`; }).join("");
  return paperShell("Registro de jornada", HOY.texto + " · RD-ley 8/2019",
    `<table><thead><tr><th>Empleado</th><th>Puesto</th><th class="num">Entrada</th><th>Lugar</th><th class="num">Salida</th></tr></thead><tbody>${rows}</tbody></table>
    <p style="font-size:11.5px;color:var(--muted)">Registro inalterable con sello de tiempo y ubicación. Conservación: 4 años.</p>`);
}

/* ============================================================
   FACTURACIÓN
   ============================================================ */
function viewFacturacion() {
  const f = STATE.factFilter || "todas";
  const list = FACTURAS.filter(x => f === "todas" || (f === "prop" ? x.tipo === "Propietario" : x.tipo !== "Propietario"));
  const tot = e => FACTURAS.filter(x => x.estado === e).reduce((a, x) => a + x.base * 1.21, 0);
  const stChip = { cobrada: '<span class="chip ok">Cobrada</span>', emitida: '<span class="chip gold"><i class="d"></i>Emitida</span>', vencida: '<span class="chip terra"><i class="d"></i>Vencida</span>', borrador: '<span class="chip gray">Borrador</span>' };
  return `
  <div class="kpis" style="margin-bottom:16px">
    <div class="kpi"><div class="lab">${ICON.invoice} Emitidas julio</div><div class="val">${FACTURAS.length}</div><div class="sub">${eur0(FACTURAS.reduce((a, x) => a + x.base * 1.21, 0))} con IVA</div></div>
    <div class="kpi"><div class="lab">${ICON.check} Cobradas</div><div class="val">${FACTURAS.filter(x => x.estado === "cobrada").length}</div><div class="sub">${eur0(tot("cobrada"))}</div></div>
    <div class="kpi"><div class="lab">${ICON.clock} Pendientes</div><div class="val">${FACTURAS.filter(x => ["emitida", "borrador"].includes(x.estado)).length}</div><div class="sub">${eur0(tot("emitida") + tot("borrador"))}</div></div>
    <div class="kpi"><div class="lab">${ICON.alert} Vencidas</div><div class="val">${FACTURAS.filter(x => x.estado === "vencida").length}</div><div class="sub">${eur0(tot("vencida"))} · recordatorio enviado</div></div>
  </div>
  <div class="toolbar">
    <div class="seg">
      ${[["todas", "Todas"], ["prop", "Propietarios"], ["lav", "Lavandería y hoteles"]].map(x => `<button class="${f === x[0] ? "on" : ""}" onclick="STATE.factFilter='${x[0]}';rerender()">${x[1]}</button>`).join("")}
    </div>
    <span class="verifactu">${ICON.shield} VeriFactu · AEAT conectado</span>
    <div class="spacer"></div>
    <button class="btn sm outline" onclick="toast('Recordatorios enviados','Se avisó por email de la factura vencida de Restaurant Es Port.',ICON.send)">${ICON.send} Reclamar vencidas</button>
    <button class="btn sm primary" onclick="genFacturasMes()">${ICON.plus} Generar facturas del mes</button>
  </div>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Nº</th><th>Cliente</th><th>Concepto</th><th>Fecha</th><th class="num">Base</th><th class="num">Total (21%)</th><th>Estado</th><th></th></tr></thead>
    <tbody>${list.map(x => `
      <tr><td class="fact-num">${x.num}</td><td><b>${esc(x.cliente)}</b></td><td>${esc(x.concepto)}</td><td>${x.fecha}</td>
      <td class="num">${eur(x.base)}</td><td class="num"><b>${eur(x.base * 1.21)}</b></td>
      <td>${stChip[x.estado]}</td>
      <td class="num" style="white-space:nowrap">
        <button class="btn xs outline" onclick="openFactura('${x.num}')">${ICON.eye} Ver</button>
        ${x.estado === "emitida" || x.estado === "vencida" ? `<button class="btn xs primary" onclick="cobrarFactura('${x.num}')">${ICON.check} Cobrada</button>` : ""}
        ${x.estado === "borrador" ? `<button class="btn xs sage" onclick="emitirFactura('${x.num}')">${ICON.send} Emitir</button>` : ""}
      </td></tr>`).join("")}
    </tbody></table></div>
  <p class="hint" style="margin-top:12px">Cada factura queda encadenada y con huella VeriFactu: numeración inviolable lista para la AEAT (obligatorio desde 2026).</p>`;
}
function paperFactura(x) {
  const lineas = x.tipo === "Propietario"
    ? [["Gestión integral mensual", x.base * .4], ["Limpiezas de salida y puesta a punto", x.base * .45], ["Lavandería · renting de ropa", x.base * .15]]
    : [["Servicio de lavandería industrial", x.base * .8], ["Recogida y entrega programada", x.base * .2]];
  const rows = lineas.map(l => `<tr><td>${l[0]}</td><td class="num">${eur(l[1])}</td></tr>`).join("");
  return `<div class="paper">
    <div class="paper-head">
      <img src="assets/logo-hygge.png" alt="Hygge">
      <div class="t"><h2>Factura ${x.num}</h2><p>Fecha ${x.fecha} · vencimiento 30 días</p></div>
      <div class="meta"><b>Hygge Services Mallorca S.L.</b><br>CIF B-16.543.210 (muestra)<br>Costa i Llobera 53 · 07570 Artà<br>info@hyggeservicesmallorca.com</div>
    </div>
    <p style="font-size:12.5px;margin-bottom:4px;color:var(--muted)">Facturar a</p>
    <p style="font-weight:700;margin-bottom:14px">${esc(x.cliente)}</p>
    <table><thead><tr><th>Concepto · ${esc(x.concepto)}</th><th class="num">Importe</th></tr></thead>
    <tbody>${rows}
      <tr><td class="num" style="text-align:right">Base imponible</td><td class="num">${eur(x.base)}</td></tr>
      <tr><td class="num" style="text-align:right">IVA 21 %</td><td class="num">${eur(x.base * .21)}</td></tr>
      <tr class="total"><td class="num" style="text-align:right">Total</td><td class="num">${eur(x.base * 1.21)}</td></tr>
    </tbody></table>
    <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;margin-top:8px">
      <div class="qr"></div>
      <div style="font-size:11.5px;color:var(--muted)">
        <span class="verifactu">${ICON.shield} Factura verificable · VeriFactu (AEAT)</span><br><br>
        Pago por transferencia · IBAN ES00 0000 0000 0000 (muestra)<br>Referencia: ${x.num}
      </div>
    </div>
    <div class="sign"><div>Emitida automáticamente por el Portal Hygge el día 1 del mes</div><div class="stamp">Demo</div></div>
  </div>`;
}

/* ============================================================
   PROPIETARIOS
   ============================================================ */
function viewPropietarios() {
  return `
  <div class="card" style="margin-bottom:16px;display:flex;gap:16px;align-items:center;flex-wrap:wrap;background:linear-gradient(120deg,#fff,#f7f1e2)">
    <span style="width:46px;height:46px;border-radius:14px;background:var(--gold-soft);color:var(--gold-deep);display:flex;align-items:center;justify-content:center">${ICON.users}</span>
    <div style="flex:1;min-width:220px"><b style="font-size:15px">Portal del propietario</b>
      <div class="hint">Cada dueño entra con su clave y ve su casa: calendario, liquidaciones, fotos de las limpiezas e incidencias. Menos llamadas, más confianza.</div></div>
    <button class="btn primary sm" onclick="openVistaOwner()">${ICON.eye} Ver como propietario</button>
  </div>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Propietario</th><th>Propiedad</th><th class="num">Liquidación junio</th><th>Estado</th><th></th></tr></thead>
    <tbody>${OWNERS.map(o => `
      <tr><td><b>${esc(o.nombre)}</b> <span style="color:var(--muted)">· ${o.pais}</span></td>
      <td>${o.props.map(p => esc(P(p).nombre)).join(", ")}</td>
      <td class="num"><b>${eur(o.liq)}</b></td>
      <td>${o.estado === "enviada" ? '<span class="chip ok">Enviada</span>' : '<span class="chip gold"><i class="d"></i>Pendiente</span>'}</td>
      <td class="num" style="white-space:nowrap">
        <button class="btn xs outline" onclick="openPaper('liquidacion','${o.props[0]}')">${ICON.eye} Liquidación</button>
        <button class="btn xs outline" onclick="toast('Liquidación reenviada','${esc(o.nombre)} la recibirá en su idioma.',ICON.send)">${ICON.send} Enviar</button>
      </td></tr>`).join("")}
    </tbody></table></div>`;
}
function vistaOwnerHTML() {
  const p = P("esmoli"), oc = INFORME_JUNIO.ocupacionProps.find(o => o.propId === "esmoli");
  return `
  <div style="border-radius:16px;overflow:hidden;border:1px solid var(--line);margin-bottom:16px">
    <div style="position:relative;aspect-ratio:16/6;overflow:hidden">
      <img src="${p.foto}" style="width:100%;height:100%;object-fit:cover" alt="">
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(24,27,21,.72))"></div>
      <div style="position:absolute;left:16px;bottom:12px;color:#fff"><b style="font-size:17px">Villa Es Molí</b><div style="font-size:12px;opacity:.85">Vista del propietario · Familia Jensen</div></div>
    </div>
    <div style="padding:16px">
      <div class="facts" style="grid-template-columns:repeat(4,1fr)">
        <div class="fact"><div class="k">Ocupación junio</div><div class="v">${oc.ocup}%</div></div>
        <div class="fact"><div class="k">Ingresos junio</div><div class="v">${eur0(oc.ingresos)}</div></div>
        <div class="fact"><div class="k">Neto recibido</div><div class="v">${eur0(OWNERS[0].liq)}</div></div>
        <div class="fact"><div class="k">Próxima entrada</div><div class="v">Hoy 16:00</div></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">
        <span class="chip ok">${ICON.check} Limpieza de hoy con 8 fotos</span>
        <span class="chip sage">Liquidación junio descargable</span>
        <span class="chip line">Idioma: dansk / english</span>
      </div>
    </div>
  </div>
  <p class="hint">Así vería su casa la familia Jensen desde Copenhague. Un extra que ninguna gestora pequeña de la zona ofrece hoy.</p>`;
}

/* ============================================================
   AJUSTES
   ============================================================ */
function viewAjustes() {
  const togg = (on, txt, sub) => `
    <div class="set-row"><div class="tx"><b>${txt}</b><span>${sub}</span></div>
    <div class="end"><button class="toggle ${on ? "on" : ""}" onclick="this.classList.toggle('on');toast('Ajuste guardado','${txt}',ICON.check,'ok')"></button></div></div>`;
  return `
  <div class="grid" style="grid-template-columns:1fr 1fr">
    <div class="card"><div class="card-head"><h3>Datos de la empresa</h3></div>
      <div class="facts" style="grid-template-columns:1fr">
        <div class="fact"><div class="k">Razón social</div><div class="v">Hygge Services Mallorca S.L.</div></div>
        <div class="fact"><div class="k">Dirección</div><div class="v">Costa i Llobera 53, Artà · Illes Balears 07570</div></div>
        <div class="fact"><div class="k">Contacto</div><div class="v">+34 655 958 897 · info@hyggeservicesmallorca.com</div></div>
        <div class="fact"><div class="k">Instagram</div><div class="v">@hygge_services</div></div>
      </div></div>
    <div class="card"><div class="card-head"><h3>Integraciones</h3><span class="sub">se activan en la versión final</span></div>
      ${togg(true, "Airbnb · calendario iCal", "reservas y bloqueos en tiempo real")}
      ${togg(true, "Booking.com · calendario iCal", "sincronizado cada 15 minutos")}
      ${togg(false, "Vrbo · calendario iCal", "pendiente de conectar")}
      ${togg(true, "VeriFactu (AEAT)", "facturas encadenadas y verificables")}
      ${togg(true, "Avisos WhatsApp a propietarios", "check-ins, incidencias y liquidaciones")}
      ${togg(false, "Exportación a gestoría (A3/Contasol)", "nóminas y contabilidad")}
    </div>
    <div class="card"><div class="card-head"><h3>Checklist de limpieza Hygge</h3><span class="sub">plantilla que sigue el equipo en cada servicio</span></div>
      <div id="chk-admin">${CHECKLIST_BASE.map((c, i) => `
        <div class="set-row"><div class="tx"><b>${i + 1}. ${c}</b></div>
        <div class="end"><button class="btn xs outline" onclick="this.closest('.set-row').remove();toast('Paso eliminado de la plantilla','',ICON.check)">${ICON.x}</button></div></div>`).join("")}
      </div>
      <div style="display:flex;gap:8px;margin-top:12px">
        <input class="input" id="chk-new" placeholder="Añadir paso…" style="flex:1">
        <button class="btn sm sage" onclick="addChecklistStep()">${ICON.plus} Añadir</button>
      </div></div>
    <div class="card"><div class="card-head"><h3>Usuarios y accesos</h3></div>
      <div class="set-row"><div class="tx"><b>Dirección</b><span>acceso total · 2 cuentas</span></div><div class="end"><span class="chip sage">Administrador</span></div></div>
      <div class="set-row"><div class="tx"><b>Laura Bauzá</b><span>coordinación · planifica y asigna</span></div><div class="end"><span class="chip gold">Coordinación</span></div></div>
      <div class="set-row"><div class="tx"><b>App del equipo</b><span>11 personas · fichaje, tareas e incidencias</span></div><div class="end"><span class="chip ok">Equipo</span></div></div>
      <div class="set-row"><div class="tx"><b>Propietarios</b><span>12 cuentas de solo lectura de su casa</span></div><div class="end"><span class="chip lilac">Invitados</span></div></div>
    </div>
  </div>`;
}

/* ============================================================
   VISTA EMPLEADO (Cati)
   ============================================================ */
function viewMiDia() {
  const e = S(EMP_DEMO);
  const misTareas = PLAN.limpiezas.filter(t => t.equipo.includes(EMP_DEMO));
  const stIc = { hecha: ["ok", ICON.check], encurso: ["gold", ICON.broom], pendiente: ["gray", ICON.clock] };
  return `
  <div class="emp-hero">
    <div><div class="hi">Hola, ${e.nombre.split(" ")[0]} ☀️</div>
      <div class="sub">${HOY.texto} · fichaste a las <b style="color:#f2d999">${e.fichaje}</b> en Oficina Artà</div>
      <div style="margin-top:16px"><button class="fichar-btn ${STATE.fichada ? "" : "out"}" onclick="toggleFichaje()">${ICON.clock} ${STATE.fichada ? "Fichar salida" : "Fichar entrada"}</button></div>
    </div>
    <div class="timer"><div class="l">Jornada de hoy</div><div class="t" id="emp-timer">2 h 44 min</div></div>
  </div>
  <div class="grid" style="grid-template-columns:1.5fr 1fr">
    <div>
      <div class="card-head" style="margin:4px 0 12px"><h3>Mis servicios de hoy · ${misTareas.length}</h3></div>
      ${misTareas.map(t => { const p = P(t.propId); const [cl, ic] = stIc[t.estado]; return `
        <div class="task-card ${t.estado === "hecha" ? "done" : ""}">
          <span class="ic" style="background:var(--${cl}-soft);color:var(--${cl === "gold" ? "gold-deep" : cl === "gray" ? "muted" : cl})">${ic}</span>
          <div class="tx"><b>${esc(p.nombre)}</b><span>${t.ini}–${t.fin} · ${esc(t.tipo)} · llaves ${p.llave}</span></div>
          <div class="act">
            ${t.estado === "encurso" ? `
              <button class="btn sm outline" onclick="openChecklist('${t.id}')">${ICON.check} Checklist <span id="chk-count">(${STATE.chk.filter(Boolean).length}/8)</span></button>
              <button class="btn sm primary" id="btn-fin" ${STATE.chk.every(Boolean) ? "" : "disabled"} onclick="finalizarLimpieza('${t.id}')">${ICON.check} Finalizar</button>` : ""}
            ${t.estado === "pendiente" ? `<span class="chip line">Empieza a las ${t.ini}</span>` : ""}
            ${t.estado === "hecha" ? `<span class="chip ok">Hecha · checklist 100%</span>` : ""}
          </div>
        </div>`; }).join("")}
      <div class="task-card" style="border-style:dashed">
        <span class="ic" style="background:var(--terra-soft);color:var(--terra)">${ICON.alert}</span>
        <div class="tx"><b>¿Ha pasado algo en el inmueble?</b><span>Rotura, avería, falta algo… avisa con foto y llega al momento a la oficina.</span></div>
        <div class="act"><button class="btn sm danger" onclick="openNuevaIncidencia(true)">${ICON.camera} Reportar incidencia</button></div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card"><div class="card-head"><h3>Mi semana</h3></div>
        <div class="chart-box" style="height:150px"><canvas id="chart-emp"></canvas></div>
        <p class="hint" style="margin-top:8px">${e.horasSemana} h esta semana · contrato ${e.contrato} h</p></div>
      <div class="card"><div class="card-head"><h3>Mis próximos días</h3></div>
        <div class="tl">
          <div class="tl-item"><b>Martes 14 · 3 servicios</b><span>Na Blanca, S'Alzina, Es Molí (repaso)</span></div>
          <div class="tl-item"><b>Miércoles 15 · 2 servicios</b><span>turno de tarde</span></div>
          <div class="tl-item gold"><b>Jueves 16 · descanso</b><span>día libre</span></div>
        </div></div>
    </div>
  </div>`;
}
function mountMiDia() {
  drawBars("chart-emp", [["L", 8], ["M", 6.5], ["X", 0], ["J", 0], ["V", 0], ["S", 0], ["D", 0]], { hi: 0 });
  startEmpTimer();
}
function viewMisHoras() {
  const e = S(EMP_DEMO);
  const rows = [
    ["Hoy", "07:58", "en curso", "—", "2 h 44 min (en curso)"],
    ["Viernes 10", "07:55", "16:10", "13:30–14:00", "7 h 45 min"],
    ["Jueves 9", "08:00", "16:30", "13:30–14:00", "8 h 00 min"],
    ["Miércoles 8", "07:58", "15:58", "13:30–14:00", "7 h 30 min"],
    ["Martes 7", "08:02", "16:35", "13:30–14:00", "8 h 03 min"],
  ];
  return `
  <div class="kpis" style="margin-bottom:16px">
    <div class="kpi"><div class="lab">${ICON.clock} Esta semana</div><div class="val">${e.horasSemana}<small>h</small></div><div class="sub">contrato: ${e.contrato} h/semana</div></div>
    <div class="kpi"><div class="lab">${ICON.cal} Julio (a día 13)</div><div class="val">${e.horasMes}<small>h</small></div><div class="sub">0 h extra</div></div>
    <div class="kpi"><div class="lab">${ICON.broom} Limpiezas julio</div><div class="val">${e.limpiezasMes}</div><div class="sub">★ ${e.valoracion} valoración media</div></div>
    <div class="kpi"><div class="lab">${ICON.sun} Vacaciones</div><div class="val">${e.vacaciones}<small> días</small></div><div class="sub">disponibles este año · se gestionan con la oficina</div></div>
  </div>
  <div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>Día</th><th>Entrada</th><th>Salida</th><th>Pausas</th><th class="num">Total</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td class="num"><b>${r[4]}</b></td></tr>`).join("")}</tbody>
  </table></div>
  <p class="hint" style="margin-top:12px">Tus fichajes quedan guardados 4 años y puedes pedir corrección si un día se te olvidó fichar.</p>`;
}
function viewMisVacaciones_OFF() {
  const e = S(EMP_DEMO);
  return `
  <div class="kpis" style="margin-bottom:16px">
    <div class="kpi"><div class="lab">${ICON.sun} Días disponibles</div><div class="val">${e.vacaciones}</div><div class="sub">de 30 al año</div></div>
    <div class="kpi"><div class="lab">${ICON.check} Disfrutados</div><div class="val">${30 - e.vacaciones - 5}</div><div class="sub">Semana Santa + puentes</div></div>
    <div class="kpi"><div class="lab">${ICON.cal} Solicitados</div><div class="val">5</div><div class="sub" id="vac-estado">24–28 agosto · aprobados</div></div>
  </div>
  <div class="grid" style="grid-template-columns:1fr 1fr">
    <div class="card"><div class="card-head"><h3>Pedir vacaciones</h3></div>
      <div class="form-grid">
        <div class="f-field"><label>Desde</label><input type="date" id="vac-desde" value="2026-09-14"></div>
        <div class="f-field"><label>Hasta</label><input type="date" id="vac-hasta" value="2026-09-18"></div>
        <div class="f-field full"><label>Comentario</label><input id="vac-nota" placeholder="Opcional"></div>
      </div>
      <div style="margin-top:14px"><button class="btn primary" onclick="pedirVacaciones()">${ICON.send} Enviar solicitud</button></div>
    </div>
    <div class="card"><div class="card-head"><h3>Mis solicitudes</h3></div>
      <div id="vac-list">
        <div class="set-row"><div class="tx"><b>24–28 agosto 2026</b><span>5 días · verano</span></div><div class="end"><span class="chip ok">Aprobada</span></div></div>
        <div class="set-row"><div class="tx"><b>30 mar – 3 abr 2026</b><span>5 días · Semana Santa</span></div><div class="end"><span class="chip ok">Disfrutada</span></div></div>
      </div>
    </div>
  </div>`;
}
function viewMisIncidencias() {
  const mias = INCIDENCIAS.filter(i => i.por === EMP_DEMO);
  return `
  <div class="toolbar"><span class="hint">Incidencias que has reportado tú. La oficina las ve al instante.</span>
    <div class="spacer"></div>
    <button class="btn primary sm" onclick="openNuevaIncidencia(true)">${ICON.camera} Reportar incidencia</button></div>
  <div class="inc-grid">${mias.map(incCardHTML).join("") || `<div class="empty">${ICON.check}No has reportado ninguna incidencia.</div>`}</div>`;
}

/* ============================================================
   REGISTRO DE VISTAS
   ============================================================ */
const VIEWS = {
  dashboard:    { t: "Inicio",           c: "Resumen del día",                    r: viewDashboard,    m: () => mountDashboard() },
  propiedades:  { t: "Propiedades",      c: "12 inmuebles en gestión",            r: viewProps,        m: () => animateCounters() },
  propdetail:   { t: "Propiedad",        c: "Ficha completa",                     r: viewPropDetail,   m: () => mountPropDetail() },
  equipo:       { t: "Equipo en vivo",   c: "Dónde está cada persona ahora",      r: viewEquipo,       m: () => animateCounters() },
  plan:         { t: "Planificación",    c: "Check-outs → limpiezas → check-ins", r: viewPlan,         m: () => {} },
  fichajes:     { t: "Fichajes",         c: "Registro de jornada del equipo",     r: viewFichajes,     m: () => animateCounters() },
  incidencias:  { t: "Incidencias",      c: "Averías y avisos del equipo",        r: viewIncidencias,  m: () => animateCounters() },
  informes:     { t: "Informes",         c: "Documentos mensuales automáticos",   r: viewInformes,     m: () => {} },
  facturacion:  { t: "Facturación",      c: "Facturas automáticas y cobros",      r: viewFacturacion,  m: () => animateCounters() },
  propietarios: { t: "Propietarios",     c: "Liquidaciones y portal del dueño",   r: viewPropietarios, m: () => {} },
  ajustes:      { t: "Ajustes",          c: "Empresa, integraciones y accesos",   r: viewAjustes,      m: () => {} },
  /* empleado */
  midia:        { t: "Mi día",           c: "Tareas, fichaje e incidencias",      r: viewMiDia,        m: () => mountMiDia() },
  mishoras:     { t: "Mis horas",        c: "Fichajes, jornada y vacaciones",     r: viewMisHoras,     m: () => animateCounters() },
  misincidencias:{ t: "Incidencias",     c: "Las que has reportado tú",           r: viewMisIncidencias,m: () => {} },
};

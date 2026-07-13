/* ============================================================
   MODO DEMO · Portal Hygge Services Mallorca
   Misma app que el producto real, con la capa de datos
   sustituida por datos de ejemplo en memoria (sin backend).
   Este archivo se carga el ÚLTIMO y sobreescribe las funciones
   de js/db.js y las pocas llamadas directas de js/app.js.
   ============================================================ */

HYGGE_CONFIG.SUPABASE_URL = "https://demo.hyggeservicesmallorca.com";

/* ---------- stub de cliente (por si algo llama a DB.sb directo) ---------- */
function _sbStub() {
  const chain = new Proxy(function () {}, {
    get(_, prop) {
      if (prop === "then") return (res) => res({ data: null, error: null });
      return (..._args) => chain;
    },
    apply() { return chain; },
  });
  return { from: () => chain, rpc: async () => ({ data: null, error: null }),
    auth: { signOut: async () => ({}), getSession: async () => ({ data: { session: null } }) },
    storage: { from: () => ({ upload: async () => ({}), createSignedUrl: async () => ({ data: null }), list: async () => ({ data: [] }), remove: async () => ({}) }) } };
}

/* ---------- utilidades de la semilla ---------- */
const HOY_D = hoyISO();
let _seq = 1000;
const nid = () => ++_seq;
const ts = (fechaISO, hhmm) => new Date(fechaISO + "T" + hhmm + ":00").toISOString();
function ultimosLunes(n) {
  const out = []; let d = hoyISO();
  while (out.length < n) { d = addDias(d, -1); if (new Date(d + "T12:00").getDay() === 1) out.push(d); }
  return out;
}

/* ============================================================
   DATOS DE EJEMPLO
   ============================================================ */
function demoSeed() {
  DB.ready = true; DB.cargado = true; DB.sb = _sbStub();
  DB.fotoUrls = {}; DB.pendientes = [];

  DB.ajustes = {
    empresa: { nombre: "Hygge Services Mallorca S.L.", cif: "B-16.543.210 (muestra)", direccion: "Costa i Llobera 53, Artà · Illes Balears 07570", telefono: "+34 655 958 897", email: "info@hyggeservicesmallorca.com", iban: "ES00 0000 0000 0000 (muestra)" },
    checklist_base: ["Ventilar y revisar desperfectos (fotos si hay daños)", "Retirar ropa usada y contar juegos para lavandería", "Cocina: electrodomésticos, vajilla y superficies", "Baños: sanitarios, mampara, espejos y reposición", "Dormitorios: hacer camas con juego limpio", "Suelos de toda la vivienda y terrazas", "Reponer kit de bienvenida", "Foto final de cada estancia"],
    servicios_catalogo: ["Alquiler vacacional", "Consigna de llaves", "Limpieza", "Mantenimiento de piscina", "Mantenimiento de jardín"],
    factura_serie: { prefijo: "HSM", n: 6 },
    fichaje: { foto_obligatoria: true },
    tarifas: { iva: 21 },
  };

  DB.owners = [
    { id: 1, nombre: "Familia Jensen", pais: "Dinamarca", email: "jensen@ejemplo.dk", idioma: "da", codigo_acceso: null },
    { id: 2, nombre: "Sra. Larsen", pais: "Dinamarca", email: "larsen@ejemplo.dk", idioma: "da", codigo_acceso: "ow2b41ce" },
    { id: 3, nombre: "Familia Müller", pais: "Alemania", email: "mueller@ejemplo.de", idioma: "de", codigo_acceso: "ow93d1af" },
    { id: 4, nombre: "Sr. Andersson", pais: "Suecia", email: "andersson@ejemplo.se", idioma: "sv", codigo_acceso: null },
    { id: 5, nombre: "Familia Schmidt", pais: "Alemania", email: "schmidt@ejemplo.de", idioma: "de", codigo_acceso: "ow5cc0e2" },
    { id: 6, nombre: "Sr. y Sra. Nielsen", pais: "Dinamarca", email: "nielsen@ejemplo.dk", idioma: "da", codigo_acceso: "ow71b9d4" },
    { id: 7, nombre: "Sra. Fischer", pais: "Alemania", email: "fischer@ejemplo.de", idioma: "de", codigo_acceso: "owe28c55" },
    { id: 8, nombre: "Familia Berg", pais: "Noruega", email: "berg@ejemplo.no", idioma: "en", codigo_acceso: "ow40a7f8" },
  ];

  const AV = "Alquiler vacacional", LI = "Limpieza", CO = "Consigna de llaves", PI = "Mantenimiento de piscina", JA = "Mantenimiento de jardín";
  DB.props = [
    { id: 1, nombre: "Villa Es Molí", zona: "Artà", tipo: "Villa con piscina", propietario_id: 1, licencia: "ETV/2314", habs: 4, banos: 3, plazas: 8, piscina: true, llave: "L-04", canales: ["Airbnb", "Booking"], servicios: [AV, LI, PI, CO], foto_path: "assets/prop-bedroom.jpg", tarifa_gestion: 350, tarifa_limpieza: 65, dotacion_ropa: 10, activa: true, lat: 39.6989, lng: 3.3702 },
    { id: 2, nombre: "Finca Na Blanca", zona: "Colònia de Sant Pere", tipo: "Finca rústica", propietario_id: 2, licencia: "ETV/1187", habs: 3, banos: 2, plazas: 6, piscina: true, llave: "L-11", canales: ["Airbnb"], servicios: [AV, LI, JA], foto_path: "assets/prop-window.jpg", tarifa_gestion: 290, tarifa_limpieza: 55, dotacion_ropa: 8, activa: true, lat: 39.7371, lng: 3.2716 },
    { id: 3, nombre: "Casa Canyamel Beach", zona: "Canyamel", tipo: "Casa adosada", propietario_id: 3, licencia: "ETV/3021", habs: 3, banos: 2, plazas: 6, piscina: false, llave: "L-07", canales: ["Booking", "Vrbo"], servicios: [AV, LI], foto_path: "assets/prop-balcony.jpg", tarifa_gestion: 260, tarifa_limpieza: 55, dotacion_ropa: 8, activa: true, lat: 39.6736, lng: 3.4433 },
    { id: 4, nombre: "Àtic del Port", zona: "Cala Ratjada", tipo: "Ático vista mar", propietario_id: 4, licencia: "ETV/2760", habs: 2, banos: 1, plazas: 4, piscina: false, llave: "L-02", canales: ["Airbnb", "Booking"], servicios: [AV, LI, CO], foto_path: "assets/prop-living.jpg", tarifa_gestion: 240, tarifa_limpieza: 45, dotacion_ropa: 6, activa: true, lat: 39.7135, lng: 3.4622 },
    { id: 5, nombre: "Finca S'Alzina", zona: "Capdepera", tipo: "Finca con piscina", propietario_id: 5, licencia: "", habs: 5, banos: 4, plazas: 10, piscina: true, llave: "L-09", canales: [], servicios: [CO, PI, JA], foto_path: "assets/prop-boats.jpg", tarifa_gestion: 320, tarifa_limpieza: 0, dotacion_ropa: 0, activa: true, lat: 39.7027, lng: 3.4355 },
    { id: 6, nombre: "Villa Cala Mesquida", zona: "Cala Mesquida", tipo: "Villa con jardín", propietario_id: 6, licencia: "ETV/2088", habs: 4, banos: 3, plazas: 8, piscina: true, llave: "L-05", canales: ["Booking"], servicios: [AV, LI, PI, JA], foto_path: "assets/prop-cala.jpg", tarifa_gestion: 340, tarifa_limpieza: 65, dotacion_ropa: 10, activa: true, lat: 39.7477, lng: 3.4354 },
    { id: 7, nombre: "Apartament Es Pins", zona: "Cala Millor", tipo: "Apartamento", propietario_id: 7, licencia: "ETV/3305", habs: 2, banos: 1, plazas: 4, piscina: false, llave: "L-14", canales: ["Airbnb", "Booking"], servicios: [AV, LI], foto_path: "assets/prop-towels.jpg", tarifa_gestion: 220, tarifa_limpieza: 45, dotacion_ropa: 6, activa: true, lat: 39.5959, lng: 3.3830 },
    { id: 8, nombre: "Casa Sa Duaia", zona: "Artà (Sa Duaia)", tipo: "Casa de campo", propietario_id: 1, licencia: "", habs: 3, banos: 2, plazas: 6, piscina: true, llave: "L-08", canales: [], servicios: [LI, JA], foto_path: "assets/prop-bedroom.jpg", tarifa_gestion: 180, tarifa_limpieza: 55, dotacion_ropa: 0, activa: true, lat: 39.7290, lng: 3.3830 },
  ];

  DB.emp = [
    { id: 1, nombre: "Cati Ginard", rol_laboral: "Limpieza", color: "#4f8a5c", telefono: "+34 655 210 334", contrato_horas: 40, activo: true, codigo_acceso: null },
    { id: 2, nombre: "Ionela Popescu", rol_laboral: "Limpieza", color: "#4f8a5c", telefono: "+34 655 442 118", contrato_horas: 40, activo: true, codigo_acceso: null },
    { id: 3, nombre: "Antònia Sureda", rol_laboral: "Limpieza", color: "#84759f", telefono: "+34 655 873 902", contrato_horas: 40, activo: true, codigo_acceso: null },
    { id: 4, nombre: "Yolanda Ruiz", rol_laboral: "Limpieza", color: "#c79c3d", telefono: "+34 655 118 476", contrato_horas: 35, activo: true, codigo_acceso: null },
    { id: 5, nombre: "Miquel Alzamora", rol_laboral: "Mantenimiento", color: "#b5533c", telefono: "+34 655 300 245", contrato_horas: 40, activo: true, codigo_acceso: null },
    { id: 6, nombre: "Toni Massanet", rol_laboral: "Piscinas y jardines", color: "#4a7fa5", telefono: "+34 655 781 559", contrato_horas: 40, activo: true, codigo_acceso: null },
    { id: 7, nombre: "Xisca Esteva", rol_laboral: "Coordinación", color: "#555f50", telefono: "+34 655 958 897", contrato_horas: 40, activo: true, codigo_acceso: null },
    { id: 8, nombre: "Marta Riera", rol_laboral: "Limpieza", color: "#84759f", telefono: "+34 655 990 811", contrato_horas: 35, activo: true, codigo_acceso: "7fd3a2c1" },
  ];
  DB.empDatos = [
    { empleado_id: 1, tipo_relacion: "contrato", tarifa_hora: 14, dni: "43•••••1A", nass: "07/••••••••90", email: "cati@ejemplo.com", direccion: "Artà", iban: "ES12 •••• (muestra)", fecha_alta: "2024-03-01" },
    { empleado_id: 2, tipo_relacion: "contrato", tarifa_hora: 14, dni: "X9•••••2B", fecha_alta: "2024-05-15" },
    { empleado_id: 3, tipo_relacion: "contrato", tarifa_hora: 14.5, dni: "43•••••3C", fecha_alta: "2023-04-01" },
    { empleado_id: 4, tipo_relacion: "contrato", tarifa_hora: 14, dni: "43•••••4D", fecha_alta: "2025-06-01" },
    { empleado_id: 5, tipo_relacion: "autonomo", tarifa_hora: 22, dni: "43•••••5E", iban: "ES98 •••• (muestra)", fecha_alta: "2023-02-01" },
    { empleado_id: 6, tipo_relacion: "autonomo", tarifa_hora: 20, dni: "43•••••6F", fecha_alta: "2023-02-01" },
    { empleado_id: 7, tipo_relacion: "contrato", tarifa_hora: 16, dni: "43•••••7G", fecha_alta: "2022-09-01" },
    { empleado_id: 8, tipo_relacion: "contrato", tarifa_hora: 14, dni: "43•••••8H", fecha_alta: "2026-06-20" },
  ];

  /* ---------- reservas: 11 meses de historia + situación de hoy ---------- */
  DB.reservas = [];
  const avProps = [1, 2, 3, 4, 6, 7];
  for (let m = 11; m >= 1; m--) {
    const mes = addMeses(mesISO(), -m);
    avProps.forEach((pid, i) => {
      const base = 2 + ((pid + m) % 5);
      const n1 = `${mes}-${String(base).padStart(2, "0")}`;
      const est = 4 + ((pid * m) % 4);
      DB.reservas.push({ id: nid(), propiedad_id: pid, entrada: n1, salida: addDias(n1, est), canal: ["Airbnb", "Booking", "Vrbo"][i % 3], huesped: null, plazas: null, importe: 480 + est * 120 + pid * 30, estado: "confirmada", hora_entrada: "16:00", hora_salida: "10:00" });
      const n2 = addDias(n1, est + 2 + (pid % 3));
      if (n2.slice(0, 7) === mes) DB.reservas.push({ id: nid(), propiedad_id: pid, entrada: n2, salida: addDias(n2, 3 + (m % 4)), canal: "Airbnb", importe: 420 + pid * 40, estado: "confirmada", hora_entrada: "16:00", hora_salida: "10:00" });
    });
  }
  // hoy: salidas, entradas y ocupadas
  DB.reservas.push(
    { id: nid(), propiedad_id: 4, entrada: addDias(HOY_D, -6), salida: HOY_D, canal: "Airbnb", huesped: "Fam. Weber", plazas: 4, importe: 890, estado: "confirmada", hora_entrada: "16:00", hora_salida: "10:00" },
    { id: nid(), propiedad_id: 7, entrada: addDias(HOY_D, -4), salida: HOY_D, canal: "Booking", huesped: "M. Rossi", plazas: 3, importe: 560, estado: "confirmada", hora_entrada: "16:00", hora_salida: "11:00" },
    { id: nid(), propiedad_id: 1, entrada: HOY_D, salida: addDias(HOY_D, 9), canal: "Booking", huesped: "Fam. Sørensen", plazas: 7, importe: 2350, estado: "confirmada", hora_entrada: "16:00", hora_salida: "10:00" },
    { id: nid(), propiedad_id: 4, entrada: HOY_D, salida: addDias(HOY_D, 7), canal: "Airbnb", huesped: "L. Dubois", plazas: 4, importe: 1120, estado: "confirmada", hora_entrada: "15:00", hora_salida: "10:00" },
    { id: nid(), propiedad_id: 3, entrada: addDias(HOY_D, -3), salida: addDias(HOY_D, 4), canal: "Vrbo", huesped: "Fam. Novak", plazas: 5, importe: 1240, estado: "confirmada", hora_entrada: "16:00", hora_salida: "10:00" },
    { id: nid(), propiedad_id: 6, entrada: addDias(HOY_D, 2), salida: addDias(HOY_D, 9), canal: "Booking", huesped: "K. Lindgren", plazas: 6, importe: 1780, estado: "confirmada", hora_entrada: "16:00", hora_salida: "10:00" },
    { id: nid(), propiedad_id: 2, entrada: addDias(HOY_D, -1), salida: addDias(HOY_D, 6), canal: "Airbnb", huesped: "Fam. Bauer", plazas: 5, importe: 1490, estado: "confirmada", hora_entrada: "16:00", hora_salida: "10:00" },
    { id: nid(), propiedad_id: 6, entrada: addDias(HOY_D, 14), salida: addDias(HOY_D, 18), canal: "Directa", huesped: "Propietarios", estado: "bloqueo" },
  );

  /* ---------- ausencias (caso Yolanda con patrón de lunes) ---------- */
  const lunes = ultimosLunes(6);
  DB.ausencias = [
    { id: nid(), empleado_id: 4, fecha: lunes[0], tipo: "injustificada", motivo: "No acudió al turno y no avisó", origen: "auto", creado_por: "Dirección", created_at: ts(lunes[0], "20:00") },
    { id: nid(), empleado_id: 4, fecha: lunes[2], tipo: "injustificada", motivo: null, origen: "auto", creado_por: "Dirección", created_at: ts(lunes[2], "20:00") },
    { id: nid(), empleado_id: 4, fecha: addDias(HOY_D, -17), tipo: "injustificada", motivo: "Sin respuesta al teléfono", origen: "manual", creado_por: "Dirección", created_at: ts(addDias(HOY_D, -17), "20:00") },
    { id: nid(), empleado_id: 4, fecha: addDias(HOY_D, -32), tipo: "justificada", motivo: "Baja médica (parte adjunto)", origen: "manual", justificante_path: "assets/sv-gestion.jpg", creado_por: "Dirección", created_at: ts(addDias(HOY_D, -32), "20:00") },
    { id: nid(), empleado_id: 8, fecha: addDias(HOY_D, -5), tipo: "justificada", motivo: "Permiso médico familiar", origen: "manual", creado_por: "Dirección", created_at: ts(addDias(HOY_D, -5), "20:00") },
  ];
  const diasAusencia = new Set(DB.ausencias.map(a => a.empleado_id + "|" + a.fecha));

  /* ---------- tareas: historia del mes + hoy ---------- */
  DB.tareas = [];
  const equipos = [[1, 2], [3], [4], [2, 3], [1], [3, 4]];
  for (let d = 28; d >= 1; d--) {
    const dia = addDias(HOY_D, -d);
    if (new Date(dia + "T12:00").getDay() === 0) continue;
    const pid = DB.props[(d * 3) % 8].id;
    const eq = equipos[d % equipos.length].filter(e => !diasAusencia.has(e + "|" + dia));
    if (!eq.length) continue;
    const h0 = 9 + (d % 3);
    DB.tareas.push({ id: nid(), propiedad_id: pid, fecha: dia, tipo: d % 4 === 0 ? "piscina" : "limpieza", estado: "hecha", equipo_ids: eq, hora_inicio: `${String(h0).padStart(2, "0")}:00`, hora_fin: `${String(h0 + 2).padStart(2, "0")}:15`, inicio_real: ts(dia, `${String(h0).padStart(2, "0")}:04`), fin_real: ts(dia, `${String(h0 + 2).padStart(2, "0")}:11`), checklist: (DB.ajustes.checklist_base || []).map(t => ({ t, ok: true })), fotos: d % 5 === 0 ? ["assets/prop-towels.jpg"] : [], notas_equipo: d === 6 ? "La puerta de la terraza cuesta de cerrar." : null, descripcion: null });
    if (d % 6 === 0) DB.tareas.push({ id: nid(), propiedad_id: 6, fecha: dia, tipo: "piscina", estado: "hecha", equipo_ids: [6], hora_inicio: "08:30", hora_fin: "09:30", inicio_real: ts(dia, "08:32"), fin_real: ts(dia, "09:28"), checklist: [], fotos: [], descripcion: "Análisis y limpieza de piscina" });
  }
  // día de Yolanda con tarea y SIN fichaje → detección "por revisar"
  const diaSinFichar = addDias(HOY_D, -2);
  DB.tareas.push({ id: nid(), propiedad_id: 7, fecha: diaSinFichar, tipo: "limpieza", estado: "pendiente", equipo_ids: [4], hora_inicio: "10:00", hora_fin: "12:00", checklist: [], fotos: [], descripcion: null });
  // HOY
  const chkHecha = (DB.ajustes.checklist_base || []).map(t => ({ t, ok: true }));
  const chkMitad = (DB.ajustes.checklist_base || []).map((t, i) => ({ t, ok: i < 3 }));
  DB.tareas.push(
    { id: 501, propiedad_id: 7, fecha: HOY_D, tipo: "limpieza", estado: "hecha", equipo_ids: [3], hora_inicio: "08:15", hora_fin: "10:00", inicio_real: ts(HOY_D, "08:18"), fin_real: ts(HOY_D, "10:02"), checklist: chkHecha, fotos: ["assets/prop-towels.jpg", "assets/prop-living.jpg"], notas_equipo: "Todo en orden. Repuesto el kit de bienvenida.", descripcion: "Check-out 11:00 → check-in 17:00" },
    { id: 502, propiedad_id: 4, fecha: HOY_D, tipo: "limpieza", estado: "encurso", equipo_ids: [1], hora_inicio: "10:15", hora_fin: "12:30", inicio_real: ts(HOY_D, "10:18"), checklist: chkMitad, fotos: [], descripcion: "Check-out 10:00 → check-in 15:00" },
    { id: 503, propiedad_id: 1, fecha: HOY_D, tipo: "limpieza", estado: "hecha", equipo_ids: [2, 3], hora_inicio: "10:30", hora_fin: "12:45", inicio_real: ts(HOY_D, "10:31"), fin_real: ts(HOY_D, "12:40"), checklist: chkHecha, fotos: ["assets/prop-bedroom.jpg"], notas_equipo: null, descripcion: "Puesta a punto · check-in 16:00" },
    { id: 504, propiedad_id: 6, fecha: HOY_D, tipo: "piscina", estado: "encurso", equipo_ids: [6], hora_inicio: "11:00", hora_fin: "12:00", inicio_real: ts(HOY_D, "11:05"), checklist: [], fotos: [], descripcion: "Repaso antes de la entrada del jueves" },
    { id: 505, propiedad_id: 2, fecha: addDias(HOY_D, 1), tipo: "limpieza", estado: "pendiente", equipo_ids: [4], hora_inicio: "10:00", hora_fin: "12:00", checklist: (DB.ajustes.checklist_base || []).map(t => ({ t, ok: false })), fotos: [], descripcion: "Repaso a mitad de estancia" },
    { id: 506, propiedad_id: 5, fecha: addDias(HOY_D, 1), tipo: "piscina", estado: "pendiente", equipo_ids: [6], hora_inicio: "09:00", hora_fin: "10:00", checklist: [], fotos: [], descripcion: "Mantenimiento semanal" },
  );

  /* ---------- fichajes: mes completo + hoy ---------- */
  DB.fichajes = []; DB.pausas = [];
  for (let d = 28; d >= 1; d--) {
    const dia = addDias(HOY_D, -d);
    const dow = new Date(dia + "T12:00").getDay();
    if (dow === 0) continue;
    DB.emp.filter(e => e.id !== 8 || dia >= "2026-06-20").forEach(e => {
      if (diasAusencia.has(e.id + "|" + dia)) return;
      if (e.id === 4 && dia === diaSinFichar) return;           // el día "por revisar"
      if (dow === 6 && ![1, 2, 6].includes(e.id)) return;        // sábados solo parte del equipo
      const hIn = `0${7 + (e.id % 2)}:${String(50 + ((e.id * d) % 10)).slice(-2)}`;
      const fid = nid();
      DB.fichajes.push({ id: fid, empleado_id: e.id, fecha: dia, entrada: ts(dia, hIn), salida: ts(dia, `${15 + (e.id % 3)}:${String(10 + ((e.id + d) % 45)).padStart(2, "0")}`), lat: 39.69 + (e.id % 5) * .01, lng: 3.35 + (e.id % 4) * .02, foto_entrada_path: "assets/sv-limpieza-demo.jpg" in DB.fotoUrls ? null : null });
      if (e.id % 3 === 0) DB.pausas.push({ id: nid(), fichaje_id: fid, inicio: ts(dia, "13:30"), fin: ts(dia, "14:00") });
    });
  }
  // hoy: jornadas abiertas con foto
  [[1, "07:58"], [2, "08:01"], [3, "08:03"], [6, "07:45"], [5, "08:10"], [7, "08:30"]].forEach(([eid, h]) => {
    DB.fichajes.push({ id: 600 + eid, empleado_id: eid, fecha: HOY_D, entrada: ts(HOY_D, h), salida: null, lat: 39.6936, lng: 3.3494, foto_entrada_path: "assets/sv-lavanderia.jpg" });
  });
  DB.pausas.push({ id: nid(), fichaje_id: 607, inicio: ts(HOY_D, "10:30"), fin: null }); // Xisca en descanso

  DB.posiciones = [
    { empleado_id: 1, lat: 39.7135, lng: 3.4622, updated_at: new Date().toISOString() },  // Cati en Àtic del Port
    { empleado_id: 2, lat: 39.6989, lng: 3.3702, updated_at: new Date().toISOString() },  // Ionela en Es Molí
    { empleado_id: 3, lat: 39.6989, lng: 3.3702, updated_at: new Date().toISOString() },
    { empleado_id: 6, lat: 39.7477, lng: 3.4354, updated_at: new Date().toISOString() },  // Toni en Cala Mesquida
    { empleado_id: 5, lat: 39.6736, lng: 3.4433, updated_at: new Date().toISOString() },  // Miquel en Canyamel
    { empleado_id: 7, lat: 39.6936, lng: 3.3494, updated_at: new Date().toISOString() },  // Xisca oficina
  ];

  /* ---------- incidencias ---------- */
  DB.incidencias = [
    { id: 71, propiedad_id: 3, titulo: "Fuga en el grifo del baño principal", descripcion: "El monomando pierde agua por la base. Cerrada la llave de paso del baño.", prioridad: "alta", estado: "abierta", reportada_por: 3, coste: null, fotos: ["assets/sv-lavanderia.jpg", "assets/prop-towels.jpg"], created_at: ts(HOY_D, "08:25") },
    { id: 72, propiedad_id: 6, titulo: "Persiana atascada en dormitorio 2", descripcion: "No sube del todo; la cinta está deshilachada.", prioridad: "media", estado: "abierta", reportada_por: 1, coste: null, fotos: ["assets/prop-bedroom.jpg"], created_at: ts(addDias(HOY_D, -1), "17:10") },
    { id: 73, propiedad_id: 1, titulo: "Robot de piscina sin succión", descripcion: "Filtro y turbina revisados en taller; repuesto en garantía.", prioridad: "media", estado: "resuelta", reportada_por: 6, coste: 0, fotos: [], created_at: ts(addDias(HOY_D, -4), "09:00"), resuelta_at: ts(addDias(HOY_D, -3), "13:00") },
    { id: 74, propiedad_id: 4, titulo: "Mando del aire acondicionado no responde", descripcion: "Cambiadas las pilas y sigue igual; posible receptor.", prioridad: "media", estado: "resuelta", reportada_por: 2, coste: 42, fotos: [], created_at: ts(addDias(HOY_D, -8), "12:40"), resuelta_at: ts(addDias(HOY_D, -7), "16:00") },
  ];
  DB.eventos = [
    { id: nid(), incidencia_id: 71, texto: "Reportada por Antònia Sureda con 2 fotos", autor: "Antònia Sureda", created_at: ts(HOY_D, "08:25") },
    { id: nid(), incidencia_id: 71, texto: "Avisado el fontanero: viene mañana a primera hora", autor: "Dirección", created_at: ts(HOY_D, "09:10") },
    { id: nid(), incidencia_id: 72, texto: "Reportada por Cati Ginard con 1 foto", autor: "Cati Ginard", created_at: ts(addDias(HOY_D, -1), "17:10") },
    { id: nid(), incidencia_id: 73, texto: "Reportada por Toni Massanet", autor: "Toni Massanet", created_at: ts(addDias(HOY_D, -4), "09:00") },
    { id: nid(), incidencia_id: 73, texto: "Reparada la turbina en taller · verificada en la piscina", autor: "Toni Massanet", created_at: ts(addDias(HOY_D, -3), "13:00") },
    { id: nid(), incidencia_id: 74, texto: "Sustituido el receptor de la unidad interior", autor: "Miquel Alzamora", created_at: ts(addDias(HOY_D, -7), "16:00") },
  ];

  DB.compras = [
    { id: 81, propiedad_id: 1, texto: "2 bombillas E27 cálidas (terraza)", creado_por: "Ionela Popescu", estado: "pendiente", created_at: ts(HOY_D, "12:20") },
    { id: 82, propiedad_id: 4, texto: "Gel y champú del kit de bienvenida", creado_por: "Cati Ginard", estado: "pendiente", created_at: ts(HOY_D, "11:05") },
    { id: 83, propiedad_id: 3, texto: "Cinta de persiana (dormitorio 2)", creado_por: "Dirección", estado: "pendiente", created_at: ts(addDias(HOY_D, -1), "17:30") },
    { id: 84, propiedad_id: 1, texto: "Juego de sábanas 150 de repuesto", creado_por: "Cati Ginard", estado: "comprado", created_at: ts(addDias(HOY_D, -3), "10:00"), comprado_at: ts(addDias(HOY_D, -2), "18:00") },
  ];

  /* ---------- facturas ---------- */
  const mesPrev = fmtMes(addMeses(mesISO(), -1));
  DB.facturas = [
    { id: 91, numero: "HSM-2026-001", cliente: "Familia Jensen", propietario_id: 1, tipo: "Propietario", concepto: `Servicios ${mesPrev}`, lineas: [{ c: "Gestión integral · Villa Es Molí", importe: 350 }, { c: "6 limpiezas de salida", importe: 390 }], base: 740, fecha: addDias(HOY_D, -12), vencimiento: addDias(HOY_D, 18), estado: "cobrada", created_at: ts(addDias(HOY_D, -12), "09:00") },
    { id: 92, numero: "HSM-2026-002", cliente: "Sr. Andersson", propietario_id: 4, tipo: "Propietario", concepto: `Servicios ${mesPrev}`, lineas: [{ c: "Gestión integral · Àtic del Port", importe: 240 }, { c: "7 limpiezas de salida", importe: 315 }], base: 555, fecha: addDias(HOY_D, -12), vencimiento: addDias(HOY_D, 18), estado: "cobrada", created_at: ts(addDias(HOY_D, -12), "09:01") },
    { id: 93, numero: "HSM-2026-003", cliente: "Familia Müller", propietario_id: 3, tipo: "Propietario", concepto: `Servicios ${mesPrev}`, lineas: [{ c: "Gestión integral · Casa Canyamel Beach", importe: 260 }, { c: "5 limpiezas de salida", importe: 275 }], base: 535, fecha: addDias(HOY_D, -12), vencimiento: addDias(HOY_D, 18), estado: "emitida", created_at: ts(addDias(HOY_D, -12), "09:02") },
    { id: 94, numero: "HSM-2026-004", cliente: "Hotel CR Suites", propietario_id: null, tipo: "Manual", concepto: "Lavandería · 420 kg", lineas: [{ c: "Servicio de lavandería · 420 kg", importe: 588 }], base: 588, fecha: addDias(HOY_D, -40), vencimiento: addDias(HOY_D, -10), estado: "emitida", created_at: ts(addDias(HOY_D, -40), "09:00") },
    { id: 95, numero: "HSM-2026-005", cliente: "Familia Schmidt", propietario_id: 5, tipo: "Propietario", concepto: `Servicios ${mesPrev}`, lineas: [{ c: "Consigna y mantenimiento · Finca S'Alzina", importe: 320 }], base: 320, fecha: addDias(HOY_D, -12), vencimiento: addDias(HOY_D, 18), estado: "cobrada", created_at: ts(addDias(HOY_D, -12), "09:03") },
    { id: 96, numero: "HSM-2026-006", cliente: "Sra. Larsen", propietario_id: 2, tipo: "Propietario", concepto: `Servicios ${mesPrev}`, lineas: [{ c: "Gestión integral · Finca Na Blanca", importe: 290 }, { c: "4 limpiezas de salida", importe: 220 }], base: 510, fecha: addDias(HOY_D, -12), vencimiento: addDias(HOY_D, 18), estado: "emitida", created_at: ts(addDias(HOY_D, -12), "09:04") },
    { id: 97, numero: null, cliente: "Sra. Fischer", propietario_id: 7, tipo: "Propietario", concepto: `Servicios ${fmtMes(mesISO())}`, lineas: [{ c: "Gestión integral · Apartament Es Pins", importe: 220 }, { c: "5 limpiezas de salida", importe: 225 }], base: 445, fecha: HOY_D, vencimiento: null, estado: "borrador", created_at: ts(HOY_D, "09:00") },
  ];

  /* ---------- reseñas y mejoras (portal del propietario) ---------- */
  DB.resenas = [
    { id: nid(), propiedad_id: 1, autor: "Fam. Sørensen", canal: "Booking", puntuacion: 5, fecha: addDias(HOY_D, -4), texto: "La villa impecable y el equipo de limpieza un 10. La piscina, perfecta toda la semana.", created_at: ts(addDias(HOY_D, -4), "20:00") },
    { id: nid(), propiedad_id: 1, autor: "Laura & Marc", canal: "Airbnb", puntuacion: 5, fecha: addDias(HOY_D, -18), texto: "Todo como en las fotos. Echamos de menos algo de sombra y colchonetas en la piscina.", created_at: ts(addDias(HOY_D, -18), "20:00") },
    { id: nid(), propiedad_id: 1, autor: "Familie Weber", canal: "Airbnb", puntuacion: 4, fecha: addDias(HOY_D, -33), texto: "Muy buena estancia. Un gimnasio pequeño la haría perfecta para estancias largas.", created_at: ts(addDias(HOY_D, -33), "20:00") },
    { id: nid(), propiedad_id: 8, autor: "M. Dubois", canal: "Directa", puntuacion: 5, fecha: addDias(HOY_D, -12), texto: "El jardín precioso y la casa muy auténtica. Volveremos.", created_at: ts(addDias(HOY_D, -12), "20:00") },
    { id: nid(), propiedad_id: 4, autor: "K. Lindgren", canal: "Booking", puntuacion: 5, fecha: addDias(HOY_D, -9), texto: "Vistas increíbles al puerto y check-in facilísimo.", created_at: ts(addDias(HOY_D, -9), "20:00") },
    { id: nid(), propiedad_id: 3, autor: "Fam. Novak", canal: "Vrbo", puntuacion: 4, fecha: addDias(HOY_D, -6), texto: "Ubicación perfecta junto a la playa. El wifi algo justo en la terraza.", created_at: ts(addDias(HOY_D, -6), "20:00") },
  ];
  DB.mejoras = [
    { id: 201, propiedad_id: 1, titulo: "Colchonetas, sombrillas y toldo en la piscina", descripcion: "Lo han pedido 3 huéspedes este verano. Mejora directa de las reseñas y del precio en julio-agosto.", origen: "inquilino", autor: "Reseñas de Laura & Marc y 2 más", incremento_precio: 8, coste_estimado: 420, estado: "propuesta", created_at: ts(addDias(HOY_D, -10), "10:00") },
    { id: 202, propiedad_id: 1, titulo: "Gimnasio básico en el garaje", descripcion: "Banco, mancuernas, cinta y espejo. Nos posiciona en 'workation' y estancias largas de temporada baja.", origen: "agencia", autor: "Equipo Hygge", incremento_precio: 15, coste_estimado: 2400, estado: "propuesta", created_at: ts(addDias(HOY_D, -7), "10:00") },
    { id: 203, propiedad_id: 8, titulo: "Zona chill-out con pérgola en el jardín", descripcion: "El jardín es el punto fuerte de la casa: una pérgola con sofás lo convierte en el salón de verano.", origen: "agencia", autor: "Equipo Hygge", incremento_precio: 10, coste_estimado: 1800, estado: "propuesta", created_at: ts(addDias(HOY_D, -5), "10:00") },
    { id: 204, propiedad_id: 1, titulo: "Barbacoa de obra y comedor exterior", descripcion: "Implementada en primavera.", origen: "inquilino", autor: "Petición repetida en 2025", incremento_precio: 6, coste_estimado: 900, estado: "implementada", implementada_at: addMeses(mesISO(), -2) + "-15", created_at: ts(addDias(HOY_D, -80), "10:00") },
    { id: 205, propiedad_id: 1, titulo: "Wifi mesh en toda la casa y terraza", descripcion: "Aceptada por el propietario; instalación esta semana.", origen: "agencia", autor: "Equipo Hygge", incremento_precio: 3, coste_estimado: 260, estado: "aceptada", created_at: ts(addDias(HOY_D, -3), "10:00") },
  ];

  /* ---------- documentos de ejemplo ---------- */
  DB._docs = {
    "documentos/1": [{ name: "1_Contrato_gestion_2026.pdf", metadata: { size: 245760 } }, { name: "2_Licencia_ETV2314.pdf", metadata: { size: 122880 } }],
    "documentos/4": [{ name: "1_Contrato_gestion_2026.pdf", metadata: { size: 198450 } }],
    "empleados/1": [{ name: "1_Contrato_indefinido_firmado.pdf", metadata: { size: 331000 } }, { name: "2_DNI.pdf", metadata: { size: 89000 } }],
    "empleados/5": [{ name: "1_Contrato_servicios_autonomo.pdf", metadata: { size: 287000 } }],
  };
  Object.entries(DB._docs).forEach(([pre, docs]) => docs.forEach(d => { DB.fotoUrls[pre + "/" + d.name] = "assets/sv-gestion.jpg"; }));
}

/* ============================================================
   OVERRIDES · capa de datos en memoria
   ============================================================ */
function dbInit() { demoSeed(); }
async function dbCargarTodo() {}
async function dbCargarPerfil() { return DB.profile; }
function dbRealtime() {}
function dbRecargaSuave() {}
async function dbLogout() { location.reload(); }
function getGPS() {
  const base = DB.profile?.rol === "equipo" ? { lat: 39.7135, lng: 3.4622 } : { lat: 39.6936, lng: 3.3494 };
  return Promise.resolve({ lat: +(base.lat + (Math.random() - .5) * .002).toFixed(6), lng: +(base.lng + (Math.random() - .5) * .002).toFixed(6) });
}
async function dbPingPosicion() {
  const me = miEmp(); if (!me) return;
  const gps = await getGPS();
  const p = DB.posiciones.find(x => x.empleado_id === me.id);
  if (p) { p.lat = gps.lat; p.lng = gps.lng; p.updated_at = new Date().toISOString(); }
  else DB.posiciones.push({ empleado_id: me.id, ...gps, updated_at: new Date().toISOString() });
}
async function dbSubirFoto(path, file) { DB.fotoUrls[path] = URL.createObjectURL(file); return path; }
async function fotoUrl(path) {
  if (!path) return null;
  if (DB.fotoUrls[path]) return DB.fotoUrls[path];
  if (path.startsWith("assets/")) return path;
  return "assets/sv-gestion.jpg";
}
async function dbGuardarProp(payload, id, fotoFile) {
  if (id) Object.assign(P(id), payload);
  else { id = nid(); DB.props.push({ id, activa: true, servicios: [], canales: [], ...payload }); }
  if (fotoFile) { const path = `propiedades/${id}/cover.jpg`; await dbSubirFoto(path, fotoFile); P(id).foto_path = path; }
  return null;
}
async function dbGuardarOwner(payload, id) {
  if (id) Object.assign(O(id), payload); else DB.owners.push({ id: nid(), ...payload });
  return null;
}
async function dbGuardarEmpleado(payload, id, datos) {
  let emp;
  if (id) { emp = S(id); Object.assign(emp, payload); }
  else { emp = { id: nid(), activo: true, codigo_acceso: Math.random().toString(16).slice(2, 10), ...payload }; DB.emp.push(emp); }
  if (datos) {
    const d = DB.empDatos.find(x => x.empleado_id === emp.id);
    if (d) Object.assign(d, datos); else DB.empDatos.push({ empleado_id: emp.id, ...datos });
  }
  return { emp };
}
async function dbEliminarEmpleado(id) {
  DB.emp = DB.emp.filter(e => e.id !== id);
  DB.empDatos = DB.empDatos.filter(d => d.empleado_id !== id);
  DB.fichajes = DB.fichajes.filter(f => f.empleado_id !== id);
  DB.posiciones = DB.posiciones.filter(p => p.empleado_id !== id);
  DB.ausencias = DB.ausencias.filter(a => a.empleado_id !== id);
  return null;
}
async function dbCrearReserva(payload) { DB.reservas.push({ id: nid(), estado: "confirmada", ...payload }); return null; }
async function dbBorrarReserva(id) { DB.reservas = DB.reservas.filter(r => r.id !== id); return null; }
async function dbCrearTarea(payload) {
  DB.tareas.push({ id: nid(), estado: "pendiente", fotos: [], checklist: (DB.ajustes.checklist_base || []).map(t => ({ t, ok: false })), ...payload });
  return null;
}
async function dbTareaEstado(id, cambios) { const t = DB.tareas.find(x => x.id === id); if (t) Object.assign(t, cambios); return null; }
async function dbBorrarTarea(id) { DB.tareas = DB.tareas.filter(t => t.id !== id); return null; }
async function dbFicharEntrada(fotoFile) {
  const me = miEmp(); if (!me) return "Cuenta sin ficha de empleado";
  if (fichajeAbierto(me.id)) return "Ya tienes la jornada abierta";
  let fotoPath = null;
  if (fotoFile) { fotoPath = `fichajes/${me.id}/${Date.now()}_in.jpg`; await dbSubirFoto(fotoPath, fotoFile); }
  const gps = await getGPS();
  DB.fichajes.push({ id: nid(), empleado_id: me.id, fecha: hoyISO(), entrada: new Date().toISOString(), salida: null, lat: gps.lat, lng: gps.lng, foto_entrada_path: fotoPath });
  await dbPingPosicion();
  return null;
}
async function dbFicharSalida(fotoFile) {
  const me = miEmp(); const f = me && fichajeAbierto(me.id);
  if (!f) return "No tienes jornada abierta";
  const p = pausaAbierta(f.id); if (p) p.fin = new Date().toISOString();
  if (fotoFile) { const path = `fichajes/${me.id}/${Date.now()}_out.jpg`; await dbSubirFoto(path, fotoFile); f.foto_salida_path = path; }
  f.salida = new Date().toISOString();
  return null;
}
async function dbPausa() {
  const me = miEmp(); const f = me && fichajeAbierto(me.id);
  if (!f) return "Ficha primero la entrada";
  const p = pausaAbierta(f.id);
  if (p) p.fin = new Date().toISOString();
  else DB.pausas.push({ id: nid(), fichaje_id: f.id, inicio: new Date().toISOString(), fin: null });
  return null;
}
async function dbCrearIncidencia({ propiedad_id, titulo, descripcion, prioridad }, files) {
  const me = miEmp();
  const fotos = [];
  for (const file of files || []) { const path = `incidencias/${Date.now()}_${fotos.length}.jpg`; await dbSubirFoto(path, file); fotos.push(path); }
  const id = nid();
  DB.incidencias.unshift({ id, propiedad_id, titulo, descripcion, prioridad, estado: "abierta", reportada_por: me?.id || null, coste: null, fotos, created_at: new Date().toISOString() });
  DB.eventos.push({ id: nid(), incidencia_id: id, texto: `Reportada por ${DB.profile.nombre}${fotos.length ? ` con ${fotos.length} foto${fotos.length > 1 ? "s" : ""}` : ""}`, autor: DB.profile.nombre, created_at: new Date().toISOString() });
  return null;
}
async function dbResolverIncidencia(id, coste) {
  const i = DB.incidencias.find(x => x.id === id); if (!i) return "No encontrada";
  i.estado = "resuelta"; i.resuelta_at = new Date().toISOString();
  if (coste !== null && coste !== "" && !isNaN(+coste)) i.coste = +coste;
  DB.eventos.push({ id: nid(), incidencia_id: id, texto: "Marcada como resuelta", autor: DB.profile.nombre, created_at: new Date().toISOString() });
  return null;
}
async function dbComentarIncidencia(id, texto) {
  DB.eventos.push({ id: nid(), incidencia_id: id, texto, autor: DB.profile.nombre, created_at: new Date().toISOString() });
  return null;
}
async function dbCrearCompra(propiedad_id, texto) { DB.compras.unshift({ id: nid(), propiedad_id, texto, creado_por: DB.profile?.nombre, estado: "pendiente", created_at: new Date().toISOString() }); return null; }
async function dbMarcarCompra(id, comprado) { const c = DB.compras.find(x => x.id === id); if (c) { c.estado = comprado ? "comprado" : "pendiente"; c.comprado_at = comprado ? new Date().toISOString() : null; } return null; }
async function dbBorrarCompra(id) { DB.compras = DB.compras.filter(c => c.id !== id); return null; }
async function dbFotosTarea(tareaId, files) {
  const t = DB.tareas.find(x => x.id === tareaId); if (!t) return "Tarea no encontrada";
  for (const file of files || []) { const path = `tareas/${tareaId}/${Date.now()}_${Math.random().toString(36).slice(2, 6)}.jpg`; await dbSubirFoto(path, file); t.fotos = [...(t.fotos || []), path]; }
  return null;
}
async function dbGenerarFacturasMes(mes) {
  const ini = mes + "-01", fin = addDias(addMeses(mes, 1) + "-01", -1);
  let creadas = 0;
  for (const o of DB.owners) {
    const propsO = DB.props.filter(p => p.propietario_id === o.id && p.activa);
    if (!propsO.length) continue;
    const lineas = [];
    propsO.forEach(p => {
      if (+p.tarifa_gestion > 0) lineas.push({ c: `Gestión integral ${fmtMes(mes)} · ${p.nombre}`, importe: +p.tarifa_gestion });
      const limp = DB.tareas.filter(t => t.propiedad_id === p.id && t.tipo === "limpieza" && t.estado === "hecha" && t.fecha >= ini && t.fecha <= fin).length;
      if (limp && +p.tarifa_limpieza > 0) lineas.push({ c: `${limp} limpieza${limp > 1 ? "s" : ""} de salida · ${p.nombre}`, importe: limp * +p.tarifa_limpieza });
    });
    const base = lineas.reduce((a, l) => a + l.importe, 0);
    if (!base) continue;
    if (DB.facturas.find(f => f.propietario_id === o.id && f.concepto === `Servicios ${fmtMes(mes)}`)) continue;
    DB.facturas.unshift({ id: nid(), numero: null, cliente: o.nombre, propietario_id: o.id, tipo: "Propietario", concepto: `Servicios ${fmtMes(mes)}`, lineas, base, fecha: hoyISO(), vencimiento: null, estado: "borrador", created_at: new Date().toISOString() });
    creadas++;
  }
  return creadas;
}
async function dbEmitirFactura(id) {
  const f = DB.facturas.find(x => x.id === id); if (!f) return { error: "No encontrada" };
  const s = DB.ajustes.factura_serie; s.n++;
  f.numero = `${s.prefijo}-${new Date().getFullYear()}-${String(s.n).padStart(3, "0")}`;
  f.estado = "emitida"; f.vencimiento = addDias(hoyISO(), 30);
  return { numero: f.numero };
}
async function dbCobrarFactura(id) { const f = DB.facturas.find(x => x.id === id); if (f) f.estado = "cobrada"; return null; }
async function dbSetAjuste(clave, valor) { DB.ajustes[clave] = valor; return null; }
async function dbActivarDireccion() { return null; }
async function dbSubirDocumento(prefix, file) {
  const limpio = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const name = `${Date.now()}_${limpio}`;
  (DB._docs[prefix] = DB._docs[prefix] || []).unshift({ name, metadata: { size: file.size } });
  await dbSubirFoto(`${prefix}/${name}`, file);
  return null;
}
async function dbListarDocumentos(prefix) { return DB._docs[prefix] || []; }
async function dbCrearAusencia(empleado_id, fecha, tipo, motivo, origen, justFile) {
  if (DB.ausencias.some(a => a.empleado_id === empleado_id && a.fecha === fecha)) return "Ya hay una ausencia registrada ese día";
  let justificante_path = null;
  if (justFile) { justificante_path = `ausencias/${empleado_id}/${Date.now()}.jpg`; await dbSubirFoto(justificante_path, justFile); }
  DB.ausencias.unshift({ id: nid(), empleado_id, fecha, tipo, motivo: motivo || null, origen: origen || "manual", justificante_path, creado_por: DB.profile?.nombre, created_at: new Date().toISOString() });
  return null;
}
async function dbJustificarAusencia(id, motivo, justFile) {
  const a = DB.ausencias.find(x => x.id === id); if (!a) return "No encontrada";
  if (justFile) { a.justificante_path = `ausencias/${a.empleado_id}/${Date.now()}.jpg`; await dbSubirFoto(a.justificante_path, justFile); }
  a.tipo = "justificada"; a.motivo = motivo || a.motivo;
  return null;
}
async function dbBorrarAusencia(id) { DB.ausencias = DB.ausencias.filter(a => a.id !== id); return null; }
async function dbCrearResena(payload) { DB.resenas.unshift({ id: nid(), created_at: new Date().toISOString(), ...payload }); return null; }
async function dbBorrarResena(id) { DB.resenas = DB.resenas.filter(r => r.id !== id); return null; }
async function dbGuardarMejora(payload, id) {
  if (id) Object.assign(DB.mejoras.find(m => m.id === id), payload);
  else DB.mejoras.unshift({ id: nid(), estado: "propuesta", created_at: new Date().toISOString(), ...payload });
  return null;
}
async function dbEstadoMejora(id, estado) {
  const m = DB.mejoras.find(x => x.id === id); if (!m) return "No encontrada";
  m.estado = estado;
  if (estado === "implementada") m.implementada_at = hoyISO();
  return null;
}
async function dbBorrarMejora(id) { DB.mejoras = DB.mejoras.filter(m => m.id !== id); return null; }
async function dbVincularProp(propId, ownerId) { const p = P(propId); if (p) p.propietario_id = ownerId; return null; }

/* factura manual (app.js llama a DB.sb directamente en la versión real) */
async function crearFacturaManual() {
  const cliente = fval("fm-cliente"), concepto = fval("fm-concepto"), base = fnum("fm-base");
  if (!cliente || !concepto || !base) return toast("Faltan datos", "Cliente, concepto y base son obligatorios.", ICON.alert, "terra");
  DB.facturas.unshift({ id: nid(), numero: null, cliente, concepto, base, lineas: [{ c: concepto, importe: base }], tipo: "Manual", fecha: fval("fm-fecha") || hoyISO(), vencimiento: null, estado: "borrador", created_at: new Date().toISOString() });
  closeModal(); toast("Borrador creado", cliente + " · " + eur(base), ICON.invoice, "ok"); rerender();
}

/* ============================================================
   ACCESO DEMO (dos vistas)
   ============================================================ */
async function demoLogin(rol) {
  DB.profile = rol === "direccion"
    ? { id: "demo-dir", nombre: "Dirección Hygge", rol: "direccion", empleado_id: null }
    : rol === "equipo"
      ? { id: "demo-eq", nombre: "Cati Ginard", rol: "equipo", empleado_id: 1 }
      : { id: "demo-ow", nombre: "Familia Jensen", rol: "propietario", propietario_id: 1 };
  STATE.mejorasSel = new Set();
  await entrar();
  setTimeout(() => toast(
    rol === "direccion" ? "Bienvenida, Dirección" : rol === "equipo" ? "Hola, Cati" : "Bienvenida, Familia Jensen",
    rol === "direccion" ? "Demo con datos de ejemplo: todo es interactivo." :
    rol === "equipo" ? "Tienes una limpieza en curso en el Àtic del Port." :
    "Así ve el propietario su casa: reseñas, mejoras y liquidaciones.",
    ICON.check, "ok"), 700);
}
function demoSwap() {
  const orden = { direccion: "equipo", equipo: "propietario", propietario: "direccion" };
  demoLogin(orden[DB.profile?.rol] || "direccion");
}

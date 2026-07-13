/* ============================================================
   DATOS DE DEMOSTRACIÓN · Portal Hygge Services Mallorca
   Empresa real: Hygge Services Mallorca S.L. · Artà
   Propiedades, empleados y cifras: FICTICIOS (muestra)
   ============================================================ */

const HOY = { texto: "lunes, 13 de julio de 2026", corto: "13 jul 2026", mes: "julio 2026", dia: 13 };

/* ---------- PROPIEDADES (12) · zona Llevant ---------- */
const PROPS = [
  { id:"esmoli",   nombre:"Villa Es Molí",        zona:"Artà",                 tipo:"Villa con piscina", foto:"assets/prop-bedroom.jpg",  pos:{x:34,y:42},
    dueno:"Familia Jensen (Dinamarca)", licencia:"ETV/2314", habs:4, banos:3, piscina:true, plazas:8,
    ocupacion:90, noches:28, horasLimpieza:38, ingresos:6820, llave:"L-04",
    proximo:{tipo:"checkout", txt:"Check-out hoy 10:00 · Check-in 16:00"},
    ropa:{ juegos:10, circulando:6, lavanderia:4 },
    canales:["Airbnb","Booking"] },
  { id:"nablanca", nombre:"Finca Na Blanca",      zona:"Colònia de Sant Pere", tipo:"Finca rústica",     foto:"assets/prop-window.jpg",   pos:{x:16,y:15},
    dueno:"Sra. Larsen (Dinamarca)", licencia:"ETV/1187", habs:3, banos:2, piscina:true, plazas:6,
    ocupacion:81, noches:25, horasLimpieza:30, ingresos:5170, llave:"L-11",
    proximo:{tipo:"checkin", txt:"Ocupada hasta el 18 jul"},
    ropa:{ juegos:8, circulando:5, lavanderia:3 },
    canales:["Airbnb"] },
  { id:"canyamel", nombre:"Casa Canyamel Beach",  zona:"Canyamel",             tipo:"Casa adosada",      foto:"assets/prop-balcony.jpg",  pos:{x:72,y:48},
    dueno:"Familia Müller (Alemania)", licencia:"ETV/3021", habs:3, banos:2, piscina:false, plazas:6,
    ocupacion:87, noches:27, horasLimpieza:26, ingresos:4930, llave:"L-07",
    proximo:{tipo:"ocupada", txt:"Ocupada hasta el 16 jul"},
    ropa:{ juegos:8, circulando:4, lavanderia:4 },
    canales:["Booking","Vrbo"] },
  { id:"aticport", nombre:"Àtic del Port",        zona:"Cala Ratjada",         tipo:"Ático vista mar",   foto:"assets/prop-living.jpg",   pos:{x:76,y:22},
    dueno:"Sr. Andersson (Suecia)", licencia:"ETV/2760", habs:2, banos:1, piscina:false, plazas:4,
    ocupacion:94, noches:29, horasLimpieza:24, ingresos:4560, llave:"L-02",
    proximo:{tipo:"checkout", txt:"Check-out hoy 10:00 · Check-in 15:00"},
    ropa:{ juegos:6, circulando:4, lavanderia:2 },
    canales:["Airbnb","Booking"] },
  { id:"salzina",  nombre:"Finca S'Alzina",       zona:"Capdepera",            tipo:"Finca con piscina", foto:"assets/prop-boats.jpg",    pos:{x:62,y:33},
    dueno:"Familia Schmidt (Alemania)", licencia:"ETV/1493", habs:5, banos:4, piscina:true, plazas:10,
    ocupacion:77, noches:24, horasLimpieza:44, ingresos:7440, llave:"L-09",
    proximo:{tipo:"ocupada", txt:"Ocupada hasta el 20 jul"},
    ropa:{ juegos:12, circulando:8, lavanderia:4 },
    canales:["Airbnb"] },
  { id:"mesquida", nombre:"Villa Cala Mesquida",  zona:"Cala Mesquida",        tipo:"Villa con jardín",  foto:"assets/prop-cala.jpg",     pos:{x:60,y:12},
    dueno:"Sr. y Sra. Nielsen (Dinamarca)", licencia:"ETV/2088", habs:4, banos:3, piscina:true, plazas:8,
    ocupacion:84, noches:26, horasLimpieza:36, ingresos:6300, llave:"L-05",
    proximo:{tipo:"mant", txt:"Revisión piscina miércoles"},
    ropa:{ juegos:10, circulando:6, lavanderia:4 },
    canales:["Booking"] },
  { id:"espins",   nombre:"Apartament Es Pins",   zona:"Cala Millor",          tipo:"Apartamento",       foto:"assets/prop-towels.jpg",   pos:{x:61,y:75},
    dueno:"Sra. Fischer (Alemania)", licencia:"ETV/3305", habs:2, banos:1, piscina:false, plazas:4,
    ocupacion:89, noches:27, horasLimpieza:22, ingresos:3890, llave:"L-14",
    proximo:{tipo:"checkout", txt:"Check-out hoy 11:00 · Check-in 17:00"},
    ropa:{ juegos:6, circulando:3, lavanderia:3 },
    canales:["Airbnb","Booking"] },
  { id:"saduaia",  nombre:"Casa Sa Duaia",        zona:"Artà (Sa Duaia)",      tipo:"Casa de campo",     foto:"assets/prop-bedroom.jpg",  pos:{x:44,y:24},
    dueno:"Familia Berg (Noruega)", licencia:"ETV/1911", habs:3, banos:2, piscina:true, plazas:6,
    ocupacion:72, noches:22, horasLimpieza:28, ingresos:4410, llave:"L-08",
    proximo:{tipo:"checkin", txt:"Check-in hoy 16:00"},
    ropa:{ juegos:8, circulando:4, lavanderia:4 },
    canales:["Vrbo"] },
  { id:"sonmoll",  nombre:"Villa Son Moll",       zona:"Cala Ratjada",         tipo:"Villa junto al mar",foto:"assets/prop-balcony.jpg",  pos:{x:79,y:28},
    dueno:"Sr. Johansen (Dinamarca)", licencia:"ETV/2472", habs:4, banos:3, piscina:true, plazas:8,
    ocupacion:86, noches:26, horasLimpieza:34, ingresos:6110, llave:"L-01",
    proximo:{tipo:"mant", txt:"Incidencia en curso: fuga grifo"},
    ropa:{ juegos:10, circulando:7, lavanderia:3 },
    canales:["Airbnb"] },
  { id:"esrafal",  nombre:"Finca Es Rafal",       zona:"Artà",                 tipo:"Agroturismo",       foto:"assets/prop-living.jpg",   pos:{x:28,y:33},
    dueno:"Familia Weber (Alemania)", licencia:"ETV/1650", habs:6, banos:5, piscina:true, plazas:12,
    ocupacion:69, noches:21, horasLimpieza:52, ingresos:8260, llave:"L-12",
    proximo:{tipo:"limpieza", txt:"Limpieza a fondo completada 10:05"},
    ropa:{ juegos:14, circulando:9, lavanderia:5 },
    canales:["Booking","Vrbo"] },
  { id:"betlem",   nombre:"Casa Betlem Mar",      zona:"Betlem",               tipo:"Casa junto al mar", foto:"assets/prop-cala.jpg",     pos:{x:27,y:12},
    dueno:"Sra. Lindqvist (Suecia)", licencia:"ETV/2903", habs:3, banos:2, piscina:false, plazas:6,
    ocupacion:79, noches:24, horasLimpieza:26, ingresos:4520, llave:"L-06",
    proximo:{tipo:"checkout", txt:"Check-out hoy 10:30"},
    ropa:{ juegos:8, circulando:5, lavanderia:3 },
    canales:["Airbnb"] },
  { id:"costapins",nombre:"Xalet Costa dels Pins",zona:"Son Servera",          tipo:"Chalet con piscina",foto:"assets/prop-window.jpg",   pos:{x:70,y:64},
    dueno:"Familia Hansen (Dinamarca)", licencia:"ETV/3140", habs:4, banos:3, piscina:true, plazas:8,
    ocupacion:83, noches:25, horasLimpieza:32, ingresos:5980, llave:"L-03",
    proximo:{tipo:"mant", txt:"Mantenimiento piscina hoy"},
    ropa:{ juegos:10, circulando:6, lavanderia:4 },
    canales:["Booking"] },
];

/* ---------- EQUIPO (12) ----------
   estado: limpiando | mantenimiento | ruta | descanso | oficina | lavanderia | libre | vacaciones */
const STAFF = [
  { id:"cati",    nombre:"Cati Ginard",      rol:"Limpieza",            color:"#4f8a5c", tel:"+34 655 210 334",
    estado:"limpiando", donde:"esmoli", desde:"10:15", fichaje:"07:58", contrato:40,
    horasSemana:14.5, horasMes:62, vacaciones:11, valoracion:4.9, limpiezasMes:41,
    hoy:[
      { h:"07:58", txt:"Fichaje de entrada · Oficina Artà", tipo:"ficha" },
      { h:"08:12", txt:"Limpieza check-out · Finca Es Rafal", tipo:"tarea" },
      { h:"10:15", txt:"Limpieza check-out · Villa Es Molí (en curso)", tipo:"tarea" },
    ]},
  { id:"ionela",  nombre:"Ionela Popescu",   rol:"Limpieza",            color:"#4f8a5c", tel:"+34 655 442 118",
    estado:"limpiando", donde:"esmoli", desde:"10:15", fichaje:"08:01", contrato:40,
    horasSemana:14, horasMes:60, vacaciones:9, valoracion:4.8, limpiezasMes:38,
    hoy:[
      { h:"08:01", txt:"Fichaje de entrada · Oficina Artà", tipo:"ficha" },
      { h:"08:12", txt:"Limpieza check-out · Finca Es Rafal", tipo:"tarea" },
      { h:"10:15", txt:"Limpieza check-out · Villa Es Molí (en curso)", tipo:"tarea" },
    ]},
  { id:"antonia", nombre:"Antònia Sureda",   rol:"Limpieza",            color:"#4f8a5c", tel:"+34 655 873 902",
    estado:"limpiando", donde:"aticport", desde:"10:20", fichaje:"08:03", contrato:40,
    horasSemana:13.5, horasMes:58, vacaciones:12, valoracion:4.9, limpiezasMes:36,
    hoy:[
      { h:"08:03", txt:"Fichaje de entrada · Cala Ratjada", tipo:"ficha" },
      { h:"08:20", txt:"Repaso y supervisión · Villa Son Moll", tipo:"tarea" },
      { h:"10:20", txt:"Limpieza check-out · Àtic del Port (en curso)", tipo:"tarea" },
    ]},
  { id:"fatima",  nombre:"Fátima El Amrani", rol:"Limpieza",            color:"#4f8a5c", tel:"+34 655 664 209",
    estado:"limpiando", donde:"aticport", desde:"10:20", fichaje:"08:05", contrato:35,
    horasSemana:12, horasMes:52, vacaciones:10, valoracion:4.7, limpiezasMes:33,
    hoy:[
      { h:"08:05", txt:"Fichaje de entrada · Cala Ratjada", tipo:"ficha" },
      { h:"08:20", txt:"Repaso y supervisión · Villa Son Moll", tipo:"tarea" },
      { h:"10:20", txt:"Limpieza check-out · Àtic del Port (en curso)", tipo:"tarea" },
    ]},
  { id:"yolanda", nombre:"Yolanda Ruiz",     rol:"Limpieza",            color:"#4a7fa5", tel:"+34 655 118 476",
    estado:"ruta", donde:"betlem", desde:"10:38", eta:"11:05", fichaje:"08:00", contrato:40,
    horasSemana:13, horasMes:57, vacaciones:8, valoracion:4.8, limpiezasMes:35,
    ruta:{ desde:{x:28,y:33}, hasta:{x:27,y:12} },
    hoy:[
      { h:"08:00", txt:"Fichaje de entrada · Oficina Artà", tipo:"ficha" },
      { h:"08:12", txt:"Limpieza check-out · Finca Es Rafal", tipo:"tarea" },
      { h:"10:38", txt:"En ruta hacia Casa Betlem Mar · llegada 11:05", tipo:"ruta" },
    ]},
  { id:"marta",   nombre:"Marta Riera",      rol:"Limpieza",            color:"#c79c3d", tel:"+34 655 990 811",
    estado:"descanso", donde:"Oficina Artà", desde:"10:30", hasta:"11:00", fichaje:"07:55", contrato:35,
    horasSemana:12.5, horasMes:54, vacaciones:13, valoracion:4.6, limpiezasMes:31,
    pos:{x:28.5,y:44},
    hoy:[
      { h:"07:55", txt:"Fichaje de entrada · Oficina Artà", tipo:"ficha" },
      { h:"08:12", txt:"Limpieza a fondo · Finca Es Rafal", tipo:"tarea" },
      { h:"10:30", txt:"Pausa de descanso (10:30–11:00)", tipo:"pausa" },
    ]},
  { id:"miquel",  nombre:"Miquel Alzamora",  rol:"Mantenimiento",       color:"#b5533c", tel:"+34 655 300 245",
    estado:"mantenimiento", donde:"sonmoll", desde:"09:40", fichaje:"08:10", contrato:40,
    horasSemana:15, horasMes:66, vacaciones:7, valoracion:4.9, limpiezasMes:0, partes:14,
    hoy:[
      { h:"08:10", txt:"Fichaje de entrada · Taller Artà", tipo:"ficha" },
      { h:"08:30", txt:"Revisión caldera · Finca Na Blanca", tipo:"tarea" },
      { h:"09:40", txt:"Incidencia fuga grifo · Villa Son Moll (en curso)", tipo:"inc" },
    ]},
  { id:"toni",    nombre:"Toni Massanet",    rol:"Piscinas y jardines", color:"#4a7fa5", tel:"+34 655 781 559",
    estado:"ruta", donde:"costapins", desde:"10:32", eta:"10:55", fichaje:"07:45", contrato:40,
    horasSemana:15.5, horasMes:68, vacaciones:6, valoracion:4.8, limpiezasMes:0, partes:22,
    ruta:{ desde:{x:60,y:12}, hasta:{x:70,y:64} },
    hoy:[
      { h:"07:45", txt:"Fichaje de entrada · Taller Artà", tipo:"ficha" },
      { h:"08:05", txt:"Mantenimiento piscina · Villa Cala Mesquida", tipo:"tarea" },
      { h:"10:32", txt:"En ruta hacia Xalet Costa dels Pins · llegada 10:55", tipo:"ruta" },
    ]},
  { id:"xisca",   nombre:"Xisca Esteva",     rol:"Lavandería",          color:"#84759f", tel:"+34 655 402 793",
    estado:"lavanderia", donde:"Lavandería Artà", desde:"08:00", fichaje:"08:00", contrato:40,
    horasSemana:14, horasMes:61, vacaciones:14, valoracion:4.8, kgMes:1240,
    pos:{x:38.5,y:44.5},
    hoy:[
      { h:"08:00", txt:"Fichaje de entrada · Lavandería Artà", tipo:"ficha" },
      { h:"08:10", txt:"Procesado ropa Hotel CR Suites (86 kg)", tipo:"tarea" },
      { h:"10:05", txt:"Preparando entregas de la tarde", tipo:"tarea" },
    ]},
  { id:"pedro",   nombre:"Pedro Sansó",      rol:"Lavandería · reparto",color:"#84759f", tel:"+34 655 518 660",
    estado:"lavanderia", donde:"Lavandería Artà", desde:"08:00", fichaje:"08:00", contrato:40,
    horasSemana:14, horasMes:60, vacaciones:10, valoracion:4.7, kgMes:0,
    pos:{x:41,y:47.5},
    hoy:[
      { h:"08:00", txt:"Fichaje de entrada · Lavandería Artà", tipo:"ficha" },
      { h:"08:30", txt:"Recogida ropa · Restaurant Es Port", tipo:"tarea" },
      { h:"10:10", txt:"Carga de furgoneta · entregas 12:00", tipo:"tarea" },
    ]},
  { id:"laura",   nombre:"Laura Bauzá",      rol:"Coordinación",        color:"#555f50", tel:"+34 655 958 897",
    estado:"oficina", donde:"Oficina Artà", desde:"08:30", fichaje:"08:30", contrato:40,
    horasSemana:13, horasMes:59, vacaciones:15, valoracion:5.0,
    pos:{x:35.5,y:35.5},
    hoy:[
      { h:"08:30", txt:"Fichaje de entrada · Oficina Artà", tipo:"ficha" },
      { h:"09:00", txt:"Plan del día enviado al equipo", tipo:"tarea" },
      { h:"10:12", txt:"Llamada propietario Villa Es Molí (Sr. Jensen)", tipo:"tarea" },
    ]},
  { id:"sofia",   nombre:"Sofía Herrera",    rol:"Limpieza",            color:"#84759f", tel:"+34 655 233 481",
    estado:"vacaciones", donde:"Vacaciones", hasta:"19 jul", fichaje:null, contrato:35,
    horasSemana:0, horasMes:38, vacaciones:4, valoracion:4.7, limpiezasMes:22,
    hoy:[] },
];

/* ---------- PLAN DE HOY ---------- */
const PLAN = {
  checkouts: [
    { propId:"esmoli",   h:"10:00", plazas:8, hecho:true  },
    { propId:"aticport", h:"10:00", plazas:4, hecho:true  },
    { propId:"betlem",   h:"10:30", plazas:6, hecho:true  },
    { propId:"espins",   h:"11:00", plazas:4, hecho:false },
  ],
  limpiezas: [
    { id:"t1", propId:"esrafal",  equipo:["cati","ionela","yolanda","marta"], ini:"08:12", fin:"10:05", estado:"hecha",    tipo:"A fondo · post estancia larga" },
    { id:"t2", propId:"esmoli",   equipo:["cati","ionela"],  ini:"10:15", fin:"12:30", estado:"encurso", tipo:"Check-out → Check-in 16:00" },
    { id:"t3", propId:"aticport", equipo:["antonia","fatima"], ini:"10:20", fin:"12:00", estado:"encurso", tipo:"Check-out → Check-in 15:00" },
    { id:"t4", propId:"betlem",   equipo:["yolanda"],        ini:"11:05", fin:"12:45", estado:"pendiente", tipo:"Check-out · sin entrada hoy" },
    { id:"t5", propId:"espins",   equipo:["antonia","fatima"], ini:"12:30", fin:"14:00", estado:"pendiente", tipo:"Check-out → Check-in 17:00" },
    { id:"t6", propId:"saduaia",  equipo:["cati","ionela"],  ini:"13:30", fin:"15:15", estado:"pendiente", tipo:"Puesta a punto · Check-in 16:00" },
    { id:"t7", propId:"costapins",equipo:["toni"],           ini:"10:55", fin:"11:40", estado:"pendiente", tipo:"Piscina · análisis y limpieza" },
  ],
  checkins: [
    { propId:"aticport", h:"15:00", noches:7,  canal:"Airbnb"  },
    { propId:"esmoli",   h:"16:00", noches:10, canal:"Booking" },
    { propId:"saduaia",  h:"16:00", noches:5,  canal:"Vrbo"    },
    { propId:"espins",   h:"17:00", noches:7,  canal:"Airbnb"  },
  ],
};

/* ---------- INCIDENCIAS ---------- */
let INCIDENCIAS = [
  { id:"i-241", propId:"sonmoll",  titulo:"Fuga en grifo del baño principal", prio:"alta",
    desc:"El monomando del lavabo pierde agua por la base. Cerrada llave de paso del baño. Huéspedes avisados.",
    por:"antonia", fecha:"Hoy · 08:25", estado:"encurso", asignada:"miquel", coste:85,
    tl:[ {h:"08:25", t:"Reportada por Antònia Sureda con 2 fotos"},
         {h:"08:40", t:"Asignada a Miquel Alzamora (prioridad alta)"},
         {h:"09:40", t:"Miquel en el inmueble · diagnóstico: cartucho monomando"} ] },
  { id:"i-240", propId:"salzina",  titulo:"Persiana atascada en dormitorio 2", prio:"media",
    desc:"La persiana del dormitorio 2 no sube del todo, la cinta está deshilachada.",
    por:"cati", fecha:"Ayer · 17:10", estado:"abierta", asignada:null, coste:null,
    tl:[ {h:"17:10", t:"Reportada por Cati Ginard con 1 foto"} ] },
  { id:"i-239", propId:"espins",   titulo:"Mando del aire acondicionado no responde", prio:"media",
    desc:"Cambiadas pilas y sigue sin responder. Posible receptor de la unidad interior.",
    por:"fatima", fecha:"Ayer · 12:40", estado:"abierta", asignada:"miquel", coste:40,
    tl:[ {h:"12:40", t:"Reportada por Fátima El Amrani"},
         {h:"13:05", t:"Asignada a Miquel Alzamora · visita prevista hoy 16:00"} ] },
  { id:"i-238", propId:"esmoli",   titulo:"Robot de piscina sin succión", prio:"media",
    desc:"El robot limpiafondos no aspira. Filtro y turbina revisados en taller.",
    por:"toni", fecha:"10 jul", estado:"resuelta", asignada:"toni", coste:0,
    tl:[ {h:"10 jul", t:"Reportada por Toni Massanet"},
         {h:"11 jul", t:"Reparada turbina en taller · repuesto en garantía"},
         {h:"11 jul", t:"Verificada en la piscina · funcionamiento correcto"} ] },
  { id:"i-237", propId:"nablanca", titulo:"Bombilla fundida en terraza", prio:"baja",
    desc:"Aplique exterior de la terraza principal sin luz.",
    por:"yolanda", fecha:"9 jul", estado:"resuelta", asignada:"miquel", coste:6,
    tl:[ {h:"9 jul", t:"Reportada por Yolanda Ruiz"}, {h:"9 jul", t:"Sustituida por LED E27 cálida"} ] },
  { id:"i-236", propId:"canyamel", titulo:"Router wifi se reinicia solo", prio:"alta",
    desc:"Los huéspedes reportan cortes de wifi cada pocas horas.",
    por:"laura", fecha:"8 jul", estado:"resuelta", asignada:"miquel", coste:59,
    tl:[ {h:"8 jul", t:"Reportada desde recepción de huéspedes"},
         {h:"8 jul", t:"Sustituido router · red reconfigurada con mismo SSID"} ] },
];

/* ---------- FICHAJES HOY ---------- */
const FICHAJES = [
  { emp:"toni",    entrada:"07:45", lugar:"Taller Artà",       pausas:"—",            salida:null,    total:"En curso" },
  { emp:"marta",   entrada:"07:55", lugar:"Oficina Artà",      pausas:"10:30–…",      salida:null,    total:"En curso" },
  { emp:"cati",    entrada:"07:58", lugar:"Oficina Artà",      pausas:"—",            salida:null,    total:"En curso" },
  { emp:"yolanda", entrada:"08:00", lugar:"Oficina Artà",      pausas:"—",            salida:null,    total:"En curso" },
  { emp:"xisca",   entrada:"08:00", lugar:"Lavandería Artà",   pausas:"—",            salida:null,    total:"En curso" },
  { emp:"pedro",   entrada:"08:00", lugar:"Lavandería Artà",   pausas:"—",            salida:null,    total:"En curso" },
  { emp:"ionela",  entrada:"08:01", lugar:"Oficina Artà",      pausas:"—",            salida:null,    total:"En curso" },
  { emp:"antonia", entrada:"08:03", lugar:"Cala Ratjada",      pausas:"—",            salida:null,    total:"En curso" },
  { emp:"fatima",  entrada:"08:05", lugar:"Cala Ratjada",      pausas:"—",            salida:null,    total:"En curso" },
  { emp:"miquel",  entrada:"08:10", lugar:"Taller Artà",       pausas:"—",            salida:null,    total:"En curso" },
  { emp:"laura",   entrada:"08:30", lugar:"Oficina Artà",      pausas:"—",            salida:null,    total:"En curso" },
];

/* ---------- LAVANDERÍA ---------- */
const LAVANDERIA = {
  pedidos: [
    { id:"LV-812", cliente:"Hotel CR Suites",        tipo:"Recogida",  kg:86, cuando:"Hoy 08:30", estado:"enproceso" },
    { id:"LV-813", cliente:"Restaurant Es Port",     tipo:"Recogida",  kg:24, cuando:"Hoy 08:55", estado:"enproceso" },
    { id:"LV-814", cliente:"Villa Es Molí (renting)",tipo:"Entrega",   kg:18, cuando:"Hoy 12:00", estado:"listo" },
    { id:"LV-815", cliente:"Àtic del Port (renting)",tipo:"Entrega",   kg:9,  cuando:"Hoy 12:30", estado:"listo" },
    { id:"LV-816", cliente:"Agroturisme Son Vives",  tipo:"Recogida",  kg:52, cuando:"Hoy 16:00", estado:"pendiente" },
    { id:"LV-817", cliente:"Apartament Es Pins (renting)", tipo:"Entrega", kg:8, cuando:"Mañana 09:00", estado:"pendiente" },
  ],
  renting: [
    { cliente:"Hotel CR Suites",       juegos:120, circulando:74, lavanderia:46 },
    { cliente:"Agroturisme Son Vives", juegos:44,  circulando:28, lavanderia:16 },
    { cliente:"Restaurant Es Port",    juegos:36,  circulando:22, lavanderia:14 },
    { cliente:"Propiedades Hygge (12)",juegos:110, circulando:67, lavanderia:43 },
  ],
  kgMeses: [ ["feb",1480],["mar",1720],["abr",2260],["may",2840],["jun",3390],["jul (en curso)",1610] ],
};

/* ---------- FACTURACIÓN ---------- */
let FACTURAS = [
  { num:"HSM-2026-118", cliente:"Familia Jensen · Villa Es Molí",        tipo:"Propietario", concepto:"Gestión integral junio 2026", base:1240.00, fecha:"01/07/2026", estado:"cobrada" },
  { num:"HSM-2026-119", cliente:"Sra. Larsen · Finca Na Blanca",         tipo:"Propietario", concepto:"Gestión integral junio 2026", base:980.00,  fecha:"01/07/2026", estado:"cobrada" },
  { num:"HSM-2026-120", cliente:"Familia Müller · Casa Canyamel Beach",  tipo:"Propietario", concepto:"Gestión integral junio 2026", base:890.00,  fecha:"01/07/2026", estado:"cobrada" },
  { num:"HSM-2026-121", cliente:"Sr. Andersson · Àtic del Port",         tipo:"Propietario", concepto:"Gestión integral junio 2026", base:840.00,  fecha:"01/07/2026", estado:"emitida" },
  { num:"HSM-2026-122", cliente:"Familia Schmidt · Finca S'Alzina",      tipo:"Propietario", concepto:"Gestión integral junio 2026", base:1420.00, fecha:"01/07/2026", estado:"emitida" },
  { num:"HSM-2026-123", cliente:"Hotel CR Suites",                       tipo:"Lavandería",  concepto:"Servicio lavandería junio · 1.180 kg", base:1652.00, fecha:"02/07/2026", estado:"cobrada" },
  { num:"HSM-2026-124", cliente:"Restaurant Es Port",                    tipo:"Lavandería",  concepto:"Servicio lavandería junio · 420 kg",   base:588.00,  fecha:"02/07/2026", estado:"vencida" },
  { num:"HSM-2026-125", cliente:"Agroturisme Son Vives",                 tipo:"Lavandería",  concepto:"Lavandería + renting junio",           base:934.00,  fecha:"02/07/2026", estado:"emitida" },
  { num:"HSM-2026-126", cliente:"Familia Hansen · Xalet Costa dels Pins",tipo:"Propietario", concepto:"Gestión integral junio 2026", base:1130.00, fecha:"01/07/2026", estado:"cobrada" },
  { num:"HSM-2026-127", cliente:"Sra. Fischer · Apartament Es Pins",     tipo:"Propietario", concepto:"Gestión integral junio 2026", base:760.00,  fecha:"01/07/2026", estado:"emitida" },
];

/* ---------- INFORME JUNIO (para generador de documentos) ---------- */
const INFORME_JUNIO = {
  horasEmpleados: [
    { emp:"miquel",  horas:176, extra:8,  limpiezas:null, partes:31 },
    { emp:"antonia", horas:172, extra:4,  limpiezas:44, partes:null },
    { emp:"toni",    horas:170, extra:2,  limpiezas:null, partes:38 },
    { emp:"cati",    horas:168, extra:0,  limpiezas:47, partes:null },
    { emp:"xisca",   horas:168, extra:0,  limpiezas:null, partes:null },
    { emp:"laura",   horas:168, extra:0,  limpiezas:null, partes:null },
    { emp:"pedro",   horas:165, extra:0,  limpiezas:null, partes:null },
    { emp:"ionela",  horas:160, extra:0,  limpiezas:42, partes:null },
    { emp:"yolanda", horas:154, extra:0,  limpiezas:39, partes:null },
    { emp:"fatima",  horas:148, extra:0,  limpiezas:35, partes:null },
    { emp:"marta",   horas:141, extra:0,  limpiezas:33, partes:null },
    { emp:"sofia",   horas:138, extra:0,  limpiezas:30, partes:null },
  ],
  ocupacionProps: [
    { propId:"aticport", noches:28, ocup:93, limpiezas:9,  horasLimp:23, ingresos:4390 },
    { propId:"esmoli",   noches:27, ocup:90, limpiezas:8,  horasLimp:36, ingresos:6570 },
    { propId:"canyamel", noches:26, ocup:87, limpiezas:8,  horasLimp:25, ingresos:4750 },
    { propId:"espins",   noches:26, ocup:87, limpiezas:9,  horasLimp:21, ingresos:3740 },
    { propId:"sonmoll",  noches:25, ocup:83, limpiezas:7,  horasLimp:32, ingresos:5890 },
    { propId:"mesquida", noches:25, ocup:83, limpiezas:7,  horasLimp:34, ingresos:6060 },
    { propId:"costapins",noches:24, ocup:80, limpiezas:7,  horasLimp:30, ingresos:5750 },
    { propId:"nablanca", noches:24, ocup:80, limpiezas:6,  horasLimp:28, ingresos:4980 },
    { propId:"betlem",   noches:23, ocup:77, limpiezas:7,  horasLimp:24, ingresos:4340 },
    { propId:"saduaia",  noches:21, ocup:70, limpiezas:6,  horasLimp:26, ingresos:4230 },
    { propId:"salzina",  noches:23, ocup:77, limpiezas:6,  horasLimp:41, ingresos:7100 },
    { propId:"esrafal",  noches:20, ocup:67, limpiezas:6,  horasLimp:49, ingresos:7900 },
  ],
};

/* ---------- OCUPACIÓN 12 MESES (dashboard) ---------- */
const OCUPACION_12M = [
  ["ago 25",92],["sep",78],["oct",55],["nov",32],["dic",41],["ene 26",28],
  ["feb",33],["mar",47],["abr",62],["may",71],["jun",84],["jul",87],
];

/* ---------- PROPIETARIOS ---------- */
const OWNERS = [
  { nombre:"Familia Jensen",   pais:"Dinamarca", props:["esmoli"],    liq:5580, estado:"enviada" },
  { nombre:"Sra. Larsen",      pais:"Dinamarca", props:["nablanca"],  liq:4190, estado:"enviada" },
  { nombre:"Familia Müller",   pais:"Alemania",  props:["canyamel"],  liq:3860, estado:"enviada" },
  { nombre:"Sr. Andersson",    pais:"Suecia",    props:["aticport"],  liq:3550, estado:"pendiente" },
  { nombre:"Familia Schmidt",  pais:"Alemania",  props:["salzina"],   liq:5680, estado:"pendiente" },
  { nombre:"Sr. y Sra. Nielsen",pais:"Dinamarca",props:["mesquida"],  liq:4920, estado:"enviada" },
  { nombre:"Sra. Fischer",     pais:"Alemania",  props:["espins"],    liq:2980, estado:"enviada" },
  { nombre:"Familia Berg",     pais:"Noruega",   props:["saduaia"],   liq:3400, estado:"enviada" },
  { nombre:"Sr. Johansen",     pais:"Dinamarca", props:["sonmoll"],   liq:4720, estado:"pendiente" },
  { nombre:"Familia Weber",    pais:"Alemania",  props:["esrafal"],   liq:6320, estado:"enviada" },
  { nombre:"Sra. Lindqvist",   pais:"Suecia",    props:["betlem"],    liq:3470, estado:"enviada" },
  { nombre:"Familia Hansen",   pais:"Dinamarca", props:["costapins"], liq:4600, estado:"enviada" },
];

/* ---------- NOTIFICACIONES ---------- */
const NOTIFS = [
  { ic:"terra", svg:"alert", b:"Incidencia alta en Villa Son Moll",  t:"Fuga en grifo · Miquel está en el inmueble", hace:"hace 1 h" },
  { ic:"gold",  svg:"invoice", b:"Factura HSM-2026-124 vencida",     t:"Restaurant Es Port · 711,48 € · 10 días", hace:"hace 2 h" },
  { ic:"ok",    svg:"check", b:"Limpieza completada · Finca Es Rafal", t:"Equipo de 4 · 1 h 53 min · checklist 100 %", hace:"hace 37 min" },
  { ic:"blue",  svg:"route", b:"Yolanda en ruta a Casa Betlem Mar",  t:"Llegada estimada 11:05", hace:"hace 4 min" },
  { ic:"lilac", svg:"laundry", b:"Stock de toallas bajo · Hotel CR Suites", t:"Quedan 12 juegos en circulación", hace:"ayer" },
];

/* ---------- PLANTILLA CHECKLIST LIMPIEZA ---------- */
const CHECKLIST_BASE = [
  "Ventilar y revisar desperfectos (fotos si hay daños)",
  "Retirar ropa usada y contar juegos para lavandería",
  "Cocina: electrodomésticos, vajilla y superficies",
  "Baños: sanitarios, mampara, espejos y reposición amenities",
  "Dormitorios: hacer camas con juego limpio del renting",
  "Suelos de toda la vivienda y terrazas",
  "Reponer kit de bienvenida Hygge",
  "Foto final de cada estancia en la app",
];

/* ---------- USUARIO EMPLEADO DEMO ---------- */
const EMP_DEMO = "cati";

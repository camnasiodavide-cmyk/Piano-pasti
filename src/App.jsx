import { useState, useEffect } from "react";

const INGREDIENTI_DB = [
  // Carni
  { id: "i1",  nome: "Petto di pollo",           prot: 31,  kcal: 165, per100: true,  categoria: "carne",        colore: "#e8a23a", emoji: "🍗" },
  { id: "i2",  nome: "Petto di tacchino",         prot: 29,  kcal: 157, per100: true,  categoria: "carne",        colore: "#e8a23a", emoji: "🦃" },
  { id: "i3",  nome: "Bresaola",                  prot: 33,  kcal: 151, per100: true,  categoria: "carne",        colore: "#e8a23a", emoji: "🥩" },
  { id: "i4",  nome: "Prosciutto cotto",          prot: 19,  kcal: 215, per100: true,  categoria: "carne",        colore: "#e8a23a", emoji: "🥩" },
  { id: "i5",  nome: "Manzo magro",               prot: 26,  kcal: 187, per100: true,  categoria: "carne",        colore: "#e8a23a", emoji: "🥩" },
  { id: "i6",  nome: "Lonza di maiale",           prot: 22,  kcal: 182, per100: true,  categoria: "carne",        colore: "#e8a23a", emoji: "🥩" },
  // Pesce
  { id: "i7",  nome: "Tonno al naturale",         prot: 25,  kcal: 116, per100: true,  categoria: "pesce",        colore: "#5b9bd4", emoji: "🐟" },
  { id: "i8",  nome: "Salmone",                   prot: 20,  kcal: 208, per100: true,  categoria: "pesce",        colore: "#5b9bd4", emoji: "🐟" },
  { id: "i9",  nome: "Merluzzo",                  prot: 20,  kcal: 90,  per100: true,  categoria: "pesce",        colore: "#5b9bd4", emoji: "🐟" },
  { id: "i10", nome: "Sogliola / Platessa",        prot: 17,  kcal: 83,  per100: true,  categoria: "pesce",        colore: "#5b9bd4", emoji: "🐟" },
  { id: "i11", nome: "Sgombro",                   prot: 19,  kcal: 205, per100: true,  categoria: "pesce",        colore: "#5b9bd4", emoji: "🐟" },
  { id: "i12", nome: "Gamberi",                   prot: 18,  kcal: 85,  per100: true,  categoria: "pesce",        colore: "#5b9bd4", emoji: "🦐" },
  { id: "i13", nome: "Polpo (cotto)",             prot: 15,  kcal: 82,  per100: true,  categoria: "pesce",        colore: "#5b9bd4", emoji: "🐙" },
  { id: "i14", nome: "Tonno sott'olio (sgoc.)",   prot: 26,  kcal: 198, per100: true,  categoria: "pesce",        colore: "#5b9bd4", emoji: "🐟" },
  // Uova
  { id: "i15", nome: "Uovo intero",               prot: 6,   kcal: 78,  per100: false, unitLabel: "uovo", categoria: "uova", colore: "#d4a843", emoji: "🥚" },
  { id: "i16", nome: "Albume",                    prot: 11,  kcal: 52,  per100: true,  categoria: "uova",         colore: "#d4a843", emoji: "🥚" },
  // Latticini
  { id: "i17", nome: "Yogurt greco",              prot: 10,  kcal: 97,  per100: true,  categoria: "latticini",    colore: "#a87fd4", emoji: "🥛" },
  { id: "i18", nome: "Ricotta",                   prot: 11,  kcal: 174, per100: true,  categoria: "latticini",    colore: "#a87fd4", emoji: "🧀" },
  { id: "i19", nome: "Latte intero",              prot: 3.4, kcal: 61,  per100: true,  categoria: "latticini",    colore: "#a87fd4", emoji: "🥛" },
  { id: "i20", nome: "Fiocchi di latte",          prot: 11,  kcal: 103, per100: true,  categoria: "latticini",    colore: "#a87fd4", emoji: "🧀" },
  { id: "i21", nome: "Mozzarella",                prot: 18,  kcal: 280, per100: true,  categoria: "latticini",    colore: "#a87fd4", emoji: "🧀" },
  { id: "i22", nome: "Parmigiano",                prot: 36,  kcal: 431, per100: true,  categoria: "latticini",    colore: "#a87fd4", emoji: "🧀" },
  { id: "i23", nome: "Skyr",                      prot: 11,  kcal: 63,  per100: true,  categoria: "latticini",    colore: "#a87fd4", emoji: "🥛" },
  // Legumi
  { id: "i24", nome: "Ceci (cotti)",              prot: 9,   kcal: 164, per100: true,  categoria: "legumi",       colore: "#5eb885", emoji: "🫘" },
  { id: "i25", nome: "Fagioli cannellini",        prot: 8,   kcal: 140, per100: true,  categoria: "legumi",       colore: "#5eb885", emoji: "🫘" },
  { id: "i26", nome: "Lenticchie rosse",          prot: 9,   kcal: 116, per100: true,  categoria: "legumi",       colore: "#5eb885", emoji: "🫘" },
  { id: "i27", nome: "Fagioli borlotti",          prot: 7,   kcal: 130, per100: true,  categoria: "legumi",       colore: "#5eb885", emoji: "🫘" },
  { id: "i28", nome: "Edamame",                   prot: 11,  kcal: 122, per100: true,  categoria: "legumi",       colore: "#5eb885", emoji: "🫘" },
  { id: "i29", nome: "Tofu",                      prot: 8,   kcal: 76,  per100: true,  categoria: "legumi",       colore: "#5eb885", emoji: "🫘" },
  // Carboidrati
  { id: "i30", nome: "Riso (cotto)",              prot: 2.7, kcal: 130, per100: true,  categoria: "carboidrati",  colore: "#cc8844", emoji: "🍚" },
  { id: "i31", nome: "Pasta integrale (cotta)",   prot: 5,   kcal: 157, per100: true,  categoria: "carboidrati",  colore: "#cc8844", emoji: "🍝" },
  { id: "i32", nome: "Pane integrale",            prot: 9,   kcal: 247, per100: true,  categoria: "carboidrati",  colore: "#cc8844", emoji: "🍞" },
  { id: "i33", nome: "Fiocchi d'avena",           prot: 13,  kcal: 389, per100: true,  categoria: "carboidrati",  colore: "#cc8844", emoji: "🌾" },
  { id: "i34", nome: "Piadina integrale",         prot: 9,   kcal: 280, per100: true,  categoria: "carboidrati",  colore: "#cc8844", emoji: "🫓" },
  { id: "i35", nome: "Quinoa (cotta)",            prot: 4,   kcal: 120, per100: true,  categoria: "carboidrati",  colore: "#cc8844", emoji: "🌾" },
  { id: "i36", nome: "Patata dolce",              prot: 1.6, kcal: 86,  per100: true,  categoria: "carboidrati",  colore: "#cc8844", emoji: "🍠" },
  { id: "i47", nome: "Farro (cotto)",             prot: 7,   kcal: 170, per100: true,  categoria: "carboidrati",  colore: "#cc8844", emoji: "🌾" },
  { id: "i48", nome: "Orzo (cotto)",              prot: 4,   kcal: 123, per100: true,  categoria: "carboidrati",  colore: "#cc8844", emoji: "🌾" },
  { id: "i49", nome: "Patate (cotte)",            prot: 2,   kcal: 87,  per100: true,  categoria: "carboidrati",  colore: "#cc8844", emoji: "🥔" },
  { id: "i50", nome: "Biscotti integrali",        prot: 1.2, kcal: 45,  per100: false, unitLabel: "biscotto (15g)", categoria: "carboidrati", colore: "#cc8844", emoji: "🍪" },
  // Frutta secca
  { id: "i37", nome: "Burro di arachidi",         prot: 25,  kcal: 588, per100: true,  categoria: "frutta secca", colore: "#c4a244", emoji: "🥜" },
  { id: "i38", nome: "Mandorle",                  prot: 21,  kcal: 579, per100: true,  categoria: "frutta secca", colore: "#c4a244", emoji: "🌰" },
  { id: "i39", nome: "Noci",                      prot: 15,  kcal: 654, per100: true,  categoria: "frutta secca", colore: "#c4a244", emoji: "🌰" },
  { id: "i40", nome: "Arachidi",                  prot: 26,  kcal: 567, per100: true,  categoria: "frutta secca", colore: "#c4a244", emoji: "🥜" },
  // Verdure
  { id: "i41", nome: "Spinaci freschi",           prot: 2.9, kcal: 23,  per100: true,  categoria: "verdure",      colore: "#4a9e6a", emoji: "🥬" },
  { id: "i42", nome: "Broccoli (cotti)",          prot: 3,   kcal: 35,  per100: true,  categoria: "verdure",      colore: "#4a9e6a", emoji: "🥦" },
  { id: "i43", nome: "Zucchine",                  prot: 1.8, kcal: 17,  per100: true,  categoria: "verdure",      colore: "#4a9e6a", emoji: "🥒" },
  { id: "i44", nome: "Funghi champignon",         prot: 3.1, kcal: 22,  per100: true,  categoria: "verdure",      colore: "#4a9e6a", emoji: "🍄" },
  { id: "i45", nome: "Piselli (cotti)",           prot: 5,   kcal: 84,  per100: true,  categoria: "verdure",      colore: "#4a9e6a", emoji: "🫛" },
  { id: "i46", nome: "Cavolo riccio (kale)",      prot: 4.3, kcal: 49,  per100: true,  categoria: "verdure",      colore: "#4a9e6a", emoji: "🥬" },
];

const RICETTE_DB = [
  { id: "r1",  nome: "Pollo e riso alla piastra",              prot: 55, tempo: 15, pasto: "pranzo",    ingredienti: ["200g petto pollo", "80g riso", "verdure grigliate", "olio EVO"] },
  { id: "r2",  nome: "Pasta al tonno veloce",                  prot: 50, tempo: 10, pasto: "pranzo",    ingredienti: ["80g pasta integrale", "2 scatolette tonno", "pomodorini", "olio EVO"] },
  { id: "r3",  nome: "Frittata al tonno",                      prot: 55, tempo: 8,  pasto: "pranzo",    ingredienti: ["4 uova", "1 scatoletta tonno", "olio", "erba cipollina"] },
  { id: "r4",  nome: "Insalata tonno e uova sode",             prot: 52, tempo: 5,  pasto: "pranzo",    ingredienti: ["2 uova", "1 scatoletta tonno", "pomodori", "mais", "limone"] },
  { id: "r5",  nome: "Salmone al forno con patate dolci",      prot: 48, tempo: 25, pasto: "pranzo",    ingredienti: ["150g salmone", "200g patate dolci", "limone", "timo"] },
  { id: "r6",  nome: "Insalata di tacchino e fagioli",         prot: 50, tempo: 5,  pasto: "pranzo",    ingredienti: ["200g tacchino", "fagioli cannellini", "pomodori", "mais"] },
  { id: "r7",  nome: "Merluzzo con zucchine e riso",           prot: 50, tempo: 20, pasto: "pranzo",    ingredienti: ["200g merluzzo", "80g riso integrale", "2 zucchine", "aglio"] },
  { id: "r8",  nome: "Bowl yogurt greco e pollo",              prot: 55, tempo: 10, pasto: "pranzo",    ingredienti: ["150g pollo", "150g yogurt greco", "cetrioli", "pomodorini"] },
  { id: "r9",  nome: "Wrap tacchino e ricotta",                prot: 45, tempo: 5,  pasto: "pranzo",    ingredienti: ["2 piadine integrali", "150g tacchino", "100g ricotta", "insalata"] },
  { id: "r10", nome: "Latte + uova strapazzate",               prot: 22, tempo: 8,  pasto: "colazione", ingredienti: ["250ml latte", "2 uova", "2 fette biscottate integrali"] },
  { id: "r11", nome: "Yogurt greco + frutta + noci",           prot: 20, tempo: 5,  pasto: "colazione", ingredienti: ["150g yogurt greco", "1 banana", "20g noci"] },
  { id: "r12", nome: "Pane integrale + uova sode + bresaola",  prot: 28, tempo: 10, pasto: "colazione", ingredienti: ["2 fette pane integrale", "2 uova", "60g bresaola"] },
  { id: "r13", nome: "Avena con latte e frutta secca",         prot: 18, tempo: 5,  pasto: "colazione", ingredienti: ["60g fiocchi avena", "250ml latte", "20g frutta secca", "1 banana"] },
  { id: "r14", nome: "Pancakes proteici",                      prot: 30, tempo: 10, pasto: "colazione", ingredienti: ["2 uova", "1 banana matura", "30g fiocchi avena"] },
  { id: "r15", nome: "Frullato latte e burro arachidi",        prot: 25, tempo: 5,  pasto: "colazione", ingredienti: ["250ml latte", "1 banana", "2 cucchiai burro arachidi", "cacao"] },
  { id: "r16", nome: "Pollo alla piastra con verdure",         prot: 50, tempo: 20, pasto: "cena",      ingredienti: ["200g petto pollo", "zucchine", "peperoni", "carote", "rosmarino"] },
  { id: "r17", nome: "Salmone al vapore con broccoli",         prot: 45, tempo: 20, pasto: "cena",      ingredienti: ["180g salmone", "300g broccoli", "limone", "olio EVO"] },
  { id: "r18", nome: "Zuppa di legumi e tacchino",             prot: 45, tempo: 25, pasto: "cena",      ingredienti: ["150g tacchino", "fagioli borlotti", "ceci", "carota", "brodo"] },
  { id: "r19", nome: "Merluzzo al forno con patate",           prot: 48, tempo: 25, pasto: "cena",      ingredienti: ["200g merluzzo", "250g patate", "pomodorini", "olive", "capperi"] },
  { id: "r20", nome: "Tacchino in padella con funghi",         prot: 48, tempo: 15, pasto: "cena",      ingredienti: ["200g tacchino", "200g funghi", "aglio", "prezzemolo", "vino bianco"] },
  { id: "r21", nome: "Minestra lenticchie con uovo",           prot: 32, tempo: 20, pasto: "cena",      ingredienti: ["150g lenticchie rosse", "brodo vegetale", "carota", "2 uova"] },
  { id: "r22", nome: "Pollo in crosta di erbe con riso",       prot: 55, tempo: 20, pasto: "cena",      ingredienti: ["200g petto pollo", "80g riso", "pangrattato", "erbe aromatiche"] },
  { id: "r23", nome: "Sogliola con spinaci saltati",           prot: 42, tempo: 15, pasto: "cena",      ingredienti: ["250g sogliola", "300g spinaci freschi", "aglio", "limone"] },
  { id: "r24", nome: "Insalata di ceci e tonno",               prot: 48, tempo: 5,  pasto: "cena",      ingredienti: ["1 scatoletta tonno", "200g ceci", "pomodori", "cetriolo", "limone"] },
];

const CATEGORIE = ["tutti", "carne", "pesce", "uova", "latticini", "legumi", "carboidrati", "frutta secca", "verdure"];
const PASTI = ["colazione", "pranzo", "cena"];
const PASTO_META = { colazione: { emoji: "☀️", target: [20, 25] }, pranzo: { emoji: "⚡", target: [50, 55] }, cena: { emoji: "🌙", target: [40, 50] } };
const TARGET_PROT = 143;
const TARGET_KCAL = 2100;

export default function App() {
  const [tab, setTab] = useState("valori");
  const today = new Date().toISOString().split("T")[0];

  const [log, setLog] = useState(() => {
    try {
      const saved = localStorage.getItem("log");
      const savedDate = localStorage.getItem("logDate");
      if (saved && savedDate === today) return JSON.parse(saved);
    } catch { }
    return { colazione: [], pranzo: [], cena: [] };
  });

  const [spesa, setSpesa] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("tutti");
  const [ricerca, setRicerca] = useState("");
  const [ricercaRicette, setRicercaRicette] = useState("");
  const [pastoFiltro, setPastoFiltro] = useState("tutti");
  const [modalIngrediente, setModalIngrediente] = useState(null);
  const [grammi, setGrammi] = useState("");
  const [pastoDest, setPastoDest] = useState("colazione");

  const totPasto = (p) => Math.round(log[p].reduce((s, i) => s + i.protCalc, 0));
  const totGiorno = () => totPasto("colazione") + totPasto("pranzo") + totPasto("cena");
  const totKcalGiorno = () => Math.round(["colazione","pranzo","cena"].reduce((s, p) => s + log[p].reduce((a, i) => a + (i.kcalCalc || 0), 0), 0));
  const percProt = Math.min((totGiorno() / TARGET_PROT) * 100, 100);
  const percKcal = Math.min((totKcalGiorno() / TARGET_KCAL) * 100, 100);

  const apriIngrediente = (ing) => {
    setModalIngrediente(ing);
    setGrammi("");
    setPastoDest(pastoDest);
  };

  const calcolaValori = () => {
    if (!modalIngrediente || !grammi) return { prot: 0, kcal: 0 };
    const q = parseFloat(grammi || 0);
    if (!modalIngrediente.per100) {
      return {
        prot: Math.round(modalIngrediente.prot * q * 10) / 10,
        kcal: Math.round(modalIngrediente.kcal * q),
      };
    }
    return {
      prot: Math.round((modalIngrediente.prot * q) / 100 * 10) / 10,
      kcal: Math.round((modalIngrediente.kcal * q) / 100),
    };
  };

  const aggiungiAlTracker = () => {
    if (!grammi || parseFloat(grammi) <= 0) return;
    const { prot, kcal } = calcolaValori();
    const label = modalIngrediente.per100
      ? `${modalIngrediente.nome} (${grammi}g)`
      : `${modalIngrediente.nome} ×${grammi}`;
    setLog(prev => ({
      ...prev,
      [pastoDest]: [...prev[pastoDest], { uid: Date.now(), nome: label, protCalc: prot, kcalCalc: kcal, emoji: modalIngrediente.emoji }]
    }));
    setModalIngrediente(null);
  };

  const rimuoviLog = (pasto, uid) => setLog(prev => ({ ...prev, [pasto]: prev[pasto].filter(i => i.uid !== uid) }));

  const aggiungiAllaSpesa = (ing) => {
    if (spesa.find(s => s.id === ing.id)) return;
    setSpesa(prev => [...prev, { ...ing, spuntato: false }]);
  };

  const toggleSpesa = (id) => setSpesa(prev => prev.map(s => s.id === id ? { ...s, spuntato: !s.spuntato } : s));
  const rimuoviSpesa = (id) => setSpesa(prev => prev.filter(s => s.id !== id));

  useEffect(() => {
    localStorage.setItem("log", JSON.stringify(log));
    localStorage.setItem("logDate", today);
  }, [log]);

  const statoColore = (perc) => {
    if (perc === 0) return "#555";
    if (perc >= 90 && perc <= 105) return "#5eb885";
    if (perc < 90) return "#d4a843";
    return "#e05555";
  };

  const ingFiltrati = INGREDIENTI_DB
    .filter(i => categoriaFiltro === "tutti" || i.categoria === categoriaFiltro)
    .filter(i => i.nome.toLowerCase().includes(ricerca.toLowerCase()))
    .sort((a, b) => b.prot - a.prot);

  const ricetteFiltrate = RICETTE_DB
    .filter(r => pastoFiltro === "tutti" || r.pasto === pastoFiltro)
    .filter(r => r.nome.toLowerCase().includes(ricercaRicette.toLowerCase()));

  const { prot: protPreview, kcal: kcalPreview } = calcolaValori();

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#0f1117", color: "#e8e0d0" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #1a1d25; } ::-webkit-scrollbar-thumb { background: #d4a843; border-radius: 2px; }
        .btn { cursor: pointer; border: none; transition: all 0.2s; }
        .card { background: #1a1d25; border: 1px solid #2a2d35; border-radius: 12px; }
        .tag-prot { background: #1e3a2f; color: #5eb885; border-radius: 20px; padding: 2px 8px; font-size: 11px; font-family: monospace; }
        .tag-kcal { background: #2a1f0e; color: #e8a23a; border-radius: 20px; padding: 2px 8px; font-size: 11px; font-family: monospace; }
        .slide-in { animation: slideIn 0.2s ease; }
        @keyframes slideIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 50; display: flex; align-items: flex-end; justify-content: center; }
        .modal { background: #13161f; border-top: 2px solid #d4a843; border-radius: 20px 20px 0 0; width: 100%; max-width: 640px; max-height: 88vh; overflow-y: auto; padding: 24px; }
        .progress-bar { height: 5px; background: #1e2130; border-radius: 3px; overflow: hidden; }
        .tab-bottom { position: fixed; bottom: 0; left: 0; right: 0; background: #13161f; border-top: 1px solid #1e2130; display: flex; z-index: 40; }
        .tab-btn-b { flex: 1; padding: 10px 4px 18px; border: none; background: transparent; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; }
        .log-row { display: flex; align-items: center; gap: 6px; padding: 7px 0; border-bottom: 1px solid #1a1d25; }
        .log-row:last-child { border-bottom: none; }
        .ing-row { display: flex; align-items: center; padding: 11px 0; border-bottom: 1px solid #1a1d25; gap: 10px; }
        .ing-row:last-child { border-bottom: none; }
        .ing-actions { display: flex; gap: 6px; flex-shrink: 0; }
        .action-btn { border: none; border-radius: 8px; padding: 5px 9px; font-size: 13px; cursor: pointer; transition: all 0.15s; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        input { outline: none; }
        input:focus { border-color: #d4a843 !important; }
        .pasto-pill { padding: 6px 14px; border-radius: 20px; border: 1.5px solid; font-family: sans-serif; font-size: 13px; cursor: pointer; transition: all 0.15s; }
        .ricetta-card { background: #1a1d25; border: 1px solid #2a2d35; border-radius: 10px; padding: 12px 14px; margin-bottom: 8px; }
        .spesa-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #1a1d25; }
        .spesa-row:last-child { border-bottom: none; }
        .checkbox { width: 22px; height: 22px; border-radius: 6px; border: 2px solid #d4a843; display: flex; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; transition: all 0.2s; }
        .checkbox-done { background: #d4a843; }
        .del-btn { background: #2a1818; color: #e05555; border: 1px solid #3a2020; border-radius: 6px; padding: 3px 8px; font-size: 11px; cursor: pointer; flex-shrink: 0; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "60px 16px 0", maxWidth: 640, margin: "0 auto" }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 3, color: "#d4a843", textTransform: "uppercase" }}>Piano Alimentare · 95kg</span>
        <h1 style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.1, marginBottom: 16, marginTop: 2 }}>
          {tab === "tracker" && <>Tracker <span style={{ color: "#d4a843" }}>giornaliero</span></>}
          {tab === "ricette" && <>Le mie <span style={{ color: "#d4a843" }}>ricette</span></>}
          {tab === "valori" && <>Valori <span style={{ color: "#d4a843" }}>proteici</span></>}
          {tab === "spesa" && <>Lista <span style={{ color: "#d4a843" }}>spesa</span></>}
        </h1>
      </div>

      <div style={{ padding: "0 16px 100px", maxWidth: 640, margin: "0 auto" }}>

        {/* ===== TRACKER ===== */}
        {tab === "tracker" && (
          <div className="slide-in">
            {/* Riepilogo giorno */}
            <div className="card" style={{ padding: 16, marginBottom: 14 }}>
              <p style={{ fontFamily: "monospace", fontSize: 10, color: "#888", letterSpacing: 2, marginBottom: 10 }}>OGGI</p>
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                {/* Proteine */}
                <div style={{ flex: 1, background: "#0f1117", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: "#5eb885", fontFamily: "monospace" }}>🥩 PROT</span>
                    <span style={{ fontSize: 11, color: "#555", fontFamily: "monospace" }}>{TARGET_PROT}g</span>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: statoColore(percProt), marginBottom: 6 }}>{totGiorno()}g</div>
                  <div className="progress-bar">
                    <div style={{ height: "100%", width: `${percProt}%`, background: statoColore(percProt), borderRadius: 3, transition: "width 0.4s" }} />
                  </div>
                </div>
                {/* Calorie */}
                <div style={{ flex: 1, background: "#0f1117", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: "#e8a23a", fontFamily: "monospace" }}>🔥 KCAL</span>
                    <span style={{ fontSize: 11, color: "#555", fontFamily: "monospace" }}>{TARGET_KCAL}</span>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: statoColore(percKcal), marginBottom: 6 }}>{totKcalGiorno()}</div>
                  <div className="progress-bar">
                    <div style={{ height: "100%", width: `${percKcal}%`, background: statoColore(percKcal), borderRadius: 3, transition: "width 0.4s" }} />
                  </div>
                </div>
              </div>
              {(totGiorno() > 0 || totKcalGiorno() > 0) && (
                <button className="btn" onClick={() => setLog({ colazione: [], pranzo: [], cena: [] })} style={{ fontSize: 12, color: "#555", fontFamily: "sans-serif", background: "none" }}>
                  🔄 Reset giornata
                </button>
              )}
            </div>

            {/* Pasti */}
            {PASTI.map(pasto => {
              const { emoji, target } = PASTO_META[pasto];
              const att = totPasto(pasto);
              const col = statoColore(Math.min((att / target[1]) * 100, 110));
              const perc = Math.min((att / target[1]) * 100, 100);
              return (
                <div key={pasto} className="card" style={{ padding: 14, marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{emoji}</span>
                      <div>
                        <span style={{ fontSize: 16, fontWeight: 700, textTransform: "capitalize" }}>{pasto}</span>
                        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#555", marginLeft: 8 }}>{target[0]}-{target[1]}g</span>
                      </div>
                    </div>
                    <span style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: col }}>{att}g</span>
                  </div>
                  <div className="progress-bar" style={{ marginBottom: log[pasto].length ? 10 : 0 }}>
                    <div style={{ height: "100%", width: `${perc}%`, background: col, borderRadius: 3, transition: "width 0.4s" }} />
                  </div>
                  {log[pasto].length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      {log[pasto].map(item => (
                        <div key={item.uid} className="log-row">
                          <span style={{ fontSize: 14 }}>{item.emoji}</span>
                          <span style={{ flex: 1, fontSize: 12, color: "#ccc" }}>{item.nome}</span>
                          <span className="tag-prot">+{item.protCalc}g</span>
                          <span className="tag-kcal">+{item.kcalCalc}kcal</span>
                          <button className="del-btn" onClick={() => rimuoviLog(pasto, item.uid)}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="btn" onClick={() => { setTab("valori"); setPastoDest(pasto); }} style={{ width: "100%", marginTop: 10, padding: "8px", background: "#0f1117", border: "1px dashed #2a2d35", borderRadius: 8, color: "#666", fontSize: 13 }}>
                    + Aggiungi ingrediente
                  </button>
                </div>
              );
            })}

            {/* Suggerimento allenamento/riposo */}
            <div style={{ display: "flex", gap: 8, marginTop: 8, marginBottom: 8 }}>
              <div style={{ flex: 1, background: "#1f3320", border: "1px solid #3a6b3e", borderRadius: 10, padding: "12px 14px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#5eb885", marginBottom: 6 }}>⚡ Giorno allenamento</p>
                <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>Pranzo ricco di carboidrati (riso, pasta, farro, patate) entro 1 ora dalla fine. Ricarica il glicogeno e aiuta le proteine ad entrare nel muscolo.</p>
              </div>
              <div style={{ flex: 1, background: "#1a1f2e", border: "1px solid #2a3a5e", borderRadius: 10, padding: "12px 14px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#7a9ccc", marginBottom: 6 }}>😴 Giorno riposo</p>
                <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>Riduci i carboidrati del pranzo. Proteine uguali, porzioni di riso e pasta dimezzate o eliminate.</p>
              </div>
            </div>

            {/* Consigli */}
            <div style={{ marginTop: 4 }}>
              {[
                { emoji: "⏱", testo: "Mangia entro 1 ora dopo l'allenamento per massimizzare il recupero muscolare." },
                { emoji: "🔥", testo: "Target calorico: 2.100 kcal/giorno in deficit. Quando raggiungi il peso forma saliremo a 2.700." },
                { emoji: "🌾", testo: "Farro e quinoa sono alternative al riso più ricche di proteine e fibre." },
                { emoji: "🥚", testo: "Le uova sono la fonte proteica più versatile a colazione: veloci e complete." },
                { emoji: "🐟", testo: "Limita il tonno a 3-4 volte a settimana. Alterna con merluzzo e salmone." },
                { emoji: "🧀", testo: "Lo yogurt greco ha il doppio delle proteine rispetto allo yogurt normale." },
                { emoji: "🫘", testo: "I legumi la sera sono ottimi: fibre lente che nutrono i muscoli durante la notte." },
              ].map((c, i) => (
                <div key={i} style={{ background: "#1a1d25", border: "1px solid #2a2d35", borderLeft: "3px solid #d4a843", borderRadius: 10, padding: "10px 14px", marginBottom: 8, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{c.emoji}</span>
                  <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.5 }}>{c.testo}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== RICETTE ===== */}
        {tab === "ricette" && (
          <div className="slide-in">
            <input type="text" placeholder="🔍 Cerca ricetta..." value={ricercaRicette} onChange={e => setRicercaRicette(e.target.value)}
              style={{ width: "100%", background: "#1a1d25", border: "1px solid #2a2d35", borderRadius: 10, padding: "10px 14px", color: "#e8e0d0", fontSize: 14, marginBottom: 12 }} />
            <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
              {["tutti", "colazione", "pranzo", "cena"].map(p => (
                <button key={p} onClick={() => setPastoFiltro(p)} style={{ flexShrink: 0, padding: "5px 12px", borderRadius: 20, border: "1px solid", borderColor: pastoFiltro === p ? "#d4a843" : "#2a2d35", background: pastoFiltro === p ? "#d4a843" : "transparent", color: pastoFiltro === p ? "#0f1117" : "#888", fontSize: 12, cursor: "pointer" }}>
                  {p === "colazione" ? "☀️ " : p === "pranzo" ? "⚡ " : p === "cena" ? "🌙 " : ""}{p}
                </button>
              ))}
            </div>
            {ricetteFiltrate.map(r => (
              <div key={r.id} className="ricetta-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, flex: 1, paddingRight: 10 }}>{r.nome}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                    <span className="tag-prot">🥩 {r.prot}g</span>
                    <span style={{ background: "#1a2a3a", color: "#5b9bd4", borderRadius: 20, padding: "2px 8px", fontSize: 11, fontFamily: "monospace" }}>⏱ {r.tempo}min</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {r.ingredienti.map((ing, i) => (
                    <span key={i} style={{ fontSize: 11, color: "#666", background: "#0f1117", border: "1px solid #2a2d35", borderRadius: 6, padding: "2px 7px" }}>{ing}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== VALORI ===== */}
        {tab === "valori" && (
          <div className="slide-in">
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 14 }}>
              {[
                { emoji: "🏆", testo: "Bresaola 33g/100g — top assoluto" },
                { emoji: "🧀", testo: "Parmigiano 36g/100g — in piccole dosi" },
                { emoji: "🥜", testo: "Burro arachidi: grassi buoni + prot" },
                { emoji: "🫘", testo: "Legumi: proteine + fibre, ottimi la sera" },
                { emoji: "🥚", testo: "1 uovo = 6g proteine, 78 kcal" },
              ].map((c, i) => (
                <div key={i} style={{ flexShrink: 0, background: "#1a1d25", border: "1px solid #2a2d35", borderRadius: 10, padding: "8px 12px", maxWidth: 180 }}>
                  <span style={{ fontSize: 14 }}>{c.emoji}</span>
                  <p style={{ fontSize: 11, color: "#aaa", marginTop: 4, lineHeight: 1.4 }}>{c.testo}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#888", fontFamily: "monospace", marginBottom: 12 }}>➕ tracker · 🛒 spesa</p>
            <input type="text" placeholder="🔍 Cerca ingrediente..." value={ricerca} onChange={e => setRicerca(e.target.value)}
              style={{ width: "100%", background: "#1a1d25", border: "1px solid #2a2d35", borderRadius: 10, padding: "10px 14px", color: "#e8e0d0", fontSize: 14, marginBottom: 12 }} />
            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 12 }}>
              {CATEGORIE.map(cat => (
                <button key={cat} onClick={() => setCategoriaFiltro(cat)} style={{ flexShrink: 0, padding: "5px 12px", borderRadius: 20, border: "1px solid", borderColor: categoriaFiltro === cat ? "#d4a843" : "#2a2d35", background: categoriaFiltro === cat ? "#d4a843" : "transparent", color: categoriaFiltro === cat ? "#0f1117" : "#888", fontSize: 12, cursor: "pointer" }}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="card" style={{ padding: "4px 14px" }}>
              {ingFiltrati.map(ing => {
                const inSpesa = spesa.find(s => s.id === ing.id);
                return (
                  <div key={ing.id} className="ing-row">
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{ing.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{ing.nome}</span>
                        <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 8 }}>
                          <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: ing.colore }}>{ing.prot}g prot</span>
                          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#e8a23a" }}>{ing.kcal}kcal</span>
                        </div>
                      </div>
                      <span style={{ fontSize: 10, color: "#555", fontFamily: "monospace" }}>{ing.per100 ? "/ 100g" : `/ ${ing.unitLabel}`}</span>
                      <div style={{ height: 3, background: "#1e2130", borderRadius: 2, overflow: "hidden", marginTop: 4 }}>
                        <div style={{ height: "100%", width: `${Math.min((ing.prot / 36) * 100, 100)}%`, background: ing.colore, opacity: 0.6, borderRadius: 2 }} />
                      </div>
                    </div>
                    <div className="ing-actions">
                      <button className="action-btn" onClick={() => apriIngrediente(ing)} style={{ background: "#1e3a2f", color: "#5eb885", fontSize: 16 }}>➕</button>
                      <button className="action-btn" onClick={() => aggiungiAllaSpesa(ing)} style={{ background: inSpesa ? "#1a1d25" : "#1a2535", color: inSpesa ? "#3a5a3a" : "#5b9bd4", fontSize: 16 }}>🛒</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== SPESA ===== */}
        {tab === "spesa" && (
          <div className="slide-in">
            {spesa.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
                <p style={{ color: "#888", marginBottom: 16 }}>Vai in <strong style={{ color: "#d4a843" }}>Valori</strong> e tocca 🛒 su ogni ingrediente</p>
                <button className="btn" onClick={() => setTab("valori")} style={{ padding: "10px 20px", background: "#d4a843", color: "#0f1117", borderRadius: 8, fontWeight: 700 }}>Vai ai Valori →</button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 12, color: "#888", fontFamily: "monospace" }}>{spesa.filter(s => s.spuntato).length} / {spesa.length} nel carrello</span>
                  <button className="btn" onClick={() => setSpesa([])} style={{ fontSize: 12, color: "#555" }}>Svuota lista</button>
                </div>
                <div className="progress-bar" style={{ marginBottom: 14 }}>
                  <div style={{ height: "100%", width: spesa.length ? `${(spesa.filter(s => s.spuntato).length / spesa.length) * 100}%` : "0%", background: "#d4a843", borderRadius: 3, transition: "width 0.4s" }} />
                </div>
                <div className="card" style={{ padding: "4px 14px" }}>
                  {spesa.map(item => (
                    <div key={item.id} className="spesa-row" style={{ opacity: item.spuntato ? 0.35 : 1 }}>
                      <div className={`checkbox ${item.spuntato ? "checkbox-done" : ""}`} onClick={() => toggleSpesa(item.id)}>
                        {item.spuntato && <span style={{ color: "#0f1117", fontSize: 12, fontWeight: 700 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 16 }}>{item.emoji}</span>
                      <span style={{ flex: 1, fontSize: 14, textDecoration: item.spuntato ? "line-through" : "none" }}>{item.nome}</span>
                      <span style={{ fontFamily: "monospace", fontSize: 11, color: item.colore }}>{item.prot}g</span>
                      <button className="del-btn" onClick={() => rimuoviSpesa(item.id)}>✕</button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Tab bar bottom */}
      <div className="tab-bottom">
        {[["valori","💪","Valori"],["tracker","🥩","Tracker"],["spesa","🛒","Spesa"],["ricette","🍽","Ricette"]].map(([id, emoji, label]) => (
          <button key={id} className="tab-btn-b" onClick={() => setTab(id)} style={{ position: "relative" }}>
            <span style={{ fontSize: 22 }}>{emoji}</span>
            <span style={{ fontSize: 10, color: tab === id ? "#d4a843" : "#555", fontWeight: tab === id ? 700 : 400 }}>{label}</span>
            {tab === id && <div style={{ position: "absolute", bottom: 0, width: "100%", height: 2, background: "#d4a843" }} />}
          </button>
        ))}
      </div>

      {/* Modal aggiungi al tracker */}
      {modalIngrediente && (
        <div className="overlay" onClick={() => setModalIngrediente(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <p style={{ fontFamily: "monospace", fontSize: 10, color: "#d4a843", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Aggiungi al tracker</p>
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>{modalIngrediente.emoji} {modalIngrediente.nome}</h3>
                <p style={{ fontFamily: "monospace", fontSize: 12, color: "#888", marginTop: 4 }}>
                  {modalIngrediente.prot}g prot · {modalIngrediente.kcal} kcal / {modalIngrediente.per100 ? "100g" : modalIngrediente.unitLabel}
                </p>
              </div>
              <button className="btn" style={{ background: "#2a2d35", color: "#888", borderRadius: 8, padding: "6px 12px" }} onClick={() => setModalIngrediente(null)}>✕</button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: "#aaa", marginBottom: 8 }}>
                {modalIngrediente.per100 ? "Quanti grammi?" : `Quante unità (${modalIngrediente.unitLabel})?`}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input type="number" value={grammi} onChange={e => setGrammi(e.target.value)}
                  placeholder={modalIngrediente.per100 ? "es. 200" : "es. 2"}
                  style={{ flex: 1, background: "#1a1d25", border: "2px solid #2a2d35", borderRadius: 10, padding: "12px 16px", color: "#e8e0d0", fontFamily: "monospace", fontSize: 20, textAlign: "center" }} />
                {grammi && parseFloat(grammi) > 0 && (
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700, color: "#5eb885" }}>{protPreview}g</div>
                    <div style={{ fontFamily: "monospace", fontSize: 14, color: "#e8a23a" }}>{kcalPreview} kcal</div>
                  </div>
                )}
              </div>
            </div>

            <p style={{ fontSize: 13, color: "#aaa", marginBottom: 10 }}>A quale pasto?</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {PASTI.map(p => (
                <button key={p} className="pasto-pill" onClick={() => setPastoDest(p)} style={{ flex: 1, borderColor: pastoDest === p ? "#d4a843" : "#2a2d35", background: pastoDest === p ? "#d4a843" : "transparent", color: pastoDest === p ? "#0f1117" : "#888", fontWeight: pastoDest === p ? 700 : 400, textAlign: "center" }}>
                  {PASTO_META[p].emoji} {p}
                </button>
              ))}
            </div>

            <button className="btn" onClick={aggiungiAlTracker} disabled={!grammi || parseFloat(grammi) <= 0}
              style={{ width: "100%", padding: "14px", background: grammi && parseFloat(grammi) > 0 ? "#d4a843" : "#2a2d35", color: grammi && parseFloat(grammi) > 0 ? "#0f1117" : "#555", borderRadius: 10, fontWeight: 700, fontSize: 16 }}>
              {grammi && parseFloat(grammi) > 0 ? `Aggiungi +${protPreview}g · ${kcalPreview} kcal` : "Aggiungi"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
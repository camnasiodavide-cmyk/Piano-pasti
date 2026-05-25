import { useState } from "react";

const COLAZIONI = [
  { id: "c1", nome: "Latte + uova strapazzate + fette biscottate", tempo: 8, prot: 22, ingredienti: ["Latte intero 250ml", "2 uova", "2 fette biscottate integrali", "olio", "sale"] },
  { id: "c2", nome: "Yogurt greco + frutta + noci", tempo: 5, prot: 20, ingredienti: ["150g yogurt greco", "1 banana o frutti di bosco", "20g noci o mandorle", "miele (facoltativo)"] },
  { id: "c3", nome: "Pane integrale + uova sode + affettato", tempo: 10, prot: 28, ingredienti: ["2 fette pane integrale", "2 uova", "60g bresaola o tacchino", "pomodoro"] },
  { id: "c4", nome: "Fiocchi d'avena con latte e frutta secca", tempo: 5, prot: 18, ingredienti: ["60g fiocchi d'avena", "250ml latte", "20g frutta secca mista", "1 banana", "cannella"] },
  { id: "c5", nome: "Ricotta + pane integrale + marmellata", tempo: 5, prot: 18, ingredienti: ["100g ricotta", "2 fette pane integrale", "1 cucchiaio marmellata", "noci"] },
  { id: "c6", nome: "Pancakes proteici veloci", tempo: 10, prot: 30, ingredienti: ["2 uova", "1 banana matura", "30g fiocchi d'avena", "pizzico sale", "olio"] },
  { id: "c7", nome: "Uova in camicia su pane integrale", tempo: 10, prot: 24, ingredienti: ["2 uova", "2 fette pane integrale", "spinaci freschi", "olio EVO", "sale", "pepe"] },
  { id: "c8", nome: "Frullato proteico con latte e banana", tempo: 5, prot: 25, ingredienti: ["250ml latte", "1 banana", "2 cucchiai burro arachidi", "1 cucchiaio cacao amaro"] },
];

// Pranzi post-allenamento (carboidrati inclusi)
const PRANZI_ALLENAMENTO = [
  { id: "pa1", nome: "Pollo e riso alla piastra", tempo: 15, prot: 55, carb: "alto", ingredienti: ["200g petto pollo", "80g riso", "verdure grigliate", "olio EVO", "spezie"] },
  { id: "pa2", nome: "Pasta al tonno veloce", tempo: 10, prot: 50, carb: "alto", ingredienti: ["80g pasta integrale", "2 scatolette tonno al naturale", "pomodorini", "olio EVO", "prezzemolo"] },
  { id: "pa5", nome: "Salmone al forno con patate dolci", tempo: 25, prot: 48, carb: "alto", ingredienti: ["150g filetto salmone", "200g patate dolci", "olio EVO", "limone", "timo"] },
  { id: "pa7", nome: "Merluzzo con zucchine e riso", tempo: 20, prot: 50, carb: "alto", ingredienti: ["200g merluzzo", "80g riso integrale", "2 zucchine", "olio EVO", "aglio", "limone"] },
  { id: "pa8", nome: "Uova strapazzate con pane e affettato", tempo: 7, prot: 40, carb: "medio", ingredienti: ["3 uova", "3 fette pane integrale", "80g bresaola o tacchino", "olio", "sale"] },
  { id: "pa9", nome: "Bowl yogurt greco e pollo", tempo: 10, prot: 55, carb: "basso", ingredienti: ["150g petto pollo", "150g yogurt greco", "cetrioli", "pomodorini", "menta", "limone"] },
  { id: "pa10", nome: "Wrap integrale tacchino e ricotta", tempo: 5, prot: 45, carb: "medio", ingredienti: ["2 piadine integrali", "150g tacchino", "100g ricotta", "insalata", "pomodoro", "senape"] },
];

// Pranzi giorni di riposo (carboidrati ridotti)
const PRANZI_RIPOSO = [
  { id: "pr1", nome: "Frittata al tonno", tempo: 8, prot: 55, carb: "basso", ingredienti: ["4 uova", "1 scatoletta tonno", "sale", "pepe", "olio", "erba cipollina"] },
  { id: "pr2", nome: "Insalata tonno e uova sode", tempo: 5, prot: 52, carb: "basso", ingredienti: ["2 uova", "1 scatoletta tonno", "pomodori", "mais", "olio EVO", "limone"] },
  { id: "pr3", nome: "Insalata di tacchino e fagioli", tempo: 5, prot: 50, carb: "basso", ingredienti: ["200g tacchino a fette", "fagioli cannellini", "pomodori", "mais", "olio EVO", "limone"] },
  { id: "pr4", nome: "Bowl yogurt greco e pollo", tempo: 10, prot: 55, carb: "basso", ingredienti: ["150g petto pollo", "150g yogurt greco", "cetrioli", "pomodorini", "menta", "limone"] },
  { id: "pr5", nome: "Frittata di verdure con affettato", tempo: 10, prot: 42, carb: "basso", ingredienti: ["3 uova", "zucchine o spinaci", "80g bresaola o tacchino", "olio", "sale"] },
  { id: "pr6", nome: "Insalata di ceci e tonno", tempo: 5, prot: 48, carb: "basso", ingredienti: ["1 scatoletta tonno", "200g ceci in scatola", "pomodori", "cetriolo", "cipolla rossa", "olio", "limone"] },
];

const CENE = [
  { id: "cn1", nome: "Pollo alla piastra con verdure al forno", tempo: 20, prot: 50, ingredienti: ["200g petto pollo", "zucchine", "peperoni", "carote", "olio EVO", "aglio", "rosmarino"] },
  { id: "cn2", nome: "Salmone al vapore con broccoli", tempo: 20, prot: 45, ingredienti: ["180g filetto salmone", "300g broccoli", "limone", "olio EVO", "aglio", "pepe"] },
  { id: "cn3", nome: "Zuppa di legumi e tacchino", tempo: 25, prot: 45, ingredienti: ["150g petto tacchino", "fagioli borlotti", "ceci", "carota", "sedano", "cipolla", "pomodoro", "brodo"] },
  { id: "cn4", nome: "Merluzzo al forno con patate", tempo: 25, prot: 48, ingredienti: ["200g merluzzo", "250g patate", "pomodorini", "olive", "capperi", "olio EVO", "prezzemolo"] },
  { id: "cn5", nome: "Frittata di verdure con insalata", tempo: 15, prot: 28, ingredienti: ["4 uova", "zucchine o spinaci", "cipolla", "sale", "pepe", "olio", "insalata mista"] },
  { id: "cn6", nome: "Tacchino in padella con funghi", tempo: 15, prot: 48, ingredienti: ["200g petto tacchino", "200g funghi champignon", "aglio", "prezzemolo", "olio EVO", "vino bianco"] },
  { id: "cn7", nome: "Insalata di ceci e tonno", tempo: 5, prot: 48, ingredienti: ["1 scatoletta tonno", "200g ceci in scatola", "pomodori", "cetriolo", "cipolla rossa", "olio", "limone"] },
  { id: "cn8", nome: "Minestra di lenticchie con uovo in camicia", tempo: 20, prot: 32, ingredienti: ["150g lenticchie rosse", "brodo vegetale", "carota", "sedano", "curcuma", "2 uova", "limone"] },
  { id: "cn9", nome: "Petto di pollo in crosta di erbe con riso", tempo: 20, prot: 55, ingredienti: ["200g petto pollo", "80g riso", "pangrattato", "erbe aromatiche", "aglio", "olio", "limone"] },
  { id: "cn10", nome: "Sogliola al limone con spinaci saltati", tempo: 15, prot: 42, ingredienti: ["250g sogliola o platessa", "300g spinaci freschi", "aglio", "limone", "olio EVO", "sale", "pepe"] },
];

// Lun=0 Mer=2 Ven=4 → allenamento
const GIORNI_FULL = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
const ALLENAMENTO_IDX = [0, 2, 4]; // Lun, Mer, Ven
const GIORNO_LABEL = ["A", null, "B", null, "C", null, null]; // giorno allenamento A/B/C

const emptyPlan = () => GIORNI_FULL.map((g, i) => ({
  giorno: g,
  isAllenamento: ALLENAMENTO_IDX.includes(i),
  giornoAllenamento: GIORNO_LABEL[i],
  colazione: null,
  pranzo: null,
  cena: null,
}));

export default function App() {
  const [tab, setTab] = useState("piano");
  const [piano, setPiano] = useState(emptyPlan());
  const [selezione, setSelezione] = useState(null);
  const [spuntati, setSpuntati] = useState({});

  const totaleProt = (g) => (g.colazione?.prot || 0) + (g.pranzo?.prot || 0) + (g.cena?.prot || 0);

  const listaspesa = () => {
    const mappa = {};
    piano.forEach(g => {
      [g.colazione, g.pranzo, g.cena].forEach(pasto => {
        if (!pasto) return;
        pasto.ingredienti.forEach(ing => {
          const key = ing.toLowerCase();
          mappa[key] = (mappa[key] || 0) + 1;
        });
      });
    });
    return Object.entries(mappa).sort((a, b) => a[0].localeCompare(b[0]));
  };

  const seleziona = (giornoIdx, pasto) => setSelezione({ giornoIdx, pasto });

  const scegliRicetta = (ricetta) => {
    const { giornoIdx, pasto } = selezione;
    setPiano(prev => {
      const nuovo = [...prev];
      nuovo[giornoIdx] = { ...nuovo[giornoIdx], [pasto]: ricetta };
      return nuovo;
    });
    setSelezione(null);
  };

  const rimuovi = (giornoIdx, pasto, e) => {
    e.stopPropagation();
    setPiano(prev => {
      const nuovo = [...prev];
      nuovo[giornoIdx] = { ...nuovo[giornoIdx], [pasto]: null };
      return nuovo;
    });
  };

  const toggleSpunta = (key) => setSpuntati(prev => ({ ...prev, [key]: !prev[key] }));

  const lista = listaspesa();
  const spuntatiCount = lista.filter(([k]) => spuntati[k]).length;

  const getRicettePerSelezione = () => {
    if (!selezione) return [];
    if (selezione.pasto === "colazione") return COLAZIONI;
    if (selezione.pasto === "cena") return CENE;
    // pranzo: dipende dal tipo di giorno
    return piano[selezione.giornoIdx].isAllenamento ? PRANZI_ALLENAMENTO : PRANZI_RIPOSO;
  };

  const giornoSelezionato = selezione ? piano[selezione.giornoIdx] : null;

  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#0f1117", color: "#e8e0d0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #1a1d25; } ::-webkit-scrollbar-thumb { background: #d4a843; border-radius: 2px; }
        .btn { cursor: pointer; border: none; transition: all 0.2s; }
        .card { background: #1a1d25; border: 1px solid #2a2d35; border-radius: 12px; }
        .tag-prot { background: #1e3a2f; color: #5eb885; border-radius: 20px; padding: 2px 8px; font-size: 11px; font-family: 'DM Mono', monospace; }
        .tag-tempo { background: #1a2a3a; color: #5b9bd4; border-radius: 20px; padding: 2px 8px; font-size: 11px; font-family: 'DM Mono', monospace; }
        .tag-carb-alto { background: #2a1f0e; color: #e8a23a; border-radius: 20px; padding: 2px 8px; font-size: 11px; font-family: 'DM Mono', monospace; }
        .tag-carb-basso { background: #1a2535; color: #6aadcc; border-radius: 20px; padding: 2px 8px; font-size: 11px; font-family: 'DM Mono', monospace; }
        .slide-in { animation: slideIn 0.25s ease; }
        @keyframes slideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .pasto-slot { border: 1.5px dashed #2a2d35; border-radius: 10px; padding: 8px 10px; cursor: pointer; transition: all 0.2s; min-height: 50px; display: flex; align-items: center; }
        .pasto-slot:hover { border-color: #d4a843; background: #1e2130; }
        .pasto-filled { border-style: solid; border-color: #2a2d35; background: #181b24; }
        .pasto-filled:hover { border-color: #d4a843; }
        .tab-btn { padding: 10px 0; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; border: none; transition: all 0.2s; flex: 1; }
        .tab-active { background: #d4a843; color: #0f1117; }
        .tab-inactive { background: transparent; color: #888; }
        .tab-inactive:hover { color: #e8e0d0; }
        .ricetta-card { background: #1a1d25; border: 1px solid #2a2d35; border-radius: 10px; padding: 14px; cursor: pointer; transition: all 0.2s; }
        .ricetta-card:hover { border-color: #d4a843; background: #1e2130; transform: translateY(-1px); }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 50; display: flex; align-items: flex-end; justify-content: center; }
        .modal { background: #13161f; border-top: 2px solid #d4a843; border-radius: 20px 20px 0 0; width: 100%; max-width: 640px; max-height: 88vh; overflow-y: auto; padding: 20px; }
        .spesa-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #1e2130; cursor: pointer; transition: opacity 0.2s; }
        .spesa-item:last-child { border-bottom: none; }
        .checkbox { width: 20px; height: 20px; border-radius: 5px; border: 2px solid #d4a843; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; }
        .checkbox-done { background: #d4a843; }
        .progress-bar { height: 4px; background: #1e2130; border-radius: 2px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #d4a843, #e8c76d); border-radius: 2px; transition: width 0.4s ease; }
        .badge-all { background: #1f3320; border: 1px solid #3a6b3e; color: #5eb885; border-radius: 6px; padding: 3px 8px; font-size: 10px; font-family: 'DM Mono', monospace; letter-spacing: 1px; }
        .badge-rip { background: #1a1f2e; border: 1px solid #2a3a5e; color: #7a9ccc; border-radius: 6px; padding: 3px 8px; font-size: 10px; font-family: 'DM Mono', monospace; letter-spacing: 1px; }
        .card-all { border-color: #2a3d2c !important; }
        .card-rip { border-color: #1e2535 !important; }
        .x-btn { background: none; border: none; color: #555; cursor: pointer; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
        .x-btn:hover { color: #e05555; background: #2a1818; }
        .info-box { background: #1a1d25; border: 1px solid #2a2d35; border-radius: 10px; padding: 12px 14px; margin-bottom: 10px; border-left: 3px solid #d4a843; }
        .sezione-pranzo-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-family: 'DM Mono', monospace; margin-bottom: 10px; padding: 6px 10px; border-radius: 6px; }
        .label-all { background: #1f3320; color: #5eb885; }
        .label-rip { background: #1a1f2e; color: #7a9ccc; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "20px 16px 0", maxWidth: 640, margin: "0 auto" }}>
        <div style={{ marginBottom: 4 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: "#d4a843", textTransform: "uppercase" }}>Piano Alimentare</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, lineHeight: 1.1, marginBottom: 4 }}>
          Il mio piano<br /><span style={{ color: "#d4a843" }}>settimanale</span>
        </h1>
        <p style={{ color: "#888", fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>95 kg · 143g proteine/giorno</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <span className="badge-all">⚡ Lun · Mer · Ven = Allenamento</span>
          <span className="badge-rip">😴 Mar · Gio · Sab · Dom = Riposo</span>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, background: "#1a1d25", padding: 4, borderRadius: 10, marginBottom: 20 }}>
          {[["piano", "📅 Piano"], ["ricette", "🍽 Ricette"], ["spesa", "🛒 Spesa"]].map(([id, label]) => (
            <button key={id} className={`tab-btn ${tab === id ? "tab-active" : "tab-inactive"}`} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 16px 80px", maxWidth: 640, margin: "0 auto" }}>

        {/* ===== TAB PIANO ===== */}
        {tab === "piano" && (
          <div className="slide-in">
            {piano.map((giorno, gIdx) => {
              const prot = totaleProt(giorno);
              const perc = Math.min((prot / 143) * 100, 100);
              const isAll = giorno.isAllenamento;
              return (
                <div key={giorno.giorno} className={`card ${isAll ? "card-all" : "card-rip"}`} style={{ marginBottom: 10, padding: "14px 14px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700 }}>{giorno.giorno}</span>
                      {isAll
                        ? <span className="badge-all">⚡ Giorno {giorno.giornoAllenamento}</span>
                        : <span className="badge-rip">😴 Riposo</span>
                      }
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: prot >= 130 ? "#5eb885" : prot >= 80 ? "#d4a843" : "#555" }}>{prot}g</span>
                  </div>

                  <div className="progress-bar" style={{ marginBottom: 10 }}>
                    <div className="progress-fill" style={{ width: `${perc}%`, background: isAll ? "linear-gradient(90deg,#5eb885,#8ed4a0)" : "linear-gradient(90deg,#5b9bd4,#8ec4e8)" }} />
                  </div>

                  {[
                    ["colazione", "☀️", "20-25g"],
                    ["pranzo", isAll ? "⚡" : "🥗", isAll ? "50-55g post-workout" : "45-50g · meno carb"],
                    ["cena", "🌙", "40-50g"]
                  ].map(([pasto, emoji, target]) => (
                    <div key={pasto} style={{ marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 12 }}>{emoji}</span>
                        <span style={{ fontSize: 11, color: "#888", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{pasto.charAt(0).toUpperCase() + pasto.slice(1)}</span>
                        <span style={{ fontSize: 10, color: "#555", fontFamily: "'DM Mono', monospace" }}>{target}</span>
                      </div>
                      <div
                        className={`pasto-slot ${giorno[pasto] ? "pasto-filled" : ""}`}
                        onClick={() => !giorno[pasto] && seleziona(gIdx, pasto)}
                      >
                        {giorno[pasto] ? (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                            <div style={{ flex: 1, cursor: "pointer" }} onClick={() => seleziona(gIdx, pasto)}>
                              <div style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: 4 }}>{giorno[pasto].nome}</div>
                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                <span className="tag-prot">🥩 {giorno[pasto].prot}g</span>
                                <span className="tag-tempo">⏱ {giorno[pasto].tempo}min</span>
                                {pasto === "pranzo" && giorno[pasto].carb && (
                                  <span className={giorno[pasto].carb === "alto" ? "tag-carb-alto" : "tag-carb-basso"}>
                                    🌾 carb {giorno[pasto].carb}
                                  </span>
                                )}
                              </div>
                            </div>
                            <button className="x-btn" onClick={(e) => rimuovi(gIdx, pasto, e)}>✕</button>
                          </div>
                        ) : (
                          <span style={{ color: "#444", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>+ Aggiungi {pasto}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

            {/* Legenda */}
            <div className="info-box" style={{ marginTop: 4 }}>
              <p style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "#aaa", lineHeight: 1.6 }}>
                <strong style={{ color: "#5eb885" }}>⚡ Giorni allenamento</strong> — pranzo ricco di carboidrati entro 1 ora dalla fine. Favorisce il recupero muscolare.<br />
                <strong style={{ color: "#7a9ccc" }}>😴 Giorni riposo</strong> — pranzo leggero, pochi carboidrati. Proteine uguali, porzioni di riso/pasta ridotte o eliminate.
              </p>
            </div>

            <button className="btn" style={{ width: "100%", marginTop: 10, padding: "12px", background: "#1a1d25", border: "1px dashed #2a2d35", borderRadius: 10, color: "#666", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }} onClick={() => setPiano(emptyPlan())}>
              🔄 Reimposta piano
            </button>
          </div>
        )}

        {/* ===== TAB RICETTE ===== */}
        {tab === "ricette" && (
          <div className="slide-in">
            {/* Colazioni */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 2 }}>☀️ Colazioni</h2>
              <p style={{ fontSize: 12, color: "#888", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>20-25g proteine · Tutti i giorni</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {COLAZIONI.map(r => <RicettaCard key={r.id} r={r} />)}
              </div>
            </div>

            {/* Pranzi allenamento */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 2 }}>⚡ Pranzi — Giorni Allenamento</h2>
              <p style={{ fontSize: 12, color: "#5eb885", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>50-55g proteine · Carboidrati inclusi · Entro 1 ora</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PRANZI_ALLENAMENTO.map(r => <RicettaCard key={r.id} r={r} showCarb />)}
              </div>
            </div>

            {/* Pranzi riposo */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 2 }}>🥗 Pranzi — Giorni di Riposo</h2>
              <p style={{ fontSize: 12, color: "#7a9ccc", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>45-50g proteine · Carboidrati ridotti</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PRANZI_RIPOSO.map(r => <RicettaCard key={r.id} r={r} showCarb />)}
              </div>
            </div>

            {/* Cene */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 2 }}>🌙 Cene</h2>
              <p style={{ fontSize: 12, color: "#888", fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>40-50g proteine · Leggere e digeribili · Tutti i giorni</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {CENE.map(r => <RicettaCard key={r.id} r={r} />)}
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB SPESA ===== */}
        {tab === "spesa" && (
          <div className="slide-in">
            {lista.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
                <p style={{ color: "#888", fontFamily: "'DM Sans', sans-serif" }}>Pianifica i tuoi pasti per generare<br />automaticamente la lista della spesa.</p>
                <button className="btn" style={{ marginTop: 16, padding: "10px 20px", background: "#d4a843", color: "#0f1117", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }} onClick={() => setTab("piano")}>Vai al Piano →</button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700 }}>Lista della spesa</h2>
                    <p style={{ fontSize: 12, color: "#888", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>{lista.length} ingredienti · {spuntatiCount} nel carrello</p>
                  </div>
                  <button className="btn" style={{ background: "#1a1d25", border: "1px solid #2a2d35", color: "#888", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }} onClick={() => setSpuntati({})}>Deseleziona</button>
                </div>
                <div className="progress-bar" style={{ marginBottom: 16 }}>
                  <div className="progress-fill" style={{ width: lista.length ? `${(spuntatiCount / lista.length) * 100}%` : "0%" }} />
                </div>
                <div className="card" style={{ padding: "8px 14px" }}>
                  {lista.map(([ing, count]) => (
                    <div key={ing} className="spesa-item" style={{ opacity: spuntati[ing] ? 0.35 : 1 }} onClick={() => toggleSpunta(ing)}>
                      <div className={`checkbox ${spuntati[ing] ? "checkbox-done" : ""}`}>
                        {spuntati[ing] && <span style={{ color: "#0f1117", fontSize: 12, fontWeight: 700 }}>✓</span>}
                      </div>
                      <span style={{ flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: 14, textDecoration: spuntati[ing] ? "line-through" : "none" }}>{ing}</span>
                      {count > 1 && <span style={{ fontSize: 11, color: "#d4a843", fontFamily: "'DM Mono', monospace" }}>×{count}</span>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Modal selezione ricetta */}
      {selezione && (
        <div className="overlay" onClick={() => setSelezione(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#d4a843", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
                  {giornoSelezionato?.giorno} · {selezione.pasto}
                </p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700 }}>Scegli una ricetta</h3>
              </div>
              <button className="btn" style={{ background: "#2a2d35", color: "#888", borderRadius: 8, padding: "6px 12px", fontFamily: "'DM Sans', sans-serif" }} onClick={() => setSelezione(null)}>✕</button>
            </div>

            {/* Label tipo pranzo */}
            {selezione.pasto === "pranzo" && (
              <div className={`sezione-pranzo-label ${giornoSelezionato?.isAllenamento ? "label-all" : "label-rip"}`} style={{ marginBottom: 12 }}>
                {giornoSelezionato?.isAllenamento
                  ? "⚡ Giorno allenamento — carboidrati inclusi, mangia entro 1 ora"
                  : "😴 Giorno riposo — ricette leggere, carboidrati ridotti"}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {getRicettePerSelezione().map(r => (
                <div key={r.id} className="ricetta-card" onClick={() => scegliRicetta(r)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, flex: 1, paddingRight: 10 }}>{r.nome}</span>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <span className="tag-prot">🥩 {r.prot}g</span>
                      <span className="tag-tempo">⏱ {r.tempo}min</span>
                      {r.carb && <span className={r.carb === "alto" ? "tag-carb-alto" : "tag-carb-basso"}>🌾 {r.carb}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {r.ingredienti.map((ing, i) => (
                      <span key={i} style={{ fontSize: 11, color: "#666", background: "#0f1117", border: "1px solid #2a2d35", borderRadius: 6, padding: "2px 7px", fontFamily: "'DM Sans', sans-serif" }}>{ing}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RicettaCard({ r, showCarb }) {
  return (
    <div className="ricetta-card" style={{ cursor: "default" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, flex: 1, paddingRight: 10 }}>{r.nome}</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
          <span className="tag-prot">🥩 {r.prot}g</span>
          <span className="tag-tempo">⏱ {r.tempo}min</span>
          {showCarb && r.carb && <span className={r.carb === "alto" ? "tag-carb-alto" : "tag-carb-basso"}>🌾 carb {r.carb}</span>}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {r.ingredienti.map((ing, i) => (
          <span key={i} style={{ fontSize: 11, color: "#777", background: "#0f1117", border: "1px solid #2a2d35", borderRadius: 6, padding: "2px 7px", fontFamily: "'DM Sans', sans-serif" }}>{ing}</span>
        ))}
      </div>
    </div>
  );
}
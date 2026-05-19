import { useState, useRef, useEffect } from 'react';
import './App.css';

type PageId = 100 | 101 | 181 | 182 | 201 | 202 | 203 | 220;

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(100);
  const [isFlickering, setIsFlickering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = (page: PageId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsFlickering(true);

    timeoutRef.current = setTimeout(() => {
      setCurrentPage(page);
      setIsFlickering(false);
    }, 160);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div className={`crt-container ${isFlickering ? 'flicker' : ''}`}>
      <div className="teletext-header">
        <div className="top-bar">
          <div>FSL FREISTOSS LUZERN TELETEXT</div>
          <div>SIEHE TXT {currentPage} • 19.05.1989 • 20:45</div>
        </div>
      </div>

      <div className="content">
        {currentPage === 100 && <Startseite navigate={navigate} />}
        {currentPage === 101 && <Index navigate={navigate} />}
        {currentPage === 181 && <ResultatePage />}
        {currentPage === 182 && <TabellePage />}
        {currentPage === 201 && <MannschaftPage />}
        {currentPage === 202 && <SpielerPage />}
        {currentPage === 203 && <TrainerPage />}
        {currentPage === 220 && <StatistikPage />}
      </div>

      <div className="navigation-bar">
        <button onClick={() => navigate(101)}>F1 INDEX</button>
        <button onClick={() => navigate(181)}>181 RESULTATE</button>
        <button onClick={() => navigate(182)}>182 TABELLE</button>
        <button onClick={() => navigate(201)}>201 MANNSCHAFT</button>
        <button onClick={() => navigate(202)}>202 SPIELER</button>
        <button onClick={() => navigate(203)}>203 TRAINER</button>
        <button onClick={() => navigate(220)}>220 STATISTIK</button>
      </div>
    </div>
  );
}

/* ====================== SEITEN ====================== */

const Startseite = ({ navigate }: { navigate: (p: PageId) => void }) => (
  <div className="page center">
    <h1 className="logo">FSL</h1>
    <h2>FREISTOSS LUZERN TELETEXT</h2>
    <p style={{ fontSize: '1.6rem', margin: '20px 0' }}>FC LUZERN — SAISON 1988/89</p>
    <p style={{ color: '#ffd400', fontSize: '1.8rem' }}>SCHWEIZER MEISTER</p>
    <button className="big-btn" onClick={() => navigate(101)} style={{ marginTop: '40px', padding: '15px 40px', fontSize: '1.4rem' }}>
      DRÜCKEN SIE ENTER → INDEX
    </button>
  </div>
);

const Index = ({ navigate }: { navigate: (p: PageId) => void }) => (
  <div className="page">
    <h2>101 — INDEX</h2>
    <div className="index-grid">
      <div onClick={() => navigate(181)}>181 RESULTATE</div>
      <div onClick={() => navigate(182)}>182 TABELLE</div>
      <div onClick={() => navigate(201)}>201 MANNSCHAFT</div>
      <div onClick={() => navigate(202)}>202 SPIELER</div>
      <div onClick={() => navigate(203)}>203 TRAINER</div>
      <div onClick={() => navigate(220)}>220 SAISONSTATISTIK</div>
    </div>
  </div>
);

const ResultatePage = () => (
  <div className="page">
    <h2>181 — RESULTATE</h2>
    <h3>FC Luzern – Saison 1988/89</h3>

    <h4>QUALIFIKATIONSRUNDE</h4>
    <table className="teletext-table">
      <thead><tr><th>Datum</th><th>Gegner</th><th>H/A</th><th>Resultat</th></tr></thead>
      <tbody>
        <tr className="heim"><td>23.07.</td><td>St. Gallen</td><td>H</td><td><strong>3:2</strong></td></tr>
        <tr><td>27.07.</td><td>Aarau</td><td>A</td><td>1:1</td></tr>
        <tr className="heim"><td>30.07.</td><td>Grasshoppers</td><td>H</td><td><strong>2:0</strong></td></tr>
        <tr><td>16.08.</td><td>Young Boys</td><td>A</td><td><strong>2:0</strong></td></tr>
        <tr className="heim"><td>10.08.</td><td>Sion</td><td>H</td><td><strong>2:1</strong></td></tr>
        {/* Weitere Zeilen kannst du selbst ergänzen */}
      </tbody>
    </table>

    <h4>FINALRUNDE</h4>
    <table className="teletext-table">
      <thead><tr><th>Datum</th><th>Gegner</th><th>H/A</th><th>Resultat</th></tr></thead>
      <tbody>
        <tr><td>19.03.</td><td>Young Boys</td><td>A</td><td><strong>2:1</strong></td></tr>
        <tr className="heim"><td>27.03.</td><td>Bellinzona</td><td>H</td><td>1:1</td></tr>
        <tr className="heim"><td>15.04.</td><td>Xamax</td><td>H</td><td><strong>2:0</strong></td></tr>
      </tbody>
    </table>

    <div className="status">Datenquelle: RSSSF • Stand: vollständig</div>
  </div>
);

const TabellePage = () => (
  <div className="page">
    <h2>182 — TABELLE</h2>
    <h3>Qualifikationsrunde</h3>
    <table className="teletext-table">
      <thead><tr><th>Pl.</th><th>Verein</th><th>Sp</th><th>S</th><th>U</th><th>N</th><th>Tore</th><th>Pkt</th></tr></thead>
      <tbody>
        <tr className="heim"><td>1.</td><td><strong>FC Luzern</strong></td><td>22</td><td>10</td><td>8</td><td>4</td><td>27:25</td><td><strong>28</strong></td></tr>
        <tr><td>2.</td><td>Grasshoppers</td><td>22</td><td>10</td><td>7</td><td>5</td><td>41:29</td><td>27</td></tr>
      </tbody>
    </table>

    <h3>Finalrunde (Endtabelle)</h3>
    <p><strong>FC Luzern = Schweizer Meister 1988/89</strong></p>
  </div>
);

const MannschaftPage = () => (
  <div className="page">
    <h2>201 — MANNSCHAFT</h2>
    <h3>Meisterkader 1988/89</h3>
    <p>Trainer: Friedel Rausch</p>
    <p>Stammformation (typisch):</p>
    <p>Tschudin – Wehrli, Kaufmann, Schönenberger – Burri – Müller, Mohr – Nadig, Gretarsson...</p>
  </div>
);

const SpielerPage = () => (
  <div className="page">
    <h2>202 — SPIELER</h2>
    <h3>Top-Torschützen 1988/89</h3>
    <table className="teletext-table">
      <thead><tr><th>Rang</th><th>Spieler</th><th>Tore</th></tr></thead>
      <tbody>
        <tr><td>1.</td><td>Peter Nadig</td><td>9</td></tr>
        <tr><td>2.</td><td>Sigurdur Gretarsson</td><td>7</td></tr>
        <tr><td>3.</td><td>Jürgen Mohr</td><td>5</td></tr>
      </tbody>
    </table>
  </div>
);

const TrainerPage = () => (
  <div className="page">
    <h2>203 — TRAINER</h2>
    <h3>Friedel Rausch</h3>
    <p>Cheftrainer 1985–1992</p>
    <p><strong>Größter Erfolg:</strong> Schweizer Meister 1988/89</p>
  </div>
);

const StatistikPage = () => (
  <div className="page">
    <h2>220 — SAISONSTATISTIK</h2>
    <p>Qualifikation + Finalrunde</p>
    <p><strong>FC Luzern wurde 1988/89 zum ersten Mal in der Vereinsgeschichte Schweizer Meister.</strong></p>
  </div>
);

export default App;

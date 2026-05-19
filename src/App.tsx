import { useState, useRef, useEffect } from 'react';
import './App.css';

const pages = {
  100: { title: "STARTSEITE", content: "Willkommen beim FSL Teletext" },
  101: { title: "INDEX", content: "Hauptmenü" },
  181: { title: "RESULTATE", component: "Resultate" },
  182: { title: "TABELLE", component: "Tabelle" },
  201: { title: "MANNSCHAFT", component: "Mannschaft" },
  202: { title: "SPIELER", component: "Spieler" },
  203: { title: "TRAINER", component: "Trainer" },
  220: { title: "SAISONSTATISTIK", component: "Statistik" },
} as const;

type PageId = keyof typeof pages;

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(100);
  const [isFlickering, setIsFlickering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavigation = (newPage: PageId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setIsFlickering(true);
    
    timeoutRef.current = setTimeout(() => {
      setCurrentPage(newPage);
      setIsFlickering(false);
    }, 180);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div className={`crt-container ${isFlickering ? 'flicker' : ''}`}>
      <div className="teletext-header">
        <div className="top-bar">
          <span>FSL FREISTOSS LUZERN TELETEXT</span>
          <span>SIEHE TXT {currentPage} • 19.05.1989 • 20:45</span>
        </div>
      </div>

      <div className="content">
        {currentPage === 181 && <ResultatePage />}
        {currentPage === 182 && <TabellePage />}
        {currentPage === 201 && <MannschaftPage />}
        {currentPage === 202 && <SpielerPage />}
        {currentPage === 203 && <TrainerPage />}
        {currentPage === 220 && <StatistikPage />}
        {/* Weitere Seiten bei Bedarf */}
      </div>

      <div className="navigation-bar">
        <button onClick={() => handleNavigation(101)}>F1 INDEX</button>
        <button onClick={() => handleNavigation(181)}>← RESULTATE</button>
        <button onClick={() => handleNavigation(182)}>TABELLE</button>
        <button onClick={() => handleNavigation(202)}>SPIELER</button>
        <button onClick={() => handleNavigation(220)}>STATISTIK</button>
      </div>
    </div>
  );
}

// Beispiel: Resultate Seite 181
function ResultatePage() {
  return (
    <div className="page">
      <h1>RESULTATE 1988/89</h1>
      <h2>FC Luzern – Schweizer Meister</h2>
      
      <h3>QUALIFIKATIONSRUNDE</h3>
      <table className="teletext-table">
        <thead>
          <tr><th>Datum</th><th>Gegner</th><th>H/A</th><th>Resultat</th></tr>
        </thead>
        <tbody>
          <tr className="heim"><td>23.07.88</td><td>St. Gallen</td><td>H</td><td><strong>3:2</strong></td></tr>
          {/* Weitere Zeilen... */}
        </tbody>
      </table>
      
      <div className="status">Datenquelle: RSSSF • Stand: vollständig</div>
    </div>
  );
}

// Weitere Komponenten (TabellePage, SpielerPage usw.) analog...

export default App;

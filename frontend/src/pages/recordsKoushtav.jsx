import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

const STORAGE_KEY = "handCricketMatchLog_v2";

const Recordsk = () => {
  const [matches] = useState(load());

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function fmtPct(n) {
    return (isFinite(n) ? (n * 100).toFixed(1) : "0.0") + "%";
  }

  function ratio(w, l) {
    if (l === 0) return w > 0 ? "∞" : "0.00";
    return (w / l).toFixed(2);
  }

  function computeStats(matches) {
    const total = matches.length;

    const defaultStats = {
      total: 0,
      draws: 0,
      last: "—",
      human: { wins: 0, losses: 0, winpct: 0, ratio: "0.00", streak: 0 },
      battingStats: [
        {
          MAT: 0,
          RUNS: 0,
          HS: 0,
          AVG: "0.00",
          SR: "0.00",
          HUNDREDS: 0,
          FIFTIES: 0,
          SIXES: 0,
        },
      ],
      bowlingStats: [
        {
          MAT: 0,
          BALLS: 0,
          RUNS: 0,
          WIKTS: 0,
          BBM: "N/A",
          AVE: "0.00",
          ECON: "0.00",
          SR: "0.00",
        },
      ],
    };

    if (total === 0) {
      return defaultStats;
    }

    let humanW = 0,
      humanL = 0,
      draws = 0;
    matches.forEach((m) => {
      if (m.winner === "Human") humanW++;
      else if (m.winner === "AI") humanL++;
      else draws++;
    });

    let humanStreak = 0;
    for (let i = matches.length - 1; i >= 0; i--) {
      if (matches[i].winner === "Human") humanStreak++;
      else break;
    }

    const career = {
      RUNS: 0,
      HS: 0,
      HUNDREDS: 0,
      FIFTIES: 0,
      BALLS_FACED: 0,
      DISMISSALS: 0,
      RUNS_CONCEDED: 0,
      BALLS_BOWLED: 0,
      WIKTS_TAKEN: 0,
      BEST_RUNS: Infinity,
      BEST_WICKETS: 0,
    };

    matches.forEach((m) => {
      const humanScore = m.humanScore || 0;
      const aiScore = m.aiScore || 0;
      const humanWickets = m.humanWickets || 0;
      const aiWickets = m.aiWickets || 0;

      career.RUNS += humanScore;
      career.HS = Math.max(career.HS, humanScore);
      if (humanScore >= 100) career.HUNDREDS++;
      else if (humanScore >= 50) career.FIFTIES++;
      career.BALLS_FACED += m.humanBalls || 0;
      career.DISMISSALS += aiWickets;

      career.RUNS_CONCEDED += aiScore;
      career.BALLS_BOWLED += m.aiBalls || 0;
      career.WIKTS_TAKEN += humanWickets;

      if (humanWickets > career.BEST_WICKETS) {
        career.BEST_WICKETS = humanWickets;
        career.BEST_RUNS = aiScore;
      } else if (
        humanWickets === career.BEST_WICKETS &&
        aiScore < career.BEST_RUNS
      ) {
        career.BEST_RUNS = aiScore;
      }
    });

    const battingSr =
      career.BALLS_FACED > 0
        ? ((career.RUNS / career.BALLS_FACED) * 100).toFixed(2)
        : "0.00";

    const bowlingEcon =
      career.BALLS_BOWLED > 0
        ? ((career.RUNS_CONCEDED / career.BALLS_BOWLED) * 6).toFixed(2)
        : "0.00";
    const bowlingAve =
      career.WIKTS_TAKEN > 0
        ? (career.RUNS_CONCEDED / career.WIKTS_TAKEN).toFixed(2)
        : "N/A";
    const bowlingSr =
      career.WIKTS_TAKEN > 0
        ? (career.BALLS_BOWLED / career.WIKTS_TAKEN).toFixed(2)
        : "N/A";
    const bowlingBbm =
      career.BEST_WICKETS > 0
        ? `${career.BEST_WICKETS}/${career.BEST_RUNS}`
        : "N/A";

    return {
      total,
      draws,
      last: matches.length > 0 ? matches[total - 1].winner : "—",
      human: {
        wins: humanW,
        losses: humanL,
        winpct: total > draws ? humanW / (total - draws) : 0,
        ratio: ratio(humanW, humanL),
        streak: humanStreak,
      },
      battingStats: [
        {
          MAT: total,
          RUNS: career.RUNS,
          HS: career.HS,
          AVG: total > 0 ? (career.RUNS / total).toFixed(2) : "0.00",
          SR: battingSr,
          HUNDREDS: career.HUNDREDS,
          FIFTIES: career.FIFTIES,
          SIXES: 0,
        },
      ],
      bowlingStats: [
        {
          MAT: total,
          BALLS: career.BALLS_BOWLED,
          RUNS: career.RUNS_CONCEDED,
          WIKTS: career.WIKTS_TAKEN,
          BBM: bowlingBbm,
          AVE: bowlingAve,
          ECON: bowlingEcon,
          SR: bowlingSr,
        },
      ],
    };
  }

  const stats = computeStats(matches);

  const radarData = {
    labels: ["Wins", "Losses", "Draws", "Win %", "W/L Ratio"],
    datasets: [
      {
        label: "Human Stats",
        data: [
          stats.human.wins,
          stats.human.losses,
          stats.draws,
          stats.human.winpct * 100,
          parseFloat(stats.human.ratio) || 0,
        ],
        backgroundColor: "rgba(33,192,122,0.2)",
        borderColor: "rgba(33,192,122,1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(33,192,122,1)",
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#e6e8ee", font: { size: 16 } } },
      title: { display: true, text: "Human Stats Overview", color: "#e6e8ee", font: { size: 20 } },
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: { color: "#e6e8ee", backdropColor: "rgba(0,0,0,0.5)", font: { size: 14 } },
        grid: { color: "rgba(255,255,255,0.1)" },
        angleLines: { color: "rgba(255,255,255,0.2)" },
        pointLabels: { color: "#e6e8ee", font: { size: 16 } },
        suggestedMax:
          Math.max(stats.human.wins, stats.human.losses, stats.draws, 5) + 2,
      },
    },
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        color: "#e6e8ee",
        fontSize: "1.5rem",
      }}
    >
      {/* Spline Background */}
      <Spline
        scene="https://prod.spline.design/2tgWGsC2DODUw1qc/scene.splinecode"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Content Overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "40px",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          maxWidth: "1400px", // keeps content centered
          margin: "0 auto",   // centers horizontally
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px 0",
          }}
        >
          <h1 style={{ fontSize: "3rem" }}>Match Records</h1>
        </header>

        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <div
            className="card"
            style={{
              background: "rgba(0,0,0,0.6)",
              padding: "40px",
              borderRadius: "20px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Overview</h2>
            <div className="kpis" style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
              {[
                { label: "Total Matches", value: stats.total },
                { label: "Wins", value: stats.human.wins },
                { label: "Losses", value: stats.human.losses },
                { label: "Draws", value: stats.draws },
                { label: "Win %", value: fmtPct(stats.human.winpct) },
                { label: "W/L Ratio", value: stats.human.ratio },
                { label: "Last Result", value: stats.last },
                { label: "Win Streak", value: stats.human.streak },
              ].map((kpi, idx) => (
                <div key={idx} className="kpi" style={{ flex: "1 1 300px" }}>
                  <div className="label" style={{ fontSize: "1.4rem" }}>{kpi.label}</div>
                  <div className="value" style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="card chart-scorecard-row"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
              background: "rgba(0,0,0,0.6)",
              padding: "40px",
              borderRadius: "20px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* RadarChart and Scorecard side by side */}
            <div className="radar-chart" style={{ flex: "1 1 50%", minHeight: "400px" }}>
              <Radar data={radarData} options={radarOptions} />
            </div>

            <div className="scorecard" style={{ flex: "1 1 50%" }}>
              <h3 style={{ marginTop: "0", fontSize: "2rem" }}>Batting Stats</h3>
              <div className="table-wrap" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", color: "#e6e8ee", fontSize: "1.5rem" }}>
                  <thead>
                    <tr>
                      <th>MAT</th>
                      <th>RUNS</th>
                      <th>HS</th>
                      <th>AVG</th>
                      <th>SR</th>
                      <th>100</th>
                      <th>50</th>
                      <th>6S</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.battingStats.map((b, idx) => (
                      <tr key={idx}>
                        <td>{b.MAT}</td>
                        <td>{b.RUNS}</td>
                        <td>{b.HS}</td>
                        <td>{b.AVG}</td>
                        <td>{b.SR}</td>
                        <td>{b.HUNDREDS}</td>
                        <td>{b.FIFTIES}</td>
                        <td>{b.SIXES}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ marginTop: "40px", fontSize: "2rem" }}>Bowling Stats</h3>
              <div className="table-wrap" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", color: "#e6e8ee", fontSize: "1.5rem" }}>
                  <thead>
                    <tr>
                      <th>MAT</th>
                      <th>BALLS</th>
                      <th>RUNS</th>
                      <th>WIKTS</th>
                      <th>BBM</th>
                      <th>AVE</th>
                      <th>ECON</th>
                      <th>SR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.bowlingStats.map((b, idx) => (
                      <tr key={idx}>
                        <td>{b.MAT}</td>
                        <td>{b.BALLS}</td>
                        <td>{b.RUNS}</td>
                        <td>{b.WIKTS}</td>
                        <td>{b.BBM}</td>
                        <td>{b.AVE}</td>
                        <td>{b.ECON}</td>
                        <td>{b.SR}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Recordsk;

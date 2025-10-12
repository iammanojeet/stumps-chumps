// History.jsx
import React from "react";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Historyk = () => {
  const nickname = localStorage.getItem("nickname") || "Player123";

  const matches = [
    { player1: nickname, player2: "Mr AI", winner: "Mr AI", margin: 18 },
    { player1: nickname, player2: "AI Mahashai", winner: nickname, margin: 12 },
    { player1: nickname, player2: "Jai Ho AI", winner: "Jai Ho AI", margin: 6 },
    { player1: nickname, player2: "Ho AI", winner: "Ho AI", margin: 12 },
    { player1: nickname, player2: "Ho AI", winner: "Ho AI", margin: 12 },
    { player1: nickname, player2: "Ho AI", winner: "Ho AI", margin: 12 },
  ];

  const styles = {
    page: {
      display: "flex",
      flexDirection: "column",
      padding: "1rem 2rem",
      color: "#fff",
      fontFamily: "'Press Start 2P', sans-serif",
      height: "100vh",
      background: "#000000",
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1rem",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#fff",
      fontWeight: "bold",
      gap: "0.5rem",
    },
    content: {
      display: "flex",
      gap: "2rem",
      flex: 1,
      height: "100%",
    },
    leftSide: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      marginBottom: "0.1rem",
      textAlign: "center", // 👈 Centered
    },
    matchList: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      overflowY: "auto",
      marginTop: "8rem",
      paddingRight: "0.5rem",
    },
    matchCard: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(255, 255, 255, 0.08)",
      padding: "1.2rem 1.5rem",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
      transition: "transform 0.2s ease, background 0.3s ease",
      fontSize: "0.9rem",
    },
    player: {
      fontWeight: "bold",
      fontSize: "1rem",
    },
    result: {
      textAlign: "center",
      fontSize: "0.85rem",
      lineHeight: "1.5",
    },
    splineContainer: {
      flex: 1,
      height: "100%",
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <Link to="/home" style={styles.backButton}>
          <ArrowLeft size={24} /> Back
        </Link>
      </div>

      {/* Side by side layout */}
      <div style={styles.content}>
        {/* Left: Match Records */}
        <div style={styles.leftSide}>
          <h2 style={styles.sectionTitle}>Match History</h2>
          <div style={styles.matchList}>
            {matches.map((match, index) => (
              <div
                style={styles.matchCard}
                key={index}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.08)")
                }
              >
                <div style={styles.player}>{match.player1}</div>
                <div style={styles.result}>
                  {match.winner} WIN <br /> BY {match.margin} RUNS
                </div>
                <div style={styles.player}>{match.player2}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Spline 3D Robot */}
        <div style={styles.splineContainer}>
          <Spline scene="https://prod.spline.design/d-irNwQP1BNY1Zzi/scene.splinecode" />
        </div>
      </div>
    </div>
  );
};

export default Historyk;

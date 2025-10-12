import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import gsap from "gsap";
import toast, { Toaster } from "react-hot-toast";
import Spline from "@splinetool/react-spline";

// --- Coin 3D Component ---
const Coin = ({ isFlipping, result }) => {
  const coinRef = useRef();

  useFrame(() => {
    if (isFlipping && coinRef.current) {
      coinRef.current.rotation.x += 0.3;
      coinRef.current.rotation.y += 0.2;
    }
  });

  useEffect(() => {
    if (!isFlipping && coinRef.current && result) {
      gsap.to(coinRef.current.rotation, {
        x: result === "Heads" ? Math.PI / 2 : -Math.PI / 2,
        y: 0,
        z: 0,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [isFlipping, result]);

  return (
    <group ref={coinRef}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.2, 64]} />
        <meshStandardMaterial color="#f5c542" metalness={0.6} roughness={0.3} />
      </mesh>
      <Text
        position={[0, 0.11, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        fontSize={0.7}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        H
      </Text>
      <Text
        position={[0, -0.11, 0]}
        rotation={[Math.PI / 2, Math.PI, 0]}
        fontSize={0.7}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        T
      </Text>
    </group>
  );
};

// --- Toss Component ---
const Tossk = () => {
  const navigate = useNavigate();

  const [overs, setOvers] = useState(null);
  const [wickets, setWickets] = useState(null);
  const [step, setStep] = useState("setup");

  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [showChoice, setShowChoice] = useState(false);
  const [showBatBowl, setShowBatBowl] = useState(false);

  const oversOptions = [1, 2, 5, 10, "Unlimited"];
  const wicketsOptions = [1, 3, 5, 10, "Unlimited"];

  const handleOversSelect = (o) => {
    if (o === "Unlimited" && wickets === "Unlimited") {
      toast.error("Cannot select Unlimited overs and Unlimited wickets at the same time!");
      return;
    }
    setOvers(o);
  };

  const handleWicketsSelect = (w) => {
    if (w === "Unlimited" && overs === "Unlimited") {
      toast.error("Cannot select Unlimited overs and Unlimited wickets at the same time!");
      return;
    }
    setWickets(w);
  };

  const handleProceedToToss = () => {
    if (overs && wickets) setStep("toss");
  };

  const handleStart = () => {
    setShowChoice(true);
    setResult(null);
    setUserChoice(null);
    setShowBatBowl(false);
  };

  const handleUserChoiceToss = (choice) => {
    setUserChoice(choice);
    setShowChoice(false);
    setIsFlipping(true);

    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? "Heads" : "Tails";
      setIsFlipping(false);
      setResult(outcome);

      if (choice === outcome) {
        setShowBatBowl(true);
      } else {
        const randomChoice = Math.random() > 0.5 ? "Batting" : "Bowling";
        localStorage.setItem(
          "cricketGameSettings",
          JSON.stringify({ overs, wickets, userBatsFirst: randomChoice === "Bowling" })
        );
        setTimeout(() => navigate("/game"), 1000);
      }
    }, 3000);
  };

  const handleBatBowlChoice = (choice) => {
    localStorage.setItem(
      "cricketGameSettings",
      JSON.stringify({ overs, wickets, userBatsFirst: choice === "Batting" })
    );
    navigate("/game");
  };

  const buttonStyle = {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    background: "#f5c542",
    color: "#000",
    fontWeight: "bold",
    fontSize: "1.3rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const selectedColor = "#42f5c5"; // color for selected option

  // --- Render Setup ---
  // --- Render Setup ---
const renderSetup = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "25px",
      color: "white",
      textAlign: "center",
      backdropFilter: "blur(12px)", // 🔹 Blurring effect
      backgroundColor: "rgba(0,0,0,0.35)", // 🔹 Optional dark overlay for readability
      padding: "30px",
      borderRadius: "16px",
    }}
  >
    <Toaster position="top-center" reverseOrder={false} />
    <h2 style={{ fontSize: "3rem" }}>Game Setup</h2>

    <div>
      <h3 style={{ fontSize: "1.7rem" }}>Select Overs</h3>
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {oversOptions.map((o) => (
          <button
            key={o}
            onClick={() => handleOversSelect(o)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.07)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
            style={{
              ...buttonStyle,
              background: overs === o ? selectedColor : "#f5c542",
            }}
          >
            {o}
          </button>
        ))}
      </div>
    </div>

    <div>
      <h3 style={{ fontSize: "1.7rem" }}>Select Wickets</h3>
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {wicketsOptions.map((w) => (
          <button
            key={w}
            onClick={() => handleWicketsSelect(w)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.07)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
            style={{
              ...buttonStyle,
              background: wickets === w ? selectedColor : "#f5c542",
            }}
          >
            {w}
          </button>
        ))}
      </div>
    </div>

    <button
      onClick={handleProceedToToss}
      disabled={!overs || !wickets}
      style={{
        ...buttonStyle,
        cursor: !overs || !wickets ? "not-allowed" : "pointer",
        opacity: !overs || !wickets ? 0.6 : 1,
      }}
    >
      Proceed to Toss
    </button>
  </div>
);


  // --- Render Toss ---
  // --- Render Toss ---
const renderToss = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "25px",
      color: "white",
      textAlign: "center",
      backdropFilter: "blur(12px)",  // ✅ Blur effect
      backgroundColor: "rgba(0,0,0,0.35)", // ✅ Dark overlay
      padding: "30px",
      borderRadius: "16px",
    }}
  >
    <h2 style={{ fontSize: "3rem" }}>Coin Toss</h2>
    <div style={{ width: "350px", height: "350px" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Coin isFlipping={isFlipping} result={result} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>

    {!showChoice && !userChoice && !result && !isFlipping && (
      <button
        onClick={handleStart}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        style={buttonStyle}
      >
        Toss Coin
      </button>
    )}

    {showChoice && (
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        {["Heads", "Tails"].map((choice) => (
          <button
            key={choice}
            onClick={() => handleUserChoiceToss(choice)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            style={{
              ...buttonStyle,
              background: userChoice === choice ? selectedColor : "#f5c542",
            }}
          >
            {choice}
          </button>
        ))}
      </div>
    )}

    {isFlipping && <p style={{ fontSize: "1.5rem" }}>Toss ongoing...</p>}
    {result && !isFlipping && (
      <p style={{ fontSize: "1.5rem" }}>
        Result:{" "}
        <span style={{ fontWeight: "bold", fontSize: "1.6rem" }}>{result}</span>{" "}
        {userChoice && `(You chose: ${userChoice})`}
      </p>
    )}

    {showBatBowl && (
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        {["Batting", "Bowling"].map((choice) => (
          <button
            key={choice}
            onClick={() => handleBatBowlChoice(choice)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            style={{
              ...buttonStyle,
              background: userChoice === choice ? selectedColor : "#f5c542",
            }}
          >
            {choice}
          </button>
        ))}
      </div>
    )}
  </div>
);


  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Spline Background */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <Spline scene="https://prod.spline.design/pcZiqjMEkAUNsLBM/scene.splinecode" />
      </div>

      {/* Toss UI */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {step === "setup" ? renderSetup() : renderToss()}
      </div>
    </div>
  );
};

export default Tossk;

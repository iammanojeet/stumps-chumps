// import React, { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Text } from "@react-three/drei";
// import gsap from "gsap";
// import toast, { Toaster } from "react-hot-toast";
// import Spline from "@splinetool/react-spline";

// // --- Coin 3D Component ---
// const Coin = ({ isFlipping, result }) => {
//   const coinRef = useRef();

//   useFrame(() => {
//     if (isFlipping && coinRef.current) {
//       coinRef.current.rotation.x += 0.3;
//       coinRef.current.rotation.y += 0.2;
//     }
//   });

//   useEffect(() => {
//     if (!isFlipping && coinRef.current && result) {
//       gsap.to(coinRef.current.rotation, {
//         x: result === "Heads" ? Math.PI / 2 : -Math.PI / 2,
//         y: 0,
//         z: 0,
//         duration: 1,
//         ease: "power2.out",
//       });
//     }
//   }, [isFlipping, result]);

//   return (
//     <group ref={coinRef}>
//       <mesh>
//         <cylinderGeometry args={[1, 1, 0.2, 64]} />
//         <meshStandardMaterial color="#f5c542" metalness={0.6} roughness={0.3} />
//       </mesh>

//       <Text
//         position={[0, 0.11, 0]}
//         rotation={[Math.PI / 2, 0, 0]}
//         fontSize={0.5}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//         H
//       </Text>
//       <Text
//         position={[0, -0.11, 0]}
//         rotation={[Math.PI / 2, Math.PI, 0]}
//         fontSize={0.5}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//         T
//       </Text>
//     </group>
//   );
// };

// // --- Toss Component ---
// const Tossk = () => {
//   const navigate = useNavigate();

//   const [overs, setOvers] = useState(null);
//   const [wickets, setWickets] = useState(null);
//   const [step, setStep] = useState("setup");

//   const [isFlipping, setIsFlipping] = useState(false);
//   const [result, setResult] = useState(null);
//   const [userChoice, setUserChoice] = useState(null);
//   const [showChoice, setShowChoice] = useState(false);
//   const [showBatBowl, setShowBatBowl] = useState(false);

//   const oversOptions = [1, 2, 5, 10, "Unlimited"];
//   const wicketsOptions = [1, 3, 5, 10, "Unlimited"];

//   const handleOversSelect = (o) => {
//     if (o === "Unlimited" && wickets === "Unlimited") {
//       toast.error("Cannot select Unlimited overs and Unlimited wickets at the same time!");
//       return;
//     }
//     setOvers(o);
//   };

//   const handleWicketsSelect = (w) => {
//     if (w === "Unlimited" && overs === "Unlimited") {
//       toast.error("Cannot select Unlimited overs and Unlimited wickets at the same time!");
//       return;
//     }
//     setWickets(w);
//   };

//   const handleProceedToToss = () => {
//     if (overs && wickets) setStep("toss");
//   };

//   const handleStart = () => {
//     setShowChoice(true);
//     setResult(null);
//     setUserChoice(null);
//     setShowBatBowl(false);
//   };

//   const handleUserChoiceToss = (choice) => {
//     setUserChoice(choice);
//     setShowChoice(false);
//     setIsFlipping(true);

//     setTimeout(() => {
//       const outcome = Math.random() > 0.5 ? "Heads" : "Tails";
//       setIsFlipping(false);
//       setResult(outcome);

//       if (choice === outcome) {
//         setShowBatBowl(true);
//       } else {
//         const randomChoice = Math.random() > 0.5 ? "Batting" : "Bowling";
//         localStorage.setItem(
//           "cricketGameSettings",
//           JSON.stringify({ overs, wickets, userBatsFirst: randomChoice === "Bowling" })
//         );
//         setTimeout(() => navigate("/game"), 1000);
//       }
//     }, 3000);
//   };

//   const handleBatBowlChoice = (choice) => {
//     localStorage.setItem(
//       "cricketGameSettings",
//       JSON.stringify({ overs, wickets, userBatsFirst: choice === "Batting" })
//     );
//     navigate("/game");
//   };

//   // --- Hover helper ---
//   const useHover = () => {
//     const [hovered, setHovered] = useState(false);
//     const onMouseEnter = () => setHovered(true);
//     const onMouseLeave = () => setHovered(false);
//     return { hovered, onMouseEnter, onMouseLeave };
//   };

//   // --- Base button style ---
//   const buttonStyle = {
//     padding: "10px 20px",
//     borderRadius: "8px",
//     border: "none",
//     background: "#f5c542",
//     color: "#000",
//     fontWeight: "bold",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//   };

//   // --- Render Setup ---
//   const renderSetup = () => (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       gap: "20px",
//       color: "white",
//       textAlign: "center"
//     }}>
//       <Toaster position="top-center" reverseOrder={false} />
//       <h2>Game Setup</h2>

//       <div style={{ marginBottom: "20px" }}>
//         <h3>Select Overs</h3>
//         <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
//           {oversOptions.map((o) => {
//             const hover = useHover();
//             return (
//               <button
//                 key={o}
//                 onClick={() => handleOversSelect(o)}
//                 onMouseEnter={hover.onMouseEnter}
//                 onMouseLeave={hover.onMouseLeave}
//                 style={{
//                   ...buttonStyle,
//                   background: overs === o ? "#f5c542cc" : hover.hovered ? "#f5c542aa" : "#f5c542",
//                   transform: hover.hovered ? "scale(1.05)" : "scale(1)"
//                 }}
//               >
//                 {o}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <h3>Select Wickets</h3>
//         <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
//           {wicketsOptions.map((w) => {
//             const hover = useHover();
//             return (
//               <button
//                 key={w}
//                 onClick={() => handleWicketsSelect(w)}
//                 onMouseEnter={hover.onMouseEnter}
//                 onMouseLeave={hover.onMouseLeave}
//                 style={{
//                   ...buttonStyle,
//                   background: wickets === w ? "#f5c542cc" : hover.hovered ? "#f5c542aa" : "#f5c542",
//                   transform: hover.hovered ? "scale(1.05)" : "scale(1)"
//                 }}
//               >
//                 {w}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <button
//         onClick={handleProceedToToss}
//         disabled={!overs || !wickets}
//         style={{
//           ...buttonStyle,
//           cursor: !overs || !wickets ? "not-allowed" : "pointer",
//           opacity: !overs || !wickets ? 0.6 : 1
//         }}
//       >
//         Proceed to Toss
//       </button>
//     </div>
//   );

//   // --- Render Toss ---
//   const renderToss = () => (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       gap: "20px",
//       color: "white",
//       textAlign: "center"
//     }}>
//       <h2>Coin Toss</h2>
//       <div style={{ width: "300px", height: "300px" }}>
//         <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
//           <ambientLight intensity={0.7} />
//           <directionalLight position={[5, 5, 5]} intensity={1} />
//           <Coin isFlipping={isFlipping} result={result} />
//           <OrbitControls enableZoom={false} />
//         </Canvas>
//       </div>

//       <div>
//         {!showChoice && !userChoice && !result && !isFlipping && (() => {
//           const hover = useHover();
//           return (
//             <button
//               onClick={handleStart}
//               onMouseEnter={hover.onMouseEnter}
//               onMouseLeave={hover.onMouseLeave}
//               style={{
//                 ...buttonStyle,
//                 transform: hover.hovered ? "scale(1.05)" : "scale(1)"
//               }}
//             >
//               Toss Coin
//             </button>
//           );
//         })()}

//         {showChoice && (
//           <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
//             {["Heads", "Tails"].map((choice) => {
//               const hover = useHover();
//               return (
//                 <button
//                   key={choice}
//                   onClick={() => handleUserChoiceToss(choice)}
//                   onMouseEnter={hover.onMouseEnter}
//                   onMouseLeave={hover.onMouseLeave}
//                   style={{
//                     ...buttonStyle,
//                     transform: hover.hovered ? "scale(1.05)" : "scale(1)"
//                   }}
//                 >
//                   {choice}
//                 </button>
//               );
//             })}
//           </div>
//         )}

//         {isFlipping && <p>Toss ongoing...</p>}

//         {result && !isFlipping && (
//           <p>
//             Result: <span style={{ fontWeight: "bold" }}>{result}</span>{" "}
//             {userChoice && `(You chose: ${userChoice})`}
//           </p>
//         )}

//         {showBatBowl && (
//           <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
//             {["Batting", "Bowling"].map((choice) => {
//               const hover = useHover();
//               return (
//                 <button
//                   key={choice}
//                   onClick={() => handleBatBowlChoice(choice)}
//                   onMouseEnter={hover.onMouseEnter}
//                   onMouseLeave={hover.onMouseLeave}
//                   style={{
//                     ...buttonStyle,
//                     transform: hover.hovered ? "scale(1.05)" : "scale(1)"
//                   }}
//                 >
//                   {choice}
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
//       {/* Spline Background */}
//       <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
//         <Spline scene="https://prod.spline.design/pcZiqjMEkAUNsLBM/scene.splinecode" />
//       </div>

//       {/* Toss UI */}
//       <div style={{
//         position: "relative",
//         zIndex: 1,
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center"
//       }}>
//         {step === "setup" ? renderSetup() : renderToss()}
//       </div>
//     </div>
//   );
// };

// export default Tossk;

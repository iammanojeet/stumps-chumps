import React from "react";
import Spline from "@splinetool/react-spline";

const Rulesk = () => {
  return (
    <div className="rules-container">
      {/* Spline Background */}
      <div className="spline-bg">
        <Spline scene="https://prod.spline.design/hbrcX4SkALd-rRfk/scene.splinecode" />
      </div>
      <div className="overlay"></div>

      <h1 className="rules-title">Game Rules</h1>

      <div className="rules-box">
        <ul className="rules-list">
          <li className="rule-item">1. Two players take turns batting and bowling.</li>
          <li className="rule-item">2. Both players choose a number between 1–6.</li>
          <li className="rule-item">3. If the numbers match, the batsman is out.</li>
          <li className="rule-item">4. If they don’t match, the batsman scores runs equal to their chosen number.</li>
          <li className="rule-item">5. Each player bats once, and the one with the higher score wins.</li>
          <li className="rule-item">
            6. ✋ Show a number (0–6) with your hand in front of the webcam.
            <div className="rule-desc">Each finger count = runs. ✌️ = 2 runs, ✋ = 5 runs, 👍 = 6 runs.</div>
          </li>
          <li className="rule-item">
            7. ❌ If your number matches the bowler’s, you are OUT.
            <div className="rule-desc">Example: You play 4️⃣, bowler also bowls 4️⃣ → you lose a wicket.</div>
          </li>
          <li className="rule-item">
            8. ➕ If your number does NOT match, you score runs.
            <div className="rule-desc">Non-matching inputs = runs added to your score.</div>
          </li>
          <li className="rule-item">
            9. ⏱️ If no gesture shown in 5 seconds → Dead Ball.
            <div className="rule-desc">Stay alert! Miss the timer = ball wasted, no runs scored.</div>
          </li>
          <li className="rule-item">
            10. 🎳 Show a number (0–6) as your delivery.
            <div className="rule-desc">This is your “ball.” AI batsman will play against your number.</div>
          </li>
          <li className="rule-item">
            11. 🎯 If your number matches batsman’s → WICKET.
            <div className="rule-desc">Example: You bowl 2️⃣, batsman plays 2️⃣ → BOWLED!</div>
          </li>
          <li className="rule-item">
            12. ➖ If your number doesn’t match → runs conceded.
            <div className="rule-desc">Non-matching input means batsman scores that many runs.</div>
          </li>
          <li className="rule-item">
            13. ⏱️ If you don’t show in 5 seconds → Dead Ball.
            <div className="rule-desc">Failing to bowl in time wastes the delivery, ball replayed.</div>
          </li>
          <li className="rule-item">
            14. 🏆 Highest runs after both innings wins.
            <div className="rule-desc">Score more than your opponent across batting + bowling to be the champion!</div>
          </li>
          <li className="rule-item">
            15. 🔥 Tie → Super Over.
            <div className="rule-desc">1 over shootout to decide the final winner.</div>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .rules-container {
          height: 100vh;
          width: 100%;
          padding: 3rem 1rem;
          font-family: "Poppins", sans-serif;
          color: #fff;
          text-align: center;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          overflow: hidden;
          padding-top: 4rem;
        }

        .spline-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -3;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: -2;
        }

        .rules-title {
          font-size: 2.8rem;
          margin-bottom: 2rem;
          text-shadow: 0 0 15px #fff, 0 0 30px #fff;
          position: relative;
          z-index: 1;
          letter-spacing: 2px;
        }

        .rules-box {
          max-height: 80vh;
          width: 85%;
          overflow-y: auto;
          padding: 1.5rem 2rem;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.3);
          position: relative;
          z-index: 1;

          /* Hide scrollbar but keep scroll */
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE & Edge */
        }

        .rules-box::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        .rules-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .rule-item {
          font-size: 1.2rem;
          margin: 1rem 0;
          padding: 1rem 1.2rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          opacity: 1;
          transform: translateY(0);
          transition: all 0.3s ease, box-shadow 0.3s ease;
        }

        .rule-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 15px #fff, 0 0 30px rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.1);
        }

        .rule-desc {
          font-size: 1rem;
          margin-top: 0.5rem;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default Rulesk;

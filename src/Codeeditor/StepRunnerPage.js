import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function StepRunnerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.state?.code || "";

  const lines = code.split("\n");

  const [currentLine, setCurrentLine] = useState(0);
  const [output, setOutput] = useState([]);
  const [contextCode, setContextCode] = useState("");

  const runNextLine = () => {
    if (currentLine >= lines.length) return;

    let newContext = contextCode + "\n" + lines[currentLine];

    let logs = [];
    const originalLog = console.log;

    try {
      console.log = (...args) => {
        logs.push(args.join(" "));
      };

      // eslint-disable-next-line no-eval
      eval(newContext);

      setOutput(logs);
      setContextCode(newContext);
      setCurrentLine((prev) => prev + 1);

    } catch (err) {
      if (err instanceof SyntaxError) {
        setContextCode(newContext);
        setCurrentLine((prev) => prev + 1);
        if (currentLine === lines.length - 1) {
          setOutput((prev) => [...prev, "Error: Incomplete or invalid syntax"]);
        }
      } else {
        setOutput([...logs, "Error: " + err.message]);
        setCurrentLine(lines.length);
      }
    } finally {
      console.log = originalLog;
    }
  };

  const reset = () => {
    setCurrentLine(0);
    setOutput([]);
    setContextCode("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/")}>⬅ Back</button>
        <h2>Step-by-Step Runner</h2>
      </div>

      <div style={styles.codeBox}>
        {lines.map((line, index) => (
          <div
            key={index}
            style={{
              background: index === currentLine ? "#333" : "transparent",
              padding: "4px",
            }}
          >
            {index + 1}. {line}
          </div>
        ))}
      </div>

      <div style={styles.controls}>
        <button onClick={runNextLine}>▶️ Next Line</button>
        <button onClick={reset}>🔄 Reset</button>
      </div>

      <div style={styles.output}>
        <h3>Console Output:</h3>
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { background: "#1e1e1e", color: "#fff", height: "100vh", padding: "10px" },
  header: { display: "flex", gap: "10px", alignItems: "center" },
  codeBox: { marginTop: "10px", background: "#000", padding: "10px", minHeight: "200px" },
  controls: { marginTop: "10px", display: "flex", gap: "10px" },
  output: { marginTop: "20px", background: "#111", padding: "10px" },
};

export default StepRunnerPage;
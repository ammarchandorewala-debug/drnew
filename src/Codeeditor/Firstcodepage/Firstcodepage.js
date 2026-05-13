import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";

function Firstcodepage() {
  const [code, setCode] = useState(() => {
    return localStorage.getItem("savedCode") || `// Write JS code
console.log("Hello Ammar");
`;
  });

  useEffect(() => {
    localStorage.setItem("savedCode", code);
  }, [code]);
  const navigate = useNavigate();

   const handleRun = () => {
     navigate("/run", { state: { code } });
   };

   const handleStepRun = () => {
     navigate("/step", { state: { code } });
   };

   const handleFlowchart = () => {
     navigate("/flowchart", { state: { code } });
   };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>JS Editor</h2>
        <button onClick={handleRun} style={styles.button}>
          Run Code ▶️
        </button>
      <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={handleRun}>Run ▶️</button>
      <button onClick={handleStepRun}>Step Run 🧠</button>
      <button onClick={handleFlowchart}>Flowchart 📊</button>
      </div>
      </div>

      <Editor
        height="90vh"
        defaultLanguage="javascript"
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value)}
        options={{ automaticLayout: true }}
      />
    </div>
  );
}

const styles = {
  container: { background: "#1e1e1e", color: "#fff" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    background: "#252526",
  },
  button: {
    padding: "6px 12px",
    background: "#0e639c",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Firstcodepage;
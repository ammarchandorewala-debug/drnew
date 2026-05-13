import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import js2flowchart from "js2flowchart";

function FlowchartPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.state?.code || "";

  const [svgContent, setSvgContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (code.trim() === "") {
        throw new Error("No code provided to generate a flowchart.");
      }
      const svg = js2flowchart.run(code);
      setSvgContent(svg);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to parse code. Ensure it is valid JavaScript.");
      setSvgContent("");
    }
  }, [code]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/")} style={styles.button}>⬅ Back</button>
        <h2>Code Flowchart</h2>
      </div>

      <div style={styles.content}>
        {error ? (
          <div style={styles.errorBox}>
            <h3>⚠️ Could not generate flowchart</h3>
            <p>{error}</p>
            <p>Make sure your JavaScript code is syntactically valid.</p>
          </div>
        ) : (
          <div 
            style={styles.svgContainer} 
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { background: "#1e1e1e", color: "#fff", height: "100vh", padding: "10px", display: "flex", flexDirection: "column" },
  header: { display: "flex", gap: "10px", alignItems: "center" },
  button: { padding: "6px 12px", background: "#0e639c", color: "#fff", border: "none", cursor: "pointer" },
  content: { flex: 1, marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "flex-start", overflow: "auto" },
  errorBox: { padding: "20px", background: "#2d1e1e", border: "1px solid red", borderRadius: "5px" },
  svgContainer: { 
    background: "#fff", 
    padding: "20px", 
    borderRadius: "5px", 
    color: "#000",
    minWidth: "600px",
    display: "flex",
    justifyContent: "center"
  }
};

export default FlowchartPage;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { explainError } from "./errorHelper";

function RunCodePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const code = location.state?.code || "";
  const input = location.state?.input || ""; // ✅ stdin support

  const [output, setOutput] = useState("Running...");
  const [errorData, setErrorData] = useState(null);

  useEffect(() => {
    runCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runCode = async () => {
    try {
      const response = await fetch(
        "https://ce.judge0.com/submissions?wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language_id: 63, // 
            source_code: code,
            stdin: input,
          }),
        }
      );

      const data = await response.json();

      console.log("Judge0 Response:", data); // DEBUG

      // ✅ Handle errors
      if (data.stderr) {
        setOutput(data.stderr);
        setErrorData(explainError(data.stderr));
      }
      else if (data.compile_output) {
        setOutput(data.compile_output);
        setErrorData(explainError(data.compile_output));
      }
      else {
        setOutput(data.stdout || "No Output");
        setErrorData(null);
      }

    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate("/")}>⬅ Back</button>
        <h2>Output (Judge0)</h2>
      </div>

      <pre style={styles.output}>{output}</pre>

      {errorData && (
        <div style={styles.errorBox}>
          <h3>🧠 Samjho kya galat hua:</h3>
          <p><b>{errorData.message}</b></p>
          <p>{errorData.explanation}</p>

          <h4>✅ Kaise thik kare:</h4>
          <p>{errorData.fix}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "#1e1e1e",
    color: "#fff",
    height: "100vh",
    padding: "10px",
  },
  header: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  output: {
    marginTop: "20px",
    background: "#000",
    padding: "15px",
    minHeight: "200px",
  },
  errorBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#2d1e1e",
    border: "1px solid red",
  },
};

export default RunCodePage;
export const explainError = (error) => {
  if (!error) return "";

  error = error.toLowerCase();

  if (error.includes("syntaxerror")) {
    return {
      message: "Syntax galat hai 😅",
      explanation: "Code ka format galat hai (brackets ya quotes missing ho sakte hain).",
      fix: "Check karo: (), {}, [] properly close hue hain ya nahi.",
    };
  }

  if (error.includes("referenceerror")) {
    return {
      message: "Variable define nahi hai ❌",
      explanation: "Jo variable use kar rahe ho wo declare nahi hua.",
      fix: "Use 'let', 'const' ya 'var' se variable define karo.",
    };
  }

  if (error.includes("typeerror")) {
    return {
      message: "Type galat use ho gaya ⚠️",
      explanation: "Galat type pe operation kar rahe ho (string pe math, undefined pe function).",
      fix: "Variable ka type check karo.",
    };
  }

  return {
    message: "Kuch error hai 🤔",
    explanation: error,
    fix: "Error dhyan se padho aur code debug karo.",
  };
};
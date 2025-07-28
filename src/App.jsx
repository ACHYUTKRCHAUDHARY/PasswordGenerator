import React, { useState } from "react";
const App = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (useSymbols) charset += "!@#$%^&*()";
    if (useNumbers) charset += "0123456789";
    if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (!charset) {
      setPassword("");
      setSuccessMessage("Select at least one character type!");
      setTimeout(() => setSuccessMessage(""), 2000);
      return;
    }

    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setSuccessMessage("Password copied to clipboard!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch {
      setSuccessMessage("Failed to copy!");
      setTimeout(() => setSuccessMessage(""), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4 p-6 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-green-600 text-center text-2xl font-bold mb-2">
        PassWord Generator
      </h1>
      <h3 className="text-center text-lg mb-6">Random Password Generator</h3>
      <div className="flex items-center mb-4">
        <label className="flex-1">Password Length:</label>
        <input
          type="number"
          min="8"
          max="32"
          value={passwordLength}
          onChange={(e) => setPasswordLength(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded ml-2 w-20"
        />
      </div>
      <div className="flex items-center mb-3 gap-4 flex-wrap">
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={() => setUseSymbols(!useSymbols)}
          />
          <span>Symbols</span>
        </label>
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={() => setUseNumbers(!useNumbers)}
          />
          <span>Numbers</span>
        </label>
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={useLowerCase}
            onChange={() => setUseLowerCase(!useLowerCase)}
          />
          <span>LowerCase</span>
        </label>
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={useUpperCase}
            onChange={() => setUseUpperCase(!useUpperCase)}
          />
          <span>UpperCase</span>
        </label>
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 w-full"
        onClick={generatePassword}
      >
        Generate Password
      </button>
      {password && (
        <div className="flex items-center mt-4">
          <label className="flex-1">Generated Password:</label>
          <input
            type="text"
            value={password}
            readOnly
            className="p-2 border border-gray-300 rounded flex-1 mx-2"
          />
          <button
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
      )}
      {successMessage && (
        <p className="text-green-600 text-center mt-2">{successMessage}</p>
      )}
    </div>
  );
};

export default App;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [themeColor, setThemeColor] = useState("#6B75FE");
  const [layout, setLayout] = useState("grid");
  const [language, setLanguage] = useState("English");
  const navigate = useNavigate();

  const handleSaveSettings = async () => {
    const settingsData = {
      themeColor,
      layout,
      language,
    };

    try {
      await axios.post("/api/website-settings", settingsData);
      alert("Website settings saved successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error saving website settings:", error);
    }
  };

  return (
    <div style={styles.settingsPage}>
      <div style={styles.settingsContainer}>
        <h1>Settings</h1>

        <div style={styles.settingsItem}>
          <label>Theme Color</label>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
          />
        </div>

        <div style={styles.settingsItem}>
          <label>Preferred Layout</label>
          <select value={layout} onChange={(e) => setLayout(e.target.value)}>
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </div>

        <div style={styles.settingsItem}>
          <label>Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        <button style={styles.saveButton} onClick={handleSaveSettings}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

const styles = {
  settingsPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f5',
  },
  settingsContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
  },
  settingsItem: {
    marginBottom: '15px',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#6B75FE',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  saveButtonHover: {
    backgroundColor: '#5a63d8',
  },
};


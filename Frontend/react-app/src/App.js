import { useState } from "react";

function App() {
  // Form fields
  const [hcpName, setHcpName] = useState("");
  const [interactionType, setInteractionType] = useState("Meeting");
  const [topics, setTopics] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");
  const [followUp, setFollowUp] = useState("");

  // AI Chat
  const [aiChat, setAiChat] = useState("");

  // API response
  const [response, setResponse] = useState(null);

  // 🔹 Simulated AI extraction → auto-fill form
  const fillFormWithAI = () => {
    // Extract HCP name (very simple demo logic)
    const doctorMatch = aiChat.match(/Dr\.?\s[A-Za-z]+/);
    if (doctorMatch) {
      setHcpName(doctorMatch[0]);
    }

    // Sentiment detection (demo-level)
    if (aiChat.toLowerCase().includes("positive")) {
      setSentiment("Positive");
    } else if (aiChat.toLowerCase().includes("negative")) {
      setSentiment("Negative");
    } else {
      setSentiment("Neutral");
    }

    setTopics(aiChat);
    setInteractionType("Meeting");
    setFollowUp("Schedule follow-up in 2 weeks");
  };

  // Submit to backend
  const submitInteraction = async () => {
    const combinedText = `
HCP Name: ${hcpName}
Interaction Type: ${interactionType}
Topics Discussed: ${topics}
Observed Sentiment: ${sentiment}
Follow-up Actions: ${followUp}
    `.trim();

    const res = await fetch("http://127.0.0.1:8000/log-interaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: combinedText }),
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h2>Log HCP Interaction</h2>

      {/* AI Assistant */}
      <h3>AI Assistant</h3>
      <textarea
        rows="4"
        value={aiChat}
        onChange={(e) => setAiChat(e.target.value)}
        placeholder='e.g. "Met Dr. Sharma, discussed new drug launch, doctor requested efficacy data"'
        style={{ width: "100%" }}
      />

      <br /><br />

      <button onClick={fillFormWithAI}>
        Fill Form with AI
      </button>

      <hr />

      {/* Form */}
      <h3>Interaction Details</h3>

      <label>HCP Name</label>
      <input
        type="text"
        value={hcpName}
        onChange={(e) => setHcpName(e.target.value)}
        placeholder="Dr. Sharma"
        style={{ width: "100%" }}
      />

      <br /><br />

      <label>Interaction Type</label>
      <select
        value={interactionType}
        onChange={(e) => setInteractionType(e.target.value)}
        style={{ width: "100%" }}
      >
        <option>Meeting</option>
        <option>Call</option>
        <option>Conference</option>
      </select>

      <br /><br />

      <label>Topics Discussed</label>
      <textarea
        rows="3"
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
        style={{ width: "100%" }}
      />

      <br /><br />

      <label>Observed HCP Sentiment</label>
      <select
        value={sentiment}
        onChange={(e) => setSentiment(e.target.value)}
        style={{ width: "100%" }}
      >
        <option>Positive</option>
        <option>Neutral</option>
        <option>Negative</option>
      </select>

      <br /><br />

      <label>Follow-up Actions</label>
      <textarea
        rows="2"
        value={followUp}
        onChange={(e) => setFollowUp(e.target.value)}
        style={{ width: "100%" }}
      />

      <br /><br />

      <button onClick={submitInteraction}>
        Log Interaction
      </button>

      <hr />

      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

export default App;

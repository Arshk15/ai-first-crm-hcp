import { useState } from "react";

export default function LogInteractionScreen() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);

  const submit = async (type) => {
    const res = await fetch("http://localhost:8000/log-interaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setResponse(await res.json());
  };

  return (
    <div>
      <h2>Log Interaction</h2>

      <textarea onChange={(e) => setText(e.target.value)} />

      <br />

      <button onClick={() => submit("form")}>Log via Form</button>
      <button onClick={() => submit("chat")}>Log via Chat</button>

      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

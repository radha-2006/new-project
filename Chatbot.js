import { useState } from 'react';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    const res = await fetch('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input }),
    });
    const data = await res.json();
    setChatHistory([...chatHistory, { query: input, response: data.response }]);
    setInput('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {chatHistory.map((c, i) => (
        <div key={i}>
          <p><strong>You:</strong> {c.query}</p>
          <p><strong>Bot:</strong> {c.response}</p>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full"
        placeholder="Ask about job trends..."
      />
      <button onClick={handleSend} className="bg-blue-500 text-white p-2 mt-2">Send</button>
    </div>
  );
}

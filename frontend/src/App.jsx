import { useState, useEffect } from "react";
import JSONBox from "./components/JSONBox";
import TreeBox from "./components/TreeBox";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default function App() {
  const [code, setCode] = useState('console.log("Hello")');
  const [json, setJson] = useState(null);
  const [isTreeBoxOpen, setIsTreeBoxOpen] = useState(true);
  const [isJSONBoxOpen, setIsJSONBoxOpen] = useState(false);

  function handleTreeBoxOpen() {
    setIsTreeBoxOpen(true);
    setIsJSONBoxOpen(false);
  }

  function handleJSONBoxOpen() {
    setIsJSONBoxOpen(true);
    setIsTreeBoxOpen(false);
  }

  async function fetchData(currentCode) {
    try {
      const result = await fetch("http://localhost:3000/explorer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: currentCode }),
      });

      const data = await result.json();
      return data;
    } catch (err) {
      console.error("Fetch error:", err);
      return null;
    }
  }

  useEffect(() => {
    (async () => {
      const result = await fetchData(code);
      if (result) setJson(result);
    })();
  }, [code]);

  return (
    <div className="flex flex-2 w-screen h-screen border-amber-300 border-2">
      <div className="bg-gray-100 w-1/2 h-full p-2">
        <h2>Code editor</h2>
        <CodeMirror
          value={code}
          theme="dark"
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setCode(value)}
        />
      </div>
      <div className="bg-gray-200 w-1/2 h-fit p-2">
        <h2>AST explorer</h2>
        <div className="flex">
          <button onClick={handleTreeBoxOpen} className="px-2 bg-gray-300">
            Tree
          </button>
          <button onClick={handleJSONBoxOpen} className="px-2 bg-gray-400">
            JSON
          </button>
        </div>

        {json && isTreeBoxOpen && <TreeBox json={json.program.body} />}
        {json && isJSONBoxOpen && <JSONBox json={JSON.stringify(json.program.body, null, 2)} />}
      </div>
    </div>
  );
}

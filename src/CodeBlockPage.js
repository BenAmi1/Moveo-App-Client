import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
// const socket = io("http://63.34.28.205");

function CodeBlockPage() {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [isMentor, setIsMentor] = useState(true);

  useEffect(() => {
    const fetchCodeBlock = async () => {
      try {
        const response = await fetch(`/api/codeBlocks/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setCode(data.code);
        } else {
          console.error("Error fetching code block:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching code block:", error);
      }
    };

    fetchCodeBlock();

    socket.emit("joinCodeBlock", { blockId: id });

    socket.on("roleAssignment", ({ isMentor }) => {
      setIsMentor(isMentor);
    });

    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.emit("leaveCodeBlock", { blockId: id });
    };
  }, [id]);

  const handleCodeChange = (editor, data, value) => {
    if (!isMentor) {
      setCode(value);
      socket.emit("codeChange", { blockId: id, newCode: value });
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <CodeMirror
        value={code}
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
          lineWrapping: true,
          readOnly: isMentor ? "nocursor" : false,
          indentUnit: 2,
          tabSize: 2,
          viewportMargin: Infinity,
        }}
        onBeforeChange={handleCodeChange}
        className="code-editor"
      />
    </div>
  );
}

export default CodeBlockPage;

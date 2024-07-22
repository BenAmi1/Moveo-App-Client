import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LobbyPage.css";

const blockIds = [1, 2, 3, 4];

function LobbyPage() {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const data = [];
        for (const blockId of blockIds) {
          const response = await fetch(`/api/codeBlocks/${blockId}`);
          data.push(response.json());
        }
        setCodeBlocks(data);
      } catch (error) {
        console.error("Error fetching code blocks:", error);
      }
    };

    fetchCodeBlocks();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Welcome to Code Share App</h1>
      </div>
      <ul className="list">
        {codeBlocks.map((block) => (
          <li key={block._id} className="listItem">
            <Link to={`/code-block/${block._id}`} className="link">
              {block.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LobbyPage;

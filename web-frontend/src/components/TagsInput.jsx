import React, { useState } from "react";

const TagsInput = ({ label, tags, setTags }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      <div className="d-flex flex-wrap gap-2 border p-2 rounded">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="badge bg-info text-white d-flex align-items-center"
            style={{ fontSize: "14px", padding: "6px" }}
          >
            {tag}
            <button
              type="button"
              className="btn-close btn-close-white ms-2"
              onClick={() => removeTag(index)}
              style={{ fontSize: "10px" }}
            ></button>
          </span>
        ))}

        <input
          type="text"
          className="border-0"
          style={{ outline: "none", flex: "1" }}
          placeholder="Type and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default TagsInput;

"use client";

import React, { useState } from "react";

const RevalidationForm = () => {
  const [pathType, setPathType] = useState("predefined");
  const [predefinedPath, setPredefinedPath] = useState("/");
  const [customPath, setCustomPath] = useState("");
  const [type, setType] = useState("page");
  const [status, setStatus] = useState("");

  const handleRevalidate = async (e) => {
    e.preventDefault();
    setStatus("Revalidating...");

    const path = pathType === "predefined" ? predefinedPath : customPath;

    try {
      const response = await fetch("/api/revalidate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ path, type })
      });

      const data = await response.json();
      setStatus(data.message || "Done");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("Failed");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <form onSubmit={handleRevalidate} className="flex items-center gap-2">
      <select
        value={pathType}
        onChange={(e) => setPathType(e.target.value)}
        className="border px-2 py-1"
      >
        <option value="predefined">Predefined Path</option>
        <option value="custom">Custom Path</option>
      </select>

      {pathType === "predefined" ? (
        <select
          value={predefinedPath}
          onChange={(e) => setPredefinedPath(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="/">Home (/)</option>
          <option value="/blog">Blog</option>
          <option value="/experience">Experience</option>
          <option value="/projects">Projects</option>
        </select>
      ) : (
        <input
          type="text"
          value={customPath}
          onChange={(e) => setCustomPath(e.target.value)}
          placeholder="/blog/some-slug"
          className="border px-2 py-1"
        />
      )}

      <select value={type} onChange={(e) => setType(e.target.value)} className="border px-2 py-1">
        <option value="page">page</option>
        <option value="layout">layout</option>
      </select>

      <button type="submit" className="border px-2 py-1">
        Revalidate
      </button>

      {status && <span className="text-sm">{status}</span>}
    </form>
  );
};

export default RevalidationForm;

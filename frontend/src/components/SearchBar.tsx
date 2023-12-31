import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [floor, setFloor] = useState("B1");
  const [section, setSection] = useState("A");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 檢查數字車位號碼是否有效
    if (Number(number) < 1 || Number(number) > 20) {
      alert("Invalid space number. Please enter a number between 1 and 20.");
      return;
    }
    navigate(
      `/guardpage/historypage/location?floor=${floor}&section=${section}&number=${number}`,
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center space-x-2"
    >
      <select
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        className="w-32 rounded border p-2 text-black"
      >
        {["B1", "B2", "B3", "B4", "B5", "B6"].map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
      <select
        value={section}
        onChange={(e) => setSection(e.target.value)}
        className="w-32 rounded border p-2 text-black"
      >
        {["A", "B", "C", "D", "E", "F"].map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        max="20"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="w-32 border p-2 text-black"
        placeholder="Space Number (1-20)"
      />
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

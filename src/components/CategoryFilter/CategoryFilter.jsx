import React, { useState } from "react";
import "./CategoryFilter.scss"; // Add styles here

const CategoryFilter = ({ categories, onSelect }) => {
  const [selected, setSelected] = useState("All");

  const handleClick = (category) => {
    setSelected(category);
    if (onSelect) {
      onSelect(category);
    }
  };

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-btn ${selected === category ? "active" : ""}`}
          onClick={() => handleClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

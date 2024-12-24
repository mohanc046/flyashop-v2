import React, { useState, useEffect } from "react";
import "./CategoryFilter.scss";

const CategoryFilter = ({ categories, onSelect, currentCategory }) => {
  const [selected, setSelected] = useState(currentCategory);

  useEffect(() => {
    setSelected(currentCategory);
  }, [currentCategory]);

  const handleClick = (categoryValue) => {
    setSelected(categoryValue);
    if (onSelect) {
      onSelect(categoryValue);
    }
  };

  return (
    <div className="category-filter">
      {categories.map(({ label, value }) => (
        <button
          key={value}
          className={`filter-btn ${selected === value ? "active" : ""}`}
          onClick={() => handleClick(value)}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

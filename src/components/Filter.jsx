const categories = ["All", "Home", "Fashion", "Electronics"];

function Filters({ search, onSearchChange, category, onCategoryChange }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="categories">
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? "cat active" : "cat"} // conditional style
            onClick={() => onCategoryChange(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filters;
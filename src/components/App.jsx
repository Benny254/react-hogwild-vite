import React, { useState } from "react";
import hogsData from "../porkers_data";
import Nav from "./Nav";

function App() {
  const [hogs, setHogs] = useState(hogsData);
  const [showGreasedOnly, setShowGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const [selectedHog, setSelectedHog] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    weight: "",
    greased: false,
    highest_medal_achieved: "bronze",
    image: "https://via.placeholder.com/150"
  });

  // FILTER
  let filteredHogs = hogs.filter((hog) =>
    showGreasedOnly ? hog.greased : true
  );

  // SORT
  let sortedHogs = [...filteredHogs];
  if (sortBy === "name") {
    sortedHogs.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "weight") {
    sortedHogs.sort((a, b) => a.weight - b.weight);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setHogs([...hogs, formData]);
  }

  function handleHide(name) {
    setHogs(hogs.filter((hog) => hog.name !== name));
  }

  return (
    <div className="App">
      <Nav />

      {/* FILTER */}
      <label htmlFor="greased">Greased Pigs Only?</label>
      <input
        id="greased"
        type="checkbox"
        checked={showGreasedOnly}
        onChange={(e) => setShowGreasedOnly(e.target.checked)}
      />

      {/* SORT */}
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="none">None</option>
        <option value="name">Name</option>
        <option value="weight">Weight</option>
      </select>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" onChange={handleChange} />

        <label htmlFor="weight">Weight:</label>
        <input id="weight" name="weight" onChange={handleChange} />

        <label htmlFor="specialty">Specialty:</label>
        <input id="specialty" name="specialty" onChange={handleChange} />

        <label htmlFor="greased-form">Greased?</label>
        <input
          id="greased-form"
          name="greased"
          type="checkbox"
          onChange={handleChange}
        />

        <button type="submit">Add Hog</button>
      </form>

      {/* HOG LIST */}
      <div className="ui cards">
        {sortedHogs.map((hog) => (
          <div
            key={hog.name}
            aria-label="hog card"
            className="ui card"
            onClick={() =>
              setSelectedHog(
                selectedHog === hog.name ? null : hog.name
              )
            }
          >
            <h3>{hog.name}</h3>
            <img
              src={hog.image}
              alt={`Photo of ${hog.name}`}
            />

            {/* ✅ CORRECTED DETAILS */}
            {selectedHog === hog.name && (
              <div>
                <p>Specialty: {hog.specialty}</p>
                <p>{hog.weight}</p>
                <p>{hog.greased ? "Greased" : "Nongreased"}</p>
                <p>{hog["highest medal achieved"]}</p>
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleHide(hog.name);
              }}
            >
              Hide Me
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
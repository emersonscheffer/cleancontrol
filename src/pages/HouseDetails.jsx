import React, { useState, useEffect } from "react";
import { updateHouse } from "../services/database";

import { deleteHouse } from "../services/database";

import { getCleaners } from "../services/database";

const handleDelete = async () => {
  await deleteHouse(house.id);
  goBack();
};

const HouseDetails = ({ house, goBack }) => {
  if (!house) return <div>Loading...</div>;

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(house);
  const [saving, setSaving] = useState(false);

  const [cleanersList, setCleanersList] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const save = async () => {
    try {
      setSaving(true);

      await updateHouse(house.id, form);

      alert("Saved successfully!");

      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Error saving");
    } finally {
      setSaving(false);
    }
  };

  const loadCleaners = async () => {
    const data = await getCleaners();
    setCleanersList(data);
  };

  useEffect(() => {
    loadCleaners();
  }, []);

  return (
    <div>
      <button onClick={goBack}>← Back</button>

      <h1>House Details</h1>

      {editMode ? (
        <div className="formGrid">
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="address" value={form.address} onChange={handleChange} />
          <input name="phone" value={form.phone} onChange={handleChange} />
          <input name="price" value={form.price} onChange={handleChange} />

          <select
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
          >
            <option value="W">Weekly</option>
            <option value="B">Biweekly</option>
            <option value="M">Monthly</option>
            <option value="S">Sporadic</option>
          </select>

          <h3>Last Cleaner Team</h3>

          <select
            onChange={(e) =>
              setForm({
                ...form,
                lastCleaners: [e.target.value, form.lastCleaners?.[1] || ""],
              })
            }
          >
            <option value="">None</option>
            {cleanersList.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            onChange={(e) =>
              setForm({
                ...form,
                lastCleaners: [form.lastCleaners?.[0] || "", e.target.value],
              })
            }
          >
            <option value="">None</option>
            {cleanersList.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <button onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      ) : (
        <div>
          <h2>{house.name}</h2>
          <p>{house.address}</p>
          <p>{house.phone}</p>
          <p>${house.price}</p>
          <p>Frequency: {house.frequency}</p>

          <p>
            Last Cleaners:{" "}
            {house.lastCleaners?.length > 0
              ? house.lastCleaners.filter(Boolean).join(", ")
              : "None"}
          </p>

          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}

      {/* NOTES SECTION */}

      <div className="notesSection">
        <h3>Notes</h3>

        <textarea
          value={form.notes || ""}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={5}
        />
      </div>

      <button onClick={handleDelete} style={{ color: "red" }}>
        Delete House
      </button>
    </div>
  );
};

export default HouseDetails;

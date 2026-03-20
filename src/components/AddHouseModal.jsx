import React, { useEffect, useState } from "react";
import { addHouse, getCleaners } from "../services/database";

const AddHouseModal = ({ onClose, onAdded }) => {

  const [cleaners, setCleaners] = useState([]);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    price: "",
    rooms: "",
    bathrooms: "",
    kitchens: "",
    oven: false,
    laundry: false,
    refrigerator: false,
    frequency: "S",
    lastCleaners: ["", ""]
  });

  useEffect(() => {
    loadCleaners();
  }, []);

  const loadCleaners = async () => {
    const data = await getCleaners();
    setCleaners(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleCleanerChange = (index, value) => {
    const updated = [...form.lastCleaners];
    updated[index] = value;

    setForm({
      ...form,
      lastCleaners: updated
    });
  };

  const handleSubmit = async () => {

    const cleanedCleaners = form.lastCleaners.filter(Boolean);

    await addHouse({
      ...form,
      lastCleaners: cleanedCleaners
    });

    onAdded();
    onClose();
  };

  return (

    <div className="modalOverlay">

      <div className="modal large">

        <h2>Add New House</h2>

        {/* CONTACT */}

        <div className="section">
          <h4>Contact Info</h4>

          <input name="name" placeholder="Contact Name" onChange={handleChange}/>
          <input name="address" placeholder="Address" onChange={handleChange}/>
          <input name="phone" placeholder="Telephone" onChange={handleChange}/>
          <input name="email" placeholder="Email" onChange={handleChange}/>
        </div>

        {/* PROPERTY */}

        <div className="section">
          <h4>Property Details</h4>

          <input name="rooms" placeholder="Rooms" onChange={handleChange}/>
          <input name="bathrooms" placeholder="Bathrooms" onChange={handleChange}/>
          <input name="kitchens" placeholder="Kitchens" onChange={handleChange}/>
          <input name="price" placeholder="Price" onChange={handleChange}/>
        </div>

        {/* EXTRAS */}

        <div className="section">
          <h4>Extras</h4>

          <label><input type="checkbox" name="oven" onChange={handleChange}/> Oven</label>
          <label><input type="checkbox" name="laundry" onChange={handleChange}/> Laundry</label>
          <label><input type="checkbox" name="refrigerator" onChange={handleChange}/> Refrigerator</label>
        </div>

        {/* FREQUENCY */}

        <div className="section">
          <h4>Cleaning Frequency</h4>

          <select name="frequency" onChange={handleChange} value={form.frequency}>
            <option value="W">Weekly</option>
            <option value="B">Biweekly</option>
            <option value="M">Monthly</option>
            <option value="S">Sporadic</option>
          </select>
        </div>

        {/* CLEANERS */}

        <div className="section">
          <h4>Last Cleaner Team</h4>

          <select onChange={(e)=>handleCleanerChange(0, e.target.value)}>
            <option value="">None</option>
            {cleaners.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

          <select onChange={(e)=>handleCleanerChange(1, e.target.value)}>
            <option value="">None</option>
            {cleaners.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* ACTIONS */}

        <div className="actions">

          <button className="primary" onClick={handleSubmit}>
            Add House
          </button>

          <button onClick={onClose}>
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddHouseModal;
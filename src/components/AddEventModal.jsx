import React, { useEffect, useState } from "react";
import "../assets/css/AddEventModal.css";
import { getHouses, getCleaners } from "../services/database";

const AddEventModal = ({ isOpen, onClose, onSave }) => {
  const [houses, setHouses] = useState([]);
  const [cleaners, setCleaners] = useState([]);

  const [form, setForm] = useState({
    houseId: "",
    houseName: "",
    date: "",
    description: "",
    housePrice: 0,
    cleanersList: [],
    payType: "cash",
  });

  useEffect(() => {
    const fetchData = async () => {
      const housesData = await getHouses();
      const cleanersData = await getCleaners();
      setHouses(housesData);
      setCleaners(cleanersData);
    };

    if (isOpen) fetchData();
  }, [isOpen]);

  if (!isOpen) return null;

  // 🔥 Select house
  const handleHouseChange = (e) => {
    const selected = houses.find((h) => h.id === e.target.value);

    if (!selected) return;

    setForm((prev) => ({
      ...prev,
      houseId: selected.id,
      houseName: selected.name,
      housePrice: selected.price,
      cleanersList: (selected.lastCleaners || []).map((name) => ({
        name,
        amount: 0,
        percentage: 0,
      })),
    }));
  };

  // 🔥 Update cleaner values
  const updateCleaner = (index, field, value) => {
    const updated = [...form.cleanersList];

    if (field === "percentage") {
      const percentage = Number(value);
      updated[index].percentage = percentage;
      updated[index].amount = (percentage / 100) * form.housePrice;
    }

    if (field === "amount") {
      const amount = Number(value);
      updated[index].amount = amount;
      updated[index].percentage =
        form.housePrice > 0 ? (amount / form.housePrice) * 100 : 0;
    }

    setForm((prev) => ({
      ...prev,
      cleanersList: updated,
    }));
  };

  // 🔥 Add cleaner manually
  const addCleaner = (name) => {
    setForm((prev) => ({
      ...prev,
      cleanersList: [
        ...prev.cleanersList,
        { name, amount: 0, percentage: 0 },
      ],
    }));
  };

  // 🔥 Total cleaner pay
  const totalCleanerPay = form.cleanersList.reduce(
    (sum, c) => sum + (c.amount || 0),
    0
  );

  const profit = form.housePrice - totalCleanerPay;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSave({
      houseName: form.houseName,
      date: form.date,
      description: form.description,
      housePrice: Number(form.housePrice),
      cleanersList: form.cleanersList,
      jobDone: false,
      paid: false,
      payType: form.payType,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Event</h2>

        <form onSubmit={handleSubmit}>
          {/* HOUSE SELECT */}
          <select onChange={handleHouseChange} required>
            <option value="">Select House</option>
            {houses.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Description"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* HOUSE PRICE */}
          <input
            type="number"
            value={form.housePrice}
            onChange={(e) =>
              setForm({ ...form, housePrice: Number(e.target.value) })
            }
            placeholder="House Price"
          />

          {/* CLEANERS SELECT */}
          <select onChange={(e) => addCleaner(e.target.value)}>
            <option value="">Add Cleaner</option>
            {cleaners.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* CLEANERS LIST */}
          <div className="cleaners-list">
            {form.cleanersList.map((c, index) => (
              <div key={index} className="cleaner-row">
                <span>{c.name}</span>

                <input
                  type="number"
                  placeholder="Amount"
                  value={c.amount}
                  onChange={(e) =>
                    updateCleaner(index, "amount", e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="%"
                  value={c.percentage}
                  onChange={(e) =>
                    updateCleaner(index, "percentage", e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          {/* PROFIT */}
          <div className="profit-box">
            Profit: ${profit.toFixed(2)}
          </div>

          <select
            onChange={(e) =>
              setForm({ ...form, payType: e.target.value })
            }
          >
            <option value="cash">Cash</option>
            <option value="zelle">Zelle</option>
            <option value="venmo">Venmo</option>
            <option value="card">Card</option>
          </select>

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
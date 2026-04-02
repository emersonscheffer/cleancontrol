import React, { useEffect, useState } from "react";
import "../assets/css/AddEventModal.css";
import { getHouses, getCleaners } from "../services/database";

const sortByName = (items) =>
  [...items].sort((a, b) => (a.name || "").localeCompare(b.name || ""));

const AddEventModal = ({ isOpen, onClose, onSave }) => {
  const [houses, setHouses] = useState([]);
  const [cleaners, setCleaners] = useState([]);

  const [form, setForm] = useState({
    houseId: "",
    house: { name: "", price: 0 },
    date: "",

    timeOfCleaning: { timeHour: "12", timeMinute: "00", timePeriod: "AM" }, // 🔥 New field for time of cleaning
    cleanersList: [],
    jobDone: false,
    paid: false,
    payType: "cash",
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const housesData = await getHouses();
      const cleanersData = await getCleaners();
      setHouses(sortByName(housesData));
      setCleaners(sortByName(cleanersData));
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
      house: { name: selected.name, price: selected.price },

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
      updated[index].amount = (percentage / 100) * form.house.price;
    }

    if (field === "amount") {
      const amount = Number(value);
      updated[index].amount = amount;
      updated[index].percentage =
        form.house.price > 0 ? (amount / form.house.price) * 100 : 0;
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
      cleanersList: [...prev.cleanersList, { name, amount: 0, percentage: 0 }],
    }));
  };

  // 🔥 Total cleaner pay
  const totalCleanerPay = form.cleanersList.reduce(
    (sum, c) => sum + (c.amount || 0),
    0,
  );

  const profit = form.house.price - totalCleanerPay;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSave(form);

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
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />

          <div className="time-selectors">
            <select
              value={form.timeOfCleaning.timeHour}
              // onChange={(e) => setForm({ ...form, timeHour: e.target.value })}
              onChange={(e) =>
                setForm({
                  ...form,
                  timeOfCleaning: {
                    ...form.timeOfCleaning,
                    timeHour: e.target.value,
                  },
                })
              }
              required
            >
              {Array.from({ length: 12 }, (_, index) => {
                const hour = String(index + 1).padStart(2, "0");
                return (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                );
              })}
            </select>

            <select
              value={form.timeOfCleaning.timeMinute}
              onChange={(e) =>
                setForm({
                  ...form,
                  timeOfCleaning: {
                    ...form.timeOfCleaning,
                    timeMinute: e.target.value,
                  },
                })
              }
              // onChange={(e) => setTimeMinute(e.target.value)}
              required
            >
              {["00", "15", "30", "45"].map((minute) => {
                return (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                );
              })}
            </select>

            <select
              value={form.timeOfCleaning.timePeriod}
              onChange={(e) =>
                setForm({
                  ...form,
                  timeOfCleaning: {
                    ...form.timeOfCleaning,
                    timePeriod: e.target.value,
                  },
                })
              }
              // onChange={(e) => setTimePeriod(e.target.value)}
              required
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <textarea
            placeholder="Notes"
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          {/* HOUSE PRICE */}
          <input
            type="number"
            value={form.house.price}
            onChange={(e) =>
              setForm({
                ...form,
                house: { ...form.house, price: Number(e.target.value) },
              })
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
          <div className="profit-box">Profit: ${profit.toFixed(2)}</div>

          <select
            onChange={(e) => setForm({ ...form, payType: e.target.value })}
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

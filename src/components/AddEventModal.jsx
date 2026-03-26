import React, { useState } from "react";

import "../assets/css/AddEventModal.css"


const AddEventModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    description: "",
    cleaner1: "",
    cleaner2: "",
    cleaner1Pay: "",
    cleaner2Pay: "",
    amount: "",
    payType: "cash",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSave({
      ...form,
      cleaner1Pay: Number(form.cleaner1Pay),
      cleaner2Pay: Number(form.cleaner2Pay),
      amount: Number(form.amount),
      jobDone: false,
      paid: false,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Event</h2>

        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <input name="date" type="date" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} />

          <input name="cleaner1" placeholder="Cleaner 1" onChange={handleChange} />
          <input name="cleaner2" placeholder="Cleaner 2" onChange={handleChange} />

          <input name="cleaner1Pay" type="number" placeholder="Cleaner 1 Pay" onChange={handleChange} />
          <input name="cleaner2Pay" type="number" placeholder="Cleaner 2 Pay" onChange={handleChange} />

          <input name="amount" type="number" placeholder="Total Amount" onChange={handleChange} />

          <select name="payType" onChange={handleChange}>
            <option value="cash">Cash</option>
            <option value="zelle">Zelle</option>
            <option value="venmo">Venmo</option>
            <option value="card">Card</option>
          </select>

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
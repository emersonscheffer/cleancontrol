import React, { useEffect, useState } from "react";
import { deleteCleaner, updateCleaner } from "../services/database";
import JobList from "../components/JobList";

const CleanerDetails = ({ cleaner, goBack, onUpdated, onDeleted }) => {
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState(cleaner || { name: "", wallet: 0 });

  useEffect(() => {
    setForm(cleaner || { name: "", wallet: 0 });
    setEditMode(false);
  }, [cleaner]);

  if (!cleaner) return <div>Loading...</div>;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleEdit = () => {
    if (editMode) {
      setForm(cleaner);
    }

    setEditMode((current) => !current);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const updatedCleaner = {
        ...cleaner,
        ...form,
        wallet: Number(form.wallet) || 0,
      };

      await updateCleaner(cleaner.id, updatedCleaner);
      onUpdated(updatedCleaner);
      setEditMode(false);
    } catch (error) {
      console.error(error);
      alert("Error saving cleaner");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteCleaner(cleaner.id);
      onDeleted(cleaner.id);
      goBack();
    } catch (error) {
      console.error(error);
      alert("Error deleting cleaner");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <button onClick={goBack}>← Back</button>

      <h1>Cleaner Details</h1>

      {editMode ? (
        <div className="formGrid">
          <input name="name" value={form.name || ""} onChange={handleChange} />
          <input
            name="wallet"
            type="number"
            value={form.wallet ?? 0}
            onChange={handleChange}
          />

          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      ) : (
        <div>
          <h2>{cleaner.name}</h2>
          <p>Wallet: ${cleaner.wallet}</p>
        </div>
      )}

      <button onClick={handleToggleEdit} disabled={saving || deleting}>
        {editMode ? "Cancel Edit" : "Edit"}
      </button>

      {editMode && (
        <button
          onClick={handleDelete}
          disabled={deleting || saving}
          style={{ color: "red" }}
        >
          {deleting ? "Deleting..." : "Delete Cleaner"}
        </button>
      )}


      <JobList jobs={cleaner.jobList}/>


    </div>
  );
};

export default CleanerDetails;

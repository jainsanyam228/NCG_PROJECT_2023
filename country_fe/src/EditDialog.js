import React, { useState } from "react";

const EditDialog = ({ item, onClose, onSave }) => {
  const [editedData, setEditedData] = useState({ ...item });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <div className="edit-dialog">
      <div className="edit-dialog-content">
        <h2>Edit Item</h2>
        <label>IDC:</label>
        <input
          type="text"
          name="idc"
          value={editedData.idc}
          onChange={handleInputChange}
        />
        {/* Repeat similar fields for other properties */}
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={editedData.country}
          onChange={handleInputChange}
        />
        <label>IDI:</label>
        <input
          type="text"
          name="idi"
          value={editedData.idi}
          onChange={handleInputChange}
        />
        <label>Indicator:</label>
        <input
          type="text"
          name="indicator"
          value={editedData.indicator}
          onChange={handleInputChange}
        />
        <label>Value:</label>
        <input
          type="text"
          name="cvalue"
          value={editedData.cvalue}
          onChange={handleInputChange}
        />
        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={editedData.date}
          onChange={handleInputChange}
        />
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditDialog;

import React from "react";

const FileUpload = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input type={type} value={value} name={name} onChange={handleChange} />
    </div>
  );
};

export default FileUpload;

const Textboxs = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <textarea
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        rows="10"
        cols="100"
      />
    </div>
  );
};

export default Textboxs;

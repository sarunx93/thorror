const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  size = "50",
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        size={size}
      />
    </div>
  );
};

export default FormRow;

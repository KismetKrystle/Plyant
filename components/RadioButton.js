export default function RadioButton({ label, value, onChange, name, id }) {
  return (
    <div className="form-check mb-2">
      <input
        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name={name}
        id={id}
        checked={value}
        onChange={onChange}
      />
      <label
        className="form-check-label inline-block text-gray-800"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

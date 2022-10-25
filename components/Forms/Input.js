import { Field, ErrorMessage } from 'formik';

export default function Input({ label, name, placeholder, type = 'text' }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field
        type={type}
        className="form-control h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        name={name}
        id={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name}>
        {(error) => <div className="text-red-700">{error}</div>}
      </ErrorMessage>
    </>
  );
}

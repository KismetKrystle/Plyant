import { Field, ErrorMessage } from 'formik';

export default function Textarea({ label, name, placeholder }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field
        as="textarea"
        className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-gray-50 bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        name={name}
        id={name}
        placeholder={placeholder}
        rows="3"
      />
      <ErrorMessage name={name}>
        {(error) => <div className="text-red-700">{error}</div>}
      </ErrorMessage>
    </>
  );
}

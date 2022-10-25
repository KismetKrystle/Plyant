import { Field } from 'formik';

export default function Multiselect({ label, options, name }) {
  return (
    <>
      <label>{label}</label>
      <Field
        as="select"
        name={name}
        className="form-multiselect h-20 border mt-1 rounded px-4 w-full bg-gray-50"
        multiple
      >
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </Field>
    </>
  );
}

import { Field } from 'formik';
import styles from '../../styles/Dropdown.module.css';

export default function Dropdown({ options, label, name }) {
  return (
    <>
      <label>{label}</label>
      <Field
        as="select"
        name={name}
        className={`${styles.dropdown} form-control border mt-1 rounded px-4 w-full bg-gray-50`}
      >
        <option>Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </Field>
    </>
  );
}

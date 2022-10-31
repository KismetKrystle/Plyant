import { Field } from 'formik';

export default function Checkbox({ name }) {
  return (
    <div className="form-check">
      <label className="form-check-label text-gray-800" htmlFor={name}>
        <Field
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="checkbox"
          name={name}
        />
        This NFT cannot be edited after it is minted. Please review the form for
        any errors.
      </label>
    </div>
  );
}

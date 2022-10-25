export default function Submit({ isSubmitting, isValid }) {
  const disabled = isSubmitting || !isValid;

  return (
    <button
      className={`rounded-md ${
        disabled
          ? 'bg-green-600 opacity-30 cursor-not-allowed'
          : 'bg-green-600 cursor-pointer'
      } px-5 py-2.5 text-sm font-medium text-white shadow`}
      type="submit"
      disabled={disabled}
    >
      Submit
    </button>
  );
}

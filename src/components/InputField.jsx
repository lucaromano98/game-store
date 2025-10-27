export default function InputField({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  helpText,
  disabled = false,
  className = "",
}) {
  return (
    <div className="w-full">
      {/* LABEL sopra l'input */}
      {label && (
        <label
          htmlFor={id}
          className="
            block
            text-[0.7rem] font-medium uppercase tracking-wide
            text-[color:var(--accent)]
            mb-1
          "
        >
          {label}
        </label>
      )}

      {/* INPUT vero e proprio */}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-field ${className}`}
      />

      {/* TESTO DI AIUTO sotto (opzionale) */}
      {helpText && (
        <p className="text-[0.7rem] text-dim mt-1 leading-snug">
          {helpText}
        </p>
      )}
    </div>
  );
}

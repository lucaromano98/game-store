import InputField from "./InputField.jsx";

export default function Filters({
  platformFilter,
  onPlatformChange,
  platforms,
}) {
  return (
    <div
      className={`
        panel
        p-4
        flex flex-col gap-4
      `}
    >
      {/* Label sezione */}
      <div className="flex items-baseline justify-between">
        <div
          className="
            text-[0.7rem] font-medium uppercase tracking-wide
            text-[color:var(--accent)]
          "
        >
          Piattaforma
        </div>

        <div className="text-[0.7rem] text-dim font-medium">
          Clicca per filtrare
        </div>
      </div>

      {/* Lista chip piattaforma */}
      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => {
          const active = platformFilter === p;
          return (
            <button
              key={p}
              onClick={() => onPlatformChange(p)}
              className={`
                pill
                ${active
                  ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  : ""}
              `}
            >
              {p === "all" ? "Tutte" : p}
            </button>
          );
        })}
      </div>
    </div>
  );
}

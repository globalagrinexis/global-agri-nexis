// src/components/products/ProductDropdown.jsx

export default function ProductDropdown({
  open,
  setOpen,
  lockedCommodity,
  setLockedCommodity,
  index,
}) {
  return (
    <div className="relative mb-6 max-w-sm mx-auto">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex justify-between items-center px-5 py-3 rounded-full border bg-warm-100"
      >
        {lockedCommodity || "Filter by commodity"}
        <span className={open ? "rotate-180" : ""}>▼</span>
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full bg-warm-100 border rounded-xl">
          <button
            onClick={() => {
              setLockedCommodity(null);
              setOpen(false);
            }}
            className="w-full text-left px-5 py-3 hover:bg-warm-gray rounded-xl"
          >
            All commodities
          </button>

          {index.map((item) => (
            <button
              key={item}
              onClick={() => {
                setLockedCommodity(item);
                setOpen(false);
              }}
              className="w-full text-left px-5 py-3 hover:bg-warm-gray"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

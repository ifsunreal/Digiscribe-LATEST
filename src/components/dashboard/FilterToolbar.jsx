const filterOptions = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'transcribed', label: 'Transcribed' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'size', label: 'Size' },
];

export default function FilterToolbar({ activeFilter, onFilterChange, sortBy, onSortChange, searchQuery, onSearchChange }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Filter buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onFilterChange(opt.value)}
            className={`
              px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200
              ${activeFilter === opt.value
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : 'bg-gray-100 text-gray-text hover:bg-gray-200'
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto md:ml-auto">
        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-gray-100 text-dark-text text-xs font-medium pl-4 pr-8 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
            <i className="fas fa-chevron-down text-gray-400 text-[10px]"></i>
          </div>
        </div>

        {/* Search input */}
        <div className="relative flex-1 md:w-56">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400 text-xs"></i>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search files..."
            className="w-full bg-gray-100 text-dark-text text-xs font-medium pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times text-xs"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

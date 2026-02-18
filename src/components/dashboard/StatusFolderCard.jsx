const colorMap = {
  amber: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
    ring: 'ring-amber-400',
    badge: 'bg-amber-500',
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    ring: 'ring-blue-400',
    badge: 'bg-blue-500',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
    ring: 'ring-green-400',
    badge: 'bg-green-500',
  },
};

export default function StatusFolderCard({ title, count, icon, color, active, onClick }) {
  const palette = colorMap[color] || colorMap.blue;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full p-6 rounded-2xl border transition-all duration-200 text-left cursor-pointer
        ${palette.bg} ${palette.border}
        ${active ? `ring-2 ${palette.ring} scale-[1.02] shadow-lg` : 'shadow-sm hover:shadow-md hover:scale-[1.01]'}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${active ? palette.badge + ' text-white' : 'bg-white/60 ' + palette.text}`}>
            <i className={`fas ${icon} text-xl`}></i>
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${palette.text}`}>{title}</h3>
            <p className={`text-xs mt-0.5 ${palette.text} opacity-70`}>
              {count === 1 ? '1 file' : `${count} files`}
            </p>
          </div>
        </div>
        <div className={`
          min-w-[2rem] h-8 px-2.5 rounded-full flex items-center justify-center text-sm font-bold
          ${active ? palette.badge + ' text-white' : 'bg-white/60 ' + palette.text}
        `}>
          {count}
        </div>
      </div>
    </button>
  );
}

export default function FeatureBar({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="bg-gradient-primary rounded-2xl p-6 md:p-8 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
              <i className={`${item.icon} text-white text-xl`}></i>
            </div>
            <h3 className="text-white font-semibold text-sm">{item.title}</h3>
            {item.description && (
              <p className="text-white/80 text-xs mt-1">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

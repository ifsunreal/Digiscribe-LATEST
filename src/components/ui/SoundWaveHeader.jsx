export default function SoundWaveHeader({ title }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      {/* Left sound wave */}
      <div className="hidden md:flex items-center gap-1">
        <div className="w-1 h-3 bg-primary/30 rounded"></div>
        <div className="w-1 h-5 bg-primary/50 rounded"></div>
        <div className="w-1 h-8 bg-primary rounded"></div>
        <div className="w-1 h-5 bg-primary/50 rounded"></div>
        <div className="w-1 h-3 bg-primary/30 rounded"></div>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text text-center">
        {title}
      </h1>
      {/* Right sound wave */}
      <div className="hidden md:flex items-center gap-1">
        <div className="w-1 h-3 bg-primary/30 rounded"></div>
        <div className="w-1 h-5 bg-primary/50 rounded"></div>
        <div className="w-1 h-8 bg-primary rounded"></div>
        <div className="w-1 h-5 bg-primary/50 rounded"></div>
        <div className="w-1 h-3 bg-primary/30 rounded"></div>
      </div>
    </div>
  );
}

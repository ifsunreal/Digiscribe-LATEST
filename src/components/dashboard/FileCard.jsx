import { useState, useRef, useEffect } from 'react';

function formatSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function formatDate(dateString) {
  if (!dateString) return 'Unknown';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  } catch {
    return 'Unknown';
  }
}

function getFileIcon(type) {
  if (!type) return 'fa-file';
  if (type.startsWith('image/')) return 'fa-image';
  if (type.startsWith('audio/')) return 'fa-music';
  if (type.startsWith('video/')) return 'fa-video';
  return 'fa-file';
}

function getFileIconColor(type) {
  if (!type) return 'text-gray-400 bg-gray-50';
  if (type.startsWith('image/')) return 'text-violet-600 bg-violet-50';
  if (type.startsWith('audio/')) return 'text-sky-600 bg-sky-50';
  if (type.startsWith('video/')) return 'text-rose-500 bg-rose-50';
  return 'text-gray-400 bg-gray-50';
}

const statusConfig = {
  pending: {
    label: 'Pending',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
    dot: 'bg-amber-400',
  },
  'in-progress': {
    label: 'In Progress',
    bg: 'bg-sky-50',
    text: 'text-sky-600',
    border: 'border-sky-200',
    dot: 'bg-sky-400',
  },
  transcribed: {
    label: 'Transcribed',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    dot: 'bg-emerald-400',
  },
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'transcribed', label: 'Transcribed' },
];

export default function FileCard({ file, isAdmin, onStatusChange, onPreview }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const status = statusConfig[file.status] || statusConfig.pending;
  const icon = getFileIcon(file.type);
  const iconColor = getFileIconColor(file.type);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusSelect = (newStatus) => {
    setDropdownOpen(false);
    if (newStatus !== file.status && onStatusChange) {
      onStatusChange(file.id, newStatus);
    }
  };

  const handlePreview = () => {
    if (onPreview) onPreview(file);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-md transition-all duration-200 group">
      {/* Top accent bar */}
      <div className={`h-0.5 ${status.dot}`} />

      <div className="p-5">
        {/* Header row: icon + name + status */}
        <div className="flex items-start gap-3 mb-3">
          <button
            type="button"
            onClick={handlePreview}
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColor} transition-all duration-200 cursor-pointer hover:scale-105`}
            title="Preview file"
          >
            <i className={`fas ${icon} text-sm group-hover:hidden`}></i>
            <i className="fas fa-eye text-sm hidden group-hover:block"></i>
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className="text-sm font-semibold text-dark-text truncate cursor-pointer hover:text-primary transition-colors"
              title={file.originalName}
              onClick={handlePreview}
            >
              {file.originalName}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-gray-400">{formatSize(file.size)}</span>
              <span className="text-gray-200">·</span>
              <span className="text-[11px] text-gray-400">{formatDate(file.uploadedAt)}</span>
            </div>
          </div>

          {/* Status badge / dropdown */}
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            {isAdmin ? (
              <>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${status.bg} ${status.text} ${status.border} cursor-pointer hover:opacity-90 transition-opacity`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                  {status.label}
                  <i className="fas fa-chevron-down text-[7px] ml-0.5 opacity-60"></i>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleStatusSelect(opt.value)}
                        className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center gap-2 ${
                          file.status === opt.value
                            ? 'text-primary bg-primary/5'
                            : 'text-gray-text hover:text-dark-text hover:bg-gray-50'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[opt.value].dot}`}></span>
                        {opt.label}
                        {file.status === opt.value && (
                          <i className="fas fa-check text-[8px] text-primary ml-auto"></i>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${status.bg} ${status.text} ${status.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                {status.label}
              </span>
            )}
          </div>
        </div>

        {/* Service Category */}
        {file.serviceCategory && (
          <div className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium bg-indigo-50 text-indigo-600 border border-indigo-100">
              <i className="fas fa-tag text-[8px] text-indigo-400"></i>
              {file.serviceCategory}
            </span>
          </div>
        )}

        {/* Description */}
        {file.description && (
          <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
            {file.description}
          </p>
        )}

        {/* Footer: uploader info + preview */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2 text-[11px] text-gray-400 min-w-0">
            {isAdmin && file.uploadedByEmail ? (
              <span className="flex items-center gap-1.5 truncate" title={file.uploadedByEmail}>
                <i className="fas fa-user text-[9px] text-gray-300"></i>
                <span className="truncate">{file.uploadedByEmail}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <i className="fas fa-clock text-[9px] text-gray-300"></i>
                {formatDate(file.uploadedAt)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handlePreview}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <i className="fas fa-eye text-[10px]"></i>
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}

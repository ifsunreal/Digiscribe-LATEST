import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import FileCard from '../components/dashboard/FileCard';
import FilePreviewModal from '../components/dashboard/FilePreviewModal';
import FilePropertiesModal from '../components/dashboard/FilePropertiesModal';
import ContextMenu from '../components/dashboard/ContextMenu';
import { useFirestoreFiles } from '../hooks/useFirestoreFiles';
import { useTranscriptions } from '../hooks/useTranscriptions';
import { useAuth } from '../contexts/AuthContext';

const STATUS_CONFIG = {
  pending: { label: 'Pending', icon: 'fa-clock', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', ring: 'ring-amber-400', iconBg: 'bg-amber-100' },
  'in-progress': { label: 'In Progress', icon: 'fa-spinner', bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', ring: 'ring-sky-400', iconBg: 'bg-sky-100' },
  transcribed: { label: 'Transcribed', icon: 'fa-check-circle', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', ring: 'ring-emerald-400', iconBg: 'bg-emerald-100' },
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'size', label: 'Largest First' },
];

export default function DashboardPage() {
  const { user, isAdmin, getIdToken } = useAuth();
  const [activeTab, setActiveTab] = useState('files');
  const [statusFilter, setStatusFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusError, setStatusError] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [propertiesFile, setPropertiesFile] = useState(null);
  const [message, setMessage] = useState(null);

  // Selection state
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);

  // Context menu state
  const [contextMenu, setContextMenu] = useState(null);

  const { files: allFiles, loading, error } = useFirestoreFiles();
  const { transcriptions, loading: transLoading, error: transError, fetchTranscriptions } = useTranscriptions();

  useEffect(() => {
    document.title = 'Dashboard - DigiScribe Transcription Corp.';
  }, []);

  useEffect(() => {
    if (activeTab === 'transcriptions') {
      fetchTranscriptions();
    }
  }, [activeTab, fetchTranscriptions]);

  // Compute counts
  const counts = useMemo(() => {
    const result = { total: allFiles.length, pending: 0, 'in-progress': 0, transcribed: 0 };
    for (const file of allFiles) {
      if (result[file.status] !== undefined) result[file.status]++;
    }
    return result;
  }, [allFiles]);

  // Unique service categories
  const serviceCategories = useMemo(() => {
    const cats = new Set();
    for (const file of allFiles) {
      if (file.serviceCategory) cats.add(file.serviceCategory);
    }
    return Array.from(cats).sort();
  }, [allFiles]);

  // Filter + sort
  const filteredFiles = useMemo(() => {
    let result = [...allFiles];

    if (statusFilter) result = result.filter((f) => f.status === statusFilter);
    if (serviceFilter) result = result.filter((f) => f.serviceCategory === serviceFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((f) =>
        (f.originalName && f.originalName.toLowerCase().includes(q)) ||
        (f.description && f.description.toLowerCase().includes(q)) ||
        (f.serviceCategory && f.serviceCategory.toLowerCase().includes(q)) ||
        (f.uploadedByEmail && f.uploadedByEmail.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case 'oldest': result.sort((a, b) => new Date(a.uploadedAt || 0) - new Date(b.uploadedAt || 0)); break;
      case 'name-asc': result.sort((a, b) => (a.originalName || '').localeCompare(b.originalName || '')); break;
      case 'name-desc': result.sort((a, b) => (b.originalName || '').localeCompare(a.originalName || '')); break;
      case 'size': result.sort((a, b) => (b.size || 0) - (a.size || 0)); break;
      default: result.sort((a, b) => new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0)); break;
    }
    return result;
  }, [allFiles, statusFilter, serviceFilter, searchQuery, sortBy]);

  const handleStatusChange = useCallback(async (fileId, newStatus) => {
    setStatusError(null);
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/files/metadata/${fileId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update status.');
    } catch (err) {
      setStatusError(err.message);
      setTimeout(() => setStatusError(null), 4000);
    }
  }, [getIdToken]);

  // Clear selection when filters change
  useEffect(() => {
    setSelectedIds(new Set());
  }, [statusFilter, serviceFilter, searchQuery, sortBy]);

  // Selection helpers
  const filteredIds = useMemo(() => new Set(filteredFiles.map((f) => f.id)), [filteredFiles]);
  const allSelected = filteredFiles.length > 0 && filteredFiles.every((f) => selectedIds.has(f.id));
  const someSelected = filteredFiles.some((f) => selectedIds.has(f.id));
  const selectedCount = [...selectedIds].filter((id) => filteredIds.has(id)).length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredFiles.map((f) => f.id)));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Bulk download as zip
  const handleBulkDownload = useCallback(async () => {
    const ids = [...selectedIds].filter((id) => filteredIds.has(id));
    if (ids.length === 0) return;
    setBulkLoading(true);
    setMessage(null);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/files/bulk-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fileIds: ids }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Download failed.');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `digiscribe-files-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: `Downloaded ${ids.length} file(s).` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setBulkLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  }, [selectedIds, filteredIds, getIdToken]);

  // Copy file URL to clipboard
  const copyFileUrl = useCallback((file) => {
    const url = `${window.location.origin}${file.url}`;
    navigator.clipboard.writeText(url).then(
      () => { setMessage({ type: 'success', text: 'URL copied to clipboard.' }); setTimeout(() => setMessage(null), 2000); },
      () => { setMessage({ type: 'error', text: 'Failed to copy URL.' }); }
    );
  }, []);

  // Right-click handler
  const handleContextMenu = useCallback((e, file) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
  }, []);

  const contextMenuItems = useMemo(() => {
    if (!contextMenu) return [];
    const file = contextMenu.file;
    return [
      { icon: 'fa-eye', label: 'Preview', onClick: () => setPreviewFile(file) },
      { icon: 'fa-download', label: 'Download', onClick: () => {
        const a = document.createElement('a');
        a.href = file.url;
        a.download = file.originalName;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }},
      { icon: 'fa-copy', label: 'Copy URL', shortcut: 'Ctrl+C', onClick: () => copyFileUrl(file) },
      { divider: true },
      { icon: 'fa-check-square', label: selectedIds.has(file.id) ? 'Deselect' : 'Select', onClick: () => toggleSelect(file.id) },
      { divider: true },
      { icon: 'fa-info-circle', label: 'Properties', onClick: () => setPropertiesFile(file) },
    ];
  }, [contextMenu, selectedIds, copyFileUrl]);

  const clearFilters = () => {
    setStatusFilter('');
    setServiceFilter('');
    setSearchQuery('');
  };

  const hasActiveFilters = statusFilter || serviceFilter || searchQuery;

  const heroContent = (
    <div className="relative z-10 py-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold gradient-text">
              Dashboard
            </h1>
            <p className="text-sm text-gray-text mt-1">
              Welcome back, {user?.email?.split('@')[0] || 'User'}
            </p>
          </div>
          <Link
            to="/upload"
            className="btn-gradient text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <i className="fas fa-plus text-xs"></i>
            New Upload
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 bg-gray-100/80 rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'files'
                ? 'bg-white text-dark-text shadow-sm'
                : 'text-gray-text hover:text-dark-text'
            }`}
          >
            <i className="fas fa-folder-open text-xs mr-2"></i>
            My Files
          </button>
          <button
            onClick={() => setActiveTab('transcriptions')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'transcriptions'
                ? 'bg-white text-dark-text shadow-sm'
                : 'text-gray-text hover:text-dark-text'
            }`}
          >
            <i className="fas fa-file-lines text-xs mr-2"></i>
            Transcriptions
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Layout heroContent={heroContent}>
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          {activeTab === 'files' ? (
            <>
              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {/* Total */}
                <button
                  onClick={() => { setStatusFilter(''); }}
                  className={`bg-white rounded-xl border p-4 text-left transition-all hover:shadow-md ${
                    !statusFilter ? 'border-primary/30 shadow-sm ring-1 ring-primary/10' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-text uppercase tracking-wide">Total</p>
                      <p className="text-2xl font-bold text-dark-text mt-1">{counts.total}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <i className="fas fa-layer-group text-primary"></i>
                    </div>
                  </div>
                </button>
                {/* Status cards */}
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => setStatusFilter((prev) => prev === key ? '' : key)}
                    className={`bg-white rounded-xl border p-4 text-left transition-all hover:shadow-md ${
                      statusFilter === key ? `${cfg.border} shadow-sm ring-1 ${cfg.ring}/20` : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-text uppercase tracking-wide">{cfg.label}</p>
                        <p className={`text-2xl font-bold mt-1 ${cfg.text}`}>{counts[key]}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-lg ${cfg.iconBg} flex items-center justify-center`}>
                        <i className={`fas ${cfg.icon} ${cfg.text}`}></i>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Messages */}
              {message && (
                <div
                  className={`mb-4 p-3 rounded-xl border flex items-center gap-3 ${
                    message.type === 'success' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
                  }`}
                >
                  <i
                    className={`fas ${
                      message.type === 'success' ? 'fa-check-circle text-green-500' : 'fa-exclamation-circle text-red-500'
                    }`}
                  ></i>
                  <p
                    className={`text-sm font-medium ${
                      message.type === 'success' ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              )}

              {/* Alerts */}
              {statusError && (
                <div className="mb-4 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3">
                  <i className="fas fa-exclamation-circle text-red-500"></i>
                  <p className="text-sm font-medium text-red-700">{statusError}</p>
                </div>
              )}
              {error && (
                <div className="mb-4 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3">
                  <i className="fas fa-exclamation-triangle text-red-500"></i>
                  <p className="text-sm font-medium text-red-700">Error loading files: {error}</p>
                </div>
              )}

              {/* Filter Bar */}
              <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-3">
                  {/* Search */}
                  <div className="relative flex-1">
                    <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-sm"></i>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search files by name, description, or email..."
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    )}
                  </div>

                  {/* Service Category Filter */}
                  {serviceCategories.length > 0 && (
                    <div className="relative">
                      <select
                        value={serviceFilter}
                        onChange={(e) => setServiceFilter(e.target.value)}
                        className="appearance-none pl-4 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all min-w-[180px]"
                      >
                        <option value="">All Services</option>
                        {serviceCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none"></i>
                    </div>
                  )}

                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none pl-4 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all min-w-[150px]"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none"></i>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-gray-text hover:text-dark-text hover:bg-gray-50 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <i className="fas fa-times text-xs"></i>
                      Clear
                    </button>
                  )}
                </div>

                {/* Active filter pills */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">Showing:</span>
                    {statusFilter && (
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${STATUS_CONFIG[statusFilter].bg} ${STATUS_CONFIG[statusFilter].text}`}>
                        {STATUS_CONFIG[statusFilter].label}
                        <button onClick={() => setStatusFilter('')} className="hover:opacity-70"><i className="fas fa-times text-[8px]"></i></button>
                      </span>
                    )}
                    {serviceFilter && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-600">
                        {serviceFilter}
                        <button onClick={() => setServiceFilter('')} className="hover:opacity-70"><i className="fas fa-times text-[8px]"></i></button>
                      </span>
                    )}
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600">
                        &quot;{searchQuery}&quot;
                        <button onClick={() => setSearchQuery('')} className="hover:opacity-70"><i className="fas fa-times text-[8px]"></i></button>
                      </span>
                    )}
                    <span className="text-xs text-gray-400 ml-1">
                      {filteredFiles.length} result{filteredFiles.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Bulk action bar */}
              {selectedCount > 0 && (
                <div className="bg-white rounded-xl border border-primary/20 p-3 mb-6 shadow-sm flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <i className="fas fa-check-double text-primary text-xs"></i>
                    </div>
                    <span className="text-sm font-medium text-dark-text">
                      {selectedCount} file{selectedCount !== 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={handleBulkDownload}
                      disabled={bulkLoading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors disabled:opacity-50"
                    >
                      {bulkLoading ? <i className="fas fa-spinner fa-spin text-[10px]"></i> : <i className="fas fa-download text-[10px]"></i>}
                      Download ZIP
                    </button>
                    <button
                      onClick={() => setSelectedIds(new Set())}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-dark-text hover:bg-gray-50 transition-colors"
                    >
                      <i className="fas fa-times text-[10px]"></i>
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {/* Select All bar */}
              {filteredFiles.length > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={toggleSelectAll}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-text hover:text-dark-text hover:bg-white border border-gray-200 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                      readOnly
                      className="w-3.5 h-3.5 rounded border-gray-300 text-primary pointer-events-none"
                    />
                    {allSelected ? 'Deselect All' : 'Select All'}
                  </button>
                  <span className="text-xs text-gray-400">
                    {filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {/* Content */}
              {loading ? (
                <div className="text-center py-24">
                  <i className="fas fa-spinner fa-spin text-3xl text-primary mb-4 block"></i>
                  <p className="text-sm text-gray-text">Loading your files...</p>
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`fas ${hasActiveFilters ? 'fa-search' : 'fa-cloud-upload-alt'} text-primary text-xl`}></i>
                  </div>
                  <p className="text-sm font-medium text-dark-text">
                    {hasActiveFilters ? 'No files match your filters' : 'No files uploaded yet'}
                  </p>
                  <p className="text-xs text-gray-text mt-1 mb-5">
                    {hasActiveFilters ? 'Try adjusting your search or filters.' : 'Upload your first file to get started.'}
                  </p>
                  {hasActiveFilters ? (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                      <i className="fas fa-times text-xs"></i>
                      Clear all filters
                    </button>
                  ) : (
                    <Link
                      to="/upload"
                      className="inline-flex items-center gap-2 btn-gradient text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                    >
                      <i className="fas fa-plus text-xs"></i>
                      Upload Files
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredFiles.map((file) => {
                    const isSelected = selectedIds.has(file.id);
                    return (
                      <div
                        key={file.id}
                        className={`relative transition-all ${isSelected ? 'ring-2 ring-primary/30 rounded-xl' : ''}`}
                        onContextMenu={(e) => handleContextMenu(e, file)}
                      >
                        {/* Selection checkbox */}
                        <div className="absolute top-3 left-3 z-10">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(file.id)}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30 cursor-pointer shadow-sm"
                          />
                        </div>
                        <FileCard
                          file={file}
                          isAdmin={isAdmin}
                          onStatusChange={handleStatusChange}
                          onPreview={setPreviewFile}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            /* Transcriptions Tab */
            <>
              {transError && (
                <div className="mb-4 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3">
                  <i className="fas fa-exclamation-circle text-red-500"></i>
                  <p className="text-sm font-medium text-red-700">{transError}</p>
                  <button onClick={() => fetchTranscriptions()} className="ml-auto text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1.5">
                    <i className="fas fa-sync-alt text-xs"></i>
                    Retry
                  </button>
                </div>
              )}

              {transLoading ? (
                <div className="text-center py-24">
                  <i className="fas fa-spinner fa-spin text-3xl text-primary mb-4 block"></i>
                  <p className="text-sm text-gray-text">Loading transcriptions...</p>
                </div>
              ) : transcriptions.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-file-lines text-primary text-xl"></i>
                  </div>
                  <p className="text-sm font-medium text-dark-text">No transcriptions yet</p>
                  <p className="text-xs text-gray-text mt-1">
                    When your uploaded files are transcribed, they will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transcriptions.map((t) => (
                    <Link
                      key={t.id}
                      to={`/transcriptions/${t.id}`}
                      className="block bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          t.deliveryType === 'file' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          <i className={`fas ${t.deliveryType === 'file' ? 'fa-file-audio' : 'fa-file-alt'} text-sm`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-dark-text truncate">
                            {t.title || t.fileName || 'Untitled Transcription'}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                            {t.fileName && (
                              <span className="text-[11px] text-gray-400 flex items-center gap-1">
                                <i className="fas fa-paperclip text-[9px]"></i>
                                {t.fileName}
                              </span>
                            )}
                            <span className="text-[11px] text-gray-400 flex items-center gap-1">
                              <i className="fas fa-clock text-[9px]"></i>
                              {t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '--'}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              t.deliveryType === 'file' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                            }`}>
                              <i className={`fas ${t.deliveryType === 'file' ? 'fa-download' : 'fa-align-left'} text-[8px]`}></i>
                              {t.deliveryType === 'file' ? 'File' : 'Text'}
                            </span>
                          </div>
                          {t.deliveryType === 'text' && t.content && (
                            <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                              {t.content}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0 text-gray-300">
                          <i className="fas fa-chevron-right text-xs"></i>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
      )}

      {/* Properties Modal */}
      {propertiesFile && (
        <FilePropertiesModal file={propertiesFile} onClose={() => setPropertiesFile(null)} />
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={() => setContextMenu(null)}
        />
      )}
    </Layout>
  );
}

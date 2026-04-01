/**
 * ConverterPage — Shared converter template used by all category pages.
 * Handles: conversion selection → file upload → convert → download.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, RotateCcw, CheckCircle2, AlertCircle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';
import FileDropzone from '../ui/FileDropzone';
import ConversionSelector from '../ui/ConversionSelector';
import ProgressBar from '../ui/ProgressBar';
import { Spinner } from '../ui/Loader';
import useFileConvert from '../../hooks/useFileConvert';
import { formatFileSize } from '../../utils/helpers';

export default function ConverterPage({ category }) {
  const [selectedConversion, setSelectedConversion] = useState(category.conversions[0]);
  const [splitStart, setSplitStart] = useState(1);
  const [splitEnd, setSplitEnd] = useState(1);

  const {
    files, addFiles, removeFile,
    isConverting, progress, result, error,
    convert, download, reset,
  } = useFileConvert();

  const Icon = category.icon;

  // Build the API endpoint based on category and conversion
  const getEndpoint = () => {
    const conv = selectedConversion;

    // Images use a different endpoint pattern
    if (category.id === 'images') {
      return `/images/convert`;
    }

    // Archives extract
    if (category.id === 'archives' && conv.archiveFormat) {
      return `/archives/extract`;
    }

    // Default pattern: /category/conversion-id
    return `/${category.id}/${conv.id}`;
  };

  const getParams = () => {
    const conv = selectedConversion;

    if (category.id === 'images') {
      return { target_format: conv.targetFormat };
    }

    if (category.id === 'archives' && conv.archiveFormat) {
      return { format: conv.archiveFormat };
    }

    if (conv.needsPageRange) {
      return { start_page: splitStart, end_page: splitEnd };
    }

    return {};
  };

  const handleConvert = () => {
    convert(getEndpoint(), {
      params: getParams(),
      multiple: selectedConversion.multiple || false,
      conversionName: selectedConversion.name,
      categoryName: category.name,
    });
  };

  const handleConversionChange = (conv) => {
    setSelectedConversion(conv);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link
          to="/"
          className="lg:hidden btn-ghost p-2 rounded-xl"
          aria-label="Back to dashboard"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${category.colorAccent}20, ${category.colorAccent}10)` }}
        >
          <Icon className="w-6 h-6" style={{ color: category.colorAccent }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
            {category.name}
          </h1>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            {category.description} • {category.conversions.length} conversions available
          </p>
        </div>
      </motion.div>

      {/* Conversion Type Selector */}
      <GlassCard className="p-6" delay={0.05}>
        <h2 className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-3">
          Select Conversion
        </h2>
        <ConversionSelector
          conversions={category.conversions}
          selected={selectedConversion}
          onSelect={handleConversionChange}
        />
      </GlassCard>

      {/* Main Converter Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <GlassCard className="p-6" delay={0.1}>
          <h2 className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-4">
            Upload File{selectedConversion.multiple ? 's' : ''}
          </h2>
          <FileDropzone
            files={files}
            onFilesAdded={addFiles}
            onFileRemoved={removeFile}
            acceptedExtensions={selectedConversion.inputExt}
            multiple={selectedConversion.multiple || false}
            disabled={isConverting}
          />

          {/* Page Range for Split PDF */}
          {selectedConversion.needsPageRange && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 flex gap-4"
            >
              <div className="flex-1">
                <label className="block text-xs font-medium text-surface-500 mb-1">Start Page</label>
                <input
                  type="number"
                  min={1}
                  value={splitStart}
                  onChange={(e) => setSplitStart(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl border border-surface-200 dark:border-surface-700 
                             bg-white dark:bg-surface-800 text-surface-900 dark:text-white 
                             focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none
                             transition-all text-sm"
                  id="split-start-page"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-surface-500 mb-1">End Page</label>
                <input
                  type="number"
                  min={1}
                  value={splitEnd}
                  onChange={(e) => setSplitEnd(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl border border-surface-200 dark:border-surface-700 
                             bg-white dark:bg-surface-800 text-surface-900 dark:text-white 
                             focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none
                             transition-all text-sm"
                  id="split-end-page"
                />
              </div>
            </motion.div>
          )}

          {/* Convert Button */}
          <div className="mt-6">
            <motion.button
              onClick={handleConvert}
              disabled={files.length === 0 || isConverting}
              className="btn-primary w-full"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              id="convert-button"
            >
              {isConverting ? (
                <>
                  <Spinner size="sm" className="border-white/30 border-t-white" />
                  Converting...
                </>
              ) : (
                <>
                  Convert Now
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </GlassCard>

        {/* Result Section */}
        <GlassCard className="p-6 flex flex-col" delay={0.15}>
          <h2 className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-4">
            Result
          </h2>

          <div className="flex-1 flex flex-col items-center justify-center min-h-[200px]">
            <AnimatePresence mode="wait">
              {/* Converting state */}
              {isConverting && (
                <motion.div
                  key="converting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full space-y-6"
                >
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon className="w-8 h-8 text-brand-500" />
                    </motion.div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      Processing your file...
                    </p>
                  </div>
                  <ProgressBar progress={progress} isActive={true} />
                </motion.div>
              )}

              {/* Success state */}
              {!isConverting && result && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </motion.div>
                  <div className="text-center">
                    <p className="font-semibold text-surface-900 dark:text-white">
                      Conversion Complete!
                    </p>
                    <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                      {result.filename} • {formatFileSize(result.size)}
                    </p>
                  </div>
                  <div className="flex gap-3 w-full">
                    <motion.button
                      onClick={download}
                      className="btn-primary flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      id="download-button"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </motion.button>
                    <motion.button
                      onClick={reset}
                      className="btn-secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      id="reset-button"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Error state */}
              {!isConverting && error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-surface-900 dark:text-white">
                      Conversion Failed
                    </p>
                    <p className="text-sm text-red-500 dark:text-red-400 mt-1 max-w-xs">
                      {error}
                    </p>
                  </div>
                  <motion.button
                    onClick={reset}
                    className="btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </motion.button>
                </motion.div>
              )}

              {/* Empty state */}
              {!isConverting && !result && !error && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                    <Download className="w-7 h-7 text-surface-300 dark:text-surface-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-400 dark:text-surface-500">
                      Your converted file will appear here
                    </p>
                    <p className="text-xs text-surface-300 dark:text-surface-600 mt-1">
                      Upload a file and click Convert
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

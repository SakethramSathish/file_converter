/**
 * FileDropzone — Drag & drop file upload with animated preview.
 */
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, FileCheck } from 'lucide-react';
import { formatFileSize } from '../../utils/helpers';

export default function FileDropzone({
  files = [],
  onFilesAdded,
  onFileRemoved,
  acceptedExtensions = '',
  multiple = false,
  disabled = false,
}) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFilesAdded(acceptedFiles);
    }
  }, [onFilesAdded]);

  // Build accept object from extensions string like ".pdf,.docx"
  const accept = {};
  if (acceptedExtensions) {
    acceptedExtensions.split(',').forEach(ext => {
      const cleaned = ext.trim();
      if (cleaned) {
        // Map extensions to MIME types (approximate)
        accept[`application/${cleaned.replace('.', '')}`] = [cleaned];
      }
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    disabled,
    // We won't use strict accept filtering — let the backend validate
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          dropzone
          ${isDragActive ? 'dropzone-active' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${files.length > 0 ? 'min-h-[160px]' : 'min-h-[220px]'}
        `}
      >
        <input {...getInputProps()} id="file-dropzone-input" />

        <AnimatePresence mode="wait">
          {files.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-4 p-6"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center"
                animate={isDragActive ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Upload className="w-7 h-7 text-brand-500" />
              </motion.div>
              <div className="text-center">
                <p className="text-surface-900 dark:text-surface-100 font-semibold text-lg">
                  {isDragActive ? 'Drop your file here' : 'Drag & drop your file'}
                </p>
                <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">
                  or <span className="text-brand-500 font-medium hover:text-brand-600 underline underline-offset-2">browse files</span>
                </p>
                {acceptedExtensions && (
                  <p className="text-surface-400 dark:text-surface-500 text-xs mt-3 font-mono">
                    Accepted: {acceptedExtensions}
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="files"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2">
                {files.map((file, index) => (
                  <motion.div
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-surface-800/50 
                               border border-surface-200 dark:border-surface-700"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-5 h-5 text-brand-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFileRemoved(index);
                      }}
                      className="w-8 h-8 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 
                                 flex items-center justify-center transition-colors"
                      aria-label="Remove file"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </motion.div>
                ))}
              </div>
              {multiple && (
                <p className="text-center text-xs text-surface-400 mt-3">
                  Click or drag to add more files
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

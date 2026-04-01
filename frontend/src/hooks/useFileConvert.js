/**
 * useFileConvert — Custom hook for file conversion workflow.
 * Handles: file selection → upload → API call → download.
 */
import { useState, useCallback } from 'react';
import api from '../utils/api';
import { saveRecentConversion } from '../utils/helpers';

export default function useFileConvert() {
  const [files, setFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null); // { blob, filename, size }
  const [error, setError] = useState(null);

  const reset = useCallback(() => {
    setFiles([]);
    setIsConverting(false);
    setProgress(0);
    setResult(null);
    setError(null);
  }, []);

  const addFiles = useCallback((newFiles) => {
    setFiles(prev => [...prev, ...newFiles]);
    setResult(null);
    setError(null);
  }, []);

  const removeFile = useCallback((index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  /**
   * Convert files using the specified endpoint.
   * @param {string} endpoint - API endpoint path (e.g., '/documents/docx-to-pdf')
   * @param {object} options - Extra options:
   *   - params: query parameters
   *   - multiple: whether to send multiple files
   *   - conversionName: name for history
   *   - categoryName: category name for history
   */
  const convert = useCallback(async (endpoint, options = {}) => {
    if (files.length === 0) {
      setError('Please select a file first');
      return;
    }

    setIsConverting(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();

      if (options.multiple) {
        // For endpoints that accept multiple files (e.g., PDF merge)
        files.forEach(file => formData.append('files', file));
      } else {
        formData.append('file', files[0]);
      }

      const response = await api.post(endpoint, formData, {
        responseType: 'blob',
        params: options.params || {},
        onUploadProgress: (progressEvent) => {
          const pct = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(Math.min(pct, 95)); // Cap at 95 until response arrives
        },
      });

      setProgress(100);

      // Extract filename from Content-Disposition header or use default
      const disposition = response.headers['content-disposition'];
      let filename = 'converted_file';
      if (disposition) {
        const match = disposition.match(/filename="?([^";\n]+)"?/);
        if (match) filename = match[1];
      }

      const blob = new Blob([response.data]);
      const resultObj = { blob, filename, size: blob.size };
      setResult(resultObj);

      // Save to recent history
      saveRecentConversion({
        conversionName: options.conversionName || endpoint,
        categoryName: options.categoryName || 'Unknown',
        inputFile: files[0]?.name || 'file',
        outputFile: filename,
        size: blob.size,
      });

    } catch (err) {
      // Check if the error response is a JSON blob
      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          setError(json.detail || 'Conversion failed');
        } catch {
          setError('Conversion failed. Please try again.');
        }
      } else {
        setError(err.message || 'Conversion failed. Please try again.');
      }
    } finally {
      setIsConverting(false);
    }
  }, [files]);

  /**
   * Trigger download of the converted file.
   */
  const download = useCallback(() => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [result]);

  return {
    files,
    addFiles,
    removeFile,
    isConverting,
    progress,
    result,
    error,
    convert,
    download,
    reset,
  };
}

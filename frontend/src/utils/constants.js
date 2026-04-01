/**
 * ConvertX — Constants
 * All conversion categories, types, icons, and color mappings.
 */
import {
  FileText, Table2, Image, Music, Presentation, Archive, FileCheck2
} from 'lucide-react';

// Category definitions with their conversion options
export const CATEGORIES = [
  {
    id: 'documents',
    name: 'Documents',
    description: 'Convert between document formats',
    icon: FileText,
    color: 'from-indigo-500 to-blue-500',
    colorAccent: '#6366f1',
    bgLight: 'bg-indigo-50',
    bgDark: 'dark:bg-indigo-950/30',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    conversions: [
      { id: 'docx-to-pdf', name: 'DOCX to PDF', inputExt: '.docx,.doc', outputExt: '.pdf' },
      { id: 'pdf-to-docx', name: 'PDF to DOCX', inputExt: '.pdf', outputExt: '.docx' },
      { id: 'txt-to-docx', name: 'TXT to DOCX', inputExt: '.txt', outputExt: '.docx' },
      { id: 'docx-to-txt', name: 'DOCX to TXT', inputExt: '.docx,.doc', outputExt: '.txt' },
      { id: 'odt-to-docx', name: 'ODT to DOCX', inputExt: '.odt', outputExt: '.docx' },
      { id: 'odt-to-pdf', name: 'ODT to PDF', inputExt: '.odt', outputExt: '.pdf' },
    ],
  },
  {
    id: 'spreadsheets',
    name: 'Spreadsheets',
    description: 'Convert spreadsheet file formats',
    icon: Table2,
    color: 'from-emerald-500 to-teal-500',
    colorAccent: '#10b981',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-950/30',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    conversions: [
      { id: 'xlsx-to-csv', name: 'XLSX to CSV', inputExt: '.xlsx', outputExt: '.csv' },
      { id: 'csv-to-xlsx', name: 'CSV to XLSX', inputExt: '.csv', outputExt: '.xlsx' },
      { id: 'ods-to-xlsx', name: 'ODS to XLSX', inputExt: '.ods', outputExt: '.xlsx' },
      { id: 'xls-to-xlsx', name: 'XLS to XLSX', inputExt: '.xls', outputExt: '.xlsx' },
    ],
  },
  {
    id: 'images',
    name: 'Images',
    description: 'Convert between image formats',
    icon: Image,
    color: 'from-violet-500 to-purple-500',
    colorAccent: '#8b5cf6',
    bgLight: 'bg-violet-50',
    bgDark: 'dark:bg-violet-950/30',
    textColor: 'text-violet-600 dark:text-violet-400',
    conversions: [
      { id: 'png-to-jpg', name: 'PNG to JPG', inputExt: '.png', outputExt: '.jpg', targetFormat: 'jpg' },
      { id: 'png-to-bmp', name: 'PNG to BMP', inputExt: '.png', outputExt: '.bmp', targetFormat: 'bmp' },
      { id: 'png-to-webp', name: 'PNG to WEBP', inputExt: '.png', outputExt: '.webp', targetFormat: 'webp' },
      { id: 'png-to-tiff', name: 'PNG to TIFF', inputExt: '.png', outputExt: '.tiff', targetFormat: 'tiff' },
      { id: 'jpg-to-png', name: 'JPG to PNG', inputExt: '.jpg,.jpeg', outputExt: '.png', targetFormat: 'png' },
      { id: 'jpg-to-bmp', name: 'JPG to BMP', inputExt: '.jpg,.jpeg', outputExt: '.bmp', targetFormat: 'bmp' },
      { id: 'jpg-to-pdf', name: 'JPG to PDF', inputExt: '.jpg,.jpeg', outputExt: '.pdf', targetFormat: 'pdf' },
      { id: 'any-to-pdf', name: 'Image to PDF', inputExt: '.png,.jpg,.jpeg,.bmp,.webp,.tiff', outputExt: '.pdf', targetFormat: 'pdf' },
    ],
  },
  {
    id: 'audio-video',
    name: 'Audio & Video',
    description: 'Convert media file formats',
    icon: Music,
    color: 'from-rose-500 to-pink-500',
    colorAccent: '#f43f5e',
    bgLight: 'bg-rose-50',
    bgDark: 'dark:bg-rose-950/30',
    textColor: 'text-rose-600 dark:text-rose-400',
    conversions: [
      { id: 'mp4-to-mp3', name: 'MP4 to MP3', inputExt: '.mp4', outputExt: '.mp3' },
      { id: 'avi-to-mp4', name: 'AVI to MP4', inputExt: '.avi', outputExt: '.mp4' },
      { id: 'wav-to-mp3', name: 'WAV to MP3', inputExt: '.wav', outputExt: '.mp3' },
    ],
  },
  {
    id: 'presentations',
    name: 'Presentations',
    description: 'Convert presentation files',
    icon: Presentation,
    color: 'from-amber-500 to-orange-500',
    colorAccent: '#f59e0b',
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/30',
    textColor: 'text-amber-600 dark:text-amber-400',
    conversions: [
      { id: 'pptx-to-pdf', name: 'PPTX to PDF', inputExt: '.pptx', outputExt: '.pdf' },
      { id: 'pptx-to-text', name: 'PPTX to Text', inputExt: '.pptx', outputExt: '.txt' },
      { id: 'pptx-to-images', name: 'PPTX to Images', inputExt: '.pptx', outputExt: '.json' },
    ],
  },
  {
    id: 'archives',
    name: 'Archives',
    description: 'Extract and convert archives',
    icon: Archive,
    color: 'from-cyan-500 to-sky-500',
    colorAccent: '#06b6d4',
    bgLight: 'bg-cyan-50',
    bgDark: 'dark:bg-cyan-950/30',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    conversions: [
      { id: 'extract-zip', name: 'Extract ZIP', inputExt: '.zip', outputExt: '.zip', archiveFormat: 'zip' },
      { id: 'extract-tar', name: 'Extract TAR', inputExt: '.tar,.tar.gz,.tgz', outputExt: '.zip', archiveFormat: 'tar' },
      { id: 'extract-7z', name: 'Extract 7z', inputExt: '.7z', outputExt: '.zip', archiveFormat: '7z' },
      { id: '7z-to-zip', name: '7z to ZIP', inputExt: '.7z', outputExt: '.zip' },
    ],
  },
  {
    id: 'pdf',
    name: 'PDF Tools',
    description: 'Advanced PDF operations',
    icon: FileCheck2,
    color: 'from-orange-500 to-red-500',
    colorAccent: '#f97316',
    bgLight: 'bg-orange-50',
    bgDark: 'dark:bg-orange-950/30',
    textColor: 'text-orange-600 dark:text-orange-400',
    conversions: [
      { id: 'pdf-to-docx', name: 'PDF to DOCX', inputExt: '.pdf', outputExt: '.docx' },
      { id: 'docx-to-pdf', name: 'DOCX to PDF', inputExt: '.docx,.doc', outputExt: '.pdf' },
      { id: 'image-to-pdf', name: 'Image to PDF', inputExt: '.jpg,.jpeg,.png', outputExt: '.pdf' },
      { id: 'pdf-to-images', name: 'PDF to Images', inputExt: '.pdf', outputExt: '.zip' },
      { id: 'merge', name: 'Merge PDFs', inputExt: '.pdf', outputExt: '.pdf', multiple: true },
      { id: 'split', name: 'Split PDF', inputExt: '.pdf', outputExt: '.pdf', needsPageRange: true },
    ],
  },
];

// Quick lookup by category ID
export const getCategoryById = (id) => CATEGORIES.find(c => c.id === id);

// Total conversion count
export const TOTAL_CONVERSIONS = CATEGORIES.reduce((sum, cat) => sum + cat.conversions.length, 0);
export const TOTAL_CATEGORIES = CATEGORIES.length;

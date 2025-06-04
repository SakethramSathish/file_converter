# Universal File Converter App

A powerful and user-friendly file conversion web application built using **Streamlit**. This tool allows users to seamlessly convert between multiple file formats across different categories such as documents, spreadsheets, images, audio/video, presentations, archives, and PDFs — all within a clean, tabbed interface.

---

## Features

- ** Document Conversion**
  - DOCX ↔️ PDF
  - TXT ↔️ DOCX
  - DOCX ↔️ TXT
  - ODT to DOCX / PDF

- ** Spreadsheet Conversion**
  - XLSX ↔️ CSV
  - CSV ↔️ XLSX
  - ODS → XLSX
  - XLS → XLSX

- ** Image Conversion**
  - PNG ↔️ JPG, BMP, WEBP, TIFF
  - JPG ↔️ PNG, BMP, PDF
  - Convert any image format to PDF

- ** Audio/Video Conversion**
  - MP4 → MP3
  - AVI → MP4
  - WAV → MP3

- ** Presentation Conversion**
  - PPTX → PDF
  - PPTX → Text / Slide-wise text extraction

- ** Archive Utilities**
  - Extract ZIP, TAR, 7z
  - Convert 7z → ZIP

- ** PDF Utilities**
  - PDF ↔️ DOCX
  - DOCX → PDF
  - Image → PDF
  - PDF → Images
  - Merge multiple PDFs
  - Split PDF by page range

---

## Tech Stack

- **Frontend & UI:** Streamlit
- **File Handling & Processing:** Python libraries like `pandas`, `PyPDF2`, `moviepy`, `docx`, `pptx`, `pydub`, `PIL`, and system-level tools like `libreoffice` & `ffmpeg`.

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
    ```
3. Run the Streamlit app:
   ```bash
   streamlit run app.py
    ```
## 📌 Notes

- Some conversions (like **DOCX to PDF** or **PPTX to PDF**) require **LibreOffice** (Linux/macOS) or **Windows COM support** (Windows only).
- Make sure external tools like **`ffmpeg`** and **`libreoffice`** are properly installed and added to your system's PATH.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

Let me know if you’d like a `requirements.txt` or a usage demo section added as well!

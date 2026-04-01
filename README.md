<div align="center">
  <h1>File Converter</h1>
  <p>A powerful, modern web application for converting a wide variety of file types instantly.</p>

  ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
  ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)
</div>

## Overview

**File Converter** provides a streamlined, user-friendly interface for seamless conversions across documents, spreadsheets, images, audio/video files, presentations, archives, and PDFs. With a highly responsive React frontend and a robust, decoupled FastAPI backend, it efficiently handles fast, secure, and purely local file processing, keeping your data completely private.

## Features

- **Document Conversion**: Convert between DOCX, TXT, PDF, ODT, and other popular document formats.
- **Spreadsheet Conversion**: Seamlessly convert your data between XLSX, CSV, ODS, and XLS.
- **Image Conversion**: Support for PNG, JPG, BMP, WEBP, and TIFF formats. 
- **Audio & Video Processing**: Swiftly convert between MP4, MP3, AVI, and WAV media formats.
- **Presentation & Archives**: Extract archives (ZIP, TAR, 7z) and process presentations (PPTX).
- **PDF Tools**: Split, merge, and transform PDFs easily.
- **Premium UI Experience**: Boasts a fully responsive, modern glassmorphic design utilizing Tailwind CSS and fluid `framer-motion` animations.

## Architecture

The project has been architected into two distinct services:
1. **Frontend (`/frontend`)**: A React Single Page Application (SPA) bundled with Vite, styled with custom Tailwind CSS utility classes.
2. **Backend (`/backend`)**: A highly concurrent API built with Python's FastAPI handling all complex transformations and integrations with low-level converter packages.

```text
File Converter/
├── backend/
│   ├── main.py                 # FastAPI Application entry point
│   ├── requirements.txt        # Python dependency manifest
│   ├── routers/                # API route definitions
│   └── services/               # Core file conversion logic
├── frontend/
│   ├── index.html              # Vite entry HTML
│   ├── package.json            # Node dependency manifest
│   ├── src/                    # React source code components & hooks
│   └── tailwind.config.js      # Styling configuration
├── .gitignore                  # Combined version control ignore list
└── README.md                   # Project documentation
```

## Setup & Installation

Follow these steps to get both the frontend and backend running on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [Python](https://www.python.org/) (v3.9+)

### 1. Starting the Backend Server
First, initialize the Python environment and install the required processing dependencies.

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate
# Activate it (macOS/Linux)
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```
The backend API should now be running locally at `http://127.0.0.1:8000`.

### 2. Starting the Frontend Development Server
Leave the backend running and open a **new terminal window** for the React frontend.

```bash
# Navigate to the frontend directory
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```
The frontend should now be running locally at `http://localhost:5173`. 

## Usage

1. **Launch**: Open your web browser and navigate to `http://localhost:5173`.
2. **Select**: Simply select your desired conversion category (e.g., *Documents*, *Images*, *Archives*) from the Dashboard icons.
3. **Upload**: Drag-and-drop your target file into the dropzone.
4. **Convert**: Click **Convert Now** and watch the animated real-time progress bar.
5. **Download**: Once the backend resolves the file safely, click **Download** to save it!

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Acknowledgements

- Built using [FastAPI](https://fastapi.tiangolo.com/), [React](https://reactjs.org/), and [Tailwind CSS](https://tailwindcss.com/).
- Incorporates multiple open-source conversion libraries: `pandas`, `Pillow`, `python-docx`, `pydub`, `moviepy`, `PyMuPDF`, and more.

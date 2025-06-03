# Python File Converter with Streamlit

This project is a lightweight and user-friendly file converter web application built using Python and Streamlit. It enables users to easily convert between various document and image formats directly from their browser.

## Features

- Convert DOCX to PDF and TXT
- Convert PDF to DOCX
- Convert TXT to DOCX
- Convert DOCX to TXT
- Convert between image formats: PNG, JPG, JPEG, BMP, WEBP, TIFF
- Convert images to PDF
- Simple interface with instant file download after conversion
- Built-in error handling and temporary file cleanup

## Technologies Used

- **Python**: Core programming language used for backend logic
- **Streamlit**: Framework used to create the interactive web interface
- **docx2pdf**: Library to convert DOCX files to PDF
- **pdf2docx**: Library to convert PDF files to DOCX
- **python-docx**: Used for reading and writing DOCX files
- **Pillow (PIL)**: Used for image processing and format conversion

## How It Works

The app uses a simple file uploader to accept supported files. Based on the file extension, it offers relevant output format options. When the user clicks "Convert," the file is saved temporarily, converted using the appropriate function, and a download button is provided to get the result.

Temporary files are automatically cleaned up after each conversion.

## Usage

1. Clone the repository.
2. Install the required packages from `requirements.txt`.
3. Run the Streamlit app with:
```
streamlit run app.py
```
4. Upload a file, select the output format, and convert.

## File Structure

- `app.py`: Main Streamlit app
- `converter/`
- `documents.py`: Handles document format conversions
- `images.py`: Handles image format conversions
- `utils.py`: Utility functions (e.g., change file extension)

## Future Improvements

- Add support for more file types (e.g., Excel, PPT, CSV, audio/video)
- Add batch conversion support
- Improve UI and add drag-and-drop functionality
- Deploy online using Streamlit Cloud or similar platforms

## License

This project is open-source and available under the MIT License.

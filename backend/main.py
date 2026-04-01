"""
ConvertX — File Converter API
FastAPI backend with CORS support for the React frontend.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import documents, spreadsheets, images, audio_video, presentations, archives, pdf

app = FastAPI(
    title="ConvertX API",
    description="A powerful file conversion API supporting documents, spreadsheets, images, audio/video, presentations, archives, and PDFs.",
    version="2.0.0",
)

# CORS — allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:3000",   # Fallback
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all routers
app.include_router(documents.router)
app.include_router(spreadsheets.router)
app.include_router(images.router)
app.include_router(audio_video.router)
app.include_router(presentations.router)
app.include_router(archives.router)
app.include_router(pdf.router)


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "ConvertX API", "version": "2.0.0"}


@app.get("/api/conversions")
async def list_conversions():
    """List all supported conversion types."""
    return {
        "categories": [
            {
                "id": "documents",
                "name": "Documents",
                "icon": "FileText",
                "conversions": [
                    {"id": "docx-to-pdf", "name": "DOCX to PDF", "input": ".docx", "output": ".pdf"},
                    {"id": "pdf-to-docx", "name": "PDF to DOCX", "input": ".pdf", "output": ".docx"},
                    {"id": "txt-to-docx", "name": "TXT to DOCX", "input": ".txt", "output": ".docx"},
                    {"id": "docx-to-txt", "name": "DOCX to TXT", "input": ".docx", "output": ".txt"},
                    {"id": "odt-to-docx", "name": "ODT to DOCX", "input": ".odt", "output": ".docx"},
                    {"id": "odt-to-pdf", "name": "ODT to PDF", "input": ".odt", "output": ".pdf"},
                ]
            },
            {
                "id": "spreadsheets",
                "name": "Spreadsheets",
                "icon": "Table",
                "conversions": [
                    {"id": "xlsx-to-csv", "name": "XLSX to CSV", "input": ".xlsx", "output": ".csv"},
                    {"id": "csv-to-xlsx", "name": "CSV to XLSX", "input": ".csv", "output": ".xlsx"},
                    {"id": "ods-to-xlsx", "name": "ODS to XLSX", "input": ".ods", "output": ".xlsx"},
                    {"id": "xls-to-xlsx", "name": "XLS to XLSX", "input": ".xls", "output": ".xlsx"},
                ]
            },
            {
                "id": "images",
                "name": "Images",
                "icon": "Image",
                "conversions": [
                    {"id": "png-to-jpg", "name": "PNG to JPG", "input": ".png", "output": ".jpg"},
                    {"id": "png-to-bmp", "name": "PNG to BMP", "input": ".png", "output": ".bmp"},
                    {"id": "png-to-webp", "name": "PNG to WEBP", "input": ".png", "output": ".webp"},
                    {"id": "png-to-tiff", "name": "PNG to TIFF", "input": ".png", "output": ".tiff"},
                    {"id": "jpg-to-png", "name": "JPG to PNG", "input": ".jpg", "output": ".png"},
                    {"id": "jpg-to-bmp", "name": "JPG to BMP", "input": ".jpg", "output": ".bmp"},
                    {"id": "jpg-to-pdf", "name": "JPG to PDF", "input": ".jpg", "output": ".pdf"},
                    {"id": "any-to-pdf", "name": "Image to PDF", "input": "any image", "output": ".pdf"},
                ]
            },
            {
                "id": "audio-video",
                "name": "Audio & Video",
                "icon": "Music",
                "conversions": [
                    {"id": "mp4-to-mp3", "name": "MP4 to MP3", "input": ".mp4", "output": ".mp3"},
                    {"id": "avi-to-mp4", "name": "AVI to MP4", "input": ".avi", "output": ".mp4"},
                    {"id": "wav-to-mp3", "name": "WAV to MP3", "input": ".wav", "output": ".mp3"},
                ]
            },
            {
                "id": "presentations",
                "name": "Presentations",
                "icon": "Presentation",
                "conversions": [
                    {"id": "pptx-to-pdf", "name": "PPTX to PDF", "input": ".pptx", "output": ".pdf"},
                    {"id": "pptx-to-text", "name": "PPTX to Text", "input": ".pptx", "output": ".txt"},
                    {"id": "pptx-to-images", "name": "PPTX to Images", "input": ".pptx", "output": "text/json"},
                ]
            },
            {
                "id": "archives",
                "name": "Archives",
                "icon": "Archive",
                "conversions": [
                    {"id": "extract-zip", "name": "Extract ZIP", "input": ".zip", "output": ".zip"},
                    {"id": "extract-tar", "name": "Extract TAR", "input": ".tar", "output": ".zip"},
                    {"id": "extract-7z", "name": "Extract 7z", "input": ".7z", "output": ".zip"},
                    {"id": "7z-to-zip", "name": "7z to ZIP", "input": ".7z", "output": ".zip"},
                ]
            },
            {
                "id": "pdf",
                "name": "PDF Tools",
                "icon": "FileCheck",
                "conversions": [
                    {"id": "pdf-to-docx", "name": "PDF to DOCX", "input": ".pdf", "output": ".docx"},
                    {"id": "docx-to-pdf", "name": "DOCX to PDF", "input": ".docx", "output": ".pdf"},
                    {"id": "image-to-pdf", "name": "Image to PDF", "input": "image", "output": ".pdf"},
                    {"id": "pdf-to-images", "name": "PDF to Images", "input": ".pdf", "output": ".zip"},
                    {"id": "merge", "name": "Merge PDFs", "input": "multiple .pdf", "output": ".pdf"},
                    {"id": "split", "name": "Split PDF", "input": ".pdf", "output": ".pdf"},
                ]
            },
        ]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

"""
PDF tools API routes.
"""
from fastapi import APIRouter, UploadFile, File, Query, HTTPException
from fastapi.responses import FileResponse
import tempfile
import os
from typing import List
from services.pdf_service import (
    pdf_to_docx, docx_to_pdf, image_to_pdf,
    pdf_to_images, merge_pdfs, split_pdf
)

router = APIRouter(prefix="/api/pdf", tags=["PDF Tools"])


@router.post("/pdf-to-docx")
async def convert_pdf_to_docx(file: UploadFile = File(...)):
    """Convert PDF to DOCX."""
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                f.write(await file.read())
            
            output_path = pdf_to_docx(input_path, tmpdir)
            return FileResponse(path=output_path, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document", filename="converted.docx")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/docx-to-pdf")
async def convert_docx_to_pdf(file: UploadFile = File(...)):
    """Convert DOCX to PDF."""
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                f.write(await file.read())
            
            output_path = docx_to_pdf(input_path, tmpdir)
            return FileResponse(path=output_path, media_type="application/pdf", filename="converted.pdf")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/image-to-pdf")
async def convert_image_to_pdf(file: UploadFile = File(...)):
    """Convert an image to PDF."""
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                f.write(await file.read())
            
            output_path = image_to_pdf(input_path, tmpdir)
            return FileResponse(path=output_path, media_type="application/pdf", filename="image_to_pdf.pdf")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pdf-to-images")
async def convert_pdf_to_images(file: UploadFile = File(...)):
    """Convert PDF pages to images (returns ZIP of PNGs)."""
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                f.write(await file.read())
            
            output_path = pdf_to_images(input_path, tmpdir)
            return FileResponse(path=output_path, media_type="application/zip", filename="pdf_pages.zip")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/merge")
async def merge_pdf_files(files: List[UploadFile] = File(...)):
    """Merge multiple PDF files into one."""
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least 2 PDF files are required for merging")
    
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_paths = []
            for i, file in enumerate(files):
                input_path = os.path.join(tmpdir, f"input_{i}_{file.filename}")
                with open(input_path, "wb") as f:
                    f.write(await file.read())
                input_paths.append(input_path)
            
            output_path = merge_pdfs(input_paths, tmpdir)
            return FileResponse(path=output_path, media_type="application/pdf", filename="merged.pdf")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/split")
async def split_pdf_file(
    file: UploadFile = File(...),
    start_page: int = Query(1, ge=1, description="Start page (1-indexed)"),
    end_page: int = Query(1, ge=1, description="End page (1-indexed, inclusive)")
):
    """Split a PDF to extract a page range."""
    if start_page > end_page:
        raise HTTPException(status_code=400, detail="start_page must be <= end_page")
    
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                f.write(await file.read())
            
            output_path = split_pdf(input_path, start_page, end_page, tmpdir)
            return FileResponse(path=output_path, media_type="application/pdf", filename="split.pdf")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

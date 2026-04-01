"""
Presentation conversion API routes.
"""
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse, JSONResponse
import tempfile
import os
from services.presentation_service import pptx_to_pdf, pptx_to_text, pptx_to_images

router = APIRouter(prefix="/api/presentations", tags=["Presentations"])


@router.post("/pptx-to-pdf")
async def convert_pptx_to_pdf(file: UploadFile = File(...)):
    """Convert PPTX to PDF using PowerPoint COM automation."""
    if not file.filename.lower().endswith(".pptx"):
        raise HTTPException(status_code=400, detail="Expected a .pptx file")
    
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                content = await file.read()
                f.write(content)
            
            output_path = pptx_to_pdf(input_path, tmpdir)
            
            return FileResponse(
                path=output_path,
                media_type="application/pdf",
                filename="converted.pdf"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pptx-to-text")
async def convert_pptx_to_text(file: UploadFile = File(...)):
    """Extract text from PPTX."""
    if not file.filename.lower().endswith(".pptx"):
        raise HTTPException(status_code=400, detail="Expected a .pptx file")
    
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                content = await file.read()
                f.write(content)
            
            output_path = pptx_to_text(input_path, tmpdir)
            
            return FileResponse(
                path=output_path,
                media_type="text/plain",
                filename="extracted_text.txt"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pptx-to-images")
async def convert_pptx_to_images(file: UploadFile = File(...)):
    """Extract text content from each slide as JSON."""
    if not file.filename.lower().endswith(".pptx"):
        raise HTTPException(status_code=400, detail="Expected a .pptx file")
    
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                content = await file.read()
                f.write(content)
            
            slides_data = pptx_to_images(input_path)
            return JSONResponse(content={"slides": slides_data})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

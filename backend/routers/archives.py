"""
Archive handling API routes.
"""
from fastapi import APIRouter, UploadFile, File, Query, HTTPException
from fastapi.responses import FileResponse
import tempfile
import os
from services.archive_service import extract_archive, convert_7z_to_zip

router = APIRouter(prefix="/api/archives", tags=["Archives"])


@router.post("/extract")
async def extract_archive_endpoint(
    file: UploadFile = File(...),
    format: str = Query(..., description="Archive format: zip, tar, 7z")
):
    """Extract an archive and return contents as ZIP."""
    allowed_formats = ["zip", "tar", "7z"]
    if format not in allowed_formats:
        raise HTTPException(status_code=400, detail=f"Unsupported format: {format}. Allowed: {allowed_formats}")
    
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                content = await file.read()
                f.write(content)
            
            output_path = extract_archive(input_path, format, tmpdir)
            
            return FileResponse(
                path=output_path,
                media_type="application/zip",
                filename="extracted.zip"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/7z-to-zip")
async def convert_7z_to_zip_endpoint(file: UploadFile = File(...)):
    """Convert a 7z archive to ZIP."""
    if not file.filename.lower().endswith(".7z"):
        raise HTTPException(status_code=400, detail="Expected a .7z file")
    
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                content = await file.read()
                f.write(content)
            
            output_path = convert_7z_to_zip(input_path, tmpdir)
            
            return FileResponse(
                path=output_path,
                media_type="application/zip",
                filename="converted.zip"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

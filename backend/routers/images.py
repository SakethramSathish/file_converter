"""
Image conversion API routes.
"""
from fastapi import APIRouter, UploadFile, File, Query, HTTPException
from fastapi.responses import FileResponse
import tempfile
import os
from services.image_service import convert_image, FORMAT_MAP

router = APIRouter(prefix="/api/images", tags=["Images"])

MIME_MAP = {
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "png": "image/png",
    "bmp": "image/bmp",
    "webp": "image/webp",
    "tiff": "image/tiff",
    "pdf": "application/pdf",
}


@router.post("/convert")
async def convert_image_endpoint(
    file: UploadFile = File(...),
    target_format: str = Query(..., description="Target format: jpg, png, bmp, webp, tiff, pdf")
):
    """Convert an image to the specified format."""
    target_format = target_format.lower().strip()
    
    if target_format not in FORMAT_MAP:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported target format: {target_format}. Supported: {list(FORMAT_MAP.keys())}"
        )
    
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                content = await file.read()
                f.write(content)
            
            output_path = convert_image(input_path, target_format, tmpdir)
            mime = MIME_MAP.get(target_format, "application/octet-stream")
            ext = FORMAT_MAP[target_format][0]
            
            return FileResponse(
                path=output_path,
                media_type=mime,
                filename=f"converted{ext}"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

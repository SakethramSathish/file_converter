"""
Document conversion API routes.
"""
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import tempfile
import os
from services.document_service import (
    docx_to_pdf, pdf_to_docx, txt_to_docx, docx_to_txt, odt_to_docx, odt_to_pdf
)

router = APIRouter(prefix="/api/documents", tags=["Documents"])

CONVERSION_MAP = {
    "docx-to-pdf": {"func": docx_to_pdf, "accept": [".docx"], "output_type": "application/pdf", "output_name": "converted.pdf"},
    "pdf-to-docx": {"func": pdf_to_docx, "accept": [".pdf"], "output_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "output_name": "converted.docx"},
    "txt-to-docx": {"func": txt_to_docx, "accept": [".txt"], "output_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "output_name": "converted.docx"},
    "docx-to-txt": {"func": docx_to_txt, "accept": [".docx"], "output_type": "text/plain", "output_name": "converted.txt"},
    "odt-to-docx": {"func": odt_to_docx, "accept": [".odt"], "output_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "output_name": "converted.docx"},
    "odt-to-pdf": {"func": odt_to_pdf, "accept": [".odt"], "output_type": "application/pdf", "output_name": "converted.pdf"},
}


@router.post("/{conversion_type}")
async def convert_document(conversion_type: str, file: UploadFile = File(...)):
    """Generic document conversion endpoint."""
    if conversion_type not in CONVERSION_MAP:
        raise HTTPException(status_code=400, detail=f"Unknown conversion type: {conversion_type}")
    
    config = CONVERSION_MAP[conversion_type]
    ext = os.path.splitext(file.filename)[1].lower()
    
    if ext not in config["accept"]:
        raise HTTPException(status_code=400, detail=f"Invalid file type: {ext}. Expected: {config['accept']}")
    
    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            input_path = os.path.join(tmpdir, file.filename)
            with open(input_path, "wb") as f:
                content = await file.read()
                f.write(content)
            
            output_path = config["func"](input_path, tmpdir)
            
            return FileResponse(
                path=output_path,
                media_type=config["output_type"],
                filename=config["output_name"]
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

"""
Spreadsheet conversion API routes.
"""
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import tempfile
import os
from services.spreadsheet_service import xlsx_to_csv, csv_to_xlsx, ods_to_xlsx, xls_to_xlsx

router = APIRouter(prefix="/api/spreadsheets", tags=["Spreadsheets"])

CONVERSION_MAP = {
    "xlsx-to-csv": {"func": xlsx_to_csv, "accept": [".xlsx"], "output_type": "text/csv", "output_name": "converted.csv"},
    "csv-to-xlsx": {"func": csv_to_xlsx, "accept": [".csv"], "output_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "output_name": "converted.xlsx"},
    "ods-to-xlsx": {"func": ods_to_xlsx, "accept": [".ods"], "output_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "output_name": "converted.xlsx"},
    "xls-to-xlsx": {"func": xls_to_xlsx, "accept": [".xls"], "output_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "output_name": "converted.xlsx"},
}


@router.post("/{conversion_type}")
async def convert_spreadsheet(conversion_type: str, file: UploadFile = File(...)):
    """Generic spreadsheet conversion endpoint."""
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

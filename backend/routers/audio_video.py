"""
Audio/Video conversion API routes.
"""
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import tempfile
import os
from services.audio_video_service import mp4_to_mp3, avi_to_mp4, wav_to_mp3

router = APIRouter(prefix="/api/audio-video", tags=["Audio/Video"])

CONVERSION_MAP = {
    "mp4-to-mp3": {"func": mp4_to_mp3, "accept": [".mp4"], "output_type": "audio/mpeg", "output_name": "converted.mp3"},
    "avi-to-mp4": {"func": avi_to_mp4, "accept": [".avi"], "output_type": "video/mp4", "output_name": "converted.mp4"},
    "wav-to-mp3": {"func": wav_to_mp3, "accept": [".wav"], "output_type": "audio/mpeg", "output_name": "converted.mp3"},
}


@router.post("/{conversion_type}")
async def convert_audio_video(conversion_type: str, file: UploadFile = File(...)):
    """Generic audio/video conversion endpoint."""
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

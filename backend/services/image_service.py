"""
Image conversion service.
Handles: PNG/JPG/BMP/WEBP/TIFF conversions, Image→PDF
"""
import os
from PIL import Image


# Mapping of target format names to file extensions and PIL format strings
FORMAT_MAP = {
    "jpg": (".jpg", "JPEG"),
    "jpeg": (".jpg", "JPEG"),
    "png": (".png", "PNG"),
    "bmp": (".bmp", "BMP"),
    "webp": (".webp", "WEBP"),
    "tiff": (".tiff", "TIFF"),
    "pdf": (".pdf", "PDF"),
}


def convert_image(input_path: str, target_format: str, output_dir: str) -> str:
    """
    Convert an image to the specified target format.
    
    Args:
        input_path: Path to source image
        target_format: Target format (jpg, png, bmp, webp, tiff, pdf)
        output_dir: Directory for output file
    
    Returns:
        Path to the converted file
    """
    target_format = target_format.lower().strip()
    
    if target_format not in FORMAT_MAP:
        raise ValueError(f"Unsupported target format: {target_format}. Supported: {list(FORMAT_MAP.keys())}")
    
    ext, pil_format = FORMAT_MAP[target_format]
    output_path = os.path.join(output_dir, f"converted{ext}")
    
    img = Image.open(input_path)
    
    # Convert to RGB for formats that don't support alpha
    if target_format in ("jpg", "jpeg", "bmp", "pdf"):
        img = img.convert("RGB")
    
    img.save(output_path, pil_format)
    return output_path

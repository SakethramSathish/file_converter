from PIL import Image
import os

def convert_image(input_path, output_path):
    """
    Convert image between formats using Pillow.
    Supports PNG, JPG, BMP, WEBP, TIFF, PDF output.
    """
    try:
        img = Image.open(input_path)
        # JPEG needs RGB mode (no alpha)
        if output_path.lower().endswith(".jpg") or output_path.lower().endswith(".jpeg"):
            img = img.convert("RGB")
        img.save(output_path)
        return output_path
    except Exception as e:
        raise RuntimeError(f"convert_image error: {e}")
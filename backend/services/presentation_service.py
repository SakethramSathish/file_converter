"""
Presentation conversion service.
Handles: PPTX→PDF, PPTX→Text, PPTX→Images (text extraction)
"""
import os
from pptx import Presentation
import comtypes.client


def pptx_to_pdf(input_path: str, output_dir: str) -> str:
    """Convert PPTX to PDF using Windows COM automation."""
    output_path = os.path.join(output_dir, "output.pdf")
    try:
        powerpoint = comtypes.client.CreateObject("Powerpoint.Application")
        powerpoint.Visible = 1
        presentation = powerpoint.Presentations.Open(os.path.abspath(input_path))
        presentation.SaveAs(os.path.abspath(output_path), 32)  # 32 = ppSaveAsPDF
        presentation.Close()
        powerpoint.Quit()
    except Exception as e:
        raise RuntimeError(f"PowerPoint COM conversion failed: {e}. Requires Windows with PowerPoint installed.")
    return output_path


def pptx_to_text(input_path: str, output_dir: str) -> str:
    """Extract all text from PPTX and save as TXT."""
    output_path = os.path.join(output_dir, "output.txt")
    prs = Presentation(input_path)
    all_text = ""
    for i, slide in enumerate(prs.slides):
        all_text += f"=== Slide {i + 1} ===\n"
        for shape in slide.shapes:
            if hasattr(shape, "text") and shape.text.strip():
                all_text += shape.text + "\n"
        all_text += "\n"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(all_text)
    return output_path


def pptx_to_images(input_path: str) -> list:
    """
    Extract text content from each slide.
    Returns a list of dicts: [{"slide": 1, "text": "..."}, ...]
    """
    prs = Presentation(input_path)
    slides_data = []
    for i, slide in enumerate(prs.slides):
        slide_text = ""
        for shape in slide.shapes:
            if hasattr(shape, "text") and shape.text.strip():
                slide_text += shape.text + "\n"
        slides_data.append({
            "slide": i + 1,
            "text": slide_text.strip()
        })
    return slides_data

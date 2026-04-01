"""
PDF tools service.
Handles: PDF↔DOCX, Image→PDF, PDF→Images, Merge PDFs, Split PDF
"""
import os
import zipfile
from PyPDF2 import PdfMerger, PdfReader, PdfWriter
from pdf2docx import Converter
from PIL import Image


def pdf_to_docx(input_path: str, output_dir: str) -> str:
    """Convert PDF to DOCX using pdf2docx."""
    output_path = os.path.join(output_dir, "output.docx")
    cv = Converter(input_path)
    cv.convert(output_path)
    cv.close()
    return output_path


def docx_to_pdf(input_path: str, output_dir: str) -> str:
    """Convert DOCX to PDF using LibreOffice headless."""
    os.system(f'libreoffice --headless --convert-to pdf "{input_path}" --outdir "{output_dir}"')
    base = os.path.splitext(os.path.basename(input_path))[0]
    output_path = os.path.join(output_dir, f"{base}.pdf")
    if not os.path.exists(output_path):
        raise FileNotFoundError("LibreOffice conversion failed. Ensure LibreOffice is installed.")
    return output_path


def image_to_pdf(input_path: str, output_dir: str) -> str:
    """Convert an image to PDF using Pillow."""
    output_path = os.path.join(output_dir, "output.pdf")
    img = Image.open(input_path).convert("RGB")
    img.save(output_path)
    return output_path


def pdf_to_images(input_path: str, output_dir: str) -> str:
    """
    Convert each PDF page to a PNG image.
    Returns path to a ZIP containing all page images.
    """
    from pdf2image import convert_from_path
    
    images = convert_from_path(input_path)
    images_dir = os.path.join(output_dir, "pages")
    os.makedirs(images_dir, exist_ok=True)
    
    for i, img in enumerate(images):
        img_path = os.path.join(images_dir, f"page_{i + 1}.png")
        img.save(img_path, "PNG")
    
    # Package all images into a ZIP
    zip_output = os.path.join(output_dir, "pdf_pages.zip")
    with zipfile.ZipFile(zip_output, "w", zipfile.ZIP_DEFLATED) as zipf:
        for i in range(len(images)):
            img_path = os.path.join(images_dir, f"page_{i + 1}.png")
            zipf.write(img_path, f"page_{i + 1}.png")
    
    return zip_output


def merge_pdfs(input_paths: list, output_dir: str) -> str:
    """Merge multiple PDF files into one."""
    output_path = os.path.join(output_dir, "merged.pdf")
    merger = PdfMerger()
    for path in input_paths:
        merger.append(path)
    merger.write(output_path)
    merger.close()
    return output_path


def split_pdf(input_path: str, start_page: int, end_page: int, output_dir: str) -> str:
    """
    Split a PDF to extract pages from start_page to end_page (1-indexed, inclusive).
    """
    output_path = os.path.join(output_dir, "split.pdf")
    reader = PdfReader(input_path)
    writer = PdfWriter()
    num_pages = len(reader.pages)
    
    # Validate page range
    start_idx = max(0, start_page - 1)
    end_idx = min(end_page, num_pages)
    
    if start_idx >= num_pages:
        raise ValueError(f"Start page {start_page} exceeds total pages ({num_pages})")
    
    for i in range(start_idx, end_idx):
        writer.add_page(reader.pages[i])
    
    with open(output_path, "wb") as f:
        writer.write(f)
    
    return output_path

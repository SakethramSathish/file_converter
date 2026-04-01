"""
Archive handling service.
Handles: Extract ZIP/TAR/7z, Convert 7z→ZIP
"""
import os
import zipfile
import tarfile
import py7zr
import tempfile


def extract_archive(input_path: str, archive_format: str, output_dir: str) -> str:
    """
    Extract an archive and re-package as ZIP for download.
    
    Args:
        input_path: Path to archive file
        archive_format: One of 'zip', 'tar', '7z'
        output_dir: Directory for output
    
    Returns:
        Path to a ZIP file containing the extracted contents
    """
    extract_dir = os.path.join(output_dir, "extracted")
    os.makedirs(extract_dir, exist_ok=True)
    
    if archive_format == "zip":
        with zipfile.ZipFile(input_path, "r") as zip_ref:
            zip_ref.extractall(extract_dir)
    elif archive_format == "tar":
        with tarfile.open(input_path, "r:*") as tar_ref:
            tar_ref.extractall(extract_dir)
    elif archive_format == "7z":
        with py7zr.SevenZipFile(input_path, mode="r") as seven_z:
            seven_z.extractall(path=extract_dir)
    else:
        raise ValueError(f"Unsupported archive format: {archive_format}")
    
    # Re-package extracted files as a ZIP
    zip_output = os.path.join(output_dir, "extracted.zip")
    with zipfile.ZipFile(zip_output, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(extract_dir):
            for file_ in files:
                file_path = os.path.join(root, file_)
                arcname = os.path.relpath(file_path, extract_dir)
                zipf.write(file_path, arcname)
    
    return zip_output


def convert_7z_to_zip(input_path: str, output_dir: str) -> str:
    """Extract 7z archive and repackage as ZIP."""
    extract_dir = os.path.join(output_dir, "extracted")
    os.makedirs(extract_dir, exist_ok=True)
    
    with py7zr.SevenZipFile(input_path, mode="r") as seven_z:
        seven_z.extractall(path=extract_dir)
    
    zip_output = os.path.join(output_dir, "converted.zip")
    with zipfile.ZipFile(zip_output, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(extract_dir):
            for file_ in files:
                file_path = os.path.join(root, file_)
                arcname = os.path.relpath(file_path, extract_dir)
                zipf.write(file_path, arcname)
    
    return zip_output

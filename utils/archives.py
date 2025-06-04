import streamlit as st
import tempfile
import os
import zipfile
import tarfile
import py7zr

def convert():
    option = st.selectbox("Choose Archive Operation", ["Extract ZIP", "Extract TAR", "Extract 7z", "Convert 7z to ZIP"])

    file = st.file_uploader("Upload an Archive File", type=["zip", "tar", "7z"])

    if file and st.button("Process"):
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.name)[-1]) as tmp:
            tmp.write(file.read())
            tmp_path = tmp.name

        extract_dir = tempfile.mkdtemp()

        try:
            if option == "Extract ZIP":
                with zipfile.ZipFile(tmp_path, 'r') as zip_ref:
                    zip_ref.extractall(extract_dir)
                st.success(f"Extracted ZIP to {extract_dir}")

            elif option == "Extract TAR":
                with tarfile.open(tmp_path, 'r:*') as tar_ref:
                    tar_ref.extractall(extract_dir)
            elif option == "Extract 7z":
                with py7zr.SevenZipFile(tmp_path, mode='r') as seven_z:
                    seven_z.extractall(path=extract_dir)
            elif option == "Convert 7z to ZIP":
                # Extract 7z first
                with py7zr.SevenZipFile(tmp_path, mode='r') as seven_z:
                    seven_z.extractall(path=extract_dir)
                # Create ZIP from extracted files
                zip_out = tempfile.NamedTemporaryFile(delete=False, suffix=".zip")
                with zipfile.ZipFile(zip_out.name, 'w', zipfile.ZIP_DEFLATED) as zipf:
                    for root, _, files in os.walk(extract_dir):
                        for file_ in files:
                            file_path = os.path.join(root, file_)
                            arcname = os.path.relpath(file_path, extract_dir)
                            zipf.write(file_path, arcname)
                with open(zip_out.name, "rb") as f:
                    st.download_button("Download ZIP", f, file_name="converted.zip")
                return
            else:
                st.error("Unsupported operation.")
                return

            # Zip extracted files for download
            zip_out = tempfile.NamedTemporaryFile(delete=False, suffix=".zip")
            with zipfile.ZipFile(zip_out.name, 'w', zipfile.ZIP_DEFLATED) as zipf:
                for root, _, files in os.walk(extract_dir):
                    for file_ in files:
                        file_path = os.path.join(root, file_)
                        arcname = os.path.relpath(file_path, extract_dir)
                        zipf.write(file_path, arcname)

            with open(zip_out.name, "rb") as f:
                st.download_button("Download Extracted Files (ZIP)", f, file_name="extracted.zip")

        except Exception as e:
            st.error(f"Operation failed: {str(e)}")
            
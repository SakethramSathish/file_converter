import streamlit as st
from PIL import Image
import tempfile
import os

def convert():
    option = st.selectbox("Choose an Image Conversion", ["PNG to JPG", "PNG to BMP", "PNG to WEBP", "PNG to TIFF", "JPG to PNG", "JPG to BMP", "JPG to PDF", "Image to PDF (any format)"])

    file = st.file_uploader("Upload an Image", type=["png", "jpg", "jpeg", "bmp", "webp", "tiff"])

    if file and st.button("Convert"):
        img = Image.open(file).convert("RGB")

        with tempfile.NamedTemporaryFile(delete=False, suffix=".converted") as tmp:
            if option == "PNG to JPG":
                tmp_ext = ".jpg"
            elif option == "PNG to BMP":
                tmp_ext = ".bmp"
            elif option == "PNG to WEBP":
                tmp_ext = ".webp"
            elif option == "PNG to TIFF":
                tmp_ext = ".tiff"
            elif option == "JPG to PNG":
                tmp_ext = ".png"
            elif option == "JPG to BMP":
                tmp_ext = ".bmp"
            elif option == "JPG to PDF":
                tmp_ext = ".pdf"
            elif option == "Image to PDF (any format)":
                tmp_ext = ".pdf"
            else:
                st.error("Unsupported conversion")
                return
            
            tmp_path = tmp.name.replace(".converted", tmp_ext)
            img.save(tmp_path)

            with open(tmp_path, "rb") as f:
                st.download_button(
                    label=f"Download Converted Image ({tmp_ext.upper()[1:]})",
                    data=f,
                    file_name = f"converted_image{tmp_ext}",
                    mime=f"image/{tmp_ext[1:] if tmp_ext != '.pdf' else 'pdf'}"
                )
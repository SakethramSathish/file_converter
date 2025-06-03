import streamlit as st
import os
from converter.documents import docx_to_pdf, pdf_to_docx, txt_to_docx, docx_to_txt
from converter.images import convert_image
from converter.utils import change_extension

st.title("Python File Converter with Streamlit")
st.write("Convert between DOCX, PDF, TXT, and various image formats (PNG, JPG, BMP, WEBP, TIFF).")

uploaded_file = st.file_uploader("Upload a file", type=["docx", "pdf", "txt", "png", "jpg", "jpeg", "bmp", "webp", "tiff"])

if uploaded_file:
    filename = uploaded_file.name
    input_ext = filename.split('.')[-1].lower()
    st.write(f"Uploaded file: {filename}")

    options = {
        "docx": ["pdf", "txt"],
        "pdf": ["docx"],
        "txt": ["docx"],
        "png": ["jpg", "bmp", "webp", "tiff", "pdf"],
        "jpg": ["png", "bmp", "webp", "tiff", "pdf"],
        "jpeg": ["png", "bmp", "webp", "tiff", "pdf"],
        "bmp": ["png", "jpg", "webp", "tiff", "pdf"],
        "webp": ["png", "jpg", "bmp", "tiff", "pdf"],
        "tiff": ["png", "jpg", "bmp", "webp", "pdf"]
    }

    if input_ext not in options:
        st.error("Unsupported file type for conversion.")
        st.stop()

    output_format = st.selectbox("Select output format", options[input_ext])

    if st.button("Convert"):
        temp_input_path = f"temp_input.{input_ext}"
        with open(temp_input_path, "wb") as f:
            f.write(uploaded_file.getbuffer())
        output_file = change_extension(temp_input_path, output_format)

        try:
            if input_ext == "docx" and output_format == "pdf":
                docx_to_pdf(temp_input_path, output_file)
            elif input_ext == "pdf" and output_format == "docx":
                pdf_to_docx(temp_input_path, output_file)
            elif input_ext == "txt" and output_format == "docx":
                txt_to_docx(temp_input_path, output_file)
            elif input_ext == "docx" and output_format == "txt":
                docx_to_txt(temp_input_path, output_file)
            elif input_ext in ["png", "jpg", "jpeg", "bmp", "webp", "tiff"]:
                convert_image(temp_input_path, output_file)
            else:
                st.error("Conversion not implemented yet.")
                st.stop()

            # Show download button
            with open(output_file, "rb") as f:
                st.success(f"Conversion successful! Download below:")
                st.download_button(label="Download converted file", data=f, file_name=output_file)

        except Exception as e:
            st.error(f"Conversion failed: {e}")

        # Clean up temp files
        if os.path.exists(temp_input_path):
            os.remove(temp_input_path)
        if os.path.exists(output_file):
            os.remove(output_file)
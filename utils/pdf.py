import streamlit as st
import os
import tempfile
from PyPDF2 import PdfMerger, PdfReader, PdfWriter
from pdf2docx import Converter
from PIL import Image

def convert():
    option = st.selectbox("Choose a PDF Operation", ["PDF to DOCX", "DOCX to PDF", "Image to PDF", "PDF to Images", "Merge PDFs", "Split PDF"])

    if option == "PDF to DOCX":
        pdf_file = st.file_uploader("Upload PDF file", type=["pdf"])
        if pdf_file and st.button("Convert"):
            with tempfile.TemporaryDirectory() as tmpdir:
                input_path = os.path.join(tmpdir, pdf_file.name)
                output_path = os.path.join(tmpdir, "output.docx")
                with open(input_path, "wb") as f:
                    f.write(pdf_file.read())

                cv = Converter(input_path)
                cv.convert(output_path)
                cv.close()
                with open(output_path, "rb") as f:
                    st.download_button("Download DOCX", f, file_name="converted.docx")

    elif option == "DOCX to PDF":
        docx_file = st.file_uploader("Upload DOCX file", type=["docx"])
        if docx_file and st.button("Convert"):
            with tempfile.TemporaryDirectory() as tmpdir:
                input_path = os.path.join(tmpdir, docx_file.name)
                output_path = os.path.join(tmpdir, "output.pdf")
                with open(input_path, "wb") as f:
                    f.write(docx_file.read())
                os.system(f"libreoffice --headless --convert-to pdf {input_path} --outdir {tmpdir}")
                with open(output_path, "rb") as f:
                    st.download_button("Download PDF", f, file_name="converted.pdf")

    elif option == "Image to PDF":
        image_file = st.file_uploader("Upload Image file", type=["jpg", "jpeg", "png"])
        if image_file and st.button("Convert"):
            with tempfile.TemporaryDirectory() as tmpdir:
                img_path = os.path.join(tmpdir, image_file.name)
                img = Image.open(image_file).convert("RGB")
                output_path = os.path.join(tmpdir, "output.pdf")
                img.save(output_path)
                with open(output_path, "rb") as f:
                    st.download_button("Download PDF", f, file_name="image_to_pdf.pdf")

    elif option == "PDF to Images":
        from pdf2image import convert_from_bytes
        pdf_file = st.file_uploader("Upload PDF file", type=["pdf"])
        if pdf_file and st.button("Convert"):
            images = convert_from_bytes(pdf_file.read())
            for i, img in enumerate(images):
                st.image(img, caption=f"Page {i + 1}", use_column_width=True)
                with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
                    img.save(tmp.name)
                    with open(tmp.name, "rb") as f:
                        st.download_button(f"Download Page {i + 1} as PNG", f, file_name=f"page_{i + 1}.png")

    elif option == "Merge PDFs":
        uploaded_files = st.file_uploader("Upload PDF files", type=["pdf"], accept_multiple_files=True)
        if uploaded_files and st.button("Merge"):
            merger = PdfMerger()
            for file in uploaded_files:
                merger.append(file)
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
                merger.write(tmp.name)
                with open(tmp.name, "rb") as f:
                    st.download_button("Download Merged PDF", f, file_name="merged.pdf")
            merger.close()

    elif option == "Split PDF":
        pdf_file = st.file_uploader("Upload PDF file", type=["pdf"])
        if pdf_file:
            start_page = st.number_input("Start Page", min_value=1, value=1)
            end_page = st.number_input("End Page", min_value=1, value=1)
            if st.button("Split"):
                reader = PdfReader(pdf_file)
                writer = PdfWriter()
                num_pages = len(reader.pages)
                for i in range(start_page - 1, min(end_page, num_pages)):
                    writer.add_page(reader.pages[i])
                with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
                    writer.write(tmp.name)
                    with open(tmp.name, "rb") as f:
                        st.download_button("Download Split PDF", f, file_name="split.pdf")
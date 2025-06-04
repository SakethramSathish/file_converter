import streamlit as st
import os
from utils import documents, spreadsheets, images, audio_video, presentations, archives, pdf

tab_titles = ["Documents", "Spreadsheets", "Images", "Audio/Video", "Presentations", "Archives", "PDFs"]
tabs = st.tabs(tab_titles)

with tabs[0]:
    st.header("Document Converter ")
    documents.convert()

with tabs[1]:
    st.header("Spreadsheet Converter")
    spreadsheets.convert()

with tabs[2]:
    st.header("Image Converter")
    images.convert()

with tabs[3]:
    st.header("Audio/Video Converter")
    audio_video.convert()

with tabs[4]:
    st.header("Presentation Converter")
    presentations.convert()

with tabs[5]:
    st.header("Archive Converter")
    archives.convert()

with tabs[6]:
    st.header("PDF Converter")
    pdf.convert()
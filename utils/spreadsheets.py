import streamlit as st
import pandas as pd
import tempfile
import os
import ezodf
import openpyxl
import xlrd

def convert():
    option = st.selectbox("Choose a Spreadsheet Operation", ["XLSX to CSV", "CSV to XLSX", "ODS to XLSX", "XLS to XLSX"])
    if option == "XLSX to CSV":
        xlsx_file = st.file_uploader("Upload XLSX File", type=["xlsx"])
        if xlsx_file and st.button("Convert"):
            df = pd.read_excel(xlsx_file)
            with tempfile.NamedTemporaryFile(delete=False, suffix=".csv") as tmp:
                df.to_csv(tmp.name, index=False)
                with open(tmp.name, "rb") as f:
                    st.download_button("Download CSV", f, file_name="converted.csv")

    elif option == "CSV to XLSX":
        csv_file = st.file_uploader("Upload CSV File", type=["csv"])
        if csv_file and st.button("Convert"):
            df = pd.read_csv(csv_file)
            with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
                df.to_excel(tmp.name, index=False)
                with open(tmp.name, "rb") as f:
                    st.download_button("Download XLSX", f, file_name="converted.xlsx")

    elif option == "ODS to XLSX":
        ods_file = st.file_uploader("Upload ODS File", type=["ods"])
        if ods_file and st.button("Convert"):
            with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as ods_tmp:
                ods_tmp.write(ods_file.read())
                ods_tmp_path = ods_tmp.name
            ezodf.config.set_table_expand_strategy('all')
            doc = ezodf.opendoc(ods_tmp_path)
            sheet = doc.sheets[0]
            data = [[cell.value if cell.value is not None else "" for cell in row] for row in sheet.rows()]
            df = pd.DataFrame(data)
            with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
                df.to_excel(tmp.name, index=False)
                with open(tmp.name, "rb") as f:
                    st.download_button("Download XLSX", f, file_name="converted.xlsx")

    elif option == "XLS to XLSX":
        xls_file = st.file_uploader("Upload XLS File", type=["xls"])
        if xls_file and st.button("Convert"):
            df = pd.read_excel(xls_file, engine='xlrd')
            with tempfile.NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
                df.to_excel(tmp.name, index=False, engine='openpyxl')
                with open(tmp.name, "rb") as f:
                    st.download_button("Download XLSX", f, file_name="converted.xlsx")
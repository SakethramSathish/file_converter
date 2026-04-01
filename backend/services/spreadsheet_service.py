"""
Spreadsheet conversion service.
Handles: XLSX↔CSV, ODS→XLSX, XLS→XLSX
"""
import os
import tempfile
import pandas as pd
import ezodf


def xlsx_to_csv(input_path: str, output_dir: str) -> str:
    """Convert XLSX to CSV using pandas."""
    output_path = os.path.join(output_dir, "output.csv")
    df = pd.read_excel(input_path)
    df.to_csv(output_path, index=False)
    return output_path


def csv_to_xlsx(input_path: str, output_dir: str) -> str:
    """Convert CSV to XLSX using pandas."""
    output_path = os.path.join(output_dir, "output.xlsx")
    df = pd.read_csv(input_path)
    df.to_excel(output_path, index=False)
    return output_path


def ods_to_xlsx(input_path: str, output_dir: str) -> str:
    """Convert ODS to XLSX using ezodf + pandas."""
    output_path = os.path.join(output_dir, "output.xlsx")
    ezodf.config.set_table_expand_strategy("all")
    doc = ezodf.opendoc(input_path)
    sheet = doc.sheets[0]
    data = [
        [cell.value if cell.value is not None else "" for cell in row]
        for row in sheet.rows()
    ]
    df = pd.DataFrame(data)
    df.to_excel(output_path, index=False)
    return output_path


def xls_to_xlsx(input_path: str, output_dir: str) -> str:
    """Convert XLS to XLSX using pandas with xlrd engine."""
    output_path = os.path.join(output_dir, "output.xlsx")
    df = pd.read_excel(input_path, engine="xlrd")
    df.to_excel(output_path, index=False, engine="openpyxl")
    return output_path

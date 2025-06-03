import os

def change_extension(filename, new_ext):
    """
    Change file extension to new_ext (with or without dot).
    """
    base = os.path.splitext(filename)[0]
    if not new_ext.startswith('.'):
        new_ext = '.' + new_ext
    return base + new_ext

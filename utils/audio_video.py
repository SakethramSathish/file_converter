import streamlit as st
from moviepy import VideoFileClip
from pydub import AudioSegment
import tempfile
import os

def convert():
    option = st.selectbox("Choose a Conversion", ["MP4 to MP3", "AVI to MP4", "WAV to MP3"])

    file = st.file_uploader("Upload a Video or Audio File", type=["mp4", "avi", "wav"])

    if file and st.button("Convert"):
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.name)[-1]) as input_tmp:
            input_tmp.write(file.read())
            input_path = input_tmp.name

        output_path = input_path.replace(os.path.splitext(input_path)[-1], "")

        try:
            if option == "MP4 to MP3":
                video = VideoFileClip(input_path)
                output_file = output_path + ".mp3"
                video.audio.write_audiofile(output_file)
                
            elif option == "AVI to MP4":
                output_file = output_path + ".mp4"
                os.system(f"ffmpeg -i {input_path} {output_file}")

            elif option == "WAV to MP3":
                audio = AudioSegment.from_wav(input_path)
                output_file = output_path + ".mp3"
                audio.export(output_file, format="mp3")

            else:
                st.error("Unsupported conversion.")
                return
            
            with open(output_file, "rb") as f:
                st.download_button("Download Converted File", data = f, file_name=os.path.basename(output_file), mime="application/octet-stream")

        except Exception as e:
            st.error(f"Conversion failed: {str(e)}")

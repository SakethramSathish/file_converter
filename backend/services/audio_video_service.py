"""
Audio/Video conversion service.
Handles: MP4→MP3, AVI→MP4, WAV→MP3
"""
import os
from moviepy import VideoFileClip
from pydub import AudioSegment


def mp4_to_mp3(input_path: str, output_dir: str) -> str:
    """Extract audio from MP4 and save as MP3."""
    output_path = os.path.join(output_dir, "output.mp3")
    video = VideoFileClip(input_path)
    video.audio.write_audiofile(output_path)
    video.close()
    return output_path


def avi_to_mp4(input_path: str, output_dir: str) -> str:
    """Convert AVI to MP4 using ffmpeg."""
    output_path = os.path.join(output_dir, "output.mp4")
    exit_code = os.system(f'ffmpeg -i "{input_path}" "{output_path}" -y')
    if exit_code != 0 or not os.path.exists(output_path):
        raise RuntimeError("FFmpeg conversion failed. Ensure FFmpeg is installed.")
    return output_path


def wav_to_mp3(input_path: str, output_dir: str) -> str:
    """Convert WAV to MP3 using pydub."""
    output_path = os.path.join(output_dir, "output.mp3")
    audio = AudioSegment.from_wav(input_path)
    audio.export(output_path, format="mp3")
    return output_path

"""Convert HEIC -> JPG and optimize all images for web. One-shot script."""
import os
from pathlib import Path
from PIL import Image, ImageOps
import pillow_heif

pillow_heif.register_heif_opener()

SRC = Path(r"E:/Projects/Tilen Tours Slovenia/public/media")
DST = SRC / "optimized"
DST.mkdir(exist_ok=True)

MAX_W = 2000
QUALITY = 82

def process(img_path: Path, out_path: Path):
    with Image.open(img_path) as im:
        im = ImageOps.exif_transpose(im)
        if im.mode != "RGB":
            im = im.convert("RGB")
        if im.width > MAX_W:
            ratio = MAX_W / im.width
            im = im.resize((MAX_W, int(im.height * ratio)), Image.LANCZOS)
        im.save(out_path, "JPEG", quality=QUALITY, optimize=True, progressive=True)

extensions = {".jpeg", ".jpg", ".heic"}
for f in sorted(SRC.iterdir()):
    if f.suffix.lower() not in extensions:
        continue
    out = DST / (f.stem + ".jpg")
    try:
        process(f, out)
        sz_in = f.stat().st_size / 1024
        sz_out = out.stat().st_size / 1024
        with Image.open(out) as im:
            w, h = im.size
        print(f"{f.name:55s} -> {out.name:30s} {w}x{h}  {sz_in:.0f}KB -> {sz_out:.0f}KB")
    except Exception as e:
        print(f"FAIL {f.name}: {e}")

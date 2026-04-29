"""Resize and convert parallax PNG layers to optimized WebP with transparency."""
from pathlib import Path
from PIL import Image

SRC = Path(r"E:/Projects/Tilen Tours Slovenia/public/media/Parallax")
DST = SRC / "optimized"
DST.mkdir(exist_ok=True)

MAX_W = 2400
QUALITY = 82

for n in ["1", "2", "3", "4", "5"]:
    src = SRC / f"{n}.png"
    dst = DST / f"{n}.webp"
    with Image.open(src) as im:
        if im.mode != "RGBA":
            im = im.convert("RGBA")
        if im.width > MAX_W:
            r = MAX_W / im.width
            im = im.resize((MAX_W, int(im.height * r)), Image.LANCZOS)
        im.save(dst, "WEBP", quality=QUALITY, method=6)
    sz_in = src.stat().st_size / 1024
    sz_out = dst.stat().st_size / 1024
    print(f"{n}.png ({sz_in:.0f}KB) -> {n}.webp ({sz_out:.0f}KB)  size={im.size}")

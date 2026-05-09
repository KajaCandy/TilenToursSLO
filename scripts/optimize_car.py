"""Resize/compress the DS7 photos and produce an OG image.

Source: C:\\Users\\kajag\\Downloads\\Car_*.png|jpg
Output: public/media/car-*.jpg + public/og-image.jpg
"""
from pathlib import Path
from PIL import Image, ImageOps

DOWNLOADS = Path(r"C:\Users\kajag\Downloads")
OUT_MEDIA = Path(__file__).resolve().parent.parent / "public" / "media"
OUT_PUBLIC = Path(__file__).resolve().parent.parent / "public"
OUT_MEDIA.mkdir(parents=True, exist_ok=True)

JOBS = [
    ("Car_1.png",          "car-soca.jpg",            1600, 85),
    ("Car_2.png",          "car-side.jpg",            1600, 85),
    ("Car_Interior1.jpg",  "car-interior-front.jpg",  1600, 85),
    ("Car_Interior2.jpg",  "car-interior-seats.jpg",  1600, 85),
]

for src, dst, max_w, q in JOBS:
    p = DOWNLOADS / src
    im = Image.open(p)
    im = ImageOps.exif_transpose(im).convert("RGB")
    if im.width > max_w:
        ratio = max_w / im.width
        im = im.resize((max_w, int(im.height * ratio)), Image.LANCZOS)
    out = OUT_MEDIA / dst
    im.save(out, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"{src:24s} -> {out.name:28s}  {im.size}  {out.stat().st_size//1024} KB")

# OG image: 1200x630 crop centered on the car (Car_1 has the car biased left, so shift crop)
src = Image.open(DOWNLOADS / "Car_1.png")
src = ImageOps.exif_transpose(src).convert("RGB")
target_ratio = 1200 / 630
sw, sh = src.size
src_ratio = sw / sh
if src_ratio > target_ratio:
    # source is wider — crop horizontally
    new_w = int(sh * target_ratio)
    left = (sw - new_w) // 2
    src = src.crop((left, 0, left + new_w, sh))
else:
    # source is taller — crop vertically
    new_h = int(sw / target_ratio)
    top = (sh - new_h) // 2
    src = src.crop((0, top, sw, top + new_h))
src = src.resize((1200, 630), Image.LANCZOS)
og_out = OUT_PUBLIC / "og-image.jpg"
src.save(og_out, "JPEG", quality=88, optimize=True, progressive=True)
print(f"OG image -> {og_out.name}  {src.size}  {og_out.stat().st_size//1024} KB")

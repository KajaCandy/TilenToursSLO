"""Optimize couchsurfer photos for the Reviews section."""
from pathlib import Path
from PIL import Image, ImageOps

SRC_BASE = Path(r"E:/Projects/Tilen Tours Slovenia/public/media/slike couchsurferjev in njihovi reviewi")
OUT = Path(r"E:/Projects/Tilen Tours Slovenia/public/media/reviews")
OUT.mkdir(parents=True, exist_ok=True)

# slug -> (folder name, photo filename)
PHOTOS = {
    "maddy-charles":  ("Maddy and Cahles (Australia", "IMG_5542.jpg"),
    "nav-shish":      ("Nav and Shish (india)",       "IMG_5538.jpg"),
    "saby":           ("Saby (peru )",                 "IMG_5543.jpg"),
    "zoe":            ("Zoe ( france",                 "IMG_5537.jpg"),
}

TARGET_W = 720

for slug, (folder, fname) in PHOTOS.items():
    src = SRC_BASE / folder / fname
    img = Image.open(src)
    img = ImageOps.exif_transpose(img)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    if img.width > TARGET_W:
        ratio = TARGET_W / img.width
        img = img.resize((TARGET_W, int(img.height * ratio)), Image.LANCZOS)
    out = OUT / f"{slug}.webp"
    img.save(out, "WEBP", quality=82, method=6)
    print(f"{slug}: {src.stat().st_size//1024}KB -> {out.stat().st_size//1024}KB ({img.width}x{img.height})")

"""Render Logo.svg into favicon.ico (multi-res) + apple-touch-icon.png + PWA icons.

The source SVG paints two black 'TT' shapes on a transparent background. We:
  1. Pad the SVG into a square viewBox.
  2. Set the path fill to a near-cream so the monogram contrasts on a dark tile.
  3. Render to PNG at multiple sizes via resvg.
  4. Composite onto the brand-dark forest tile.
  5. Write favicon.ico (16/32/48), apple-touch-icon.png (180), icon-192.png, icon-512.png.
"""
from pathlib import Path
import re
import resvg_py
from PIL import Image
from io import BytesIO

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SRC_SVG = ROOT / "Logo.svg"

# Brand colors (from tailwind.config: forest-950 ~= #14241c, beige-50 ~= #f5f0e6)
FOREST_BG = (20, 36, 28, 255)
LOGO_FILL = "#f5f0e6"

raw = SRC_SVG.read_text(encoding="utf-8")

# Source viewBox: 0 0 541.23 385.73
# Square viewBox keeping the monogram centered with ~12% padding
ORIG_W, ORIG_H = 541.23030598958303, 385.73291015625
SIDE = max(ORIG_W, ORIG_H) * 1.65  # extra padding so glyph fills ~60% of tile
PAD_X = (SIDE - ORIG_W) / 2
PAD_Y = (SIDE - ORIG_H) / 2
new_vb = f"{-PAD_X} {-PAD_Y} {SIDE} {SIDE}"

square_svg = re.sub(
    r'viewBox="[^"]*"',
    f'viewBox="{new_vb}"',
    raw,
    count=1,
)
# Apply LOGO_FILL to every <path>
square_svg = re.sub(r"<path\b", f'<path fill="{LOGO_FILL}"', square_svg)

def render_png(size: int) -> Image.Image:
    png_bytes = resvg_py.svg_to_bytes(svg_string=square_svg, width=size, height=size)
    glyph = Image.open(BytesIO(bytes(png_bytes))).convert("RGBA")
    bg = Image.new("RGBA", (size, size), FOREST_BG)
    bg.paste(glyph, (0, 0), glyph)
    return bg

# favicon.ico (16, 32, 48)
sizes_ico = [16, 32, 48]
imgs_ico = [render_png(s) for s in sizes_ico]
ico_path = PUBLIC / "favicon.ico"
imgs_ico[0].save(ico_path, format="ICO", sizes=[(s, s) for s in sizes_ico])
print(f"favicon.ico  {sizes_ico}  {ico_path.stat().st_size//1024} KB")

# apple-touch-icon (180x180)
apple = render_png(180)
apple_path = PUBLIC / "apple-touch-icon.png"
apple.save(apple_path, format="PNG", optimize=True)
print(f"apple-touch-icon.png  180  {apple_path.stat().st_size//1024} KB")

# PWA icons
for s in (192, 512):
    img = render_png(s)
    out = PUBLIC / f"icon-{s}.png"
    img.save(out, format="PNG", optimize=True)
    print(f"icon-{s}.png  {out.stat().st_size//1024} KB")

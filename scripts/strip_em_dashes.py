"""Replace em dashes (U+2014) with ' - ' in guest-facing text only."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGETS = [
    ROOT / "messages" / "en.json",
    ROOT / "messages" / "sl.json",
    ROOT / "messages" / "it.json",
    ROOT / "messages" / "de.json",
]
for sub in ["privacy", "terms"]:
    base = ROOT / "src" / "app" / "[locale]" / sub / "_content"
    for f in base.glob("*.tsx"):
        TARGETS.append(f)

EM = "—"  # —

total = 0
for path in TARGETS:
    text = path.read_text(encoding="utf-8")
    if EM not in text:
        continue
    new = text.replace(f" {EM} ", " - ").replace(EM, "-")
    n = text.count(EM)
    path.write_text(new, encoding="utf-8")
    total += n
    print(f"{path.name}: {n} replaced")
print(f"total: {total}")

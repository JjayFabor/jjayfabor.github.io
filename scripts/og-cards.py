#!/usr/bin/env python3
"""Generate 1200x630 Open Graph cards, one per project.

Every project page previously advertised og:image:width/height as 1200x630 while
pointing at the raw project screenshot, whose real dimensions ranged from 554x996
(portrait) to 1246x315 (ultra-wide). Social platforms reserve layout from the
declared size, so the mismatch produced badly cropped cards — and three projects
used SVG, which most platforms will not render in a card at all.

This composites each project image onto a correctly-sized branded canvas, letterboxed
rather than cropped so nothing is cut off, and rasterises SVG sources on the way.

Usage: python3 scripts/og-cards.py
Output: public/og/<slug>.png
"""
from __future__ import annotations

import pathlib
import re
import shutil
import subprocess
import sys

from PIL import Image, ImageDraw

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content" / "projects"
PUBLIC = ROOT / "public"
OUT = PUBLIC / "og"

W, H = 1200, 630
PAD = 48

# Dark brand palette, from --brand-* in src/index.css
BG = (15, 17, 23)
SURFACE = (28, 30, 38)
BORDER = (37, 40, 54)
ACCENT = (6, 182, 212)


def frontmatter(path: pathlib.Path) -> dict:
    text = path.read_text()
    m = re.match(r"^---\n(.*?)\n---", text, re.S)
    if not m:
        return {}
    data = {}
    for line in m.group(1).splitlines():
        km = re.match(r"^(\w+):\s*(.*)$", line)
        if km:
            data[km.group(1)] = km.group(2).strip().strip('"').strip("'")
    return data


def rasterise_svg(src: pathlib.Path, target_w: int) -> Image.Image | None:
    """SVG has no intrinsic pixel size; render it wide, then scale down."""
    tmp = pathlib.Path("/tmp") / f"og-{src.stem}.png"
    for cmd in (
        ["inkscape", str(src), "--export-type=png", f"--export-filename={tmp}",
         f"--export-width={target_w}"],
        ["convert", "-background", "none", "-density", "300",
         str(src), "-resize", f"{target_w}x", str(tmp)],
    ):
        if not shutil.which(cmd[0]):
            continue
        try:
            subprocess.run(cmd, check=True, capture_output=True, timeout=120)
            if tmp.exists():
                return Image.open(tmp).convert("RGBA")
        except Exception:
            continue
    return None


def load(src: pathlib.Path) -> Image.Image | None:
    if src.suffix.lower() == ".svg":
        return rasterise_svg(src, W - PAD * 2)
    try:
        return Image.open(src).convert("RGBA")
    except Exception:
        return None


def build_card(art: Image.Image | None, slug: str) -> Image.Image:
    card = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(card)

    # Accent bar along the top, so a card still reads as "ours" at thumbnail size.
    draw.rectangle([0, 0, W, 6], fill=ACCENT)

    if art is None:
        return card

    # Fit inside the padded box without cropping — a portrait screenshot stays whole.
    box_w, box_h = W - PAD * 2, H - PAD * 2 - 6
    art = art.copy()
    art.thumbnail((box_w, box_h), Image.LANCZOS)

    x = (W - art.width) // 2
    y = 6 + (H - 6 - art.height) // 2

    # Plate behind the art gives letterboxed images a deliberate look rather than
    # looking like the image failed to fill the space.
    draw.rectangle([x - 12, y - 12, x + art.width + 12, y + art.height + 12],
                   fill=SURFACE, outline=BORDER, width=2)
    card.paste(art, (x, y), art if art.mode == "RGBA" else None)
    return card


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    made, skipped = 0, []

    for md in sorted(CONTENT.glob("*.md")):
        fm = frontmatter(md)
        slug = fm.get("slug") or md.stem
        image = fm.get("image")
        if not image:
            skipped.append((slug, "no image in frontmatter"))
            continue

        src = PUBLIC / image
        if not src.exists():
            skipped.append((slug, f"missing file {image}"))
            continue

        art = load(src)
        if art is None:
            skipped.append((slug, f"could not read {src.name}"))

        card = build_card(art, slug)
        dest = OUT / f"{slug}.png"
        card.save(dest, "PNG", optimize=True)
        made += 1
        print(f"  {slug:28} {dest.relative_to(ROOT)}  {dest.stat().st_size // 1024}K")

    for slug, why in skipped:
        print(f"  {slug:28} SKIPPED — {why}", file=sys.stderr)

    print(f"  generated {made} og cards at {W}x{H}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

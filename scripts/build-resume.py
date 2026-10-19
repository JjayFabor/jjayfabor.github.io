"""Build the one-page resume PDF served at /Jaylord Vhan Fabor - Resume.pdf.

This file is the resume's source of truth — edit the content below, then run:

    python3 -m venv .venv-resume && .venv-resume/bin/pip install reportlab
    .venv-resume/bin/python scripts/build-resume.py

Keep it to one A4 page; the script fails loudly if the content overflows.
"""

from pathlib import Path

from reportlab.lib.colors import black
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUT = Path(__file__).resolve().parent.parent / "public" / "Jaylord Vhan Fabor - Resume.pdf"
FONT_DIR = Path("/usr/share/fonts/truetype/liberation")

# ---- Content ---------------------------------------------------------------

NAME = "JAYLORD VHAN FABOR"
HEADLINE = "SOFTWARE ENGINEER | AI ENGINEERING & AUTOMATION"
CONTACT = [
    "Iloilo City, Philippines | +63 919 848 4665 | faborjaylordvhan@gmail.com",
    "Portfolio: jjayfabor.com | GitHub: github.com/jjayfabor | Open to remote roles; willing to relocate",
]

SUMMARY = (
    "Software Engineer and AI Engineer who builds AI agents, LLM-powered tools and workflow "
    "automation on reliable backends. Hands-on with the Claude Agent SDK, MCP, Vertex AI and RAG, "
    "n8n and AI voice agents, plus Laravel, Python, TypeScript and PostgreSQL. Ships AI services "
    "to production and wires AI into CRM, booking and internal workflows."
)

SKILLS = [
    ("AI & Agents", "Claude Agent SDK, MCP servers, Vertex AI, RAG, LLM integrations, AI agents"),
    ("Automation & Integrations", "n8n, VAPI AI, ElevenLabs, Twilio, HubSpot CRM, Stripe, Google Drive, SFTP"),
    ("Languages", "Python, PHP, JavaScript, TypeScript, Dart"),
    ("Backend & APIs", "FastAPI, Laravel, Livewire, REST APIs, SQLAlchemy"),
    ("Frontend & Mobile", "React, Next.js, Flutter, Vite, Tailwind CSS"),
    ("Databases", "PostgreSQL, MySQL, SQLite, Supabase"),
    ("Cloud & Tools", "Google Cloud Run, Cloudflare Workers & R2, Docker, Render, Vercel, Linux, Git"),
]

EXPERIENCE = [
    {
        "role": "Freelance Software Developer",
        "dates": "Jun 2025 - Present",
        "org": "Philippines",
        "bullets": [
            "Develop a REST API used by an ElevenLabs AI voice agent via Twilio for authentication, OTP "
            "verification and appointment booking during live calls.",
            "Build a cross-platform Flutter application for booking and AI-assisted scheduling.",
            "Designed API architecture and relational data models for users, providers, availability and bookings.",
            "Integrated Stripe payments and wallet functionality into the application.",
        ],
    },
    {
        "role": "Junior Software Developer",
        "dates": "Oct 2025 - Jul 2026",
        "org": "Callbox Inc. | Iloilo City, Philippines",
        "bullets": [
            "Built and deployed an AI-powered Google Chat bot on Google Cloud Run using Vertex AI and "
            "retrieval-augmented generation (RAG) over historical conversations.",
            "Implemented VAPI AI voice agents for webinar invitations and reminders, supporting 300+ outbound "
            "calls per campaign.",
            "Built n8n workflows for role-based document provisioning across employee lifecycle events, "
            "integrating Google Drive, SFTP and email.",
            "Developed HubSpot CRM workflows and JavaScript/Python custom-coded actions, integrating the CRM "
            "with the company's pipeline database through APIs.",
        ],
    },
    {
        "role": "Software Development Intern",
        "dates": "Feb 2025 - May 2025",
        "org": "Callbox Inc. | Iloilo City, Philippines",
        "bullets": [
            "Supported development of Laravel-based applications using MySQL, including performance "
            "optimization, debugging and frontend/backend integration.",
        ],
    },
]

PROJECTS = [
    {
        "name": "Delphi",
        "label": "Open source | AI agent",
        "stack": "Python, Claude Agent SDK, MCP, SQLite, Next.js, TypeScript, Telegram, Discord",
        "bullets": [
            "Built a self-hosted personal AI agent on the Claude Agent SDK, reachable over Telegram and "
            "Discord, with persistent memory, teachable skills, MCP connectors and scheduled tasks.",
        ],
    },
    {
        "name": "OpenRole Observatory",
        "label": "Live demo | Backend system",
        "stack": "Python, FastAPI, PostgreSQL, SQLAlchemy, Next.js, TypeScript, Cloudflare R2",
        "bullets": [
            "Built an idempotent job-sync service with raw-source evidence, immutable listing history and "
            "change tracking; synchronized 1,281 listings from 25 Greenhouse boards.",
            "Delivered public job search and an internal operations dashboard; deployed with Neon, Render and Vercel.",
        ],
    },
    {
        "name": "SecondTrip",
        "label": "Live private beta | Solo build",
        "stack": "Next.js, TypeScript, FastAPI, Python, PostgreSQL, SQLAlchemy, Cloudflare R2",
        "bullets": [
            "Built a multi-tenant callback review tool with validated CSV imports, explainable deterministic "
            "scoring and a manager review queue with append-only decision history.",
            "Implemented PostgreSQL row-level security, a durable job queue, secure cookie sessions and private "
            "file storage.",
        ],
    },
]

EDUCATION = [
    ("Bachelor of Science in Computer Science", "2021 - 2025", "Central Philippine University | Iloilo City, Philippines"),
    ("Vocational Degree in Computer Technology", "2019 - 2021", "Professional Electronics Institute Inc. | Iloilo City, Philippines"),
]
LANGUAGE = "English - B2 (CEFR)"

# ---- Layout ----------------------------------------------------------------

pdfmetrics.registerFont(TTFont("Sans", FONT_DIR / "LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Sans-Bold", FONT_DIR / "LiberationSans-Bold.ttf"))
pdfmetrics.registerFontFamily("Sans", normal="Sans", bold="Sans-Bold")

MARGIN = 14 * mm
FRAME_PADDING = 6  # SimpleDocTemplate's default frame padding, per side
WIDTH = A4[0] - 2 * MARGIN - 2 * FRAME_PADDING

name_style = ParagraphStyle("name", fontName="Sans-Bold", fontSize=22, leading=26)
headline_style = ParagraphStyle("headline", fontName="Sans-Bold", fontSize=10.5, leading=14, spaceBefore=2)
body = ParagraphStyle("body", fontName="Sans", fontSize=9.2, leading=11.3)
section_style = ParagraphStyle("section", fontName="Sans-Bold", fontSize=10.2, leading=12)
bold = ParagraphStyle("bold", parent=body, fontName="Sans-Bold", fontSize=9.6)
right = ParagraphStyle("right", parent=body, alignment=TA_RIGHT)
small = ParagraphStyle("small", parent=body, fontSize=8.6, leading=10.6)


def section(title):
    return [
        Spacer(1, 5),
        Paragraph(title, section_style),
        HRFlowable(width="100%", thickness=0.8, color=black, spaceBefore=2, spaceAfter=4),
    ]


def row(left, right_text):
    t = Table([[Paragraph(left, bold), Paragraph(right_text, right)]], colWidths=[WIDTH * 0.68, WIDTH * 0.32])
    t.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
    ]))
    return t


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(b, body), leftIndent=10, bulletColor=black) for b in items],
        bulletType="bullet", bulletFontName="Sans", bulletFontSize=7, leftIndent=10,
        bulletOffsetY=-1, spaceBefore=1,
    )


def build():
    story = [Paragraph(NAME, name_style), Paragraph(HEADLINE, headline_style), Spacer(1, 2)]
    story += [Paragraph(line, body) for line in CONTACT]

    story += section("PROFESSIONAL SUMMARY")
    story.append(Paragraph(SUMMARY, body))

    story += section("TECHNICAL SKILLS")
    story += [Paragraph(f"<b>{k}:</b> {v}", body) for k, v in SKILLS]

    story += section("PROFESSIONAL EXPERIENCE")
    for i, job in enumerate(EXPERIENCE):
        story.append(KeepTogether([
            Spacer(1, 3 if i else 0),
            row(job["role"], job["dates"]),
            Paragraph(job["org"], body),
            bullets(job["bullets"]),
        ]))

    story += section("SELECTED PROJECTS")
    for i, p in enumerate(PROJECTS):
        story.append(KeepTogether([
            Spacer(1, 3 if i else 0),
            row(p["name"], p["label"]),
            Paragraph(p["stack"], small),
            bullets(p["bullets"]),
        ]))

    story += section("EDUCATION")
    for i, (degree, years, school) in enumerate(EDUCATION):
        story += [Spacer(1, 3 if i else 0), row(degree, years), Paragraph(school, body)]
    story += [Spacer(1, 5), Paragraph(f"<b>Language:</b> {LANGUAGE}", body)]

    pages = []
    doc = SimpleDocTemplate(
        str(OUT), pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN, topMargin=10 * mm, bottomMargin=8 * mm,
        title="Jaylord Vhan Fabor - Software & AI Engineer Resume",
        author="Jaylord Vhan Fabor",
        subject="AI engineering, automation, backend development and selected projects",
    )
    doc.build(story, onLaterPages=lambda c, d: pages.append(d.page))
    if pages:
        raise SystemExit(f"Resume overflowed to {max(pages)} pages; trim content to fit one page.")
    print(f"wrote {OUT}")


if __name__ == "__main__":
    build()

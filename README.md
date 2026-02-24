# ADPHC File Specs

Technical documentation site for ADPHC file specifications, built with MkDocs and Material for MkDocs.

## Requirements

- Python 3.10+
- `pip`

## Local Development

1. Install dependencies:

```powershell
pip install -r requirements.txt
```

2. Start the local docs server:

```powershell
mkdocs serve
```

3. Open:

`http://127.0.0.1:8000`

## Build

```powershell
mkdocs build
```

## Project Structure

- `mkdocs.yml`: MkDocs configuration, nav, theme, and extensions
- `docs/`: Documentation content
- `docs/assets/styles/`: ADP brand-aligned CSS (`adp-tokens`, `adp-theme`, `adp-typography`, `adp-components`)
- `docs/assets/images/`: Logo and favicon assets
- `overrides/`: Minimal Material template overrides

## Contributing

- Follow the style checklist: `docs/contributing/style-guide-checklist.md`
- Review theme decisions: `docs/contributing/theme-notes.md`

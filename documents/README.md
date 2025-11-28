# Documents Folder

Place your PDF files in this folder.

## Usage

In `data/videos.json`, add a PDF entry like this:

```json
{
  "id": 6,
  "title": "Your Document Title",
  "pdfUrl": "./documents/your-file.pdf",
  "thumbnail": "./images/document-thumbnail.jpg",
  "category": "documents"
}
```

## Required Fields

- **id**: Unique number identifier
- **title**: Document title (displayed on the card)
- **pdfUrl**: Path to your PDF file (relative to root, e.g., `./documents/file.pdf`)
- **thumbnail**: Optional - path to a thumbnail image. If not provided, a placeholder will be used.
- **category**: Must be `"documents"`

## Notes

- PDF files will open in a new browser tab when clicked
- Make sure the PDF filename matches exactly what you put in `pdfUrl`
- Supported file format: `.pdf`
- For best results, create a thumbnail image (JPG/PNG) for each PDF document


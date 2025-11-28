# Images Folder

Place your local thumbnail images directly in this folder.

## Usage

In `data/videos.json`, set the `thumbnail` field to use local images:

```json
{
  "id": 1,
  "title": "Your Video Title",
  "thumbnail": "./images/your-image.jpg",
  ...
}
```

## Supported Formats

- `.jpg` / `.jpeg`
- `.png`
- `.gif`
- `.webp`

## Path Options

You can use either:
- Relative path: `./images/image.jpg`
- Absolute path from root: `images/image.jpg`

Both will work correctly!

## Notes

- If you don't specify a `thumbnail`, the app will automatically use the YouTube thumbnail
- Make sure image filenames match exactly what you put in `videos.json`
- Recommended image size: 1280x720px (16:9 aspect ratio) for best display


# Teams Chat Viewer

A Microsoft Teams-like chat viewer for JSON files built with Next.js.

## Features

- Load JSON chat files with a simple file picker
- Teams-like interface with user avatars and message grouping
- Search functionality to filter messages
- Responsive design with dark/light mode support
- Filters out skeleton messages automatically

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Click "Choose JSON File" to load a chat export
2. Use the search bar to filter messages
3. Messages are displayed in chronological order

## JSON Format

The app expects JSON files with the following structure:

\`\`\`json
[
  {
    "id": "message-id",
    "author": "Author Name",
    "timestamp": "2024-01-01T10:00:00Z",
    "timeLabel": "10:00 AM",
    "text": "Message content",
    "skeleton": false
  }
]
\`\`\`

## Build

To build for production:

\`\`\`bash
npm run build
npm start

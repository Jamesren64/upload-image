# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Next.js flashcard generator application that allows users to upload images, extract and translate text using OCR, and create flashcards for language learning. The app is configured for static export and GitHub Pages deployment.

## Development Commands

```bash
# Development server
npm run dev

# Build for production (static export)
npm run build

# Start production server (for local testing)
npm start

# Lint code
npm run lint
```

## Architecture

### Core Components

- **src/app/page.js**: Main application component that orchestrates the flashcard creation workflow
  - Manages image upload state and API calls to the translation service
  - Handles flashcard collection and TSV export functionality
  - Uses Heroku-hosted translation API: `james-image-translation-d10e77b3ae74.herokuapp.com`

- **src/app/UploadImage.js**: Image upload component using `react-images-uploading`
  - Provides drag-and-drop image upload interface
  - Displays original and translated text side-by-side
  - Handles adding flashcards to the collection

- **src/app/CurrentStack.js**: Displays the current collection of flashcards
  - Shows preview of all created flashcard pairs
  - Provides visual feedback for the flashcard stack

### Technology Stack

- **Frontend**: Next.js 14 with React 18
- **UI Library**: Material-UI (MUI) for components and styling
- **Image Upload**: react-images-uploading library
- **HTTP Client**: Axios for API communication
- **Deployment**: Static export to GitHub Pages

### Key Features

1. **Image Processing**: Users upload images containing text
2. **OCR & Translation**: External API extracts text and provides translation
3. **Flashcard Creation**: Users can add extracted text pairs to a flashcard collection
4. **Export**: Download flashcard collection as TSV file for import into flashcard apps

## Configuration

### Static Export Setup
- **next.config.js**: Configured for static export with `/upload-image` basePath for GitHub Pages
- **package.json**: Standard Next.js scripts for development and production

### GitHub Actions
- **publish.yml**: Automated deployment to GitHub Pages on main branch pushes
- Uses Next.js static export to generate files in `/out` directory

### Path Aliases
- **jsconfig.json**: Configured with `@/*` alias mapping to `./src/*` for cleaner imports

## External Dependencies

- **Translation API**: The app depends on a Heroku-hosted service for OCR and translation
- **GitHub Pages**: Deployment target with automatic CI/CD via GitHub Actions

## Development Notes

- The app uses client-side rendering (`'use client'` directive in page.js)
- Images are processed by uploading to external API, not stored locally
- Flashcard data is managed in React state and exported as TSV files
- The basePath configuration means the app runs at `/upload-image` when deployed
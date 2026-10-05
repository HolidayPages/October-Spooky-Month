# October-Spooky-Month
Step into the haunted realm of October. Beyond the twilight lies a season of mystery, pumpkin patches, and moonlit celebrations. Whether you are hunting for Halloween costume inspiration, curating the ultimate horror movie watchlist, or searching for local haunted events, step inside—if you dare.

# Midnight Harvest

A Halloween-themed static website featuring spooky October activities, a pumpkin carving coven, a haunted trail, and a classic horror movie marathon.

## Pages

- `index.html` - Main Midnight Harvest page with the Witch's Brew recipe and activity links.
- `haunted.html` - Haunted forest trail page with visitor tips.
- `pumpkin.html` - Pumpkin carving club page.
- `movies.html` - Horror movie lineup with links to IMDb.

## Features

- Shared responsive styling and a mobile navigation menu.
- Scroll-aware navigation that hides while scrolling down and reappears while scrolling up or moving the pointer to the top edge.
- Local hero images for the haunted trail, pumpkin carving, and movie-night pages.
- A cauldron animation and potion feedback on the main page.

## Project Structure

```text
October Webpage/
|-- index.html
|-- haunted.html
|-- pumpkin.html
|-- movies.html
|-- styles.css
|-- nav.js
|-- carving-images/
|   `-- pumpkin-carving.jpg
|-- haunted-images/
|   `-- haunted-path.jpg
`-- horror-images/
    `-- movie-night-hero.jpg
```

## Run Locally

No build tools or package installation are required. Open `index.html` in a browser, or use the VS Code Live Server extension for automatic reloads while editing.

Google Fonts, Font Awesome, and the main page's Unsplash image are loaded from external services, so an internet connection is needed for those assets.

## Publish with GitHub Pages

1. Create a GitHub repository for this project.
2. Add the contents of this folder to the repository root. `index.html` should be at the root, alongside `styles.css` and `nav.js`.
3. Push or publish the files to the `main` branch.
4. In the repository, open **Settings > Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
6. After deployment completes, open the URL shown in the Pages settings.

All page and local image references use relative paths so they work when hosted under a GitHub Pages project URL.

## Image Credits and Licensing

Review the license and attribution requirements for each image before publishing. Third-party images, fonts, and icons may have terms that differ from the website code.

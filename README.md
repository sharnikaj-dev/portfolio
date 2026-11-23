# Sharnika J - Portfolio

## Create and run
1. Make a folder `portfolio` with `index.html`, `style.css`, `script.js` (and an `images` folder).
2. Double-click `index.html`, or in VS Code use the Live Server extension, or run `python -m http.server 8000` and open http://localhost:8000.

## Edit content
- Text: edit `index.html`. Each section has a comment header. Replace every `[Add ...]` placeholder.
- Colors: change the variables at the top of `style.css`.
- Email address for the form: `OWNER_EMAIL` in `script.js`.
- Project links: change the GitHub profile link in each project card to the repo URL, and replace `[Add live demo URL]` with a link.

## Profile photo
Save a square photo as `images/profile.jpg`. In `index.html`, replace `<div class="photo-ph">...</div>` with `<img src="images/profile.jpg" alt="Sharnika J">`.

## Real email delivery (optional)
Create a free form at formspree.io, then set `<form action="https://formspree.io/f/YOUR_ID" method="POST">` and remove the `submit` handler's mailto lines in `script.js`. On Netlify, add `data-netlify="true"` to the form instead.

## Deploy free
- GitHub Pages: push the files to a repo (index.html at the root), then Settings > Pages > Deploy from branch `main`, folder `/ (root)`.
- Netlify: sign in at netlify.com, choose Add new site > Deploy manually, and drag the folder in.

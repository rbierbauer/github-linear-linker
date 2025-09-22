# GitHub → Linear Linker (Chrome Extension)

This Chrome extension adds a button on GitHub branch pages (`/tree/...`) that links directly to the corresponding Linear task, based on the branch name.  
It detects Linear IDs like `rea-681` in the branch name and creates a shortcut button.

## Features

- Works on any GitHub repository branch page (`https://github.com/.../tree/...`).
- Detects Linear task IDs in branch names (e.g. `feature/rea-681-settings-menu-point`).
- Adds a button to GitHub’s header bar:  
  → **Open REA-681 in Linear**
- Handles branches with slashes (e.g. `feature/rea-681/fix-something`).
- Automatically works with GitHub’s SPA navigation (no page reload needed).

## Installation (Developer Mode)

1. Clone or download this repository.
2. Open **Chrome** and go to:  
   `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked**.
5. Select the folder containing these files (`manifest.json`, `content.js`, etc).
6. Navigate to a GitHub branch page. You should see a button appear linking to the corresponding Linear issue.

## Configuration

The extension currently links to the **`additive`** Linear workspace:

https://linear.app/additive/issue/

If your Linear workspace slug is different:

1. Open `content.js`.
2. Update this line:
   ```javascript
   const LINEAR_BASE_URL = "https://linear.app/<your-workspace>/issue/";
   Reload the extension in chrome://extensions.
   ```

## Example

Branch name:
feature/rea-681-settings-menu-point

Detected Linear ID:
REA-681

Generated button:
Open REA-681 in Linear

Target link:
https://linear.app/additive/issue/REA-681

## Limitations

Currently only works on branch pages (/tree/...).

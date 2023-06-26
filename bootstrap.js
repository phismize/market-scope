const fs = require("fs");

function searchAndReplace(filePath, regex, replacement) {
  const content = fs.readFileSync(filePath, "utf8");
  const newContent = content.replace(regex, replacement);
  fs.writeFileSync(filePath, newContent, "utf8");
}

const PRIMARY_COLOR = "#1E75B9";

searchAndReplace(
  "public/index.html",
  /(<meta\s+name="theme-color"\s+content=")(#[0-9A-Fa-f]{3,6})(" \/>)/g,
  `<meta name="theme-color" content="${PRIMARY_COLOR}" />`
);
searchAndReplace(
  "public/manifest.json",
  /"theme_color": "#[0-9A-Fa-f]{3,6}"/g,
  `"theme_color": "${PRIMARY_COLOR}"`
);
searchAndReplace(
  "public/manifest.json",
  /"background_color": "#[0-9A-Fa-f]{3,6}"/g,
  `"background_color": "${PRIMARY_COLOR}"`
);
searchAndReplace(
  "src/components/LoadingCard.tsx",
  /background: "#[0-9A-Fa-f]{3,6}"/g,
  `background: "${PRIMARY_COLOR}"`
);
searchAndReplace(
  "src/App.css",
  /html,\nbody \{\n\s*background-color: #[0-9A-Fa-f]{3,6};\n\}/gs,
  `html,\nbody {\n  background-color: ${PRIMARY_COLOR};\n}`
);
searchAndReplace(
  "src/App.css",
  /\.App-header \{\n\s*color: #[0-9A-Fa-f]{3,6};\n\}/gs,
  `.App-header {\n  color: ${PRIMARY_COLOR};\n}`
);
searchAndReplace(
  "src/theme/appColor.ts",
  /export const appPrimary: "#[0-9A-Fa-f]{3,6}"/g,
  `export const appPrimary = "${PRIMARY_COLOR}"`
);

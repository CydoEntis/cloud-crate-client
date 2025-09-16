import {
  FileArchive,
  FileCode2,
  FileIcon,
  FileImage,
  FileMusic,
  FileSpreadsheet,
  FileText,
  FileVideo,
} from "lucide-react";

// File type color mappings
export const fileTypeBackgrounds: Record<string, string> = {
  // 📄 Text & Document
  txt: "#3B82F6",
  doc: "#3B82F6",
  docx: "#3B82F6",
  rtf: "#3B82F6",
  md: "#083344",
  rmd: "#198CE7",
  adoc: "#E60E0E",
  pdf: "#EF4444",

  // 📊 Spreadsheets
  xls: "#10B981",
  xlsx: "#10B981",
  csv: "#0E76A8",
  ods: "#10B981",

  // 🖼️ Images
  jpg: "#A855F7",
  jpeg: "#A855F7",
  png: "#A855F7",
  gif: "#A855F7",
  svg: "#A855F7",
  webp: "#A855F7",
  bmp: "#A855F7",
  tif: "#A855F7",
  tiff: "#A855F7",
  ico: "#A855F7",
  heic: "#A855F7",

  // 🎧 Audio
  mp3: "#EC4899",
  wav: "#EC4899",
  flac: "#EC4899",
  ogg: "#EC4899",
  m4a: "#EC4899",

  // ⚙️ Config / Build
  json: "#292929",
  xml: "#FF6600",
  yaml: "#CB171E",
  yml: "#CB171E",
  toml: "#9C4221",
  ini: "#2C7A7B",
  env: "#3C3C3C",
  dockerfile: "#384D54",
  makefile: "#6A737D",
  tsconfig: "#3178C6",
  prettierrc: "#56B6C2",
  eslintignore: "#6E7681",
  gitignore: "#6E7681",

  // 🧠 Markup / Templates
  mdx: "#083344",
  njk: "#F7DF1E",
  hbs: "#F7931E",

  // 🌐 Web
  html: "#E34F26",
  css: "#2965F1",
  scss: "#CD6799",
  sass: "#CD6799",
  js: "#F7DF1E",
  jsx: "#61DAFB",
  ts: "#3178C6",
  tsx: "#61DAFB",
  vue: "#42B883",
  svelte: "#FF3E00",
  astro: "#FF5D01",
  solid: "#2C4F7C",

  // ⚙️ Backend / Compiled
  java: "#EA580C",
  kt: "#A97BFF",
  kotlin: "#A97BFF",
  scala: "#DC322F",
  cs: "#9B59B6",
  c: "#555555",
  cpp: "#00599C",
  h: "#A9A9A9",
  hpp: "#A9A9A9",
  swift: "#FA7343",
  m: "#005F87",
  objc: "#438EFF",

  // 🐍 Python & Family
  py: "#3776AB",
  pyw: "#3776AB",
  ipynb: "#DA5B0B",

  // ⚡ Scripting
  sh: "#89E051",
  bash: "#89E051",
  zsh: "#89E051",
  bat: "#2C2C2C",
  ps1: "#012456",
  cmd: "#2C2C2C",
  vb: "#6A40FD",

  // 🧪 Functional / Academic
  hs: "#5E5086",
  ml: "#DC322F",
  clj: "#5881D8",
  cljs: "#5881D8",
  elixir: "#6E4A7E",
  ex: "#6E4A7E",
  exs: "#6E4A7E",
  erl: "#B83998",
  r: "#198CE7",
  julia: "#9558B2",
  jl: "#9558B2",
  tex: "#3D6117",
  latex: "#3D6117",

  // ⚙️ Compiled / Systems
  go: "#00ADD8",
  rs: "#DEA584",
  dart: "#0175C2",
  pl: "#0298C3",
  lua: "#000080",
  asm: "#6E4B4B",
  s: "#6E4B4B",

  // 📦 Package managers / Build tools
  pom: "#B52E31",
  gradle: "#02303A",
  lock: "#6B7280",
  yarn: "#2C8EBB",
  npmrc: "#CB3837",
  packagejson: "#CB3837",
  rollup: "#F34F29",
  vite: "#646CFF",
  webpack: "#1C78C0",

  // 🧰 Miscellaneous
  ahk: "#6594CF",
  mathematica: "#DD1100",
  parquet: "#5A6986",
  db: "#CC2927",
  sql: "#CC2927",
  log: "#6B7280",
  bin: "#6B7280",
  wasm: "#7C3AED",

  // ☁️ CI/CD / Infra
  githubactions: "#2088FF",
  circleci: "#343434",
  travis: "#D62828",

  // 🧱 Fallback
  default: "#374151",
};

// File type icon mappings
export const fileTypeIcons: Record<string, React.ElementType> = {
  // 📄 Text & Docs
  txt: FileText,
  doc: FileText,
  docx: FileText,
  rtf: FileText,
  md: FileText,
  rmd: FileText,
  adoc: FileText,
  pdf: FileIcon,

  // 📊 Spreadsheets
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  csv: FileSpreadsheet,
  ods: FileSpreadsheet,

  // 🖼️ Images
  jpg: FileImage,
  jpeg: FileImage,
  png: FileImage,
  gif: FileImage,
  svg: FileImage,
  webp: FileImage,
  bmp: FileImage,
  tif: FileImage,
  tiff: FileImage,
  ico: FileImage,
  heic: FileImage,

  // 🎧 Audio
  mp3: FileMusic,
  wav: FileMusic,
  flac: FileMusic,
  ogg: FileMusic,
  m4a: FileMusic,

  // 🎥 Video
  mp4: FileVideo,
  mov: FileVideo,
  avi: FileVideo,
  mkv: FileVideo,
  webm: FileVideo,

  // 🗜️ Archives
  zip: FileArchive,
  rar: FileArchive,
  "7z": FileArchive,
  tar: FileArchive,
  gz: FileArchive,
  bz2: FileArchive,

  // ⚙️ Config / Build
  json: FileCode2,
  xml: FileCode2,
  yaml: FileCode2,
  yml: FileCode2,
  toml: FileCode2,
  ini: FileCode2,
  env: FileCode2,
  dockerfile: FileCode2,
  makefile: FileCode2,
  tsconfig: FileCode2,
  prettierrc: FileCode2,
  eslintignore: FileCode2,
  gitignore: FileCode2,

  // 🌐 Web
  html: FileCode2,
  css: FileCode2,
  scss: FileCode2,
  sass: FileCode2,
  js: FileCode2,
  jsx: FileCode2,
  ts: FileCode2,
  tsx: FileCode2,
  vue: FileCode2,
  svelte: FileCode2,
  astro: FileCode2,
  solid: FileCode2,

  // ⚙️ Backend / Compiled
  java: FileCode2,
  kt: FileCode2,
  kotlin: FileCode2,
  scala: FileCode2,
  cs: FileCode2,
  c: FileCode2,
  cpp: FileCode2,
  h: FileCode2,
  hpp: FileCode2,
  swift: FileCode2,
  m: FileCode2,
  objc: FileCode2,

  // 🐍 Python & Family
  py: FileCode2,
  pyw: FileCode2,
  ipynb: FileCode2,

  // ⚡ Scripting
  sh: FileCode2,
  bash: FileCode2,
  zsh: FileCode2,
  bat: FileCode2,
  ps1: FileCode2,
  cmd: FileCode2,
  vb: FileCode2,

  // 🧪 Functional / Academic
  hs: FileCode2,
  ml: FileCode2,
  clj: FileCode2,
  cljs: FileCode2,
  elixir: FileCode2,
  ex: FileCode2,
  exs: FileCode2,
  erl: FileCode2,
  r: FileCode2,
  julia: FileCode2,
  jl: FileCode2,
  tex: FileText,
  latex: FileText,

  // ⚙️ Systems / Compiled
  go: FileCode2,
  rs: FileCode2,
  dart: FileCode2,
  pl: FileCode2,
  lua: FileCode2,
  asm: FileCode2,
  s: FileCode2,

  // 📦 Package managers / Build tools
  pom: FileCode2,
  gradle: FileCode2,
  lock: FileCode2,
  yarn: FileCode2,
  npmrc: FileCode2,
  packagejson: FileCode2,
  rollup: FileCode2,
  vite: FileCode2,
  webpack: FileCode2,

  // 🧰 Misc
  ahk: FileCode2,
  mathematica: FileCode2,
  parquet: FileIcon,
  db: FileIcon,
  sql: FileCode2,
  log: FileText,
  bin: FileIcon,
  wasm: FileCode2,

  // ☁️ CI/CD / Infra
  githubactions: FileCode2,
  circleci: FileCode2,
  travis: FileCode2,

  // 🧱 Fallback
  default: FileIcon,
};

export const ACCEPTED_EXTENSIONS = Object.keys(fileTypeBackgrounds);

export const getFileExtension = (fileName: string): string => {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
};

export const getFileColor = (extension: string): string => {
  return fileTypeBackgrounds[extension.toLowerCase()] || fileTypeBackgrounds.default;
};

export const getFileIcon = (extension: string): React.ElementType => {
  return fileTypeIcons[extension.toLowerCase()] || fileTypeIcons.default;
};

export const getFileInfo = (fileName: string) => {
  const extension = getFileExtension(fileName);
  return {
    extension,
    color: getFileColor(extension),
    icon: getFileIcon(extension),
  };
};

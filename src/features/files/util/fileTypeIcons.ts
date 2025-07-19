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

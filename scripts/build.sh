#!/usr/bin/env bash

set -e

# 1) Crear carpeta temporal
TEMP_DIR="$(dirname "$0")/../.tmp-build"
echo "🚀 Creando carpeta temporal: $TEMP_DIR"
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# 2) Copiar carpeta src
SRC_DIR="$(dirname "$0")/../src"
echo "📁 Copiando src..."
cp -r "$SRC_DIR" "$TEMP_DIR/src"

# 3) Leer y filtrar package.json
PACKAGE_JSON_PATH="$(dirname "$0")/../package.json"
TEMP_PKG_JSON="$TEMP_DIR/package.json"
echo "📝 Filtrando package.json..."

# Filtra devDependencies con jq
jq 'if has("devDependencies") then
  .devDependencies |= with_entries(
    select(
      .key | test("^(?!(@storybook|storybook|chromatic|@chromatic-com|@testing-library|msw|sass|react-scripts))")
    )
  )
else
  .
end' "$PACKAGE_JSON_PATH" > "$TEMP_PKG_JSON"

# 4) Copiar tsconfig si lo necesitas (opcional)
echo "📄 Copiando tsconfig..."
cp "$(dirname "$0")/../tsconfig.json" "$TEMP_DIR/tsconfig.json"
cp "$(dirname "$0")/../rollup.config.mjs" "$TEMP_DIR/rollup.config.mjs"
cp "$(dirname "$0")/../.npmrc" "$TEMP_DIR/.npmrc"

# 5) Ejecutar yarn install dentro de la carpeta temporal
echo "📦 Instalando dependencias en temporal..."
cd "$TEMP_DIR"
yarn install

# 6) Ejecutar build dentro de la carpeta temporal
echo "🏗️ Ejecutando build en temporal..."
yarn build

echo "✅ Build temporal completo!"

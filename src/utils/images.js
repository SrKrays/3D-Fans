// Los nombres de archivo de las fotos de producto tienen espacios y paréntesis
// (ej: "P (1).jpeg"), hay que codificarlos para que el navegador los pida bien.
export function productImageUrl(filename) {
  return encodeURI(`/img/${filename}`)
}

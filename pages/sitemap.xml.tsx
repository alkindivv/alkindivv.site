// Fungsi untuk mengenkode karakter khusus XML
const encodeXMLChars = (str: string) => {
  if (!str) return '';

  // Pertama, enkode ampersand yang bukan bagian dari entitas XML
  let result = str.replace(/&(?![a-zA-Z]+;)/g, 'and');

  // Kemudian bersihkan karakter lainnya
  result = result
    .replace(/[<>'"]/g, '') // Hapus karakter XML khusus
    .replace(/\s+/g, ' ') // Normalisasi whitespace
    .trim();

  return result;
};

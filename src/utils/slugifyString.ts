export const slugifyString = (value: string) =>
  value
    .toLowerCase()
    // Bytter ut typisk norske bokstaver æøå
    .replace(/æ/g, "ae")
    .replace(/å/g, "a")
    .replace(/ø/g, "o")
    // Bytter alle tegn som ikke er et regex-word med '-'
    .replace(/\W/g, "-")
    // Bytter ut flere streker med enkelt strek "----" => "-"
    .replace(/-+/g, "-")
    .slice(0, 30);

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extrairTextoPDF(buffer: Buffer): Promise<string> {
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
  });

  const pdf = await loadingTask.promise;

  let textoCompleto = "";

  for (let paginaAtual = 1; paginaAtual <= pdf.numPages; paginaAtual++) {
    const pagina = await pdf.getPage(paginaAtual);

    const conteudo = await pagina.getTextContent();

    const textoPagina = conteudo.items
      .map((item: any) => item.str ?? "")
      .join(" ");

    textoCompleto += textoPagina + "\n\n";
  }

  return textoCompleto;
}
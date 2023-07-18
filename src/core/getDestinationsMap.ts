import { getDocument } from "pdfjs-dist";

export async function getDestinationsMap(
  basePdfBuffer: Uint8Array,
) {
  // Taken from: https://stackoverflow.com/questions/67737289/when-printing-pdf-with-puppeteer-how-can-i-get-what-page-my-element-is-printed-o
  const doc = await getDocument(basePdfBuffer).promise;
  const linkDestinations = await doc.getDestinations();
  return await Promise.all(
    Object.entries(linkDestinations).map(async ([destination, [ref]]) => {
      const page = (await doc.getPageIndex(ref)) + 1;
      return {destination, page};
    })
  );
}

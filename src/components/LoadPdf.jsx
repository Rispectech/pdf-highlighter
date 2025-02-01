import { degrees, drawRectangle, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useEffect, useState } from "react";

const LoadPDF = ({ url, rectArray }) => {
  const [pdfInfo, setPdfInfo] = useState([]);

  useEffect(() => {
    modifyPdf();
  }, []);

  const modifyPdf = async () => {
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();
    // firstPage.drawText("This text was added with JavaScript!", {
    //   x: 5,
    //   y: height / 2 + 300,
    //   size: 50,
    //   font: helveticaFont,
    //   color: rgb(0.95, 0.1, 0.1),
    //   rotate: degrees(-45),
    // });

    // Function to draw rectangle on a specific page and line
    const drawRectangleOnLine = (pageNumber, lineNumber, rectHeight, color, opacity) => {
      const page = pages[pageNumber - 1];
      if (!page) return; //

      const { width, height } = page.getSize();
      const lineHeight = 12;
      const marginTop = 50;

      const y = height - marginTop - lineNumber * lineHeight;

      page.drawRectangle({
        x: 50,
        y: y - rectHeight / 2,
        width: width - 100,
        height: rectHeight,
        color: rgb(color.red, color.green, color.blue),
        opacity: opacity,
      });
    };

    for (const coordinates of rectArray) {
      console.log(rectArray);
      const { pageNumber, lineNumber, color, rectHeight, opacity } = coordinates;
      drawRectangleOnLine(pageNumber, lineNumber, rectHeight, color, opacity);
    }

    const pdfBytes = await pdfDoc.save();
    const bytes = new Uint8Array(pdfBytes);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const docUrl = URL.createObjectURL(blob);
    setPdfInfo(docUrl);
  };

  return (
    <>
      {
        <iframe
          title="test-frame"
          src={pdfInfo}
          type="application/pdf"
          style={{
            height: "100vh",
            width: "100vw",
          }}
        />
      }
    </>
  );
};

export default LoadPDF;

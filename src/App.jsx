import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useEffect, useState } from "react";

const LoadPDF = () => {
  const [pdfInfo, setPdfInfo] = useState([]);

  useEffect(() => {
    modifyPdf();
  }, []);

  const modifyPdf = async () => {
    const existingPdfBytes = await fetch(
      "https://arxiv.org/pdf/2212.08011"
    ).then((res) => res.arrayBuffer());

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
     const drawRectangleOnLine = (pageNumber, lineNumber) => {
      const page = pages[pageNumber - 1] // Page numbers are 1-indexed
      if (!page) return // If page doesn't exist, do nothing

      const { width, height } = page.getSize()
      const lineHeight = 12 // Approximate line height, adjust as needed
      const marginTop = 50 // Adjust top margin as needed
      const rectangleHeight = 15 // Height of the rectangle

      // Calculate y position based on line number
      const y = height - marginTop - lineNumber * lineHeight

      // Draw rectangle
      page.drawRectangle({
        x: 50, // Left margin
        y: y - rectangleHeight / 2, // Center the rectangle on the line
        width: width - 100, // Width of the rectangle (leaving margins on both sides)
        height: rectangleHeight,
        color: rgb(1, 0.8, 0), // Yellow color
        opacity: 0.5,
      })
    }

    // Example: Draw rectangles on different pages and lines
    drawRectangleOnLine(1, 5) // Page 1, Line 5
    drawRectangleOnLine(2, 10) // Page 2, Line 10

    const pdfBytes = await pdfDoc.save();
    const bytes  = new Uint8Array( pdfBytes ); 
    const blob   = new Blob( [ bytes ], { type: "application/pdf" } );
    const docUrl = URL.createObjectURL( blob );
    setPdfInfo( docUrl );
  };

  return <>{<iframe title="test-frame" src={pdfInfo} type="application/pdf" style={{
    height:"100vh",
    width:"100vw"
  }}/> }</>;
};

export default LoadPDF;

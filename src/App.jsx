import React from "react";
import LoadPDF from "./components/LoadPdf";

const data = {
  url: "https://arxiv.org/pdf/2212.08011",
  rectArray: [
    {
      pageNumber: 1,
      lineNumber: 5,
      color: { red: 1, green: 0.8, blue: 0 },
      rectHeight: 15,
      opacity: 0.5,
    },
    {
      pageNumber: 2,
      lineNumber: 10,
      color: { red: 1, green: 0.8, blue: 0 },
      rectHeight: 15,
      opacity: 0.5,
    },
  ], // assuming
};
const App = () => {
  return (
    <main>
      <LoadPDF {...data} />
    </main>
  );
};

export default App;

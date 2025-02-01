export interface LoadPdfProps {
  url: string;
  rectArray: Rect[];
}

interface Rect {
  pageNumber: number;
  lineNumber: number;
  color: { red: number; green: number; blue: number };
  rectHeight: number;
  opacity: number;
}

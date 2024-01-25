import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ExportColumn } from './column.model';

export const exportPdf = (
  columns: ExportColumn[],
  data: Array<any>,
  title: string
) => {
  const doc = new jsPDF('p', 'px', 'a4');

  autoTable(doc, { columns, body: data });
  doc.save(title + '.pdf');
};

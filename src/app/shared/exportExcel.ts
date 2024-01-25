import { utils, writeFile } from 'xlsx';

export const exportExcel = (
  data: Array<any>,
  title: string,
  headings: string[][]
) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  const EXCEL_EXTENSION = '.xlsx';

  utils.sheet_add_aoa(worksheet, headings);
  utils.sheet_add_json(worksheet, data, { origin: 'A2', skipHeader: true });
  utils.book_append_sheet(workbook, worksheet, title);

  writeFile(workbook, title + '_' + new Date().getTime() + EXCEL_EXTENSION);
};

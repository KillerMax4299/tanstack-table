
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
export const exportToExcel = (rows) => {
  

  const columnHeaders = ["Serial no", "Scheme Area", "Financial Year"];
  const worksheetData = [
    // Add the column headers
    columnHeaders,
    // Add the table data rows
    ...rows
  ];

  console.table(worksheetData)

  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(data, 'table_data.xlsx');
};
  

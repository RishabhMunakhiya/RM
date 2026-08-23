import Papa from 'papaparse';

export const exportToCSV = (data, filename = 'shortlist.csv') => {
  // Only export the required core columns plus status
  const dataToExport = data.map(({ Name, Gender, Grade, Math, Science, English, Total, Status }) => ({
    Name,
    Gender,
    Grade,
    Math,
    Science,
    English,
    Total,
    Status
  }));

  const csv = Papa.unparse(dataToExport);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

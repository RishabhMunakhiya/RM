export const cleanAndValidateData = (rawData) => {
  const report = {
    totalRows: rawData.length,
    duplicatesRemoved: 0,
    valuesCleaned: 0,
    validationWarnings: 0,
    validRecords: 0,
  };

  // 1. Remove exact duplicates based on all core fields
  const uniqueDataMap = new Map();
  rawData.forEach(row => {
    // Normalize basic string values
    const normName = (row.Name || '').trim();
    const normGender = (row.Gender || '').trim();
    const normGrade = (row.Grade || '').trim();
    
    // Create a unique key for the student
    const key = `${normName.toLowerCase()}-${normGender.toLowerCase()}-${normGrade}`;
    
    if (uniqueDataMap.has(key) && normName !== '') {
      report.duplicatesRemoved++;
    } else {
      uniqueDataMap.set(key, { ...row, Name: normName, Gender: normGender, Grade: normGrade });
    }
  });

  const uniqueData = Array.from(uniqueDataMap.values());

  // 2. Clean, handle missing values, and validate
  const cleanedData = uniqueData.map(row => {
    const cleanedRow = { ...row, Status: 'Active' };
    let rowWarning = false;

    // Helper to safely parse numbers
    const parseScore = (val, fieldName) => {
      if (val === undefined || val === null || val === '') {
        report.valuesCleaned++;
        rowWarning = true;
        return 0; // Default missing scores to 0
      }
      
      const num = Number(val);
      if (isNaN(num) || num < 0) {
        report.valuesCleaned++;
        rowWarning = true;
        return 0;
      }
      
      // If there's an unnecessary string conversion or space, consider it cleaned if we just parsed it successfully
      if (typeof val === 'string' && val.trim() !== val) {
        report.valuesCleaned++;
      }
      
      return num;
    };

    cleanedRow.Math = parseScore(row.Math, 'Math');
    cleanedRow.Science = parseScore(row.Science, 'Science');
    cleanedRow.English = parseScore(row.English, 'English');

    // Total Validation & Recalculation
    const calculatedTotal = cleanedRow.Math + cleanedRow.Science + cleanedRow.English;
    let uploadedTotal = row.Total !== undefined ? Number(row.Total) : NaN;
    
    if (isNaN(uploadedTotal) || uploadedTotal !== calculatedTotal) {
      report.valuesCleaned++;
      cleanedRow.Total = calculatedTotal;
    } else {
      cleanedRow.Total = uploadedTotal;
    }

    if (rowWarning) {
      report.validationWarnings++;
    }

    return cleanedRow;
  });

  report.validRecords = cleanedData.length;

  return {
    cleanedData,
    report
  };
};

import React, { useRef } from 'react';

const CsvUploader = ({ onUpload }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      onUpload(file);
    } else {
      alert('Please select a valid CSV file.');
    }
  };

  return (
    <div className="csv-uploader">
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />
      <button onClick={() => fileInputRef.current.click()}>
        Upload CSV
      </button>
    </div>
  );
};

export default CsvUploader;
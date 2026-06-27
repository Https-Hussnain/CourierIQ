import React, { useState } from 'react';

function Upload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setError('Pehle file select karo');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Server se connection nahi hua');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow max-w-2xl">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Delivery Data Upload</h2>
      <p className="text-gray-500 mb-6">CSV ya Excel file upload karo apna delivery data analyze karne ke liye</p>

      <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center mb-4">
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={e => setFile(e.target.files[0])}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <div className="text-4xl mb-2">📂</div>
          <p className="text-blue-600 font-semibold">File choose karo</p>
          <p className="text-gray-400 text-sm mt-1">CSV ya Excel (.xlsx)</p>
        </label>
        {file && (
          <p className="mt-3 text-green-600 font-semibold">✅ {file.name}</p>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-bold text-gray-700 mb-3">Analysis Result</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">{result.total_orders}</p>
              <p className="text-gray-500 text-sm">Total Orders</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-600">{result.columns.length}</p>
              <p className="text-gray-500 text-sm">Total Columns</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-600 mb-2">Columns detected:</p>
            <div className="flex flex-wrap gap-2">
              {result.columns.map((col, i) => (
                <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {col}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
import React, { useState } from "react";
import Barcode from "react-barcode";

const generateEAN13 = (): string => {
  const base = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("");
  
  const calculateChecksum = (digits: string): string => {
    const sum = digits
      .split("")
      .map(Number)
      .reduce((acc, num, index) => acc + (index % 2 === 0 ? num : num * 3), 0);

    const checksum = (10 - (sum % 10)) % 10;
    return checksum.toString();
  };

  return base + calculateChecksum(base);
};

const BarcodeGenerator: React.FC = () => {
  const [barcodeValue, setBarcodeValue] = useState(generateEAN13());

  const handleGenerate = () => {
    setBarcodeValue(generateEAN13());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Random Barcode Generator</h2>
        
        <div className="bg-gray-200 p-4 rounded-md mb-4">
          <Barcode value={barcodeValue} format="EAN13" displayValue={true} width={2} height={100} />
        </div>
        
        <button
          onClick={handleGenerate}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Generate New Barcode
        </button>
      </div>
    </div>
  );
};

export default BarcodeGenerator;

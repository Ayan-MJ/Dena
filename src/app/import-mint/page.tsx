"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import * as Papa from "papaparse";
import { 
  Upload, 
  FileText, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Download,
  CheckCircle,
  AlertCircle 
} from "lucide-react";
import BaseLayout from "@/components/BaseLayout";

interface CsvRow {
  [key: string]: string;
}

interface ColumnMapping {
  [csvColumn: string]: string;
}

const DENARIQ_FIELDS = [
  { value: "", label: "Select field..." },
  { value: "date", label: "Date" },
  { value: "amount", label: "Amount" },
  { value: "category", label: "Category" },
  { value: "currency", label: "Currency" },
  { value: "note", label: "Note" },
  { value: "description", label: "Description" },
  { value: "account", label: "Account" },
  { value: "skip", label: "Skip this column" }
];

export default function ImportMintPage() {
  const router = useRouter();
  const [step, setStep] = useState<'upload' | 'mapping'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({});
  const [isImporting, setIsImporting] = useState(false);

  // Task 8.1: File Upload with react-dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const csvFile = acceptedFiles[0];
    if (csvFile) {
      setFile(csvFile);
      
      // Parse CSV to get headers and data
      Papa.parse(csvFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as CsvRow[];
          setCsvData(data);
          
          // Extract headers
          if (data.length > 0) {
            const headers = Object.keys(data[0]);
            setCsvHeaders(headers);
            
            // Initialize column mapping
            const initialMapping: ColumnMapping = {};
            headers.forEach(header => {
              // Try to auto-detect common Mint columns
              const lowerHeader = header.toLowerCase();
              if (lowerHeader.includes('date')) {
                initialMapping[header] = 'date';
              } else if (lowerHeader.includes('amount')) {
                initialMapping[header] = 'amount';
              } else if (lowerHeader.includes('category')) {
                initialMapping[header] = 'category';
              } else if (lowerHeader.includes('description') || lowerHeader.includes('note')) {
                initialMapping[header] = 'note';
              } else {
                initialMapping[header] = '';
              }
            });
            setColumnMapping(initialMapping);
          }
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
          alert('Error parsing CSV file. Please check the file format.');
        }
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  const handleRemoveFile = () => {
    setFile(null);
    setCsvData([]);
    setCsvHeaders([]);
    setColumnMapping({});
  };

  const handleNext = () => {
    if (file && csvData.length > 0) {
      setStep('mapping');
    }
  };

  const handleBack = () => {
    setStep('upload');
  };

  const handleColumnMappingChange = (csvColumn: string, denariqField: string) => {
    setColumnMapping(prev => ({
      ...prev,
      [csvColumn]: denariqField
    }));
  };

  // Task 8.2: Mock API call and navigation
  const handleImport = async () => {
    setIsImporting(true);
    
    try {
      // Mock API call
      await fetch('/api/import/mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: csvData.slice(0, 10), // Send first 10 rows for preview
          mapping: columnMapping,
          fileName: file?.name
        })
      });

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to dashboard with success parameter
      router.push('/dashboard?importSuccess=1');
    } catch (error) {
      console.error('Import failed:', error);
      alert('Import failed. Please try again.');
    } finally {
      setIsImporting(false);
    }
  };

  const requiredFieldsMapped = () => {
    const mappedFields = Object.values(columnMapping).filter(field => field && field !== 'skip');
    return mappedFields.includes('date') && mappedFields.includes('amount');
  };

  return (
    <BaseLayout>
      <div className="col-span-12">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Import from Mint
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Upload your Mint CSV export to migrate your transaction history to Denariq.
          </p>
          
          {/* Progress Indicator */}
          <div className="mt-6 flex items-center">
            <div className={`flex items-center ${step === 'upload' ? 'text-blue-600' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'upload' 
                  ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                {step === 'mapping' ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className="ml-2 font-medium">Upload CSV</span>
            </div>
            
            <div className={`mx-4 w-12 h-0.5 ${
              step === 'mapping' ? 'bg-green-600' : 'bg-slate-300'
            }`} />
            
            <div className={`flex items-center ${
              step === 'mapping' ? 'text-blue-600' : 'text-slate-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'mapping' 
                  ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' 
                  : 'bg-slate-100 text-slate-400'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Map Columns</span>
            </div>
          </div>
        </motion.div>

        {/* Step 1: File Upload */}
        {step === 'upload' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {!file ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
                  isDragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
                    : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                
                {isDragActive ? (
                  <p className="text-lg text-blue-600 font-medium">
                    Drop your CSV file here...
                  </p>
                ) : (
                  <>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium mb-2">
                      Drag & drop your Mint CSV file here
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">
                      or click to browse files
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Upload className="w-4 h-4 mr-2" />
                      Select CSV File
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {file.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {(file.size / 1024).toFixed(1)} KB • {csvData.length} transactions
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                    <button
                      onClick={handleRemoveFile}
                      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2: Column Mapping & Preview */}
        {step === 'mapping' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Column Mapping */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Map CSV Columns to Denariq Fields
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {csvHeaders.map((header, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        {header}
                      </label>
                      <select
                        value={columnMapping[header] || ''}
                        onChange={(e) => handleColumnMappingChange(header, e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {DENARIQ_FIELDS.map((field) => (
                          <option key={field.value} value={field.value}>
                            {field.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {!requiredFieldsMapped() && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" />
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Please map at least the <strong>Date</strong> and <strong>Amount</strong> columns to continue.
                  </p>
                </div>
              )}
            </div>

            {/* Data Preview */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Preview (First 10 Rows)
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      {csvHeaders.map((header, index) => (
                        <th key={index} className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                          {header}
                          {columnMapping[header] && columnMapping[header] !== 'skip' && (
                            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                              → {DENARIQ_FIELDS.find(f => f.value === columnMapping[header])?.label}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvData.slice(0, 10).map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-slate-100 dark:border-slate-700/50">
                        {csvHeaders.map((header, colIndex) => (
                          <td key={colIndex} className="py-3 px-4 text-slate-900 dark:text-slate-100">
                            {row[header]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              
              <button
                onClick={handleImport}
                disabled={!requiredFieldsMapped() || isImporting}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isImporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Import {csvData.length} Transactions
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </BaseLayout>
  );
} 
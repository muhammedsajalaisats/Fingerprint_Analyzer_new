import React, { useState } from 'react';
import { DeviceInfo } from './types';
import { getDeviceInfo } from './utils/fingerprint';
import { DeviceInfoCard } from './components/DeviceInfoCard';
import { Fingerprint, Loader2, User, ArrowRight } from 'lucide-react';

function App() {
  const [employeeId, setEmployeeId] = useState('');
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'employeeId' | 'fingerprint' | 'results'>('employeeId');

  const handleEmployeeIdSubmit = () => {
    if (!employeeId.trim() || employeeId.length !== 8) {
      setError('Please enter a valid 8-digit Employee ID');
      return;
    }
    setError(null);
    setCurrentStep('fingerprint');
  };

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow only numbers and limit to 8 characters
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (numericValue.length <= 8) {
      setEmployeeId(numericValue);
    }
  };

  const handleGetFingerprint = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const info = await getDeviceInfo();
      // Add employee ID to device info
      const deviceInfoWithEmployee = {
        ...info,
        employeeId: employeeId
      };
      setDeviceInfo(deviceInfoWithEmployee);
      setCurrentStep('results');
    } catch (err) {
      setError('Failed to get device information. Please try again.');
      console.error('Error getting device info:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmployeeId('');
    setDeviceInfo(null);
    setError(null);
    setCurrentStep('employeeId');
  };

  const handleBack = () => {
    if (currentStep === 'fingerprint') {
      setCurrentStep('employeeId');
    } else if (currentStep === 'results') {
      setCurrentStep('fingerprint');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-full shadow-lg">
              <Fingerprint className="text-white" size={48} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Device Fingerprint Analyzer
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {currentStep === 'employeeId' && 'Enter your Employee ID to begin the device fingerprint analysis process.'}
            {currentStep === 'fingerprint' && 'Click the button below to generate and view your unique device fingerprint details.'}
            {currentStep === 'results' && 'Your device fingerprint has been successfully generated and analyzed.'}
          </p>
        </div>

        {/* Step 1: Employee ID Input */}
        {currentStep === 'employeeId' && (
          <div className="max-w-md mx-auto animate-fadeIn">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="text-blue-600" size={32} />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Employee Identification
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID
                  </label>
                  <input
                    id="employeeId"
                    type="text"
                    value={employeeId}
                    onChange={handleEmployeeIdChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleEmployeeIdSubmit()}
                    placeholder="Enter Employee ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-center font-mono text-lg"
                    maxLength={8}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {employeeId.length}
                  </p>
                </div>
                <button
                  onClick={handleEmployeeIdSubmit}
                  disabled={employeeId.length !== 8}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Fingerprint Collection */}
        {currentStep === 'fingerprint' && (
          <div className="animate-fadeIn">
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Employee ID</p>
                    <p className="text-lg font-semibold text-gray-800">{employeeId}</p>
                  </div>
                  <button
                    onClick={handleBack}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-8">
              <button
                onClick={handleGetFingerprint}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed flex items-center gap-3 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Analyzing Device...
                  </>
                ) : (
                  <>
                    <Fingerprint size={24} />
                    Get Device Fingerprint
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {currentStep === 'results' && deviceInfo && (
          <div className="animate-slideUp">
            <DeviceInfoCard deviceInfo={deviceInfo} />
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={handleReset}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                New Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
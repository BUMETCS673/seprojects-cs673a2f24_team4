import React from 'react';
import './PaymentPage.css';

const PaymentForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-xl shadow-custom p-10 w-[600px]">
        <h2 className="text-2xl font-bold text-center mb-6">Payment Details</h2>

        <div className="space-y-6">
          {/* Card input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                <img
                  src="/visa.png"
                  alt="Visa"
                  className="h-5"
                />
                <img
                  src="/mastercard.png"
                  alt="MasterCard"
                  className="h-5"
                />
                <img
                  src="/discover.png"
                  alt="Discover"
                  className="h-5"
                />
              </div>
            </div>
          </div>

          {/* Expiry and CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry
              </label>
              <input
                type="text"
                placeholder="MM / YY"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVC
              </label>
              <input
                type="text"
                placeholder="CVC"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Country and Postal Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                placeholder="90210"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;

// WhatsApp Auto-Formatting Demo Component
// Add this to your test page to see the formatting in action

"use client";
import { useState } from "react";

const WhatsAppFormattingDemo = () => {
  const [testInput, setTestInput] = useState("");

  const formatWhatsApp = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    
    if (digitsOnly.length === 0) return '';
    
    let formatted = '';
    
    if (digitsOnly.startsWith('55') && digitsOnly.length > 2) {
      const countryCode = digitsOnly.slice(0, 2);
      const phoneNumber = digitsOnly.slice(2);
      
      if (phoneNumber.length <= 2) {
        formatted = `+${countryCode} ${phoneNumber}`;
      } else if (phoneNumber.length <= 4) {
        formatted = `+${countryCode} (${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
      } else if (phoneNumber.length <= 9) {
        formatted = `+${countryCode} (${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
      } else {
        formatted = `+${countryCode} (${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
      }
    }
    else if ((digitsOnly.startsWith('1') || digitsOnly.startsWith('44') || digitsOnly.startsWith('49')) && digitsOnly.length > 1) {
      const countryCodeLength = digitsOnly.startsWith('1') ? 1 : 2;
      const countryCode = digitsOnly.slice(0, countryCodeLength);
      const phoneNumber = digitsOnly.slice(countryCodeLength);
      
      if (phoneNumber.length <= 3) {
        formatted = `+${countryCode} ${phoneNumber}`;
      } else if (phoneNumber.length <= 6) {
        formatted = `+${countryCode} ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
      } else {
        formatted = `+${countryCode} ${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
      }
    }
    else {
      if (digitsOnly.length <= 2) {
        formatted = digitsOnly;
      } else if (digitsOnly.length <= 6) {
        formatted = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2)}`;
      } else if (digitsOnly.length <= 10) {
        formatted = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 6)}-${digitsOnly.slice(6)}`;
      } else {
        formatted = `(${digitsOnly.slice(0, 2)}) ${digitsOnly.slice(2, 7)}-${digitsOnly.slice(7, 11)}`;
      }
    }
    
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setTestInput(formatted);
  };

  const testCases = [
    { input: "5511999999999", expected: "+55 (11) 99999-9999" },
    { input: "11999999999", expected: "(11) 99999-9999" },
    { input: "15551234567", expected: "+1 555-123-4567" },
    { input: "447123456789", expected: "+44 712-345-6789" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h3 className="text-lg font-bold mb-4">📱 WhatsApp Auto-Formatting Demo</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Try typing a phone number:</label>
        <input
          type="tel"
          value={testInput}
          onChange={handleChange}
          placeholder="Type any phone number..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          maxLength={20}
        />
        <p className="text-sm text-gray-600 mt-1">
          Digits only: {testInput.replace(/\D/g, '')} ({testInput.replace(/\D/g, '').length} digits)
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-sm">Test Cases:</h4>
        {testCases.map((test, index) => (
          <div key={index} className="text-xs bg-gray-50 p-2 rounded">
            <span className="font-mono">{test.input}</span> → <span className="font-mono text-green-600">{test.expected}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppFormattingDemo;

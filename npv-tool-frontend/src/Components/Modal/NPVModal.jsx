


import { useState } from "react";

import { FaTimes } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

const NPVModal = ({ isOpen, onClose, title, children }) => {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);
  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200); // Change this value to adjust the closing animation duration
  }
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? "" : "opacity-0 pointer-events-none"
      } transition-opacity ease-out duration-300`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={`fixed inset-0 transition-opacity ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          className={`bg-white rounded-lg overflow-hidden shadow-xl transform transition-all ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium" id="modal-title">
                {title}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-600 focus:outline-none"
                onClick={handleClose}
              >
                <span className="sr-only">Close</span>
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            {children}
          </div>
          <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-end">           
          </div>
        </div>
      </div>
    </div>
  );
};
export default NPVModal;
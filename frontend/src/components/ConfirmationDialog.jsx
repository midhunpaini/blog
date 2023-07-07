import React from "react";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 right-0 mt-8 mr-8 z-50">
      <div className="bg-gray-800 rounded-lg p-8">
        <p className="mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={onCancel}
          >
            No
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

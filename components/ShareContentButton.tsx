
import React, { useState } from 'react';
import { ShareIcon, CheckCircleIcon } from './icons';

interface ShareContentButtonProps {
  textToShare: string;
}

const ShareContentButton: React.FC<ShareContentButtonProps> = ({ textToShare }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToShare);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text. Your browser might not support this feature or permission was denied.');
      }
    } else {
      // Fallback for older browsers or non-secure contexts
      alert('Sharing (copy to clipboard) is not fully supported on your browser. Content:\n\n' + textToShare);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150 ease-in-out
                  ${copied 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-600 hover:bg-gray-500 text-gray-200'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500`}
      title={copied ? "Copied!" : "Share (Copy to Clipboard)"}
    >
      {copied ? (
        <CheckCircleIcon className="h-5 w-5 mr-1.5" />
      ) : (
        <ShareIcon className="h-5 w-5 mr-1.5" />
      )}
      {copied ? 'Copied!' : 'Share'}
    </button>
  );
};

export default ShareContentButton;

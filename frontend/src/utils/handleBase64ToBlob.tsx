import React from "react";

const handleBase64ToBlob = (base64: string, contentType: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new Blob([bytes], { type: contentType });
};

export default handleBase64ToBlob;

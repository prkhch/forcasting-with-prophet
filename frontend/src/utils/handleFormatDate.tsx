import React from "react";

const handleFormatDate = (value: string) => {
  const numericValue = value.replace(/\D/g, "");

  let formattedValue = "";

  if (numericValue.length <= 4) {
    formattedValue = numericValue;
  } else if (numericValue.length <= 6) {
    formattedValue = `${numericValue.slice(0, 4)}-${numericValue.slice(4)}`;
    if (parseInt(numericValue.slice(4)) > 12) {
      formattedValue = `${numericValue.slice(0, 4)}-12`;
    }
  } else if (numericValue.length <= 8) {
    formattedValue = `${numericValue.slice(0, 4)}-${numericValue.slice(4, 6)}-${numericValue.slice(6)}`;
    if (parseInt(numericValue.slice(6)) > 31) {
      formattedValue = `${numericValue.slice(0, 4)}-${numericValue.slice(4, 6)}-31`;
    }
  } else {
    formattedValue = value.slice(0, 10);
  }

  return formattedValue;
};

export default handleFormatDate;

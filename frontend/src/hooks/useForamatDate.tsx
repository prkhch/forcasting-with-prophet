import React from "react";

const useForamatDate = (dateString: string) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
};

export default useForamatDate;

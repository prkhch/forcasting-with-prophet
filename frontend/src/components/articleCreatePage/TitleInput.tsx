import React from "react";

const TitleInput = ({ title, setTitle }: { title: string; setTitle: React.Dispatch<React.SetStateAction<string>> }) => {
  return <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />;
};

export default TitleInput;

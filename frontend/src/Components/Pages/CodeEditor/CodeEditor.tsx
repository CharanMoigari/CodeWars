import React, { useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";

interface CodeEditorProps {
  onChange: (data: string | undefined) => void;
  language?: string;
  code?: string;
  theme?: string;
}

const CodeEditorWindow: React.FC<CodeEditorProps> = ({
  onChange,
  language,
  code,
  theme,
}) => {
  const [value, setValue] = useState<string>(code || "");

  const handleEditorChange=(value:any)=> {
    if (value) {
      setValue(value);
      onChange(value);
    }
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "python"}
        value={value}
        theme={'vs-dark'}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditorWindow;

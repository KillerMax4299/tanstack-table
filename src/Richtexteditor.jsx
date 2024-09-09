import { useState } from "react";
import Editor from "react-simple-wysiwyg";

export default function CustomEditor() {
  const [value, setValue] = useState("simple text");

  function onChange(e) {
    setValue(e.target.value);
  }

  return (
    <>
      <Editor value={value} onChange={onChange} />
    </>
  );
}

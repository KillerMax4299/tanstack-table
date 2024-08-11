import { useState, useEffect, useMemo } from "react";
import CryptoJS from "crypto-js";

const Salting = () => {
  const [text, setText] = useState("");

  const hashed = useMemo(() => {
    const secretKey = "your-secret-key";

    // Encrypt the data
    const encryptedData = CryptoJS.AES.encrypt(text, secretKey).toString();
    return encryptedData
  }, [text]);

  const decrypted = useMemo(() => {
    const secretKey = "your-secret-key";

    // Encrypt the data
    const bytes = CryptoJS.AES.decrypt(hashed, secretKey);
    console.log(bytes.toString(CryptoJS.enc.Utf8));
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedData;
  }, [text]);

  return (
    <div className="p-8">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>{hashed}</div>
      <p></p>
      <div>{ decrypted}</div>
    </div>
  );
};

export default Salting;

import { useState, useEffect, useMemo, useRef } from "react";
import CryptoJS from "crypto-js";

const Salting = () => {
  const [text, setText] = useState("");
  const [secretKey, setSecretKey] = useState("test-secret-key");
  const [selectedOption, setSelectedOption] = useState("decrypt");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const hashed = useMemo(() => {
    // Encrypt the data
    const encryptedData = CryptoJS.AES.encrypt(
      text,
      JSON.stringify(secretKey)
    ).toString();
    return encryptedData;
  }, [text]);

  const decryptKey = useRef(null);
  const encryptedData = useRef(null);
  const [decrypted, setDecrypted] = useState("");

  const handleDecrypt = () => {
    // Encrypt the data
    const bytes = CryptoJS.AES.decrypt(
      encryptedData.current.value,
      JSON.stringify(decryptKey.current.value)
    );
    // console.log(bytes.toString(CryptoJS.enc.Utf8));
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    setDecrypted(decryptedData)
  };
  return (
    <div className="p-8 flex flex-col space-y-4 ">
      <div className="flex space-x-4">
        <label className="flex items-center space-x-1">
          <input
            type="radio"
            value="encrypt"
            checked={selectedOption === "encrypt"}
            onChange={handleOptionChange}
          />
          <span>Encrypt</span>
        </label>
        <label className="flex items-center space-x-1">
          <input
            type="radio"
            value="decrypt"
            checked={selectedOption === "decrypt"}
            onChange={handleOptionChange}
          />
          <span>Decrypt</span>
        </label>
      </div>
      {selectedOption === "encrypt" && (
        <div className="flex flex-col space-y-2">
          <input
            placeholder="type your secret key"
            type="text"
            className="w-1/4"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
          <input
            placeholder="type your message"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div>{hashed}</div>
        </div>
      )}
      {selectedOption === "decrypt" && (
        <div className="flex flex-col space-y-2">
          <input
            placeholder="type your secret key"
            type="text"
            className="w-1/4"
            ref={decryptKey}
          />
          <input
            placeholder="Your encrypted message"
            type="text"
            ref={encryptedData}
          />
          <button onClick={handleDecrypt} className="px-2 bg-blue-500 w-fit rounded text-white">
            Decrypt
          </button>
          <pre>{decrypted}</pre>
        </div>
      )}
      <p></p>
      {/* <div>{decrypted}</div> */}
    </div>
  );
};

export default Salting;

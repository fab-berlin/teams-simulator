'use client';

import {useData} from "@/contexts/data-context";
import {useRef, useState} from "react";

const Header = () => {
  const {loadData} = useData();
  const [filename, setFilename] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadJSONfile = () => {
    fileInputRef.current?.click();
  }

  const handleFileSelect = (evt:React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.currentTarget.files?.[0];
    if (!file) return;
    if (file.type === 'application/json') {
      setFilename(file.name);
      loadData(file);
    }
  }


  return (<header className="py-8">
    <h1 className="text-2xl font-bold">Teams Chat</h1>
    <input type="file" ref={fileInputRef} accept={'.json'} onChange={handleFileSelect} className="absolute opacity-0 pointer-events-none"/>
    <div className="flex flex-row items-baseline justify-between">
      <button className="border hover:bg-gray-200 block py-2 px-4 rounded-md my-4 cursor-pointer" onClick={loadJSONfile}>Datei auswählen</button>
      {filename && <span className="justify-self-end">{filename}</span>}
    </div>

    <hr />
  </header>)
}


export default Header;

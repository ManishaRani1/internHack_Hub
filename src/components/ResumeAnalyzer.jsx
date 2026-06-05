import { useState } from "react"; 
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { db } from "../Firebase"; 
import { collection, addDoc } from "firebase/firestore"; 

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

  const ResumeAnalyzer = () => {

  const saveToFirestore = async (text) => {
    await addDoc(collection(db, "resumes"), {
      resumeText: text,
      createdAt: new Date(),
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    try {
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const strings = content.items.map(item => item.str);
        text += strings.join(" ");
      }

      console.log("TEXT:", text);

      await saveToFirestore(text);

      alert("✅ Saved to Firestore");

    } catch (error) {
      console.error(error);
      alert("❌ Error analyzing resume");
    }
  };

  return (
    <div>
      <h2>Resume Analyzer</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
    </div>
  );
};

export default ResumeAnalyzer;
import React from 'react';
import { Link } from 'react-router-dom';
function App() {
  const handleResumeUpload = () => {
  };

  const handleJobDescriptionUpload = () => {
  };

  return (
    <div className="container">
      <h1 className="title">Upload Your Resume</h1>
      <p className="subtitle">We support .pdf and .doc, .docx formats</p>

      <div className="button-container">
        <button className="upload-button" onClick={handleResumeUpload}>
          Upload resume
        </button>
        <button className="upload-button" onClick={handleJobDescriptionUpload}>
          Upload Job Description
        </button>
      </div>

      <p className="warning">Must upload the Job Description or Resume to continue</p>
    </div>
  );
}

export default UploadResume;
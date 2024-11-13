import { useState } from 'react';
import './ApplicantResumeAnalysis.css';

export const ApplicantResumeAnalysis = () => {
    const [resume, setResume] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState<File | null>(null);
    const [analysisType, setAnalysisType] = useState<'general' | 'job-specific'>('general');

    return (
        <div className="applicant-resume-analysis-container">
            <div className="selection-card">
                <h2>Resume Analysis</h2>
                <div className="selection-options">
                    <label>Analysis Type</label>
                    <select value={analysisType} onChange={(e) => setAnalysisType(e.target.value as 'general' | 'job-specific')}>
                        <option value="general">General Resume Analysis</option>
                        <option value="job-specific">Job Description Specific Analysis</option>
                    </select>
                </div>
                <div className="file-upload">
                    <label>Upload Resume</label>
                    <input type="file" onChange={(e) => e.target.files && setResume(e.target.files[0])} />
                </div>
                {analysisType === 'job-specific' && (
                    <div className="file-upload">
                        <label>Upload Job Description</label>
                        <input type="file" onChange={(e) => e.target.files && setJobDescription(e.target.files[0])} />
                    </div>
                )}
                <button>Analyze Resume</button>
            </div>
            <div className="output-card">
                <h3>Analysis Results</h3>
                <div className="result-content">
                    {/* Placeholder for displaying analysis results */}
                    <p>Results will appear here after analysis.</p>
                </div>
            </div>
        </div>
    );
};

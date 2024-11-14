import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
} from '@mui/material';
import './ApplicantResumeAnalysis.css';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { getResume } from 'src/redux/slices/resumeSlice';
import moment from 'moment';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';

export const ApplicantResumeAnalysis = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getResume());
  }, []);
  const resumes = useSelector((state: RootState) => state.resume);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImportResume = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFile(null);
  };

  const handleProceed = () => {
    setIsLoading(true);
    alert(`Proceeding with file: ${selectedFile.name}`);
    console.log(selectedFile);
    handleCloseDialog();
    setIsLoading(false);
  };

  const onDrop = (acceptedFiles: any) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] },
  });

  return (
    <Container maxWidth="lg" className="container">
      <div className="import-button-container">
        <Button variant="contained" color="primary" onClick={handleImportResume}>
          Import Resume
        </Button>
      </div>

      <Grid container spacing={3}>
        {resumes.response.map((resume) => (
          <Grid item xs={12}>
            <Card className="card">
              <CardContent className="card-content">
                <div>
                  <Typography className="card-title">
                    {resume.storage.name}
                  </Typography>
                  <Typography className="card-subtitle">
                    Date Uploaded: {moment(resume.createdAt).format('D MMM YYYY')}
                  </Typography>
                </div>
                <KeyboardArrowRightIcon />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Select a Resume to Upload</DialogTitle>
        <DialogContent dividers>
          <div className="dialogContent" {...(!selectedFile ? getRootProps() : {})}>
            <input {...getInputProps()} />
            {!selectedFile ? (
              <p>Drag 'n' drop a file here, or click to select a file</p>
            ) : (
              <div className="file-details">
                <div className="file-info">
                  <div className="file-info-text">
                    <Typography variant="body1">
                      <strong>File Name:</strong> {selectedFile.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)}{' '}
                      KB
                    </Typography>
                  </div>
                  <IconButton
                    className="close-button"
                    onClick={() => setSelectedFile(null)}
                    color="error"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
                <Button
                  className="proceed-button"
                  variant="contained"
                  disabled={isLoading}
                  onClick={handleProceed}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Proceed'
                  )}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

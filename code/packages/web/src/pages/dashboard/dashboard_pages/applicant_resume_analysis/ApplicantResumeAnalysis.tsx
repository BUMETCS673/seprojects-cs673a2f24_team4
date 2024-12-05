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
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import './ApplicantResumeAnalysis.css';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { getResume } from 'src/redux/slices/resumeSlice';
import { uploadFile } from 'src/redux/slices/uploadSlice';
import { createResume } from 'src/redux/slices/resumeSlice';
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

  const [page, setPage] = useState(1);
  const cardsPerPage = 5;

  const [sortOption, setSortOption] = useState('date');

  const handleImportResume = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFile(null);
  };

  const handleProceed = async () => {
    setIsLoading(true);
    const blob = new Blob([selectedFile], { type: selectedFile.type });
    const uploadResponse = await dispatch(
      uploadFile({ fileData: blob, fileName: selectedFile.name }),
    );
    console.log(uploadResponse);
    await dispatch(
      createResume({ storageId: uploadResponse.payload.id, fileData: blob }),
    );
    await dispatch(getResume());
    setIsLoading(false);
    setOpenDialog(false);
    setSelectedFile(null);
  };

  const onDrop = (acceptedFiles: any) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] },
  });

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setPage(1);
  };

  const sortedResumes = [...resumes.response].sort((a, b) => {
    if (sortOption === 'name') {
      return a.storage.name.localeCompare(b.storage.name);
    } else if (sortOption === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const indexOfLastCard = page * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sortedResumes.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <Container maxWidth="lg" className="container">
      <div className="toolbar">
        <div className="toolbar-actions">
          <Button
            variant="contained"
            color="primary"
            onClick={handleImportResume}
            style={{ marginRight: 10 }}
          >
            Import Resume
          </Button>

          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOption} onChange={handleSortChange} label="Sort By">
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="date">Date Uploaded</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <Typography variant="subtitle1" style={{ margin: '20px 0' }}>
        Showing {currentCards.length} of {sortedResumes.length} results
      </Typography>

      <Grid container spacing={3}>
        {currentCards.map((resume) => (
          <Grid item xs={12} key={resume.storage.name}>
            <Card className="card">
              <CardContent className="card-content">
                <div>
                  <Typography className="card-title">
                    {resume.storage.name}
                  </Typography>
                  <Typography className="card-subtitle">
                    Date Uploaded:{' '}
                    {moment(resume.createdAt).format('D MMM YYYY hh:mm:ss')}
                  </Typography>
                  <Stack
                    direction="row"
                    sx={{
                      width: 1000,
                      justifyContent: 'space-evenly',
                      alignContent: { xs: 'center', sm: 'flex-start' },
                      alignItems: 'center',
                      marginTop: 4,
                      marginBottom: 2,
                    }}
                  >
                    <Stack
                      direction="column"
                      sx={{ alignItems: 'center', alignContent: 'flex-start' }}
                    >
                      <Typography variant="h6" color="warning">
                        Impact
                      </Typography>
                      <Typography variant="subtitle1">
                        <>{resume.impactScore ?? 0}%</>
                      </Typography>
                    </Stack>
                    <Stack
                      direction="column"
                      sx={{ alignItems: 'center', alignContent: 'flex-start' }}
                    >
                      <Typography variant="h6" color="info">
                        Presentation
                      </Typography>
                      <Typography variant="subtitle1">
                        <>{resume.presentationScore ?? 0}%</>
                      </Typography>
                    </Stack>
                    <Stack
                      direction="column"
                      sx={{ alignItems: 'center', alignContent: 'flex-start' }}
                    >
                      <Typography variant="h6" color="success">
                        Competency
                      </Typography>
                      <Typography variant="subtitle1">
                        <>{resume.competencyScore ?? 0}%</>
                      </Typography>
                    </Stack>
                  </Stack>
                </div>
                <KeyboardArrowRightIcon />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(sortedResumes.length / cardsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />

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
                      <strong>File Name:</strong> {selectedFile?.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Size:</strong> {(selectedFile?.size / 1024).toFixed(2)}{' '}
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

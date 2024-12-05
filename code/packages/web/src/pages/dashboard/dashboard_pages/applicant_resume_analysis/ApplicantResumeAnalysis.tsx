import React, { useEffect, useState } from 'react';
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
  DialogActions,
} from '@mui/material';
import './ApplicantResumeAnalysis.css';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useAppDispatch } from 'src/redux/hooks';
import { getResume, deleteResume } from 'src/redux/slices/resumeSlice';
import { uploadFile } from 'src/redux/slices/uploadSlice';
import { createResume } from 'src/redux/slices/resumeSlice';
import moment from 'moment';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDropzone } from 'react-dropzone';

export const ApplicantResumeAnalysis = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getResume());
  }, [dispatch]);

  const resumes = useSelector((state: RootState) => state.resume);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const cardsPerPage = 5;

  const [sortOption, setSortOption] = useState('name');

  const [resumeToDelete, setResumeToDelete] = useState<ResumeResponse | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleImportResume = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFile(null);
  };

  const handleProceed = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    try {
      const blob = new Blob([selectedFile], { type: selectedFile.type });
      const uploadResponse = await dispatch(
        uploadFile({ fileData: blob, fileName: selectedFile.name }),
      );
      await dispatch(createResume({ storageId: uploadResponse.payload.id }));
    } catch (error) {
      console.error('Failed to upload resume:', error);
    } finally {
      setIsLoading(false);
      setOpenDialog(false);
      setSelectedFile(null);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
    },
  });

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortOption(event.target.value as string);
    setPage(1);
  };

  const handleDeleteClick = (resume: ResumeResponse) => {
    setResumeToDelete(resume);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteResume = async () => {
    if (!resumeToDelete) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteResume(resumeToDelete.id));
    } catch (error) {
      console.error('Failed to delete resume:', error);
    } finally {
      setIsDeleting(false);
      setOpenDeleteDialog(false);
      setResumeToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setResumeToDelete(null);
  };

  const sortedResumes = [...resumes.response].sort((a, b) => {
    if (sortOption === 'name') {
      return a.storage.name.localeCompare(b.storage.name);
    } else if (sortOption === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
          <Grid item xs={12} key={resume.id.toString()}>
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
                </div>
                <div className="card-actions">
                  <IconButton
                    onClick={() => handleDeleteClick(resume)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <KeyboardArrowRightIcon />
                </div>
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the resume "
            {resumeToDelete?.storage.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteResume}
            color="error"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Delete'
            )}
          </Button>
        </DialogActions>
      </Dialog>

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
                      <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
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

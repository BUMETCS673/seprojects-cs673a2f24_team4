import { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material';
import styles from './JobDetails.module.css';
import moment from 'moment';
import { useJobDetails } from './useJobDetail';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getResume } from 'src/redux/slices/resumeSlice';
import { postApplication } from 'src/redux/slices/applicationSlice';

const JobDetails = () => {
  const { jobId } = useParams();
  const resumes = useSelector((state: RootState) => state.resume);
  const jobs = useSelector((state: RootState) => state.job);
  const jobData = jobs.response?.find((job) => job.id == jobId);
  console.log(jobData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getResume());
  }, [dispatch]);

  const userDetails = useAppSelector((state: RootState) => state.me);
  const userGroup = userDetails.response?.user?.group;

  const jobDetail = useJobDetails(jobId as string);

  // State to control the dialog open/close
  const [open, setOpen] = useState(false);

  // State to store the selected resume entry
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  // State to control the visibility of the applications table
  const [showApplications, setShowApplications] = useState(false);

  // State to keep track of selected applications
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);

  // State to store shortlisted applications
  const [shortlistedApplications, setShortlistedApplications] = useState<any[]>([]);

  // List of resume names
  const resumeNames =
    resumes.response?.map((resume) => {
      return { id: resume.id, name: resume.storage.name };
    }) || [];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = async () => {
    if (jobId && selectedEntry) {
      await dispatch(
        postApplication({ jobListingId: jobId, resumeId: selectedEntry }),
      );
    }
    setOpen(false);
  };

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedEntry(event.target.value);
  };

  const handleShortlist = () => {
    const shortlisted = jobData?.Applications.filter((application) =>
      selectedApplications.includes(application.id)
    );
    if (shortlisted){
    setShortlistedApplications(shortlisted);
    }
    // Optionally clear selected applications after shortlisting
    setSelectedApplications([]);
  };

  return (
    <div className={styles.job_details_wrapper}>
      <Typography component="h1" variant="h3" className={styles.title}>
        {jobDetail?.title}
      </Typography>

      <span className={styles.job_detail_demographics}>
        Posted on: {moment(jobDetail?.createdAt).format('MM/DD/yyyy')}
      </span>

      <div className={styles.apply_button}>
        {userGroup === 'user' ? (
          <Button variant="contained" onClick={handleClickOpen}>
            Apply
          </Button>
        ) : null}
      </div>

      <div>{jobDetail?.description}</div>

      <Typography component="h1" variant="h5" className={styles.title}>
        Core Requirements
      </Typography>

      <div>{jobDetail?.coreRequirements}</div>

      {/* Applications Button - Visible only to recruiters */}
      {userGroup === 'recruiter' && (
        <div style={{ marginTop: '20px' }}>
          <Button
            variant="contained"
            onClick={() => setShowApplications((prev) => !prev)}
          >
            {showApplications ? 'Hide Applications' : 'Show Applications'}
          </Button>
          {showApplications && (
            <Button
              variant="contained"
              onClick={handleShortlist}
              disabled={selectedApplications.length === 0}
              style={{ marginLeft: '10px' }}
            >
              Shortlist
            </Button>
          )}
        </div>
      )}

      {/* Applications Table - Visible only to recruiters */}
      {userGroup === 'recruiter' &&
        showApplications &&
        jobData?.Applications &&
        jobData.Applications.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <Typography component="h1" variant="h5" className={styles.title}>
              Applications ({jobData.Applications.length})
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      {/* Optional: Add a "Select All" checkbox here */}
                    </TableCell>
                    <TableCell>Application ID</TableCell>
                    <TableCell>Resume ID</TableCell>
                    <TableCell>Impact</TableCell>
                    <TableCell>Presentation</TableCell>
                    <TableCell>Competency</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobData.Applications.map((application) => {
                    const isSelected = selectedApplications.includes(application.id);
                    return (
                      <TableRow key={application.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) => {
                              const checked = event.target.checked;
                              setSelectedApplications((prevSelected) => {
                                if (checked) {
                                  return [...prevSelected, application.id];
                                } else {
                                  return prevSelected.filter(
                                    (id) => id !== application.id
                                  );
                                }
                              });
                            }}
                            inputProps={{ 'aria-label': 'select application' }}
                          />
                        </TableCell>
                        <TableCell>{application.id || 'N/A'}</TableCell>
                        <TableCell>{application.resume?.id || 'N/A'}</TableCell>
                        <TableCell>
                          {application.resume?.impactScore || 'N/A'}
                        </TableCell>
                        <TableCell>
                          {application.resume?.presentationScore || 'N/A'}
                        </TableCell>
                        <TableCell>
                          {application.resume?.competencyScore || 'N/A'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

      {/* Shortlisted Applications Table */}
      {shortlistedApplications.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Typography component="h1" variant="h5" className={styles.title}>
            Shortlisted Applications ({shortlistedApplications.length})
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Application ID</TableCell>
                  <TableCell>Resume ID</TableCell>
                  <TableCell>Impact</TableCell>
                  <TableCell>Presentation</TableCell>
                  <TableCell>Competency</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shortlistedApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.id || 'N/A'}</TableCell>
                    <TableCell>{application.resume?.id || 'N/A'}</TableCell>
                    <TableCell>
                      {application.resume?.impactScore || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {application.resume?.presentationScore || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {application.resume?.competencyScore || 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Dialog Component */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a Resume</DialogTitle>
        <DialogContent>
          <RadioGroup value={selectedEntry} onChange={handleSelectionChange}>
            {resumeNames.map((entry) => (
              <FormControlLabel
                key={entry.id}
                value={entry.id}
                control={<Radio />}
                label={entry.name}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {userGroup === 'user' ? (
            <Button variant="contained" onClick={handleApply}>
              Apply
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobDetails;

import { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  FormControlLabel,
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
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getResume());
  }, []);
  const userDetails = useAppSelector((state: RootState) => state.me);
  const userGroup = userDetails.response?.user?.group;

  const jobDetail = useJobDetails(jobId as string);

  // State to control the dialog open/close
  const [open, setOpen] = useState(false);

  // State to store the selected entry
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  // Sample list entries (replace with your actual data)
  const resumeNames = resumes.response?.map((resume) => {
    return { id: resume.id, name: resume.storage.name };
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = async () => {
    console.log('Applying with entry:', selectedEntry);
    if (jobId && selectedEntry) {
      const { payload } = await dispatch(
        postApplication({ jobListingId: jobId, resumeId: selectedEntry }),
      );
    }
    setOpen(false);
  };

  const handleSelectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEntry(event.target.value);
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

      {/* Dialog Component */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select an Option</DialogTitle>
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
          {userGroup == 'user' ? (
            <Button variant="contained" onClick={handleApply}>
              Apply
            </Button>
          ) : (
            <></>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobDetails;

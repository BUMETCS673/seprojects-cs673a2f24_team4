import { Typography } from '@mui/material';
import styles from './JobDetails.module.css';
import moment from 'moment';
import { useJobDetails } from './useJobDetail';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { jobId } = useParams();

  const jobDetail = useJobDetails(jobId as string);

  return (
    <div className={styles.job_details_wrapper}>
      <Typography component="h1" variant="h3" className={styles.title}>
        {jobDetail?.title}
      </Typography>

      <span className={styles.job_detail_demographics}>
        Company | Location | {moment(jobDetail?.createdAt).format('mm/DD/yyyy')}
      </span>

      <div>{jobDetail?.description}</div>
    </div>
  );
};

export default JobDetails;

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./createJobListing.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/redux/hooks";
import { createJob } from "src/redux/slices/jobSlice";
import { ROUTES } from 'src/react_router/routes';

export const CreateJobListings = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coreRequirements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job Listing Submitted:", formData);
    const {payload} = await dispatch(createJob(formData))
    console.log(payload)
    navigate(ROUTES.jobListings);
  };

  return (
    <Box className={styles.container}>
      <Typography component="h1" className={styles.title}>
        Create Job Listing
      </Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.textField}
          InputProps={{
            style: { fontSize: "1rem", color: "#fff" },
          }}
          InputLabelProps={{
            style: { fontSize: "1rem", color: "#cfcfcf" },
          }}
          variant="outlined"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`${styles.textField} ${styles.multiline}`}
          multiline
          rows={3} // Set initial rows to 3
          InputProps={{
            style: { fontSize: "1.2rem", color: "#fff" },
          }}
          InputLabelProps={{
            style: { fontSize: "1.2rem", color: "#cfcfcf" },
          }}
          variant="outlined"
          required
        />
        <TextField
          label="Core Requirements"
          name="coreRequirements"
          value={formData.coreRequirements}
          onChange={handleChange}
          className={`${styles.textField} ${styles.multiline}`}
          multiline
          rows={8} // Set initial rows to 8
          InputProps={{
            style: { fontSize: "1.2rem", color: "#fff" },
          }}
          InputLabelProps={{
            style: { fontSize: "1.2rem", color: "#cfcfcf" },
          }}
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="contained"
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateJobListings;

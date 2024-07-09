import express from "express";
import { employerGetAllApplication,jobSeekerDeleteApplication,jobseekerGetAllApplications, postApplication } from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/jobseeker/getall",isAuthorized,jobseekerGetAllApplications);
router.get("/employer/getall",isAuthorized,employerGetAllApplication);
router.delete("/delete/:id",isAuthorized,jobSeekerDeleteApplication);
router.post("/post",isAuthorized,postApplication);

export default router;
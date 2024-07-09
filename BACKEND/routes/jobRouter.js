import express from "express";
import {getAllJobs,postJob,getmyJobs,updateJob, deleteJob, getSinglejob} from "../controllers/jobController.js";
import {isAuthorized} from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall",getAllJobs);
router.post("/post",isAuthorized,postJob);//pehle isAuthorized run hoga aur use baad postJob run hoga
router.get("/getmyjobs",isAuthorized,getmyJobs);
router.put("/update/:id",isAuthorized,updateJob);// :id is the param...computer kaise samjhe ga ki hume kaunsa job ko update karna hain..hum toh frontend pe sirf click karte jayenge
router.delete("/delete/:id",isAuthorized,deleteJob);
router.get("/:id",isAuthorized,getSinglejob);


export default router;
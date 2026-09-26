import { Router, type IRouter } from "express";
import healthRouter from "./health";
import swasthyaRouter from "./swasthyasaathi";

const router: IRouter = Router();

router.use(healthRouter);
router.use(swasthyaRouter);

export default router;

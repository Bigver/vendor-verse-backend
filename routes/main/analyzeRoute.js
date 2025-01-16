import express from "express";
import {
  DailyIncome,
  MonthlyIncome,
  YearlyIncome,
  OverviewWebsite
} from "../../controller/main/analyzeController.js";

const router = express.Router();

router.get("/dayly/:date/:month/:year", DailyIncome);
router.get("/monthly/:date/:month/:year", MonthlyIncome);
router.get("/yearly/:date/:month/:year", YearlyIncome);
router.get("/overview", OverviewWebsite);
 
export default router;

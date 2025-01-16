import express from "express";
import {
  DailyIncome,
  MonthlyIncome,
  YearlyIncome,
  OverviewWebsite
} from "../../controller/restaurant/analyzeController.js";

const router = express.Router();

router.get("/dayly/:store_id/:date/:month/:year", DailyIncome);
// router.get("/weekly/:store_id/:date/:month/:year", WeeklyIncome);
router.get("/monthly/:store_id/:date/:month/:year", MonthlyIncome);
router.get("/yearly/:store_id/:date/:month/:year", YearlyIncome);
router.get("/overview/:store_id", OverviewWebsite);
 
export default router;

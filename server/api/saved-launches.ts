import { defineEventHandler } from "h3";
import LaunchModel from "../models/launch.model"; // Adjust path as needed

export default defineEventHandler(async () => {
  try {
    const savedLaunches = await LaunchModel.find()
      .sort({ date_utc: -1 })
      .exec();
    return savedLaunches;
  } catch (error) {
    console.error("Error fetching saved launches", error);
    return [];
  }
});

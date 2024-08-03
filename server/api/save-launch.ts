import { defineEventHandler } from "h3";
import LaunchModel from "../models/launch.model";

export default defineEventHandler(async (event) => {
  const launch = await readBody(event);
  try {
    const existingLaunch = await LaunchModel.findOne({
      flight_number: launch.flight_number,
    });
    if (existingLaunch) {
      await LaunchModel.deleteOne({ flight_number: launch.flight_number });
      return { message: "Removed from saved launches" };
    } else {
      await LaunchModel.create(launch);
      return { message: "Saved to launches" };
    }
  } catch (error) {
    console.error("Error saving/removing launch:", error);
    return { message: "Failed to save/remove launch" };
  }
});

import { defineEventHandler } from "h3";
import LaunchModel from "../models/launch.model";

export default defineEventHandler(async (event) => {
  const launch = await readBody(event);
  try {
    await LaunchModel.deleteOne({ flight_number: launch.flight_number });
    return { message: "Removed from saved launches" };
  } catch (error) {
    console.error("Error removing launch:", error);
    return { message: "Failed to remove launch" };
  }
});

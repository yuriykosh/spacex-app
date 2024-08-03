interface Launch {
  flight_number: number;
  name: string;
  date_utc: string;
}

export default defineEventHandler(async () => {
  try {
    console.log("Fetching SpaceX launches from API");
    const response = await fetch("https://api.spacexdata.com/v4/launches");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const launches: Launch[] = await response.json(); // Type the response data
    // console.log("Fetched launches successfully:", launches);
    const result: Launch[] = launches
      .slice(0, 30)
      .map(({ flight_number, name, date_utc }) => ({
        flight_number,
        name,
        date_utc,
      }));
    return result;
  } catch (error) {
    console.error("Error fetching launches", error);
    return [];
  }
});

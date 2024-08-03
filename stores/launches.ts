import { defineStore } from "pinia";
import { ref } from "vue";

export type Launch = {
  flight_number: number;
  name: string;
  date_utc: string;
};

export const useLaunchesStore = defineStore("launches", () => {
  const launches = ref<Launch[]>([]);
  const savedLaunches = ref<Launch[]>([]);

  async function fetchLaunches() {
    const response = await fetch("https://api.spacexdata.com/v4/launches");
    launches.value = await response.json();
  }

  async function fetchSavedLaunches() {
    const saved = localStorage.getItem("savedLaunches");
    if (saved) {
      savedLaunches.value = JSON.parse(saved);
    }
  }

  function saveLaunch(launch: Launch) {
    if (
      !savedLaunches.value.some((l) => l.flight_number === launch.flight_number)
    ) {
      savedLaunches.value.push(launch);
      localStorage.setItem(
        "savedLaunches",
        JSON.stringify(savedLaunches.value)
      );
    }
  }

  function unsaveLaunch(flight_number: number) {
    savedLaunches.value = savedLaunches.value.filter(
      (l) => l.flight_number !== flight_number
    );
    localStorage.setItem("savedLaunches", JSON.stringify(savedLaunches.value));
  }

  return {
    launches,
    savedLaunches,
    fetchLaunches,
    fetchSavedLaunches,
    saveLaunch,
    unsaveLaunch,
  };
});

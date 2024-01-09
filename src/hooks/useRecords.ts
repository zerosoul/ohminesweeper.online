import { useAppSelector } from "@/redux/hooks";
import { Level, PlayRecord } from "@/types";
import { useEffect, useState } from "react";
type Filter = {
  level: Level | "all";
  result: "win" | "lose" | "all";
  //   time: number | "";
};
export const defaultFilter: Filter = {
  level: "all",
  result: "all"
  // time: ""
};
const useRecords = () => {
  const records = useAppSelector((state) => state.userData.records);
  const [filteredRecords, setFilteredRecords] = useState<PlayRecord[]>([]);
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [best, setBest] = useState<Record<Exclude<Level, "custom">, PlayRecord | null>>({
    beginner: null,
    intermediate: null,
    expert: null
  });
  useEffect(() => {
    if (records.length > 0) {
      const beginners = records
        .filter((r) => r.level == "beginner" && r.status == "win")
        .sort((a, b) => a.duration - b.duration);
      const intermediates = records
        .filter((r) => r.level == "intermediate" && r.status == "win")
        .sort((a, b) => a.duration - b.duration);
      const experts = records
        .filter((r) => r.level == "expert" && r.status == "win")
        .sort((a, b) => a.duration - b.duration);
      setBest((prev) => ({
        ...prev,
        beginner: beginners[0] ?? null,
        intermediate: intermediates[0] ?? null,
        expert: experts[0] ?? null
      }));
    }
  }, [records]);
  useEffect(() => {
    if (records.length > 0) {
      const filtered = records.filter((r) => {
        if (filter.level !== "all" && r.level != filter.level) {
          return false;
        }
        if (filter.result !== "all" && r.status != filter.result) {
          return false;
        }
        // if (filter.time && r.duration != filter.time) {
        //   return false;
        // }
        return true;
      });
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords([]);
    }
  }, [records, filter]);
  const updateFilter = (filter: Partial<Filter>) => {
    setFilter((prev) => {
      return { ...prev, ...filter };
    });
  };
  return {
    records: filteredRecords,
    best,
    filter,
    updateFilter
  };
};

export default useRecords;

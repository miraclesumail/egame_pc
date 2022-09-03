import React, { CSSProperties, FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNumberPart } from "@/utils/tool";

const chipsUnit = [25, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000];

const useQuery = () => {
  const { chipsStack } = useSelector((state: any) => state.bet);

  const sumMap = useMemo(() => {
    const sumMap: Record<string, number> = {};
  
    for (const [key, value] of Object.entries(chipsStack)) {
      sumMap[key] = (value as number[]).reduce(
        (prev: number, next: number) => prev + chipsUnit[next],
        0
      );
    }

    return sumMap;
  }, [chipsStack]);

  const chipsMap = useMemo(() => {
    const chipsMap: Record<string, number[]> = {};
    for (const [key, value] of Object.entries(sumMap)) {
      chipsMap[key] = getNumberPart(value, chipsUnit);
    }

    return chipsMap;
  }, [sumMap]);

  return {
    sumMap,
    chipsMap,
  };
};

export default useQuery;

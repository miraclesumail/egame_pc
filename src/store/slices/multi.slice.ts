import { RootState } from "@/store";
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

type DropDown = {
  area: string;
  limitRed: string;
  tableRed: string;
  interval: string;
};

export enum DeskStatus {
  OPEN = "OPEN",
  COUNT = "COUNT",
  DISABLE = "DISABLE",
}

export enum BetType {
  BANKER = "banker",
  PLAYER = "player",
  TIE = "tie",
  PDOUBLE = "playerDouble",
  BDOUBLE = "bankerDouble",
}

export enum DeskResult {
  BANKER = "BANKER",
  PLAYER = "PLAYER",
  TIE = "TIE",
  NONE = "",
}
interface State {
  currentDesk: Array<number | string>;
  queues: Array<{ current: number; category: string }>;
  current: number;
  showResult: DeskResult;
  /** 桌台状态 开放 倒计时 停止下注 */
  deskStatus: DeskStatus;
  askMode: string;
  chipsStack: any;
  /** 是否处于开奖 */
  isNowLottery: boolean;
  /** 截止目前所有的开奖 */
  currentResult: string;
}

const name = "multi";

const initialState: State = {
  currentDesk: [0, 0, 0, 0],
  current: 0,
  deskStatus: DeskStatus.OPEN,
  askMode: "",
  queues: [],
  chipsStack: [
    // {
    //   playerDouble: [],
    //   tie: [],
    //   bankerDouble: [],
    //   player: [],
    //   banker: []
    // },
  ],
  isNowLottery: false,
  currentResult: "tpbppbbtttwefijkbpbghijkbbpt",
  showResult: DeskResult.NONE,
};

const betSlice = createSlice({
  name,
  initialState,
  reducers: {
    setQueues(
      state,
      action: PayloadAction<Array<{ current: number; category: string }>>
    ) {
      state.queues = action.payload;
    },
    setCurrentDesk(state, action: PayloadAction<Array<number | string>>) {
      state.currentDesk = action.payload;
    },
    setShowResult(state, action: PayloadAction<DeskResult>) {
      state.showResult = action.payload;
    },
    setDeskStatus(state, action: PayloadAction<DeskStatus>) {
      state.deskStatus = action.payload;
    },
    addNewDesk(state) {
      state.chipsStack = [
        ...state.chipsStack,
        {
          playerDouble: [],
          tie: [],
          bankerDouble: [],
          player: [],
          banker: [],
        },
      ];
    },
    setChipsStack(state, action: PayloadAction<any>) {
      console.log("PayloadActionPayloadAction", action.payload);
      const { desk, chipStack } = action.payload;
      state.chipsStack[desk] = chipStack;
    },
    resetChipsStack(state, action: PayloadAction<number>) {
      state.chipsStack[action.payload] = {
        playerDouble: [],
        tie: [],
        
        bankerDouble: [],
        player: [],
        banker: [],
      };
    },
    setCurrent(state, action: PayloadAction<number>) {
      console.log(action, "actionactionaction");
      state.current = action.payload;
    },
    setIsLottery(state, action: PayloadAction<boolean>) {
      state.isNowLottery = action.payload;
    },
    setCurrentResult(state, action: PayloadAction<string>) {
      state.currentResult = action.payload;
    },
  },
});

export const selectCurrentDesk = (state: { [x: string]: any }) =>
  state.multi.currentDesk;

export const {
  setCurrent,
  setQueues,
  setChipsStack,
  resetChipsStack,
  setIsLottery,
  setDeskStatus,
  setShowResult,
  setCurrentResult,
  setCurrentDesk,
} = betSlice.actions;

export default betSlice.reducer;

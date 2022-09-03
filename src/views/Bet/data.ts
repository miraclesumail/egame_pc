import chip1 from "@/assets/images/bet/chips/chip25.png";
import chip2 from "@/assets/images/bet/chips/chip50.png";
import chip3 from "@/assets/images/bet/chips/chip100.png";
import chip4 from "@/assets/images/bet/chips/chip500.png";
import chip5 from "@/assets/images/bet/chips/chip1000.png";
import chip6 from "@/assets/images/bet/chips/chip5000.png";
import chip7 from "@/assets/images/bet/chips/chip10000.png";
import chip8 from "@/assets/images/bet/chips/chip50000.png";
import chip9 from "@/assets/images/bet/chips/chip100000.png";
import chip10 from "@/assets/images/bet/chips/chip500000.png";
import chips1 from "@/assets/images/bet/chips/chipActive25.png";
import chips2 from "@/assets/images/bet/chips/chipActive50.png";
import chips3 from "@/assets/images/bet/chips/chipActive100.png";
import chips4 from "@/assets/images/bet/chips/chipActive500.png";
import chips5 from "@/assets/images/bet/chips/chipActive1000.png";
import chips6 from "@/assets/images/bet/chips/chipActive5000.png";
import chips7 from "@/assets/images/bet/chips/chipActive10000.png";
import chips8 from "@/assets/images/bet/chips/chipActive50000.png";
import chips9 from "@/assets/images/bet/chips/chipActive100000.png";
import chips10 from "@/assets/images/bet/chips/chipActive500000.png";

import chipS1 from "@/assets/images/bet/chips/25-C.svg";
import chipS2 from "@/assets/images/bet/chips/50-C.svg";
import chipS3 from "@/assets/images/bet/chips/100-C.svg";
import chipS4 from "@/assets/images/bet/chips/500-C.svg";
import chipS5 from "@/assets/images/bet/chips/1000-C.svg";
import chipS6 from "@/assets/images/bet/chips/5000-C.svg";
import chipS7 from "@/assets/images/bet/chips/10000-C.svg";
import chipS8 from "@/assets/images/bet/chips/50000-C.svg";
import chipS9 from "@/assets/images/bet/chips/100000-C.svg";
import chipS10 from "@/assets/images/bet/chips/500000-C.svg";

export const chips = [
  {
    src: chip1,
    activeSrc: chips1,
  },
  {
    src: chip2,
    activeSrc: chips2,
  },
  {
    src: chip3,
    activeSrc: chips3,
  },
  {
    src: chip4,
    activeSrc: chips4,
  },
  {
    src: chip5,
    activeSrc: chips5,
  },
  {
    src: chip6,
    activeSrc: chips6,
  },
  {
    src: chip7,
    activeSrc: chips7,
  },
  {
    src: chip8,
    activeSrc: chips8,
  },
  {
    src: chip9,
    activeSrc: chips9,
  },
  {
    src: chip10,
    activeSrc: chips10,
  },
];

export const smallChips = [
  chipS1,
  chipS2,
  chipS3,
  chipS4,
  chipS5,
  chipS6,
  chipS7,
  chipS8,
  chipS9,
  chipS10,
];

export const keyframes: any = {
  banker: [
    [{ transform: "translate(0)" }, { transform: "translate(-455px, -130px)" }],
    [{ transform: "translate(0)" }, { transform: "translate(-510px, -130px)" }],
    [{ transform: "translate(0)" }, { transform: "translate(-565px, -130px)" }],
    [{ transform: "translate(0)" }, { transform: "translate(-620px, -130px)" }],
    [{ transform: "translate(0)" }, { transform: "translate(-675px, -130px)" }],
    [{ transform: "translate(0)" }, { transform: "translate(-730px, -130px)" }],
  ],
  player: [
    [{ transform: "translate(0)" }, { transform: "translate(-530px, -88px)" }],
    [{ transform: "translate(0)" }, { transform: "translate(-585px, -88px)" }],
    [{ transform: "translate(0)" }, { transform: "translate(-640px, -88px)" }],
    [{ transform: "translate(0)" }, { transform: "translate(-695px, -88px)" }],
    [{ transform: "translate(0)" }, { transform: "translate(-750px, -88px)" }],
    [{ transform: "translate(0)" }, { transform: "translate(-805px, -88px)" }],

  ],
  tie: [
    { transform: "translate(0)" },
    { transform: "translate(-290px, -175px)" },
  ],
};

// canvas画图模拟数据
export const roundData = {
    GD051227310K3: {
      banker_val: '8',
      player_val: '1',
      card_num: '4',
      pair: '3',
      timestamp: 1659259397365
    },
    GD051227310K0: {
      banker_val: '8',
      player_val: '8',
      card_num: '4',
      pair: '0',
      timestamp: 1659259397365
    },
    GD051227310K011: {
      banker_val: '8',
      player_val: '8',
      card_num: '4',
      pair: '0',
      timestamp: 1659259397365
    },
    GD051227310K012: {
      banker_val: '8',
      player_val: '8',
      card_num: '4',
      pair: '0',
      timestamp: 1659259397365
    },
    GD051227310L5: {
      banker_val: '2',
      player_val: '8',
      card_num: '4',
      pair: '0',
      timestamp: 1659260898135
    },
    GD051227310L6: {
      banker_val: '4',
      player_val: '7',
      card_num: '5',
      pair: '1',
      timestamp: 1659260940266
    },
    GD051227310L7: {
      banker_val: '5',
      player_val: '9',
      card_num: '4',
      pair: '0',
      timestamp: 1659260982267
    },
    GD051227310L8: {
      banker_val: '5',
      player_val: '7',
      card_num: '6',
      pair: '0',
      timestamp: 1659261027055
    },
    GD051227310L9: {
      banker_val: '6',
      player_val: '6',
      card_num: '4',
      pair: '2',
      timestamp: 1659261069072
    },
    GD051227310K02: {
      banker_val: '8',
      player_val: '8',
      card_num: '4',
      pair: '0',
      timestamp: 1659259397365
    },
    GD051227310LA: {
      banker_val: '3',
      player_val: '5',
      card_num: '6',
      pair: '0',
      timestamp: 1659261112509
    },
    GD051227310LB: {
      banker_val: '4',
      player_val: '8',
      card_num: '4',
      pair: '1',
      timestamp: 1659261154927
    },
    GD051227310LC: {
      banker_val: '6',
      player_val: '7',
      card_num: '5',
      pair: '0',
      timestamp: 1659261197473
    },
    GD051227310LD: {
      banker_val: '6',
      player_val: '8',
      card_num: '4',
      pair: '2',
      timestamp: 1659261238632
    },
    GD051227310LE: {
      banker_val: '6',
      player_val: '6',
      card_num: '5',
      pair: '0',
      timestamp: 1659261280039
    },
    GD051227310LF: {
      banker_val: '4',
      player_val: '6',
      card_num: '5',
      pair: '0',
      timestamp: 1659261319498
    },
    GD051227310LG: {
      banker_val: '5',
      player_val: '6',
      card_num: '5',
      pair: '0',
      timestamp: 1659261387749
    },
    GD051227310LH: {
      banker_val: '3',
      player_val: '9',
      card_num: '4',
      pair: '0',
      timestamp: 1659261429043
    },
    GD051227310LI: {
      banker_val: '0',
      player_val: '9',
      card_num: '4',
      pair: '0',
      timestamp: 1659261469139
    },
    GD051227310LJ: {
      banker_val: '2',
      player_val: '7',
      card_num: '5',
      pair: '0',
      timestamp: 1659261510727
    },
    GD051227310LK: {
      banker_val: '5',
      player_val: '3',
      card_num: '6',
      pair: '2',
      timestamp: 1659261554450
    },
    GD051227310LL: {
      banker_val: '0',
      player_val: '1',
      card_num: '6',
      pair: '2',
      timestamp: 1659261598116
    },
    GD051227310LM: {
      banker_val: '9',
      player_val: '4',
      card_num: '4',
      pair: '0',
      timestamp: 1659261637386
    },
    GD051227310LN: {
      banker_val: '5',
      player_val: '6',
      card_num: '5',
      pair: '0',
      timestamp: 1659261678153
    },
    GD051227310LN1: {
      banker_val: '5',
      player_val: '6',
      card_num: '5',
      pair: '0',
      timestamp: 1659261678153
    },
    GD051227310LO: {
      banker_val: '1',
      player_val: '3',
      card_num: '6',
      pair: '1',
      timestamp: 1659261724395
    },
    GD051227310LP: {
      banker_val: '6',
      player_val: '8',
      card_num: '4',
      pair: '1',
      timestamp: 1659261763114
    },
    GD051227310LQ: {
      banker_val: '6',
      player_val: '7',
      card_num: '5',
      pair: '0',
      timestamp: 1659261805523
    },
    GD051227310LR: {
      banker_val: '2',
      player_val: '9',
      card_num: '6',
      pair: '0',
      timestamp: 1659261851301
    },
    GD051227310LS: {
      banker_val: '8',
      player_val: '8',
      card_num: '4',
      pair: '0',
      timestamp: 1659261889763
    },
    GD051227310LT: {
      banker_val: '8',
      player_val: '1',
      card_num: '4',
      pair: '1',
      timestamp: 1659261930147
    },
    GD051227310LU: {
      banker_val: '0',
      player_val: '5',
      card_num: '6',
      pair: '0',
      timestamp: 1659261976986
    },
    GD051227310LW: {
      banker_val: '0',
      player_val: '5',
      card_num: '6',
      pair: '0',
      timestamp: 1659261976986
    },
    GD051227310LV: {
      banker_val: '4',
      player_val: '9',
      card_num: '4',
      pair: '1',
      timestamp: 1659262017008
    }
  }

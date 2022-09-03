import { EventEmitter } from "ahooks/lib/useEventEmitter";

export interface ContainerProps {
  chips: any[];
  displayNum: number;
  chipWidth: number;
  chipHeight: number;
  gap: number;
  keyframes: Record<string, any[]>;
  event$?: EventEmitter<any>;
  options?: Record<string, any>;
}

export interface Place {
  left: number;
  top: number;
  src: string;
}

export type Props = {
  title: string;
  children?: JSX.Element | JSX.Element[];
};

type func3 = (...rag: (number | string)[]) => void

declare interface CanvasRenderingContext2D2 extends CanvasRenderingContext2D {
  drawPokerCard: func3
}

declare global {
  interface Window {
    Poker: any,
    isDev: boolean
    _token?: string
    NodePlayer: any
  }
}

// declare interface Window {
//   Poker: any,
//   isDev: boolean
//   _token?: string
//   NodePlayer: any
// }

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]

type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>>
  & {
  [K in Keys]-?:
  Required<Pick<T, K>>
  & Partial<Record<Exclude<Keys, K>, undefined>>
}[Keys]

export type { RequireOnlyOne, RequireAtLeastOne }


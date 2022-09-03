const canvas = require('./canvas')
const format = require('./formatChartData')

// const {
//   getBullseye,
//   drawGrid,
//   drawText,
//   drawSolidCircle,
//   drawHollowCircle,
//   drawDiagonalLine,
//   drawDishWay,
//   drawBigWay,
//   drawBigEyeWay,
//   drawSmallWay,
//   drawCockroachWay
// } = canvas
//
// const {
//   dishWay,
//   bigWay,
//   bigEyeWay,
//   smallWay,
//   cockroachWay
// } = format

interface InitData {
  pair: '0' | '1' | '2' | '3' // 对子 0：无、1：庄对、2：闲对、3：庄闲对
  winner: 'banker' | 'player' | 'tie'
  inquiry?: true
}

interface Options {
  rows: number
  columns: number
  lineWidth: 1
  lineColor: string
  cellWidth: number
  cellHeight: number
  textMap: {
    banker: string
    player: string
    tie: string
  }
  colorMap: {
    banker: string
    player: string
    tie: string
  }
  skipOddLine?: true
}

interface GetBullseyeOptions {
  row: number
  column: number
  origin: [number, number]
  cellWidth: number
  cellHeight: number
}

interface DrawGridOptions extends Options {
  origin: [number, number]
}

interface DrawTextOptions {
  x: number
  y: number
  text: string
  color: string
  fontSize: string
  fontWeight?: number
  fontFamily?: string
}

interface DrawSolidCircleOptions {
  x: number
  y: number
  color: string // 圆圈颜色
  radius: number // 半径
}

interface DrawHollowCircleOptions {
  x: number
  y: number
  color: string // 圆圈颜色
  radius: number // 半径
  fillColor: string // 圆圈中心填充颜色
  lineWidth?: number
}

interface DrawDiagonalLineOptions {
  color: string
  offset?: number // 对角线距离对角点的距离
  lineCap?: 'butt' | 'round' | 'square'
  lineWidth?: number
  topRightX: number
  topRightY: number
  bottomLeftX: number
  bottomLeftY: number
}

// 珠盘路数据
export function dishWay (list: InitData[], rows = 6) {
  return format.dishWay(list, rows)
}

// 大路数据
export function bigWay (list: InitData[], rows = 6) {
  return format.bigWay(list, rows)
}

// 小眼路数据
export function bigEyeWay (list: InitData[], rows = 6) {
  return format.bigEyeWay(list, rows)
}

// 小路数据
export function smallWay (list: InitData[], rows = 6) {
  return format.smallWay(list, rows)
}

// 蟑螂路数据
export function cockroachWay (list: InitData[], rows = 6) {
  return format.cockroachWay(list, rows)
}

// 获取圆心
export function getBullseye (options: GetBullseyeOptions): [number, number] {
  return canvas.getBullseye(options)
}

// 画网格线
export function drawGrid (ctx: CanvasRenderingContext2D, options: DrawGridOptions) {
  canvas.drawGrid(ctx, options)
}

// 画文字
export function drawText (ctx: CanvasRenderingContext2D, options: DrawTextOptions) {
  canvas.drawText(ctx, options)
}

// 画实心圆
export function drawSolidCircle (ctx: CanvasRenderingContext2D, options: DrawSolidCircleOptions) {
  canvas.drawSolidCircle(ctx, options)
}

// 画空心圆
export function drawHollowCircle (ctx: CanvasRenderingContext2D, options: DrawHollowCircleOptions) {
  canvas.drawHollowCircle(ctx, options)
}

// 画对角线
export function drawDiagonalLine (ctx: CanvasRenderingContext2D, options: DrawDiagonalLineOptions) {
  canvas.drawDiagonalLine(ctx, options)
}

// 珠盘路
export function drawDishWay (ctx: CanvasRenderingContext2D, initList: InitData[], options: Options, origin: [number, number] = [0, 0]) {
  canvas.drawDishWay(ctx, initList, options, origin)
}

// 大路
export function drawBigWay (ctx: CanvasRenderingContext2D, initList: InitData[], options: Options, origin: [number, number] = [0, 0]) {
  canvas.drawBigWay(ctx, initList, options, origin)
}

// 小眼路
export function drawBigEyeWay (ctx: CanvasRenderingContext2D, initList: InitData[], options: Options, origin: [number, number] = [0, 0]) {
  canvas.drawBigEyeWay(ctx, initList, options, origin)
}

// 小路
export function drawSmallWay (ctx: CanvasRenderingContext2D, initList: InitData[], options: Options, origin: [number, number] = [0, 0]) {
  canvas.drawSmallWay(ctx, initList, options, origin)
}

// 蟑螂路
export function drawCockroachWay (ctx: CanvasRenderingContext2D, initList: InitData[], options: Options, origin: [number, number] = [0, 0]) {
  canvas.drawCockroachWay(ctx, initList, options, origin)
}

export type { InitData, Options }

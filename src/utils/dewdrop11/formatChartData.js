"use strict";
var __assign = function () {
    return (__assign =
      Object.assign ||
      function (n) {
        for (var r, t = 1, e = arguments.length; t < e; t++)
          for (var i in (r = arguments[t])) Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
        return n;
      }).apply(this, arguments);
  },
  __rest = function (n, r) {
    var t = {};
    for (i in n) Object.prototype.hasOwnProperty.call(n, i) && r.indexOf(i) < 0 && (t[i] = n[i]);
    if (null != n && "function" == typeof Object.getOwnPropertySymbols)
      for (var e = 0, i = Object.getOwnPropertySymbols(n); e < i.length; e++)
        r.indexOf(i[e]) < 0 && Object.prototype.propertyIsEnumerable.call(n, i[e]) && (t[i[e]] = n[i[e]]);
    return t;
  };
function filterTie(n) {
  var t = [];
  return (
    n.forEach(function (n, r) {
      n = __assign({}, n);
      "tie" !== n.winner
        ? ((n.tieCount = 0), t.push(n))
        : 0 === r
        ? ((n.tieCount = 1), t.push(n))
        : (t[t.length - 1].tieCount += 1);
    }),
    "tie" === (null == (n = t[0]) ? void 0 : n.winner) &&
      1 < t.length &&
      ((n = t.shift()), (t[0].tieCount += n.tieCount)),
    t
  );
}
function turnRightColumn(n, e) {
  void 0 === e && (e = 6);
  var o = {},
    i = [];
  return (
    n.forEach(function (n) {
      var r = (function (n, r) {
          var t = __rest(n, []),
            n = o.position || [0, 0],
            e = r[n[0]];
          {
            var i;
            n = e
              ? t.winner === o.winner
                ? ((i = e.findIndex(function (n) {
                    return !n;
                  })),
                  (e = e.slice(0, i).some(function (n) {
                    return n.winner !== t.winner;
                  })),
                  o.changeColumn || !~i || e ? ((t.changeColumn = !0), [n[0] + 1, n[1]]) : [n[0], i])
                : ~(e = r.findIndex(function (n) {
                    return !n[0];
                  }))
                ? [e, 0]
                : [r.length, 0]
              : [0, 0];
          }
          return (t.position = n), (o = t), n;
        })(n, i),
        t = r[0],
        r = r[1];
      i[t] || (i[t] = Array.from({ length: e })), (i[t][r] = n);
    }),
    i
  );
}
function bigWayInfiniteRow(n) {
  var e = {},
    i = [];
  return (
    filterTie(n).forEach(function (n) {
      var r = (function (n, r) {
          var n = __rest(n, []),
            t = r[r.length - 1];
          t = t ? (n.winner === e.winner ? [r.length - 1, t.length] : [r.length, 0]) : [0, 0];
          return (e = n), t;
        })(n, i),
        t = r[0],
        r = r[1];
      i[t] || (i[t] = []), (i[t][r] = n);
    }),
    i
  );
}
function threeWayColumn(e, i, o) {
  var a = [];
  return (
    e.forEach(function (n, t) {
      n.forEach(function (n, r) {
        ((t === i[0] && r >= i[1]) || t > i[0]) &&
          (0 === r
            ? e[t - 1].length === e[t - o].length
              ? a.push({ winner: "banker" })
              : a.push({ winner: "player" })
            : !e[t - (o - 1)][r] && e[t - (o - 1)][r - 1]
            ? a.push({ winner: "player" })
            : a.push({ winner: "banker" }),
          n.inquiry && (a[a.length - 1].inquiry = n.inquiry));
      });
    }),
    a
  );
}
function dishWay(n, r) {
  void 0 === r && (r = 6);
  for (var t = 0, e = []; t < n.length; ) e.push(n.slice(t, (t += r)));
  return e;
}
function bigWay(n, r) {
  return void 0 === r && (r = 6), turnRightColumn(filterTie(n), r);
}
function bigEyeWay(n, r) {
  void 0 === r && (r = 6);
  var t = [0, 0],
    n = bigWayInfiniteRow(n);
  return n[2] || n[1] ? (n[1] ? (t = [1, 1]) : n[2] && (t = [2, 0]), turnRightColumn(threeWayColumn(n, t, 2), r)) : [];
}
function smallWay(n, r) {
  void 0 === r && (r = 6);
  var t = [0, 0],
    e = bigWayInfiniteRow(n);
  return n[3] || n[2] ? (n[2] ? (t = [2, 1]) : n[3] && (t = [3, 0]), turnRightColumn(threeWayColumn(e, t, 2), r)) : [];
}
function cockroachWay(n, r) {
  void 0 === r && (r = 6);
  var t = [0, 0],
    e = bigWayInfiniteRow(n);
  return n[4] || n[3] ? (n[3] ? (t = [3, 1]) : n[4] && (t = [4, 0]), turnRightColumn(threeWayColumn(e, t, 2), r)) : [];
}

export function drawGrid(ctx, o) {
  const { rows, columns, lineColor, origin, lineWidth, cellWidth, cellHeight } = o;
  const verticalHeight = rows * cellHeight + lineWidth;
  const horizonWidth = columns * cellWidth + lineWidth;

  for (let f = 0; f <= columns; f++) {
    const w = f * cellWidth + origin[0];
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(w, Math.floor(origin[1]));
    ctx.lineTo(w, Math.floor(verticalHeight + origin[1]));
    ctx.stroke();
  }

  for (let f = 0; f <= rows; f++) {
    const h = f * cellHeight + origin[1];
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(origin[0], h);
    ctx.lineTo(origin[0] + horizonWidth, h);
    ctx.stroke();
  }
}

export function drawText(i, o) {
  var r = o.x,
    l = o.y,
    a = o.text,
    t = o.color,
    e = o.fontSize,
    n = o.fontFamily,
    n = void 0 === n ? "Microsoft YaHei" : n,
    o = o.fontWeight,
    o = void 0 === o ? 400 : o;
  i.beginPath(),
    (i.font = "".concat(o, " ").concat(e, " ").concat(n)),
    (i.fillStyle = t),
    (i.textAlign = "center"),
    (i.textBaseline = "middle"),
    i.fillText(a, r, l),
    i.stroke();
}

export function drawSolidCircle(i, o) {
  var r = o.x,
    l = o.y,
    a = o.color,
    o = o.radius;
  i.beginPath(), (i.fillStyle = a), i.arc(r, l, o, 0, 360, !1), i.fill();
}

function drawHollowCircle(ctx, o) {
  const { x, y, color, radius, fillColor, lineWidth } = o;

  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.fillStyle = fillColor;
  (ctx.strokeStyle = color), i.arc(x, y, radius, 0, 360, false), i.fill(), i.stroke();
}

function drawDiagonalLine(i, o) {
  var r = o.color,
    l = o.offset,
    l = void 0 === l ? 1 : l,
    a = o.lineCap,
    a = void 0 === a ? "butt" : a,
    t = o.lineWidth,
    t = void 0 === t ? 1 : t,
    e = o.bottomLeftX,
    n = o.bottomLeftY,
    s = o.topRightX,
    o = o.topRightY;
  (e += l),
    (n -= l),
    (s -= l),
    (o += l),
    i.beginPath(),
    (i.lineCap = a),
    (i.lineWidth = t),
    (i.strokeStyle = r),
    i.moveTo(e, n),
    i.lineTo(s, o),
    i.stroke();
}

function drawDishWay(s, i, o, c) {
  void 0 === c && (c = [0, 0]);
  var r = ((i = (0, formatChartData_1.dishWay)(i, o.rows))[i.length - 1] || []).filter(Boolean),
    d = o.lineWidth,
    h = o.cellWidth,
    g = o.cellHeight,
    f = o.textMap,
    w = o.colorMap,
    l = [d / 2, d / 2],
    i = 1 === r.length && r[0].inquiry ? i.slice(-o.columns) : i.slice(-(o.columns - 1));
  (c[0] += l[0]),
    (c[1] += l[1]),
    drawGrid(s, __assign(__assign({}, o), { origin: c })),
    i.forEach(function (i, n) {
      i.forEach(function (i, o) {
        var r, l, a, t, e;
        i &&
          ((e = (o = getBullseye({ row: o, column: n, origin: c, cellWidth: h, cellHeight: g }))[0]),
          (o = o[1]),
          (a = f[i.winner]),
          (l = w[i.winner]),
          (r = Math.floor((h - d) / 2)),
          drawSolidCircle(s, { x: e, y: o, color: l, radius: r }),
          drawText(s, { x: e, y: o, text: a, color: "#fff", fontSize: "".concat(h / 2 + 2, "px") }),
          "0" !== i.pair &&
            ((l = { color: "#fff", radius: 3 }),
            (a = e + Math.sin(((2 * Math.PI) / 360) * 315) * r),
            (t = o - Math.cos(((2 * Math.PI) / 360) * 315) * r),
            (e = e + Math.sin(((2 * Math.PI) / 360) * 135) * r),
            (o = o - Math.cos(((2 * Math.PI) / 360) * 135) * r),
            "1" === i.pair && drawHollowCircle(s, __assign(__assign({}, l), { x: a, y: t, fillColor: w.banker })),
            "2" !== i.pair && drawHollowCircle(s, __assign(__assign({}, l), { x: a, y: t, fillColor: w.banker })),
            drawHollowCircle(s, __assign(__assign({}, l), { x: e, y: o, fillColor: w.player }))));
      });
    }),
    s.closePath();
}

function drawBigWay(d, i, o, h) {
  void 0 === h && (h = [0, 0]);
  var r = ((i = (0, formatChartData_1.bigWay)(i, o.rows))[i.length - 1] || []).filter(Boolean),
    l = o.lineWidth,
    g = o.cellWidth,
    f = o.cellHeight,
    w = o.colorMap,
    l = [l / 2, l / 2],
    i = 1 === r.length && r[0].inquiry ? i.slice(-o.columns) : i.slice(-(o.columns - 1));
  (h[0] += l[0]),
    (h[1] += l[1]),
    drawGrid(d, __assign(__assign({}, o), { origin: h })),
    i.forEach(function (i, c) {
      i.forEach(function (i, o) {
        var r, l, a, t, e, n, s;
        i &&
          ((r = (l = getBullseye({ row: o, column: c, origin: h, cellWidth: g, cellHeight: f }))[0]),
          (l = l[1]),
          (a = w[i.winner]),
          drawHollowCircle(d, {
            x: r,
            y: l,
            color: a,
            radius: (a = (g - 2) / 2),
            fillColor: "transparent",
            lineWidth: 1,
          }),
          "0" !== i.pair &&
            ((n = { color: "#fff", radius: 1.5 }),
            (t = r + Math.sin(((2 * Math.PI) / 360) * 315) * a),
            (e = l - Math.cos(((2 * Math.PI) / 360) * 315) * a),
            (s = r + Math.sin(((2 * Math.PI) / 360) * 135) * a),
            (a = l - Math.cos(((2 * Math.PI) / 360) * 135) * a),
            "1" === i.pair && drawHollowCircle(d, __assign(__assign({}, n), { x: t, y: e, fillColor: w.banker })),
            "2" !== i.pair && drawHollowCircle(d, __assign(__assign({}, n), { x: t, y: e, fillColor: w.banker })),
            drawHollowCircle(d, __assign(__assign({}, n), { x: s, y: a, fillColor: w.player }))),
          1 === i.tieCount
            ? ((t = c * g + h[0]),
              (e = (o + 1) * f + h[1]),
              (n = (c + 1) * g + h[0]),
              (s = o * g + h[1]),
              drawDiagonalLine(d, { color: w.tie, bottomLeftX: t, bottomLeftY: e, topRightX: n, topRightY: s }))
            : 1 < i.tieCount && drawText(d, { x: r, y: l, text: String(i.tieCount), color: w.tie, fontSize: "7px" }));
      });
    }),
    d.closePath();
}

function drawSmallWay(a, i, o, t) {
  void 0 === t && (t = [0, 0]);
  var r = ((i = (0, formatChartData_1.smallWay)(i, o.rows))[i.length - 1] || []).filter(Boolean),
    e = o.lineWidth,
    n = o.cellWidth,
    s = o.cellHeight,
    c = o.colorMap,
    l = o.skipOddLine,
    d = [e / 2, e / 2],
    i = 1 === r.length && r[0].inquiry ? i.slice(-o.columns) : i.slice(-(o.columns - 1));
  (t[0] += d[0]),
    (t[1] += d[1]),
    drawGrid(a, __assign(__assign({}, o), { origin: t, skipOddLine: l })),
    i.forEach(function (i, l) {
      i.forEach(function (i, o) {
        var r;
        i &&
          ((r = (o = getBullseye({ row: o, column: l, origin: t, cellWidth: n, cellHeight: s }))[0]),
          (o = o[1]),
          (i = c[i.winner]),
          drawSolidCircle(a, { x: r, y: o, color: i, radius: (n - e) / 2 }));
      });
    }),
    a.closePath();
}

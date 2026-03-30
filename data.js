// ============================================================
// PGA FANTASY MODEL — WEEKLY DATA FILE
// ============================================================
// UPDATE THIS FILE EACH WEEK before the next tournament.
// The dashboard (index.html) loads this automatically.
//
// HOW TO UPDATE:
// 1. PLAYERS array — update form[], sg stats, dk salary, own%
// 2. EVENTS object — change course/event details if needed
// 3. Save this file, refresh the dashboard
//
// PLAYER FIELDS:
//   id     — unique number (don't change existing ones)
//   n      — player name
//   c      — country code (USA, ENG, NIR, ESP, etc.)
//   dk     — DraftKings salary
//   own    — projected ownership %
//   form   — last 10 finishes [most recent, ..., oldest]
//   ch     — course history: { event_key: [finish1, finish2, ...] }
//   sg     — strokes gained: { tot, ott, app, atg, put }
//   dr     — driving: { dist (yards), acc (%) }
//   gir    — greens in regulation %
//   scr    — scrambling %
//   brd    — birdies per round
//   par3   — par 3 scoring average
//   par5   — par 5 scoring average
//
// To ADD a player: copy any player object, change the id to the next number, fill in stats.
// To REMOVE a player: delete the entire { } block and its trailing comma.
// ============================================================

const PLAYERS = [
  {
    id: 1,
    n: "Scottie Scheffler",
    c: "USA",
    dk: 12200,
    own: 32.1,
    form: [1, 2, 1, 3, 1, 5, 1, 2, 1, 3],
    ch: {
      masters: [1, 2, 1],
      players: [3, 5],
      us_open: [1, 7],
      open: [14],
      pga: [2, 8],
      memorial: [1, 1, 3],
      arnold_palmer: [1, 5],
      genesis: [1, 1, 2]
    },
    sg: { tot: 2.85, ott: 0.95, app: 1.15, atg: 0.38, put: 0.37 },
    dr: { dist: 305, acc: 64.8 },
    gir: 72.5,
    scr: 65.8,
    brd: 4.8,
    par3: 3.02,
    par5: 4.42
  },
  {
    id: 2,
    n: "Xander Schauffele",
    c: "USA",
    dk: 11400,
    own: 26.5,
    form: [2, 1, 3, 2, 5, 1, 4, 3, 2, 6],
    ch: {
      masters: [3, 2, 5],
      players: [5, 10],
      us_open: [3, 6],
      open: [1, 8],
      pga: [1, 3],
      memorial: [5, 12],
      arnold_palmer: [8],
      genesis: [4, 7]
    },
    sg: { tot: 2.42, ott: 0.68, app: 0.92, atg: 0.44, put: 0.38 },
    dr: { dist: 302, acc: 63.2 },
    gir: 71.1,
    scr: 64.2,
    brd: 4.6,
    par3: 3.00,
    par5: 4.45
  },
  {
    id: 3,
    n: "Rory McIlroy",
    c: "NIR",
    dk: 10900,
    own: 24.8,
    form: [3, 5, 2, 1, 4, 8, 2, 6, 3, 1],
    ch: {
      masters: [5, 4, 7],
      players: [1, 4],
      us_open: [2, 5],
      open: [3, 1],
      pga: [1, 8],
      memorial: [4, 10],
      arnold_palmer: [1, 6],
      genesis: [5, 12]
    },
    sg: { tot: 2.22, ott: 1.08, app: 0.75, atg: 0.19, put: 0.20 },
    dr: { dist: 319, acc: 58.9 },
    gir: 70.2,
    scr: 58.8,
    brd: 4.5,
    par3: 3.05,
    par5: 4.35
  },
  {
    id: 4,
    n: "Collin Morikawa",
    c: "USA",
    dk: 10500,
    own: 19.2,
    form: [4, 3, 6, 5, 2, 10, 3, 8, 5, 4],
    ch: {
      masters: [7, 18],
      players: [8, 15],
      us_open: [4, 2],
      open: [1, 15],
      pga: [1, 4],
      memorial: [2, 6],
      arnold_palmer: [12],
      genesis: [1, 3]
    },
    sg: { tot: 2.05, ott: 0.44, app: 1.25, atg: 0.23, put: 0.13 },
    dr: { dist: 296, acc: 67.1 },
    gir: 73.8,
    scr: 62.0,
    brd: 4.3,
    par3: 2.98,
    par5: 4.50
  },
  {
    id: 5,
    n: "Ludvig Aberg",
    c: "SWE",
    dk: 10300,
    own: 21.4,
    form: [5, 4, 1, 8, 3, 2, 7, 4, 6, 2],
    ch: {
      masters: [2],
      players: [12],
      us_open: [6],
      open: [],
      pga: [15],
      memorial: [8],
      arnold_palmer: [],
      genesis: [5]
    },
    sg: { tot: 1.98, ott: 0.90, app: 0.78, atg: 0.16, put: 0.14 },
    dr: { dist: 313, acc: 60.5 },
    gir: 70.8,
    scr: 60.2,
    brd: 4.4,
    par3: 3.01,
    par5: 4.40
  },
  {
    id: 6,
    n: "Jon Rahm",
    c: "ESP",
    dk: 10100,
    own: 16.8,
    form: [8, 6, 4, 4, 7, 3, 12, 5, 9, 4],
    ch: {
      masters: [1, 5, 3],
      players: [4, 12],
      us_open: [1, 3],
      open: [3, 10],
      pga: [5, 8],
      memorial: [1, 3, 5],
      arnold_palmer: [1, 3],
      genesis: [6, 14]
    },
    sg: { tot: 1.88, ott: 0.80, app: 0.70, atg: 0.24, put: 0.14 },
    dr: { dist: 307, acc: 61.8 },
    gir: 69.4,
    scr: 62.5,
    brd: 4.2,
    par3: 3.03,
    par5: 4.44
  },
  {
    id: 7,
    n: "Wyndham Clark",
    c: "USA",
    dk: 9700,
    own: 15.2,
    form: [6, 8, 5, 7, 6, 11, 4, 10, 8, 5],
    ch: {
      masters: [12, 25],
      players: [8, 22],
      us_open: [1, 18],
      open: [20],
      pga: [6, 10],
      memorial: [15],
      arnold_palmer: [9],
      genesis: [7, 20]
    },
    sg: { tot: 1.75, ott: 0.84, app: 0.58, atg: 0.18, put: 0.15 },
    dr: { dist: 311, acc: 60.2 },
    gir: 68.0,
    scr: 61.0,
    brd: 4.1,
    par3: 3.05,
    par5: 4.38
  },
  {
    id: 8,
    n: "Viktor Hovland",
    c: "NOR",
    dk: 9500,
    own: 14.0,
    form: [7, 9, 8, 6, 9, 6, 8, 12, 7, 10],
    ch: {
      masters: [16, 5],
      players: [10, 3],
      us_open: [12, 8],
      open: [4, 12],
      pga: [7, 14],
      memorial: [1, 8],
      arnold_palmer: [3, 15],
      genesis: [2, 10]
    },
    sg: { tot: 1.62, ott: 0.58, app: 0.85, atg: -0.04, put: 0.23 },
    dr: { dist: 299, acc: 63.5 },
    gir: 72.2,
    scr: 55.8,
    brd: 4.3,
    par3: 3.00,
    par5: 4.48
  },
  {
    id: 9,
    n: "Patrick Cantlay",
    c: "USA",
    dk: 9300,
    own: 13.5,
    form: [9, 7, 10, 9, 8, 14, 6, 9, 11, 7],
    ch: {
      masters: [6, 10],
      players: [4, 9],
      us_open: [15, 5],
      open: [22],
      pga: [3, 12],
      memorial: [1, 2, 5],
      arnold_palmer: [4, 10],
      genesis: [5, 8]
    },
    sg: { tot: 1.48, ott: 0.24, app: 0.68, atg: 0.28, put: 0.28 },
    dr: { dist: 290, acc: 67.8 },
    gir: 69.8,
    scr: 67.2,
    brd: 4.0,
    par3: 3.02,
    par5: 4.52
  },
  {
    id: 10,
    n: "Tommy Fleetwood",
    c: "ENG",
    dk: 9100,
    own: 12.0,
    form: [10, 12, 7, 11, 10, 9, 15, 8, 13, 6],
    ch: {
      masters: [17, 12],
      players: [5, 14],
      us_open: [4, 2],
      open: [2, 4],
      pga: [6, 18],
      memorial: [10, 22],
      arnold_palmer: [5, 18],
      genesis: [8, 14]
    },
    sg: { tot: 1.35, ott: 0.50, app: 0.54, atg: 0.17, put: 0.14 },
    dr: { dist: 297, acc: 65.0 },
    gir: 68.5,
    scr: 63.0,
    brd: 3.9,
    par3: 3.04,
    par5: 4.50
  },
  {
    id: 11,
    n: "Hideki Matsuyama",
    c: "JPN",
    dk: 8900,
    own: 10.8,
    form: [12, 10, 9, 10, 12, 4, 16, 7, 14, 8],
    ch: {
      masters: [1, 7, 2],
      players: [11, 4],
      us_open: [9, 18],
      open: [25],
      pga: [12, 20],
      memorial: [4, 15],
      arnold_palmer: [10, 22],
      genesis: [6, 12]
    },
    sg: { tot: 1.30, ott: 0.40, app: 0.80, atg: 0.04, put: 0.06 },
    dr: { dist: 300, acc: 61.2 },
    gir: 71.8,
    scr: 58.2,
    brd: 4.2,
    par3: 3.01,
    par5: 4.46
  },
  {
    id: 12,
    n: "Sahith Theegala",
    c: "USA",
    dk: 8700,
    own: 14.8,
    form: [11, 11, 12, 12, 11, 7, 9, 14, 10, 13],
    ch: {
      masters: [15],
      players: [6, 20],
      us_open: [10, 22],
      open: [18],
      pga: [8, 25],
      memorial: [12, 18],
      arnold_palmer: [6],
      genesis: [9, 16]
    },
    sg: { tot: 1.25, ott: 0.64, app: 0.48, atg: 0.08, put: 0.05 },
    dr: { dist: 304, acc: 58.0 },
    gir: 67.2,
    scr: 59.0,
    brd: 4.1,
    par3: 3.06,
    par5: 4.42
  },
  {
    id: 13,
    n: "Shane Lowry",
    c: "IRL",
    dk: 8500,
    own: 10.2,
    form: [14, 13, 11, 15, 13, 10, 18, 11, 16, 9],
    ch: {
      masters: [20, 25],
      players: [8, 18],
      us_open: [6, 12],
      open: [1, 3, 8],
      pga: [10, 22],
      memorial: [8, 20],
      arnold_palmer: [7, 14],
      genesis: [15, 28]
    },
    sg: { tot: 1.18, ott: 0.34, app: 0.50, atg: 0.21, put: 0.13 },
    dr: { dist: 292, acc: 64.2 },
    gir: 67.5,
    scr: 64.5,
    brd: 3.8,
    par3: 3.05,
    par5: 4.52
  },
  {
    id: 14,
    n: "Tony Finau",
    c: "USA",
    dk: 8300,
    own: 11.0,
    form: [13, 15, 14, 13, 14, 12, 10, 16, 12, 15],
    ch: {
      masters: [10, 22],
      players: [12, 25],
      us_open: [8, 14],
      open: [12, 20],
      pga: [4, 12],
      memorial: [6, 18],
      arnold_palmer: [3, 10],
      genesis: [10, 20]
    },
    sg: { tot: 1.10, ott: 0.74, app: 0.38, atg: 0.06, put: -0.08 },
    dr: { dist: 312, acc: 56.8 },
    gir: 66.2,
    scr: 57.2,
    brd: 4.0,
    par3: 3.08,
    par5: 4.36
  },
  {
    id: 15,
    n: "Max Homa",
    c: "USA",
    dk: 8100,
    own: 11.8,
    form: [15, 14, 13, 14, 16, 8, 20, 13, 17, 11],
    ch: {
      masters: [10, 16],
      players: [14, 22],
      us_open: [18, 30],
      open: [25],
      pga: [12, 20],
      memorial: [10, 16],
      arnold_palmer: [8, 14],
      genesis: [1, 3, 5]
    },
    sg: { tot: 1.05, ott: 0.58, app: 0.40, atg: 0.04, put: 0.03 },
    dr: { dist: 301, acc: 63.0 },
    gir: 68.2,
    scr: 60.5,
    brd: 3.9,
    par3: 3.04,
    par5: 4.44
  },
  {
    id: 16,
    n: "Russell Henley",
    c: "USA",
    dk: 7900,
    own: 8.8,
    form: [16, 18, 15, 16, 15, 13, 11, 19, 15, 18],
    ch: {
      masters: [11, 20],
      players: [6, 12],
      us_open: [2, 8],
      open: [30],
      pga: [15, 25],
      memorial: [8, 14],
      arnold_palmer: [12, 20],
      genesis: [6, 10]
    },
    sg: { tot: 0.98, ott: 0.20, app: 0.55, atg: 0.13, put: 0.10 },
    dr: { dist: 289, acc: 69.0 },
    gir: 70.5,
    scr: 64.0,
    brd: 3.7,
    par3: 3.02,
    par5: 4.54
  },
  {
    id: 17,
    n: "Sungjae Im",
    c: "KOR",
    dk: 7700,
    own: 8.2,
    form: [17, 16, 18, 17, 17, 15, 13, 17, 19, 14],
    ch: {
      masters: [8, 15, 20],
      players: [10, 18],
      us_open: [12, 25],
      open: [16],
      pga: [14, 22],
      memorial: [12, 20],
      arnold_palmer: [5, 15],
      genesis: [12, 18]
    },
    sg: { tot: 0.90, ott: 0.38, app: 0.44, atg: 0.06, put: 0.02 },
    dr: { dist: 298, acc: 63.8 },
    gir: 69.8,
    scr: 60.0,
    brd: 3.8,
    par3: 3.05,
    par5: 4.48
  },
  {
    id: 18,
    n: "Justin Thomas",
    c: "USA",
    dk: 7500,
    own: 9.5,
    form: [18, 17, 16, 19, 18, 16, 22, 15, 20, 12],
    ch: {
      masters: [4, 12, 8],
      players: [1, 11],
      us_open: [5, 15],
      open: [8, 18],
      pga: [1, 1, 5],
      memorial: [5, 12],
      arnold_palmer: [6, 15],
      genesis: [4, 8]
    },
    sg: { tot: 0.85, ott: 0.44, app: 0.40, atg: 0.11, put: -0.10 },
    dr: { dist: 303, acc: 61.0 },
    gir: 68.8,
    scr: 58.0,
    brd: 3.9,
    par3: 3.03,
    par5: 4.46
  },
  {
    id: 19,
    n: "Sam Burns",
    c: "USA",
    dk: 7300,
    own: 8.5,
    form: [19, 20, 17, 18, 19, 11, 14, 20, 18, 17],
    ch: {
      masters: [22, 30],
      players: [3, 8],
      us_open: [18, 28],
      open: [25],
      pga: [8, 16],
      memorial: [10, 22],
      arnold_palmer: [4, 12],
      genesis: [14, 22]
    },
    sg: { tot: 0.78, ott: 0.50, app: 0.30, atg: 0.04, put: -0.06 },
    dr: { dist: 306, acc: 59.2 },
    gir: 66.5,
    scr: 59.2,
    brd: 3.8,
    par3: 3.06,
    par5: 4.40
  },
  {
    id: 20,
    n: "Tom Kim",
    c: "KOR",
    dk: 7100,
    own: 7.8,
    form: [20, 19, 20, 20, 20, 17, 12, 18, 21, 16],
    ch: {
      masters: [12, 25],
      players: [2, 14],
      us_open: [20, 30],
      open: [18],
      pga: [10, 22],
      memorial: [15, 25],
      arnold_palmer: [8, 18],
      genesis: [5, 12]
    },
    sg: { tot: 0.70, ott: 0.30, app: 0.34, atg: 0.04, put: 0.02 },
    dr: { dist: 293, acc: 66.2 },
    gir: 69.2,
    scr: 61.5,
    brd: 3.7,
    par3: 3.04,
    par5: 4.50
  },
  {
    id: 21,
    n: "Keegan Bradley",
    c: "USA",
    dk: 6900,
    own: 6.5,
    form: [22, 21, 19, 22, 21, 18, 16, 22, 22, 19],
    ch: {
      masters: [14, 22],
      players: [12, 20],
      us_open: [6, 18],
      open: [15],
      pga: [1, 8, 15],
      memorial: [10, 18],
      arnold_palmer: [12, 22],
      genesis: [10, 16]
    },
    sg: { tot: 0.65, ott: 0.44, app: 0.24, atg: 0.01, put: -0.04 },
    dr: { dist: 300, acc: 60.0 },
    gir: 67.0,
    scr: 57.5,
    brd: 3.6,
    par3: 3.06,
    par5: 4.46
  },
  {
    id: 22,
    n: "Corey Conners",
    c: "CAN",
    dk: 6700,
    own: 7.0,
    form: [21, 22, 22, 21, 22, 19, 17, 21, 20, 20],
    ch: {
      masters: [6, 10, 18],
      players: [15, 25],
      us_open: [4, 12],
      open: [20],
      pga: [12, 20],
      memorial: [8, 16],
      arnold_palmer: [10, 18],
      genesis: [8, 14]
    },
    sg: { tot: 0.58, ott: 0.18, app: 0.60, atg: -0.06, put: -0.14 },
    dr: { dist: 291, acc: 69.2 },
    gir: 72.8,
    scr: 54.5,
    brd: 3.5,
    par3: 3.00,
    par5: 4.56
  },
  {
    id: 23,
    n: "Brian Harman",
    c: "USA",
    dk: 6500,
    own: 5.8,
    form: [23, 23, 21, 23, 23, 20, 18, 23, 23, 21],
    ch: {
      masters: [6, 18, 28],
      players: [10, 20],
      us_open: [12, 22],
      open: [1, 8],
      pga: [15, 25],
      memorial: [12, 20],
      arnold_palmer: [8, 16],
      genesis: [12, 20]
    },
    sg: { tot: 0.50, ott: 0.06, app: 0.30, atg: 0.14, put: 0.00 },
    dr: { dist: 283, acc: 70.0 },
    gir: 68.0,
    scr: 66.2,
    brd: 3.5,
    par3: 3.04,
    par5: 4.55
  },
  {
    id: 24,
    n: "Akshay Bhatia",
    c: "USA",
    dk: 6300,
    own: 7.5,
    form: [24, 24, 23, 24, 24, 14, 25, 16, 24, 22],
    ch: {
      masters: [20],
      players: [18],
      us_open: [25],
      open: [],
      pga: [18],
      memorial: [20],
      arnold_palmer: [4],
      genesis: [15]
    },
    sg: { tot: 0.44, ott: 0.58, app: 0.14, atg: -0.10, put: -0.18 },
    dr: { dist: 309, acc: 55.8 },
    gir: 64.8,
    scr: 54.0,
    brd: 3.8,
    par3: 3.08,
    par5: 4.38
  },
  {
    id: 25,
    n: "Min Woo Lee",
    c: "AUS",
    dk: 6100,
    own: 6.0,
    form: [25, 25, 24, 25, 25, 21, 19, 25, 25, 23],
    ch: {
      masters: [18],
      players: [20],
      us_open: [15],
      open: [5, 12],
      pga: [20],
      memorial: [18],
      arnold_palmer: [14],
      genesis: [18]
    },
    sg: { tot: 0.38, ott: 0.50, app: 0.12, atg: -0.10, put: -0.14 },
    dr: { dist: 308, acc: 57.2 },
    gir: 64.5,
    scr: 56.0,
    brd: 3.6,
    par3: 3.07,
    par5: 4.42
  },
  {
    id: 26,
    n: "Cameron Young",
    c: "USA",
    dk: 5900,
    own: 5.5,
    form: [26, 26, 25, 26, 26, 22, 24, 24, 26, 24],
    ch: {
      masters: [12, 22],
      players: [15, 28],
      us_open: [5, 15],
      open: [2, 18],
      pga: [8, 20],
      memorial: [14, 22],
      arnold_palmer: [12, 20],
      genesis: [10, 18]
    },
    sg: { tot: 0.30, ott: 0.88, app: 0.08, atg: -0.24, put: -0.42 },
    dr: { dist: 320, acc: 53.0 },
    gir: 64.0,
    scr: 50.5,
    brd: 3.8,
    par3: 3.10,
    par5: 4.32
  },
  {
    id: 27,
    n: "Matt Fitzpatrick",
    c: "ENG",
    dk: 5700,
    own: 5.0,
    form: [27, 27, 27, 27, 27, 23, 21, 26, 27, 25],
    ch: {
      masters: [8, 14, 20],
      players: [10, 18],
      us_open: [1, 6],
      open: [4, 12],
      pga: [10, 18],
      memorial: [8, 14],
      arnold_palmer: [10, 16],
      genesis: [6, 12]
    },
    sg: { tot: 0.24, ott: -0.10, app: 0.48, atg: 0.00, put: -0.14 },
    dr: { dist: 279, acc: 70.5 },
    gir: 69.5,
    scr: 61.2,
    brd: 3.4,
    par3: 3.02,
    par5: 4.58
  },
  {
    id: 28,
    n: "Sepp Straka",
    c: "AUT",
    dk: 5500,
    own: 4.5,
    form: [28, 28, 26, 28, 28, 24, 20, 27, 28, 26],
    ch: {
      masters: [8, 22],
      players: [14, 25],
      us_open: [12, 20],
      open: [10, 18],
      pga: [15, 22],
      memorial: [10, 18],
      arnold_palmer: [8, 15],
      genesis: [12, 20]
    },
    sg: { tot: 0.18, ott: 0.34, app: 0.10, atg: -0.09, put: -0.17 },
    dr: { dist: 302, acc: 60.8 },
    gir: 67.2,
    scr: 57.0,
    brd: 3.5,
    par3: 3.06,
    par5: 4.48
  },
  {
    id: 29,
    n: "Denny McCarthy",
    c: "USA",
    dk: 5300,
    own: 4.0,
    form: [29, 29, 28, 29, 29, 25, 23, 28, 29, 27],
    ch: {
      masters: [],
      players: [8, 12],
      us_open: [22],
      open: [],
      pga: [15],
      memorial: [10],
      arnold_palmer: [12],
      genesis: [8]
    },
    sg: { tot: 0.10, ott: -0.22, app: 0.04, atg: 0.10, put: 0.18 },
    dr: { dist: 276, acc: 68.0 },
    gir: 65.2,
    scr: 63.5,
    brd: 3.3,
    par3: 3.05,
    par5: 4.58
  },
  {
    id: 30,
    n: "Billy Horschel",
    c: "USA",
    dk: 5100,
    own: 3.8,
    form: [30, 30, 29, 30, 30, 26, 22, 29, 30, 28],
    ch: {
      masters: [14, 25],
      players: [1, 6, 12],
      us_open: [10, 20],
      open: [8, 15],
      pga: [12, 20],
      memorial: [6, 14],
      arnold_palmer: [4, 12],
      genesis: [10, 18]
    },
    sg: { tot: 0.04, ott: 0.20, app: 0.14, atg: -0.14, put: -0.16 },
    dr: { dist: 295, acc: 62.0 },
    gir: 67.0,
    scr: 56.2,
    brd: 3.4,
    par3: 3.06,
    par5: 4.50
  },
  {
    id: 31,
    n: "Robert MacIntyre",
    c: "SCO",
    dk: 6400,
    own: 5.2,
    form: [16, 20, 15, 22, 14, 13, 8, 18, 12, 20],
    ch: {
      masters: [12],
      players: [18],
      us_open: [10],
      open: [6, 14],
      pga: [],
      memorial: [],
      arnold_palmer: [],
      genesis: []
    },
    sg: { tot: 0.55, ott: 0.42, app: 0.18, atg: 0.02, put: -0.07 },
    dr: { dist: 295, acc: 61.5 },
    gir: 66.0,
    scr: 59.5,
    brd: 3.7,
    par3: 3.04,
    par5: 4.46
  },
  {
    id: 32,
    n: "Aaron Rai",
    c: "ENG",
    dk: 5800,
    own: 4.8,
    form: [20, 15, 28, 16, 18, 10, 22, 14, 25, 15],
    ch: {
      masters: [],
      players: [8],
      us_open: [6],
      open: [10, 20],
      pga: [12],
      memorial: [],
      arnold_palmer: [],
      genesis: [8]
    },
    sg: { tot: 0.42, ott: 0.05, app: 0.35, atg: 0.10, put: -0.08 },
    dr: { dist: 285, acc: 68.5 },
    gir: 70.0,
    scr: 62.0,
    brd: 3.6,
    par3: 3.02,
    par5: 4.54
  },
  {
    id: 33,
    n: "Chris Kirk",
    c: "USA",
    dk: 5400,
    own: 3.5,
    form: [28, 22, 30, 20, 25, 15, 26, 20, 28, 18],
    ch: {
      masters: [10, 22],
      players: [6, 18],
      us_open: [15],
      open: [],
      pga: [20],
      memorial: [8],
      arnold_palmer: [10],
      genesis: [12]
    },
    sg: { tot: 0.22, ott: 0.08, app: 0.18, atg: 0.05, put: -0.09 },
    dr: { dist: 288, acc: 65.5 },
    gir: 67.5,
    scr: 60.5,
    brd: 3.5,
    par3: 3.05,
    par5: 4.52
  },
  {
    id: 34,
    n: "Taylor Pendrith",
    c: "CAN",
    dk: 5200,
    own: 3.2,
    form: [30, 28, 22, 28, 30, 20, 28, 25, 22, 30],
    ch: {
      masters: [],
      players: [10],
      us_open: [8],
      open: [],
      pga: [6],
      memorial: [15],
      arnold_palmer: [18],
      genesis: [20]
    },
    sg: { tot: 0.15, ott: 0.62, app: 0.02, atg: -0.18, put: -0.31 },
    dr: { dist: 316, acc: 54.5 },
    gir: 63.5,
    scr: 52.8,
    brd: 3.6,
    par3: 3.09,
    par5: 4.36
  },
  {
    id: 35,
    n: "Davis Thompson",
    c: "USA",
    dk: 5000,
    own: 3.0,
    form: [25, 30, 20, 30, 28, 18, 30, 22, 30, 25],
    ch: {
      masters: [],
      players: [12],
      us_open: [10],
      open: [],
      pga: [8],
      memorial: [],
      arnold_palmer: [12],
      genesis: []
    },
    sg: { tot: 0.12, ott: 0.30, app: 0.05, atg: -0.08, put: -0.15 },
    dr: { dist: 304, acc: 59.0 },
    gir: 65.8,
    scr: 56.5,
    brd: 3.5,
    par3: 3.07,
    par5: 4.44
  },
];

// ============================================================
// EVENTS — Update course/venue details for the current season
// ============================================================
// FIELDS:
//   nm     — tournament name
//   cr     — course name
//   par    — course par
//   yds    — course yardage
//   tp     — event type (Major, Signature, Invitational)
//   purse  — prize money
//   sz     — field size
//   emph   — SG emphasis weights (should sum to ~1.0)
//             ott = off the tee, app = approach, atg = around the green, put = putting
//   traits — course trait scores (0-100) used for the Course Profile chart
// ============================================================

const EVENTS = {
  masters: {
    nm: "The Masters",
    cr: "Augusta National GC",
    par: 72, yds: 7545, tp: "Major", purse: "$20M", sz: 87,
    emph: { ott: 0.25, app: 0.28, atg: 0.27, put: 0.20 },
    traits: { length: 92, precision: 78, scrambling: 90, putting: 82, iron_play: 85, experience: 96, course_history: 92 }
  },
  players: {
    nm: "THE PLAYERS Championship",
    cr: "TPC Sawgrass",
    par: 72, yds: 7245, tp: "Signature", purse: "$25M", sz: 144,
    emph: { ott: 0.15, app: 0.35, atg: 0.25, put: 0.25 },
    traits: { length: 68, precision: 94, scrambling: 82, putting: 88, iron_play: 96, experience: 84, course_history: 80 }
  },
  us_open: {
    nm: "U.S. Open",
    cr: "Oakmont CC",
    par: 70, yds: 7255, tp: "Major", purse: "$21.5M", sz: 156,
    emph: { ott: 0.20, app: 0.35, atg: 0.20, put: 0.25 },
    traits: { length: 85, precision: 96, scrambling: 78, putting: 80, iron_play: 94, experience: 90, course_history: 75 }
  },
  open: {
    nm: "The Open Championship",
    cr: "Royal Troon",
    par: 71, yds: 7190, tp: "Major", purse: "$17M", sz: 156,
    emph: { ott: 0.30, app: 0.22, atg: 0.28, put: 0.20 },
    traits: { length: 78, precision: 70, scrambling: 94, putting: 76, iron_play: 78, experience: 88, course_history: 82 }
  },
  pga: {
    nm: "PGA Championship",
    cr: "Quail Hollow Club",
    par: 71, yds: 7600, tp: "Major", purse: "$18.5M", sz: 156,
    emph: { ott: 0.30, app: 0.28, atg: 0.20, put: 0.22 },
    traits: { length: 96, precision: 80, scrambling: 74, putting: 82, iron_play: 86, experience: 82, course_history: 78 }
  },
  memorial: {
    nm: "The Memorial Tournament",
    cr: "Muirfield Village GC",
    par: 72, yds: 7535, tp: "Signature", purse: "$20M", sz: 120,
    emph: { ott: 0.22, app: 0.32, atg: 0.22, put: 0.24 },
    traits: { length: 88, precision: 86, scrambling: 80, putting: 85, iron_play: 92, experience: 80, course_history: 85 }
  },
  arnold_palmer: {
    nm: "Arnold Palmer Invitational",
    cr: "Bay Hill Club & Lodge",
    par: 72, yds: 7466, tp: "Invitational", purse: "$20M", sz: 120,
    emph: { ott: 0.28, app: 0.28, atg: 0.22, put: 0.22 },
    traits: { length: 90, precision: 78, scrambling: 82, putting: 80, iron_play: 82, experience: 76, course_history: 80 }
  },
  genesis: {
    nm: "Genesis Invitational",
    cr: "Riviera CC",
    par: 71, yds: 7322, tp: "Signature", purse: "$20M", sz: 120,
    emph: { ott: 0.20, app: 0.35, atg: 0.20, put: 0.25 },
    traits: { length: 82, precision: 90, scrambling: 78, putting: 86, iron_play: 94, experience: 82, course_history: 88 }
  },
};

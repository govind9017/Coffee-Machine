const MuseumAttendance = require("../../models/museumAttedance");
// const muesumData = [
//   {
//       "month": "2014-07-01T00:00:00.000",
//       "america_tropical_interpretive_center": "13490",
//       "avila_adobe": "32378",
//       "chinese_american_museum": "2239",
//       "firehouse_museum": "5406",
//       "hellman_quon": "120",
//       "pico_house": "3375",
//       "visitor_center_avila_adobe": "3527"
//   }
// ]
// const helper = require('../../helper/museumAttendance');
// helper.getMuseumAttendanceDetails = jest.fn(data => {
//   return Promise.resolve(muesumData);
// })

test("getMontlyAttendancenceDetails :: should return error if date not passed", async () => {
  try {
    let res = await new MuseumAttendance().getMontlyAttendanceDetails({});
    expect(res).toBe("Date not passed");
  } catch (err) {
    expect(err.statusCode).toBe(422);
    expect(err.message).toEqual("Date not passed");
  }
});

test("getMontlyAttendancenceDetails :: should return error if date passed is invalid", async () => {
  try {
    let res = await new MuseumAttendance().getMontlyAttendanceDetails({
      date: "abc",
    });
    expect(res).toBe("Date not passed");
  } catch (err) {
    expect(err.statusCode).toBe(400);
    expect(err.message).toEqual("Invalid date passed");
  }
});

test("getMontlyAttendancenceDetails :: should return Attendancence details of the month date", async () => {
  let res = await new MuseumAttendance().getMontlyAttendanceDetails({
    date: "1404198000000",
  });
  const expectedOutput = {
    attendance: {
      month: "Jul",
      year: "2014",
      highest: {
        museum: "avila_adobe",
        visitors: 32378,
      },
      lowest: {
        museum: "hellman_quon",
        visitors: 120,
      },
      total: 60535,
    },
  };

  expect(res).toMatchObject(expectedOutput);
});

test("Should return Attendancence details with ignored museum passed", async () => {
  let res = await new MuseumAttendance().getMontlyAttendanceDetails({
    date: "1404198000000",
    ignore: "avila_adobe",
  });
  const expectedOutput = {
    attendance: {
      month: "Jul",
      year: "2014",
      total: 28157,
      highest: {
        museum: "america_tropical_interpretive_center",
        visitors: 13490,
      },
      lowest: {
        museum: "hellman_quon",
        visitors: 120,
      },
      ignore: {
        museum: "avila_adobe",
        visitors: 32378,
      },
    },
  };

  expect(res).toMatchObject(expectedOutput);
});

test("Should return ignored museum visitors as 0 if ignore museum passed not found", async () => {
  let res = await new MuseumAttendance().getMontlyAttendanceDetails({
    date: "1404198000000",
    ignore: "american_avila_adobe",
  });
  const expectedOutput = {
    attendance: {
      month: "Jul",
      year: "2014",
      total: 60535,
      highest: {
        museum: "avila_adobe",
        visitors: 32378,
      },
      lowest: {
        museum: "hellman_quon",
        visitors: 120,
      },
      ignore: {
        museum: "american_avila_adobe",
        visitors: 0,
      },
    },
  };
  expect(res).toMatchObject(expectedOutput);
});

test("Should return Attendancence with empty data if no museum visitor data found", async () => {
  let res = await new MuseumAttendance().getMontlyAttendanceDetails({
    date: "1404",
    ignore: "avila_adobe",
  });
  const expectedOutput = {
    attendance: {
      month: "Jan",
      year: "1970",
      total: 0,
      highest: {},
      lowest: {},
      ignore: {
        museum: "avila_adobe",
        visitors: 0,
      },
    },
  };

  expect(res).toMatchObject(expectedOutput);
});

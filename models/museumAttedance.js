const helper = require("../helper/museumAttendance");

class MuseumAttendance {
  /**
   * Get vistor details of the time stamp passed
   * @param query: Get vistor api input query containing date in ms and ignore museum details
   * @return Object containing museum attendance details {month, total visitors, highest and lowest visited museum, ignore museum}
   */
  async getMontlyAttendanceDetails(query) {
    try {
      console.log("Inside getMontlyAttendanceDetails :: ", query);
      helper.validateVisitorQuery(query);
      const date = new Date(parseInt(query.date));
      //get museum visitors count raw data
      const attendanceDetails = await helper.getMuseumAttendanceDetails(date);
      const attendanceData =
        (attendanceDetails &&
          attendanceDetails.data &&
          attendanceDetails.data[0]) ||
        {};
      delete attendanceData.month;
      let ignoredMuseum;
      if (query.ignore) {
        // get the museum that needs to be ignored in total counts
        ignoredMuseum = {
          museum: query.ignore,
          visitors: parseInt(attendanceData[query.ignore] || "0"),
        };
        // deleted ignored mueseum from attendance data
        delete attendanceData[query.ignore];
      }
      const attendance = {
        month: date.toLocaleString("default", { month: "short" }),
        year: date.getFullYear().toString(),
        total: helper.getTotalVisitors(attendanceData),
        highest: helper.getMuseumWithHighestVisitors(attendanceData),
        lowest: helper.getMuseumWithLowestVisitors(attendanceData),
      };
      if (ignoredMuseum) attendance.ignore = ignoredMuseum;
      return { attendance };
    } catch (err) {
      console.log("Error in fetching museum attendance details");
      throw err;
      // return Promise.reject(err);
    }
  }
}

module.exports = MuseumAttendance;

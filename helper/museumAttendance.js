const axios = require("axios");
const moment = require("moment");

module.exports = {
  validateVisitorQuery(query) {
    //Check if date is passed in query
    if (!query || !query.date) {
      console.log("Date query not passed");
      const error = new Error("Date not passed");
      error.statusCode = 422;
      throw error;
    }
    //validate if date passed is valid or not
    if(!parseInt(query.date) || isNaN(new Date(parseInt(query.date)).getTime())) {
      console.log("Invalid date passed", query.date);
      const error = new Error("Invalid date passed");
      error.statusCode = 400;
      throw error;
    }
  },

  /**
     External call to fetch Museum Visitors data of the passed month
   * @param date: Date of the month for which vistors details required
   * @return Object containg museum as field and visitors count as value
   */
  async getMuseumAttendanceDetails(date) {
    try {
      console.log("Inside getMuseumAttendanceDetails :: ", date);
      let url = "https://data.lacity.org/resource/trxm-jn3c.json";
      if (date) {
        const dateQuery = moment(date)
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0)
          .format("YYYY-MM-DDTHH:mm:ss.sss");
        url = url + `?month=${dateQuery}`;
      }
      return await axios.get(url);
    } catch (err) {
      console.log("Error in fetching museum data");
      err.statusCode = 400;
      throw err;
    }
  },

  getTotalVisitors(museums) {
    // Total no of visitors for a specific month
    if (!museums || !Object.keys(museums).length) return 0;
    return Object.values(museums).reduce(
      (partial_sum, data) => partial_sum + parseInt(data),
      0
    );
  },

  getMuseumWithHighestVisitors(museums) {
    if (!museums || !Object.keys(museums).length) return {};
    //Get museum with highest visitors count
    const museum = Object.keys(museums).reduce((museum, data) =>
      parseInt(museums[museum]) > parseInt(museums[data]) ? museum : data
    );
    return {
      museum,
      visitors: parseInt(museums[museum]),
    };
  },

  getMuseumWithLowestVisitors(museums) {
    //Get museum with lowest visitors count
    if (!museums || !Object.keys(museums).length) return {};
    const museum = Object.keys(museums).reduce((museum, data) =>
      parseInt(museums[museum]) < parseInt(museums[data]) ? museum : data
    );
    return {
      museum,
      visitors: parseInt(museums[museum]),
    };
  },
};

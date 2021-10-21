const Machine = require("../../models/machine");
const helper = require("../../helper");
const __dir = __dirname + '../../../testInput/';

test("Coffee machine :: All beverage gets prepared if inventory is sufficient", async () => {
  const testsJSON = helper.readFile(__dir, "testData1.json");
    let res = await new Machine(testsJSON).process();
    expect(res).toEqual(testsJSON.output);
});


test("Coffee machine :: For one beverage, one ingredient is unavailable", async () => {
  const testsJSON = helper.readFile(__dir, "testData2.json");
  let res = await new Machine(testsJSON).process();
  expect(res).toEqual(testsJSON.output);
});

test("Coffee machine :: One beverage with ingredient unavailable and one with ingredient not sufficient", async () => {
  const testsJSON = helper.readFile(__dir, "testData3.json");
  let res = await new Machine(testsJSON).process();
  expect(res).toEqual(testsJSON.output);
});

test("Coffee machine :: Machine with 3 outlets but get same results", async () => {
  const testsJSON = helper.readFile(__dir, "testData4.json");
  let res = await new Machine(testsJSON).process();
  expect(res).toEqual(testsJSON.output);
});

test("Coffee machine :: Machine with more outlets than beverages to prepare", async () => {
  const testsJSON = helper.readFile(__dir, "testData4.json");
  testsJSON.machine.outlets.count_n = 10;
  let res = await new Machine(testsJSON).process();
  expect(res).toEqual(testsJSON.output);
});


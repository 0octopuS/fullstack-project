const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

test("post new user and get result", async () => {
  await User.deleteMany({});
  const usersToAdd = [
    { username: "Alice", name: "Alice Rome", password: "AliceIsMe" },
    { username: "Bob", name: "Bob Redi", password: "BobisNotMe" },
    // Add more users as needed
  ];
  const response1 = await api.post("/api/users").send(usersToAdd[0]);
  expect(response1.status).toBe(201);
  const response2 = await api.post("/api/users").send(usersToAdd[1]);
  expect(response2.status).toBe(201);
});

// 4.16 implement tests that ensure invalid users are not created and that an
// invalid add user operation returns a suitable status code and error message.
test("getting details of all users returns a list of users", async () => {
  await User.deleteMany({});
  const usersToAdd = [
    { username: "Alice", name: "Alice Rome", password: "AliceIsMe" },
    { username: "Bob", name: "Bob Redi", password: "B2" },
    { name: "Bob Redi", password: "Bo2" },
    // Add more users as needed
  ];
  const response1 = await api.post("/api/users").send(usersToAdd[0]);
  expect(response1.status).toBe(201);
  const response2 = await api.post("/api/users").send(usersToAdd[1]);
  expect(response2.status).toBe(400);
  const response3 = await api.post("/api/users").send(usersToAdd[2]);
  expect(response3.status).toBe(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});

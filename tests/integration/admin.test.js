const request = require("supertest");
const { Admin } = require("../../models/admin");
let server;

describe("/taxi-api/admins", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Admin.remove({});
  });
  describe("GET /", () => {
    it("should return all admins", async () => {
      await Admin.collection.insertMany([
        { name: "mahmoud" },
        { name: "ahmed" }
      ]);
      const res = await request(server).get("/taxi-api/admins");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });
});

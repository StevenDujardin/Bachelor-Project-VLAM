let expect;
import("chai").then((chai) => {
  expect = chai.expect;
});

let request;
import("supertest").then((supertest) => {
  request = supertest.default;

  const app = require("../src/app").default;
  let server;

  before(function (done) {
    server = app.listen(done);
  });

  after(function (done) {
    server.close(done);
  });

  describe("Recipe Router", function () {
    describe("GET /recipes/:id", function () {
      it("responds with json containing the recipe with the given ID", function (done) {
        request(server)
          .get("/recipes/1")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.be.an("object");
            done();
          });
      });

      it("responds with 500 when the recipe is not found", function (done) {
        request(server)
          .get("/recipes/9999")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(500)
          .end(done);
      });
    });

    describe("GET /recipes/search/:search", function () {
      it("responds with json containing recipes matching the search", function (done) {
        request(server)
          .get("/recipes/search/kip")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.be.an("array");
            done();
          });
      });

      it("responds with 404 when no recipes are found", function (done) {
        request(server)
          .get("/recipes/search/nothing")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(404)
          .end(done);
      });
    });

    describe("GET /recipes", function () {
      it("responds with json containing filtered recipes", function (done) {
        request(server)
          .get("/recipes?type=main&duration=30&difficulty=easy")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.be.an("array");
            done();
          });
      });
    });

    describe("DELETE /recipes/delete/:id", function () {
      it("responds with json containing the deleted recipe", function (done) {
        request(server)
          .delete("/recipes/delete/2")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.be.an("object");
            done();
          });
      });
    });

    describe("PUT /recipes/edit/:id", function () {
      it("responds with json containing the edited recipe", function (done) {
        request(server)
          .put("/recipes/edit/5")
          .send({
            title: "New Recipe Title",
            description: "New Description",
            steps: ["Step 1", "Step 2"],
            duration: 45,
            difficulty: "medium",
            type: "dessert",
            ingredients: ["ingredient1", "ingredient2"],
            image: "/path/to/image.jpg",
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.be.an("object");
            done();
          });
      });
    });
  });
});

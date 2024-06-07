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
          .delete("/recipes/delete/1")
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
            title: "Test",
            description: "New Test",
            steps: ["Step 1", "Step 2"],
            duration: 45,
            difficulty: "gemiddeld",
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

  describe("User Router", function () {
    describe("GET /users/all", function () {
      it("responds with json containing all users", function (done) {
        request(server)
          .get("/users/all")
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
    });

    describe("POST /login", function () {
      it("should respond with 400 when username is not provided", function (done) {
          request(server)
              .post("/users/login")
              .send({ password: "password123" })
              .set("Accept", "application/json")
              .expect(400)
              .end((err, res) => {
                  if (err) return done(err);
                  expect(res.text).to.equal('Username is required');
                  done();
              });
        });

      it("should respond with 400 when password is not provided", function (done) {
          request(server)
              .post("/users/login")
              .send({ username: "testuser" })
              .set("Accept", "application/json")
              .expect(400)
              .end((err, res) => {
                  if (err) return done(err);
                  expect(res.text).to.equal('Password is required');
                  done();
              });
        });

      it("should respond with 200 and set a cookie when credentials are correct", function (done) {
          request(server)
              .post("/users/login")
              .send({ username: "user", password: "user" })
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .end((err, res) => {
                  if (err) return done(err);
                  expect(res.body).to.have.property("message", "Logged in successfully");
                  expect(res.body).to.have.property("user_id");
                  expect(res.body).to.have.property("username", "user");
                  done();
              });
        });

      it("should respond with 500 when credentials are incorrect", function (done) {
          request(server)
              .post("/users/login")
              .send({ username: "testuser", password: "wrongpassword" })
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(500)
              .end((err, res) => {
                  if (err) return done(err);
                  expect(res.body).to.have.property("error", "Gebruikersnaam of wachtwoord is niet juist");
                  done();
              });
        });
    });

    describe("POST /logout", function () {
      it("should respond with 200 and clear the cookie", function (done) {
          request(server)
              .post("/users/logout")
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .end((err, res) => {
                  if (err) return done(err);
                  expect(res.body).to.have.property("message", "Successfully logged out");
                  expect(res.headers['set-cookie']).to.not.be.undefined;
                  done();
              });
        });
    });

});


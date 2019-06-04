const Bluebird = require("bluebird");
const PrototypeExtension = require("../../src/infrastructure/prototype-extension");
const { expect } = require("chai");

describe("Unit tests for class dummy will", () => {

    let repositoryService;

    before(done => {
        const prototypeExtension = new PrototypeExtension({ bluebird: Bluebird });
        prototypeExtension.register();
        return done();
    });

    beforeEach(done => {
        return done();
    });

    context("test method x", () => {
        it("dummy result", done => {
            return done();
        });
    });

});
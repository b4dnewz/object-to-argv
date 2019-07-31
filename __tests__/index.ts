import objToArgv from "../src/index";

describe("object to argv", () => {

  it("should prefix depending on key length", () => {
    expect(objToArgv({
      b: true,
      foo: true,
    })).toEqual(["-b", "--foo"]);
  });

  it("should normalize key names", () => {
    expect(objToArgv({
      fooBar: true,
    })).toEqual(["--foo-bar"]);
  });

  it("should disable normalize key names", () => {
    expect(objToArgv({
      fooBar: true,
    }, {
        normalize: false,
      })).toEqual(["--fooBar"]);
  });

  describe("string", () => {
    it("should work with strings", () => {
      expect(objToArgv({
        foo: "bar",
      })).toEqual(["--foo", "bar"]);
    });
  });

  describe("number", () => {
    it("should work with numbers", () => {
      expect(objToArgv({
        foo: 1,
      })).toEqual(["--foo", "1"]);
    });
  });

  describe("boolean", () => {
    it("should work with boolean", () => {
      expect(objToArgv({
        bar: false,
        foo: true,
      })).toEqual(["--foo"]);
    });

    it("should support negated boolean", () => {
      expect(objToArgv({
        bar: false,
        foo: true,
      }, {
          booleanNegation: true,
        })).toEqual(["--no-bar", "--foo"]);
    });
  });

  describe("object", () => {
    it("should support objects", () => {
      expect(objToArgv({
        foo: {
          bar: "baz",
        },
      })).toEqual(["--foo.bar", "baz"]);

      expect(objToArgv({
        foo: {
          bar: {
            baz: true,
          },
        },
      })).toEqual(["--foo.bar.baz"]);
    });

    it("should support nested objects", () => {
      expect(objToArgv({
        foo: {
          bar: {
            baz: true,
          },
          cat: "foo",
        },
      })).toEqual(["--foo.bar.baz", "--foo.cat", "foo"]);
    });
  });

  describe("array", () => {
    it("should support arrays", () => {
      expect(objToArgv({
        foo: ["bar", "baz"],
      })).toEqual(["--foo", "bar,baz"]);
    });

    it("should support disabling array separator", () => {
      expect(objToArgv({
        foo: ["bar", "baz"],
      }, {
          arraySeparator: false,
        })).toEqual(["--foo", "bar", "baz"]);
    });

    it("should support custom array separator", () => {
      expect(objToArgv({
        foo: ["bar", "baz"],
      }, {
          arraySeparator: ";",
        })).toEqual(["--foo", "bar;baz"]);
    });

    it("should throw when type is not supported", () => {
      expect(() => {
        objToArgv({
          // @ts-ignore
          foo: /bar/,
        });
      }).toThrow(/is not supported/);

      expect(objToArgv({
        foo: ["bar", "baz"],
      }, {
          arraySeparator: " ",
        })).toEqual(["--foo", "bar baz"]);
    });
  });

});

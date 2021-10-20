const rewire = require("rewire");
const users = rewire("./users");
const getSession = users.__get__("getSession");
// @ponicode
describe("getSession", () => {
	test("0", async () => {
		await getSession(
			{
				cookies: {
					sessionID: "http://base.com",
					uuid: "d854efed-89e6-476c-878e-ea785e5f62d0",
				},
			},
			{ json: () => '"{"x":5,"y":6}"' }
		);
	});

	test("1", async () => {
		await getSession(
			{
				cookies: {
					sessionID: "https://croplands.org/app/a/confirm?t=",
					uuid: "6372ddce-22e2-45a1-92c7-e8d7ae758f7b",
				},
			},
			{ json: () => '"{"x":[10,null,null,null]}"' }
		);
	});

	test("2", async () => {
		await getSession(
			{
				cookies: {
					sessionID: "Www.GooGle.com",
					uuid: "d854efed-89e6-476c-878e-ea785e5f62d0",
				},
			},
			{ json: () => '""2006-01-02T14:04:05.000Z""' }
		);
	});

	test("3", async () => {
		await getSession(
			{
				cookies: {
					sessionID: "https://api.telegram.org/bot",
					uuid: "4e2845e3-4586-451e-894d-d703e72f8dac",
				},
			},
			{ json: () => '"[3,"false",false]"' }
		);
	});

	test("4", async () => {
		await getSession(
			{
				cookies: {
					sessionID: "ponicode.com",
					uuid: "6372ddce-22e2-45a1-92c7-e8d7ae758f7b",
				},
			},
			{ json: () => '""2006-01-02T14:04:05.000Z""' }
		);
	});

	test("5", async () => {
		await getSession(undefined, undefined);
	});
});

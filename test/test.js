const chai = require('chai');
const request = require('request');
const should = chai.should;
const assert = chai.assert;
const expect = chai.expect;
const host = 'http://localhost:3000';

describe('User API Tests', () => {
	var userId = "";

	it('Should return a full list of users', (done) => {
        request.get(host + '/users', (req, res) => {
			assert.equal(res.statusCode, 200);
			expect(res.body).to.not.be.null;
			done();
		});

	});

	it('Should create a new user', (done) => {
        var user = {
			firstName: 'Test',
			lastName: 'User',
			dob: '2016-12-01',
			email: 'example@example.com'
		};

		request.post(host + '/users', {form: user}, (req, res) => {
			assert.equal(res.statusCode, 200);
			expect(res.body).to.not.be.null;
			userId = JSON.parse(res.body)._id;
			done();
		});

	});

	it('Should get a single user', (done) => {
        request.get(host + '/users/' + userId, (req, res) => {
			assert.equal(res.statusCode, 200);
			expect(res.body).to.not.be.null;
			done();
		});

	});

	it('Should update a single user', (done) => {
        var data = {
			firstName: 'Updated Name'
		};

		request.put(host + '/users/' + userId, {form: data}, (req, res) => {
			assert.equal(res.statusCode, 200);
			expect(res.body).to.not.be.null;
			done();
		});
	
});

    it('Should delete a single user', (done) => {
        request.delete(host + '/users/' + userId, (req, res) => {
			assert.equal(res.statusCode, 204);
			expect(res.body).to.be.empty;
			done();
		});

    });

})

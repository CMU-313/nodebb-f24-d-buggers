'use strict';

const chai = require('chai');
const sinon = require('sinon');
const $ = require('jquery');
const postTools = require('../../public/src/client/topic/postTools');
const api = require('../../public/src/modules/api');
const alerts = require('../../public/src/modules/alerts');

const { assert } = chai;

describe('Endorse Feature Client-Side Tests', () => {
	let $endorseButton;
	let apiPutStub;
	let apiDeleteStub;
	let alertSuccessStub;
	let alertErrorStub;

	beforeEach(() => {
		// Set up DOM element
		$endorseButton = $('<button data-pid="123" component="post/endorse">Endorse</button>');
		$('body').append($endorseButton);

		// Stub API methods
		apiPutStub = sinon.stub(api, 'put');
		apiDeleteStub = sinon.stub(api, 'delete');
		alertSuccessStub = sinon.stub(alerts, 'success');
		alertErrorStub = sinon.stub(alerts, 'error');

		// Initialize postTools
		postTools.init();
	});

	afterEach(() => {
		// Restore stubs and remove elements
		apiPutStub.restore();
		apiDeleteStub.restore();
		alertSuccessStub.restore();
		alertErrorStub.restore();
		$endorseButton.remove();
	});

	it('should trigger endorse action when endorse button is clicked', (done) => {
		apiPutStub.callsFake((endpoint, data, callback) => {
			assert.strictEqual(endpoint, '/posts/123/endorse');
			callback(null, { endorsed: true, endorsements: 1 });
		});

		$endorseButton.click();

		setTimeout(() => {
			assert(apiPutStub.calledOnce, 'API.put should be called once');
			assert(alertSuccessStub.calledWith('[[topic:post_endorsed]]'), 'Success alert should be shown');
			done();
		}, 100);
	});

	it('should update UI after endorsing a post', (done) => {
		apiPutStub.callsFake((endpoint, data, callback) => {
			callback(null, { endorsed: true, endorsements: 1 });
		});

		$endorseButton.click();

		setTimeout(() => {
			assert.strictEqual($endorseButton.text(), 'Endorsed');
			assert.strictEqual($endorseButton.attr('data-endorsed'), 'true');
			assert.strictEqual($endorseButton.find('.endorsement-count').text(), '1');
			done();
		}, 100);
	});

	it('should handle API errors gracefully', (done) => {
		apiPutStub.callsFake((endpoint, data, callback) => {
			callback(new Error('Test error'));
		});

		$endorseButton.click();

		setTimeout(() => {
			assert(alertErrorStub.calledWith('[[error:endorsing_post]]'), 'Error alert should be shown');
			done();
		}, 100);
	});

	it('should unendorse a post when clicked on an endorsed post', (done) => {
		$endorseButton.attr('data-endorsed', 'true').text('Endorsed');
		$endorseButton.find('.endorsement-count').text('1');

		apiDeleteStub.callsFake((endpoint, data, callback) => {
			assert.strictEqual(endpoint, '/posts/123/endorse');
			callback(null, { endorsed: false, endorsements: 0 });
		});

		$endorseButton.click();

		setTimeout(() => {
			assert(apiDeleteStub.calledOnce, 'API.delete should be called once');
			assert.strictEqual($endorseButton.text(), 'Endorse');
			assert.strictEqual($endorseButton.attr('data-endorsed'), 'false');
			assert.strictEqual($endorseButton.find('.endorsement-count').text(), '0');
			assert(alertSuccessStub.calledWith('[[topic:post_unendorsed]]'), 'Success alert should be shown');
			done();
		}, 100);
	});
});

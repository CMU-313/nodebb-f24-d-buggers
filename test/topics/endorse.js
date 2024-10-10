'use strict';

define('forum/topic/endorse.tests', [
	'tests/lib/eventemitter2',
	'tests/lib/chai',
	'tests/lib/sinon',
	'forum/topic/postTools',
	'jquery',
	'api',
	'alerts',
], (EventEmitter2, chai, sinon, postTools, $, api, alerts) => {
	const { assert } = chai;

	describe('Endorse Feature Client-Side Tests', () => {
		let $endorseButton;
		let apiPutStub;
		let alertSuccessStub;
		let alertErrorStub;

		beforeEach(() => {
			// Set up DOM element
			$endorseButton = $('<button data-post-id="123" component="post/endorse">Endorse</button>');
			$('body').append($endorseButton);

			// Stub API methods
			apiPutStub = sinon.stub(api, 'put');
			alertSuccessStub = sinon.stub(alerts, 'success');
			alertErrorStub = sinon.stub(alerts, 'error');

			// Initialize postTools
			postTools.init();
		});

		afterEach(() => {
			// Restore stubs and remove elements
			apiPutStub.restore();
			alertSuccessStub.restore();
			alertErrorStub.restore();
			$endorseButton.remove();
		});

		it('should trigger endorse action when endorse button is clicked', (done) => {
			apiPutStub.callsFake((endpoint, data, callback) => {
				assert.strictEqual(endpoint, '/posts/123/endorse');
				callback(null, { endorsed: true });
			});

			$endorseButton.click();

			setTimeout(() => {
				assert(apiPutStub.calledOnce, 'API.put should be called once');
				assert(alertSuccessStub.calledWith('Post successfully endorsed!'), 'Success alert should be shown');
				done();
			}, 100);
		});

		it('should update UI after endorsing a post', (done) => {
			apiPutStub.callsFake((endpoint, data, callback) => {
				callback(null, { endorsed: true });
			});

			$endorseButton.click();

			setTimeout(() => {
				assert.strictEqual($endorseButton.text(), 'Endorsed');
				done();
			}, 100);
		});

		it('should handle API errors gracefully', (done) => {
			apiPutStub.callsFake((endpoint, data, callback) => {
				callback(new Error('Test error'));
			});

			$endorseButton.click();

			setTimeout(() => {
				assert(alertErrorStub.calledWith('Error endorsing post: Test error'), 'Error alert should be shown');
				done();
			}, 100);
		});
	});
});

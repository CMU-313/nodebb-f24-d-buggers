'use strict';

define('forum/account/endorsed', ['forum/account/header', 'forum/account/posts'], function (header, posts) {
	const Endorsed = {};

	Endorsed.init = function () {
		header.init();

		$('[component="post/content"] img:not(.not-responsive)').addClass('img-fluid');

		$('[component="post/endorse"]').on('click', function (e) {
			e.preventDefault();
			const postId = $(this).attr('data-post-id');
			Endorsed.handleEndorse(postId);
		});

		posts.handleInfiniteScroll('account/endorsed');
	};

	Endorsed.handleEndorse = function (postId) {
		// Logic to handle endorsement, possibly involving API calls to mark a post as endorsed
		socket.emit('plugins.endorse.post', { postId: postId }, function (err, result) {
			if (err) {
				app.alertError(err.message);
			} else {
				app.alertSuccess('Post successfully endorsed!');
			}
		});
	};

	return Endorsed;
});

'use strict';

const querystring = require('querystring');

const posts = require('../posts');
const privileges = require('../privileges');
const helpers = require('./helpers');

const postsController = module.exports;

postsController.redirectToPost = async function (req, res, next) {
	const pid = parseInt(req.params.pid, 10);
	if (!pid) {
		return next();
	}

	const [canRead, path] = await Promise.all([
		privileges.posts.can('topics:read', pid, req.uid),
		posts.generatePostPath(pid, req.uid),
	]);
	if (!path) {
		return next();
	}
	if (!canRead) {
		return helpers.notAllowed(req, res);
	}

	const qs = querystring.stringify(req.query);
	helpers.redirect(res, qs ? `${path}?${qs}` : path, true);
};

postsController.getRecentPosts = async function (req, res) {
	const page = parseInt(req.query.page, 10) || 1;
	const postsPerPage = 20;
	const start = Math.max(0, (page - 1) * postsPerPage);
	const stop = start + postsPerPage - 1;
	const data = await posts.getRecentPosts(req.uid, start, stop, req.params.term);
	res.json(data);
};

// Adding endorsePost function
postsController.endorsePost = async function (req, res) {
	const postId = req.params.pid;
	const uid = req.uid;

	if (!postId || !uid) {
		return res.status(400).json({ error: 'Invalid request' });
	}

	try {
		// Check if the user has already endorsed the post
		const hasEndorsed = await db.isSetMember(`post:${postId}:endorsed`, uid);

		if (hasEndorsed) {
			// User is unendorsing the post
			await db.setRemove(`post:${postId}:endorsed`, uid);
			await db.decrObjectField(`post:${postId}`, 'endorsements');
			res.status(200).json({ endorsed: false });
		} else {
			// User is endorsing the post
			await db.setAdd(`post:${postId}:endorsed`, uid);
			await db.incrObjectField(`post:${postId}`, 'endorsements');
			res.status(200).json({ endorsed: true });
		}
	} catch (err) {
		return res.status(500).json({ error: 'An error occurred while endorsing the post' });
	}
};

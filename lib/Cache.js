;(function (root, factory) {

	if (typeof define === 'function' && define.amd) {
		define(['moment'], function (moment) {
			return factory(root, moment);
		});
	}
	else if (typeof exports !== 'undefined') {
		var moment = require('moment');
		module.exports = factory(root, moment);
	}
	else {
		root.Cache = factory(root, root.moment);
	}

}(this, function (root, moment) {

	var Cache = module.exports = function() {
		this.storage = {};
		this.ttl = {};
	};

	Cache.middleware = function middleware(options) {
		return function (context, next) {
			context.cache = new Cache(options);
			return next();
		};
	};

	Cache.prototype.set = function set(name, value, ttl) {
		this.storage[name] = value;
		if (typeof ttl !== 'undefined') {
			this.ttl[name] = {
				date: moment(),
				ttl: ttl
			};
		}
		return this;
	};

	Cache.prototype.get = function get(name) {
		if (name in this.ttl && this.ttl[name].date.isBefore(moment().subtract(this.ttl[name].ttl))) {
			this.remove(name);
			return null;
		}
		return this.storage[name];
	};

	Cache.prototype.clear = function clear() {
		this.storage = {};
		return this;
	};

	Cache.prototype.remove = function remove(name) {
		delete this.storage[name];
		return this;
	};

}));
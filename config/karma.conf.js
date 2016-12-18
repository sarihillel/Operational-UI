// Karma configuration
module.exports = function (config) {
	config.set({

		// will be used to resolve files and exclude
		basePath: '../',

		frameworks: ['jasmine'],

		files: [
			'./node_modules/phantomjs-polyfill/bind-polyfill.js',
			'.tmp/assets/vendor.js',
			'.tmp/assets/app.js',
			'.tmp/tests/**/*.js'
		],

		exclude: [],

		reporters: ['spec'],

		port: 9876,

		colors: true,

		// config.LOG_DISABLE | config.LOG_ERROR | config.LOG_WARN | config.LOG_INFO | config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera (has to be installed with `npm install karma-opera-launcher`)
		// - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
		// - PhantomJS
		// - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
		browsers: ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};

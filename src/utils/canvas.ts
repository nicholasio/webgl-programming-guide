export const create3DContext = function (canvas, opt_attribs) {
	const names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
	let context = null;
	for (let ii = 0; ii < names.length; ++ii) {
		try {
			context = canvas.getContext(names[ii], opt_attribs);
		} catch (e) {
			// do nothing
		}
		if (context) {
			break;
		}
	}
	return context;
};

/**
 * Creates the HTLM for a failure message
 *
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @returns {string} The html.
 */
const makeFailHTML = function (msg) {
	return `<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">${msg}</div></div></td></tr></table>`;
};

/**
 * Mesasge for getting a webgl browser
 *
 * @type {string}
 */
const GET_A_WEBGL_BROWSER =
	'' +
	'This page requires a browser that supports WebGL.<br/>' +
	'<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

/**
 * Mesasge for need better hardware
 *
 * @type {string}
 */
const OTHER_PROBLEM =
	'' +
	"It doesn't appear your computer can support WebGL.<br/>" +
	'<a href="http://get.webgl.org">Click here for more information.</a>';

export const setupWebGL = function (canvas, opt_attribs, opt_onError) {
	function handleCreationError(msg) {
		const container = document.getElementsByTagName('body')[0];
		// var container = canvas.parentNode;
		if (container) {
			let str = window.WebGLRenderingContext ? OTHER_PROBLEM : GET_A_WEBGL_BROWSER;
			if (msg) {
				str += `<br/><br/>Status: ${msg}`;
			}
			container.innerHTML = makeFailHTML(str);
		}
	}

	// eslint-disable-next-line
	opt_onError = opt_onError || handleCreationError;

	if (canvas.addEventListener) {
		canvas.addEventListener(
			'webglcontextcreationerror',
			function (event) {
				opt_onError(event.statusMessage);
			},
			false,
		);
	}
	const context = create3DContext(canvas, opt_attribs);
	if (!context) {
		if (!window.WebGLRenderingContext) {
			opt_onError('');
		} else {
			opt_onError('');
		}
	}

	return context;
};

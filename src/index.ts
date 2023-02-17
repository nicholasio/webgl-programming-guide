import '../book_samples/lib/webgl-utils';
import '../book_samples/lib/webgl-debug';
import { getWebGLContext, initShaders } from '../book_samples/lib/cuon-utils';

const vShader = `
void main(){
    gl_Position = vec4(0.0,0.0,0.0,1.0);
    gl_PointSize = 10.0;
}
`;

const fShader = `
void main() {
    gl_FragColor = vec4(1.0, 0.0,0.0,1.0);   
}
`;

function Draw() {
	const canvas = document.getElementById('canvas');
	const gl = getWebGLContext(canvas);

	if (!gl) {
		console.log('Failed to get the rendering context');
		return;
	}

	if (!initShaders(gl, vShader, fShader)) {
		console.log('failed to initialize shaders');
		return;
	}

	gl.clearColor(0.0, 0.0, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.POINTS, 0, 1);
}

document.addEventListener('DOMContentLoaded', () => {
	Draw();
});

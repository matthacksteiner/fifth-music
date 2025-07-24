// Background Animation - Vanilla JS Version
(function () {
	// Initialize namespace
	if (typeof window.Humble == 'undefined') window.Humble = {};
	window.Humble.Trig = {};
	window.Humble.Trig.init = init;

	var unit = 400,
		canvas,
		context,
		height,
		width,
		xAxis,
		yAxis,
		draw,
		animationId;

	/**
	 * Init function.
	 * Initialize variables and begin the animation.
	 */
	function init() {
		canvas = document.getElementById('sineCanvas');

		if (!canvas) {
			console.warn('Canvas element with id "sineCanvas" not found');
			return;
		}

		// Set canvas dimensions
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		context = canvas.getContext('2d');
		context.strokeStyle = '#000';
		context.lineJoin = 'round';

		height = canvas.height;
		width = canvas.width;
		xAxis = Math.floor(height / 2);
		yAxis = Math.floor(0);

		context.save();

		// Start the animation
		draw();

		// Handle window resize
		window.addEventListener('resize', handleResize);
	}

	/**
	 * Handle window resize
	 */
	function handleResize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		height = canvas.height;
		width = canvas.width;
		xAxis = Math.floor(height / 2);
		yAxis = Math.floor(0);
	}

	/**
	 * Draw animation function.
	 * This function draws one frame of the animation and calls itself again.
	 */
	draw = function () {
		// Clear the canvas
		context.clearRect(0, 0, width, height);

		// Draw the axes in their own path
		context.beginPath();
		context.stroke();

		// Set styles for animated graphics
		context.save();
		context.lineWidth = 1;

		// Draw multiple sine curves with different phases and colors
		drawSine(draw.t, '#606C76');
		drawSine(2 * draw.t + 200, '#F64D64');
		drawSine(4 * draw.t + 400, '#90D4C5');
		drawSine(6 * draw.t + 600, '#FFF756');

		// Restore original styles
		context.restore();

		// Update the time
		draw.seconds = draw.seconds - 0.0025;
		draw.t = draw.seconds * Math.PI;

		// Schedule next frame
		animationId = setTimeout(draw, 35);
	};

	// Initialize time variables
	draw.seconds = 0;
	draw.t = 0;

	/**
	 * Function to draw sine wave
	 * The sine curve is drawn in 10px segments starting at the origin.
	 */
	function drawSine(t, color) {
		context.beginPath();
		context.strokeStyle = color;

		var x = t;
		var y = Math.sin(x);
		context.moveTo(yAxis, unit * y + xAxis);

		// Loop to draw segments
		for (var i = yAxis; i <= width; i += 10) {
			x = t + (-yAxis + i) / unit;
			y = Math.sin(x);
			context.lineTo(i, unit * y + xAxis);
		}

		context.stroke();
	}

	/**
	 * Stop animation function
	 */
	function stop() {
		if (animationId) {
			clearTimeout(animationId);
			animationId = null;
		}
		window.removeEventListener('resize', handleResize);
	}

	// Expose stop function
	window.Humble.Trig.stop = stop;

	// Auto-initialize when DOM is ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	// Clean up on page unload
	window.addEventListener('beforeunload', stop);
})();

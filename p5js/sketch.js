

function setup() {
	createCanvas(1920, 1080);
	noStroke();
	fill(255);
	colorMode(HSB, 360, 100, 100, 255);
}

function draw() {
	background(0);

	const step = 30;

	for (var y = 0; y <= height; y+= step) {
		for (var x = 0; x <= width; x+= step) {
			const d = dist(x, y, mouseX, mouseY);
			const size = map(sin(d * 0.05), -1, 1, 0, 5);
			fill(map(sin(d * 0.05), -1, 1, 60, 320), 100, 100);
			ellipse(x, y, size, size);
		}
	}
}
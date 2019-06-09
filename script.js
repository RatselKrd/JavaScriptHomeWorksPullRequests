const doc = document;

const canvas = doc.querySelector ('#canv');
const ctx = canvas.getContext ('2d');

var system = {
	width: canvas.getAttribute ('width'),
	height: canvas.getAttribute ('height'),
	currentTool: '',
	currentColor: 'black' ,
	brushSize: 5
}

function reRenderSys (obj, elem, action) {
	obj[elem] = action;
	console.log (obj)
}

function getCoords (evt) {
	let coors = {};

	let x = evt.offsetX;
	let y = evt.offsetY;

	doc.querySelector ('#xCoord').innerText = x;
	doc.querySelector ('#yCoord').innerText = y;
}

canvas.addEventListener ('mousemove', getCoords);

function switchTool(button) {
	return button.id
}

function switchSize(button) {
	return doc.querySelector ('#size-select').value
}

function switchColor(button) {
	return doc.querySelector ('#color').value
}

function mouseActions (evt) {
	if (evt.target.classList.contains ('tool-button')) {
		reRenderSys (system, 'currentTool', switchTool(evt.target))
		console.log ('some tool')
	} else if (evt.target.id === 'size-select') {
		reRenderSys (system, 'brushSize', switchSize(evt.target))
		console.log ('size selected')
	} 
}

function startDraw (evt) {
	if (system.currentTool === 'brush') drawLines (evt)
}

function endDraw () {
	canvas.onmousemove = null
}

function drawLines (evt) {
	canvas.onmousemove = (evt) => {
		ctx.beginPath ()
		ctx.fillStyle = system.currentColor
		ctx.fillRect (doc.querySelector ('#xCoord').innerText, doc.querySelector ('#yCoord').innerText, system.brushSize, system.brushSize)
	}
}


doc.addEventListener ('click', mouseActions);

doc.querySelector('#color').addEventListener ('input', (evt) => {
	reRenderSys (system, 'currentColor', switchColor(evt.target))
});

canvas.addEventListener ('mousedown', startDraw);
canvas.addEventListener ('mouseup', endDraw);

var slider = document.getElementById('size-select');
var output = document.getElementById('bsize');
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
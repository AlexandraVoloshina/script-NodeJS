const fs = require('fs');
let json = fs.readFileSync('../src/node/dashboard_api/lib/dynconfig/config.json');
let data = JSON.parse(json);
let html = '<html><body>';
let firstElement = data[Object.keys(data)[0]][0];
let arrElements = firstElement[Object.keys(firstElement)[1]];
let dataMas = data[Object.keys(data)[0]];

html += '<ul><li>'+ Object.keys(data)[0] + '</li>';
html += '<ul><li>'+ Object.keys(firstElement)[0] + ' : ' + firstElement[Object.keys(firstElement)[0]] + '</li>';
html += '<ul><li>'+ Object.keys(firstElement)[1] + ' : </li>';

for (let i = 0; i < arrElements.length; i ++){
	madeArray (arrElements[i]);
}

html += '</ul></ul>';

for (let i = 1; i < dataMas.length; i ++){
	madeArray (dataMas[i]);
}

function madeArray (arrElement1) {
	html += '<ul>';
	for (let i in arrElement1){
		let count = 0;
		if(Array.isArray(arrElement1[i])){
			elArray(arrElement1[i], i, count);
		} else {
			html += '<li>'+ i + ' : ' + arrElement1[i] + '</li>';
		}
	}
	html += '</ul>';
}

function elArray(el, i, count){
	html += '<li>'+ i + ' : ' + '</li>';
	if(i === 'scope'){
		html = html.slice(0, -5);
	}
	for (let item = 0; item < el.length; item ++){
		let arrElement12 = el[item];
		if(typeof arrElement12 !== 'object'){
			html += ' ' + arrElement12;
		} else {
			html += '<ul>';
			for (let j in arrElement12){
				let count2 = 0;
				if(Array.isArray(arrElement12[j])){
					elArray(arrElement12[j], j, count2);
				} else {
					html += '<li>'+ j + ' : ' + arrElement12[j] + '</li>';
				}
			}
			html += '</ul><br>';
		}
	}
}

html += '</body></html>';
fs.writeFileSync('options-doc.html', html);
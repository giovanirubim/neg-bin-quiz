const nBits = 6;
const methods = [{
	name: 'complemento de dois',
	min: - Math.pow(2, nBits - 1),
	convert: dec => {
		dec = Number(dec);
		let bin = '';
		for (let i=0; i<nBits; ++i) {
			let bit = (dec >> i)&1;
			bin = bit + bin;
		}
		return bin;
	},
}, {
	name: 'complemento de um',
	min: 1 - Math.pow(2, nBits - 1),
	convert: dec => {
		if (dec[0] === '+') {
			return Number(dec).toString(2).padStart(nBits, '0');
		}
		dec = Number(dec.replace('-', ''));
		return dec.toString(2).padStart(nBits, '0').replace(/[01]/g, i => 1 - i);
	},
}];
const randomMethod = () => {
	const i = Math.floor(Math.random()*methods.length);
	return methods[i];
};
const random = (min, max) => Math.floor((max - min + 1)*Math.random()) + min;
const randomQuestion = () => {
	const method = randomMethod();
	let dec = random(method.min, 1);
	dec = {0: '+0', 1: '-0'}[dec] ?? dec.toString();
	let bin = method.convert(dec);
	if (Math.random() < 0.5) {
		return {
			question: `Converta <span>${dec}</span> de decimal para binário usando <u>${method.name}</u>.`,
			answer: bin,
		};
	} else {
		return {
			question: `Converta <span>${bin}</span> de binário para decimal usando <u>${method.name}</u>.`,
			answer: dec,
		}
	}
};
const generate = () => {
	const { question, answer } = randomQuestion();
	document.querySelector('p').innerHTML = question;
	const divres = document.querySelector('.result');
	divres.innerHTML = '';
	document.querySelector('#answer').onclick = () => {
		divres.innerHTML = 'Resposta: ' + answer;
	};
};
document.querySelector('#generate').onclick = generate;
document.querySelector('h3').innerText = `Utilize ${nBits} bits`;
generate();

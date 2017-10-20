const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

module.exports = {
	initialData: function(req, res) {
		const filePath = path.join(__dirname, '../../client/initialData.xlsx');
		return new Promise((resolve, reject) => {
			fs.readFile(filePath, (err, buffer) => {
				if (err) {
					return reject(err);
				}

				return resolve(parseJson(buffer));
			});
		})
		.then(data => {
			res.status(200).send(data);
		})

		// to be continued for insert data to db
		// .then()

		.catch(err => {
			res.status(500).send(err);
		});
	}
};


function parseJson(buffer) {
	let result = [];
	const workbook = XLSX.read(buffer);
	const sheet_name_list = workbook.SheetNames;

	sheet_name_list.forEach(function(y) {
		const worksheet = workbook.Sheets[y];
		let headers = {};
		let data = [];

		for (z in worksheet) {
			if (z[0] === '!') continue;

			let tt = 0;
			for (let i = 0; i < z.length; i++) {
				if (!isNaN(z[i])) {
					tt = i;
					break;
				}
			};

			let col = z.substring(0, tt);
			let row = parseInt(z.substring(tt));
			let value = worksheet[z].v;

			if (row == 1 && value) {
				headers[col] = value;
				continue;
			}

			if (!data[row]) data[row] = {};
			data[row][headers[col]] = value;
		}

		data.shift();
		data.shift();

		result.push(data);
	});
	
	return result;
}
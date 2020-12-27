import parseFormData from 'parse-formdata';

export const withFilesMiddleware = async (req, res, next) => {
	try {
		await new Promise((resolve, reject) => {
			parseFormData(req, function (err, { fields, parts }) {
				if (err) {
					reject({ message: err.messsage, status: 400 });
				}
				req.fields = fields;
				req.files = parts;
				resolve();
			})
		});
		next();
	} catch (e) {
	  res.status(e.status || 500).json({ message: e.message });
	}
};

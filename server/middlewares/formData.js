import parseFormData from 'parse-formdata';

export const withFilesMiddleware = (req, res, next) => {
	parseFormData(req, async function (err, { fields, parts }) {
		if (err) {
			return res.status(400).json({ message: err.messsage });
		}
		req.fields = fields;
		req.files = parts;
		next();
	})
};

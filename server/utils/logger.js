import fs from 'fs';
import path from 'path';

class Logger {
	constructor() {
		this._file = path.join(process.cwd(), 'logs.txt');
	}
	
	_saveMessage(type, message, tips = '') {
		const stringifyMessage = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
		const formattedTips = tips ? `${tips} - ` : '';
		const computedMessage = `${new Date().toLocaleDateString()} - ${type.toUpperCase()} - ${formattedTips}${stringifyMessage}\n\n`;
		fs.appendFileSync(this._file, computedMessage);
	}
	
	info(message, tips) {
		this._saveMessage('info', message, tips);
	}
	
	error(message, tips) {
		this._saveMessage('error', message, tips);
	}
}

export const logger = new Logger();

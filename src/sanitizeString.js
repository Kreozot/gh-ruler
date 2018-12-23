module.exports = function sanitizeString(string){
	return string.replace(/[^A-Za-z0-9\-_.]/g, ''); // $& means the whole matched string
};

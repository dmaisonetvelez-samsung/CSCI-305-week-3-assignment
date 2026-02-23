const fs = require('fs');
const csv = require('csv-parser');

/**
 * Reads workout data from a CSV file.
 * @param {string} filePath 
 * @returns {Promise<Array>}
 */
function readWorkoutData(filePath) {
    const results = [];

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
            reject(new Error('Workout file not found'));
            return;
        }

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

module.exports = { readWorkoutData };

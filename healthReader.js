const fs = require('fs').promises;

/**
 * Reads health data from a JSON file.
 * @param {string} filePath 
 * @returns {Promise<Array>}
 */
async function readHealthData(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading health file: ${error.message}`);
        throw error;
    }
}

module.exports = { readHealthData };

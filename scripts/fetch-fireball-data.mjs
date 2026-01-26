import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_URL = 'https://ssd-api.jpl.nasa.gov/fireball.api?req-loc=true';
const OUTPUT_FILE = path.join(__dirname, '../public/fireballs.json');

console.log(`Fetching fireball data from ${DATA_URL}...`);

https.get(DATA_URL, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            // Validate JSON
            JSON.parse(data);

            fs.writeFileSync(OUTPUT_FILE, data);
            console.log(`Successfully saved fireball data to ${OUTPUT_FILE}`);
        } catch (e) {
            console.error('Failed to parse NASA data as JSON:', e.message);
            process.exit(1);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching data from NASA:', err.message);
    process.exit(1);
});

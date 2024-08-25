const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// POST /route
app.post('/route', (req, res) => {
    const { station, userId, collegeEmail, collegeRollNumber, numberArray, alphabetArray } = req.body;
    const highestAlphabet = alphabetArray ? alphabetArray.filter(char => char === char.toLowerCase()).sort().reverse()[0] : null;

    res.json({
        isSuccess: true,
        userId: userId || 'shriyansh_agarwal_12112002',
        email: collegeEmail || 'shriyanshagarwal1@gmail.com',
        rollNumber: collegeRollNumber || '21BAI10207',
        numbers: numberArray || [],
        alphabets: alphabetArray || [],
        highestLowercaseAlphabet: highestAlphabet
    });
});

// GET /operation-code
app.get('/operation-code', (req, res) => {
    res.status(200).json({
        operationCode: 1,
        success: true
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Enable CORS (optional, for frontend access)
const cors = require('cors');
app.use(cors());

// Route to serve the PDF file
app.get('/download-pdf', (req, res) => {
    const filePath = path.join(__dirname, 'files', 'pd.pdf'); // Path to your PDF file
    console.log("PDF File Path:", filePath);
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found' });
    }

    // Set headers to force download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');

    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

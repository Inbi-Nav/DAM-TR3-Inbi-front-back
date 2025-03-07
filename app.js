const connectDB = require('./shared/db/mongo');
const express = require('express');
const app = express();

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
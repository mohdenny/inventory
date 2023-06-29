const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// connect database
connectDB();

app.use(cors());
app.use('/public/uploads', express.static('public/uploads'));

// init middleware
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

// define route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/items', require('./routes/api/items') );

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
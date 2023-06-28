const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/blog_nodejs_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected successfully!!!");
    } catch (error) {
        console.log("Connected faill!!!");
    }

}

module.exports = { connect };

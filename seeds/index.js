const mongoose = require('mongoose');
const campground = require('../models/campground');
const Campground = require('../models/campground');
const cities = require('./cities.js');
const { places, descriptors } = require('./seedHelpers.js');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '609783aab31d4f14d844d0d8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/drnltdbva/image/upload/v1620713055/YelpCamp/vzawj0avvxlnldicszew.jpg',
                    filename: 'YelpCamp/vzawj0avvxlnldicszew'
                },
                {
                    url: 'https://res.cloudinary.com/drnltdbva/image/upload/v1620713055/YelpCamp/pgqz0bxrynduui0hjnwd.jpg',
                    filename: 'YelpCamp/pgqz0bxrynduui0hjnwd'
                },
                {
                    url: 'https://res.cloudinary.com/drnltdbva/image/upload/v1620713057/YelpCamp/a8ut6owyw5qp45aumggd.jpg',
                    filename: 'YelpCamp/a8ut6owyw5qp45aumggd'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
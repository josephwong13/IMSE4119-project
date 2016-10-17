var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    description: String,
    summary: String,
    owner_id: String,
    owner_username: String,
    location: String,
    goalFund: Number,
    currentFund: {type:Number, default: 0},
    startDate: Date,
    endDate: Date,
    backer: [{username:String}],
    reward: [{name:String,fund:Number,description:String,shipment:Boolean}]
});

module.exports = mongoose.model('Project',ProjectSchema);

/* For testing propose
{
    "name": "Fanstics Project",
    "description": "Nullam fermentum diam elementum, hendrerit felis at, vulputate magna. Proin sit amet purus urna. Pellentesque euismod arcu orci, ac fermentum urna consequat eu. Curabitur euismod nunc sed vehicula eleifend. Nulla scelerisque dolor eget eros sagittis iaculis. Maecenas vitae elementum enim. Nam nec ligula eu augue maximus tempor. Maecenas sapien mauris, malesuada sit amet risus vitae, interdum faucibus dui. ",
    "summary": "This project is fanstics! Back me up!",
    "owner_username": "Joseph",
    "goalFund": 300000,
    "startDate": "2016-10-15",
    "endDate": "2016-1-15",
    "reward" : ["name":"Highfly","Number":5,"shipment":false]
}
*/
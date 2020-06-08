/*
Database Structure
User Schema

	user: {
	name: Rohith (string)
	id: googleID (string)
	memberOf: {
		id: roomID (number)
		id: roomID (number)
	}
	}

Chat Schema Dynamically calcualate the rankings based on endorsements

	room: {
		title: demoRoom (string)
		id: roomID (number)
		roomCode: pwd to get into room (string)
		memberIDs: {
			user: users googleID (number)
			user: users googleID (number)
			.
			.
			.
		}
		endorsements: {
			endorsement: {
				from: userID (number)
				to: userID (number)
				public: TRUE (boolean)
			}
		}
		ranks: {
			1: userID (number)
			2: userID (number)
			.
			.
			.
		}
	}

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Rooms Schema
const userRoomsSchema = new Schema({
	roomID: String
});
const UserRoom = mongoose.model('userRoom', userRoomsSchema) //User Rooms Model

//User Schema
const userSchema = new Schema({
	username: String,
	googleID: String,
	memberOf: [userRoomsSchema],
	thumbnail: String
});
const User = mongoose.model('user', userSchema); //User model

//Endorsements Schema
const endorsementSchema = new Schema({
	from: String,
	to: String,
	public: Boolean
});
const Endorsement = mongoose.model('endorsement', endorsementSchema); //Endorsement Model

const userIDSchema = new Schema({
	userID: String
});
const Member = mongoose.model('member', userIDSchema); //Memebers of a Group

//Rooms Schema
const roomsSchema = new Schema({
	title: String,
	roomID: String,
	roomSecret: String,
	memberIDs: [userIDSchema],
	endorsements: [endorsementSchema]
});
const Room = mongoose.model('room', roomsSchema); //Room Model

module.exports = {
	User, Room
}






















const Hapi = require('@hapi/hapi');

// Database Configuration
const mongoose = require('mongoose');
const dbHost = "mongodb://127.0.0.1:27017/fed_notes_db";

mongoose.connect(dbHost)
.then(() => console.log('MongoDB connected.....!'))
.catch((err) => console.error(err));

// Define schema note
let noteSchema = mongoose.Schema({
    title: String,
    important: Boolean,
    description: String
},{
    versionKey:false
});

let Note = mongoose.model('Notes', noteSchema);

const init = async () => {
    
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method:'GET',
        path:'/',
        handler:(request,h) => {
            return 'Hello World with Mongoose and HAPI!';
        }
    });

    // Get All notes
    server.route({
        method:'GET',
        path:'/api/notes',
        handler: async (request,h) => {
            let params = request.query; // we can also use http://localhost:3000/api/notes?important=false
            // console.log('params is',params);
            let infos = await Note.find(params).lean();
            return h.response(infos);
        }
    });

    // Get note by id
    server.route({
        method:'GET',
        path:'/api/notes/{id}',
        handler: async (request,h) => {
            let params = request.params.id;
            let info = await Note.findOne({_id: params});
            return h.response(info);
        }
    });

    // Post - Create new note
    // To check in thunder client or postman - http://[::1]:3000/api/notes
    // headers: Content-Type - application/json
    // body - 
        // {
        //     "title":"The Compound Effect",
        //     "important":true,
        //     "description":"Darren Hardy"
        // }
    server.route({
        method:'POST',
        path:'/api/notes',
        handler: async (request,h) => {
            let info = request.payload;
            console.log('payload is',info);
            let newInfo = new Note(info);
            await newInfo.save();
            return h.response('Success!');
        }
    });

    // Put - Update an existing note
    // To check in thunder client or postman - http://[::1]:3000/api/notes/id
    // headers: Content-Type - application/json
    // body - 
        // {
        //     "title":"Its a boy thing",
        //     "important":true,
        //     "description":"Mahesh babu"
        // }
    server.route({
        method:'PUT',
        path:'/api/notes/{id}',
        handler: async (request,h) => {
            let params = request.params.id;
            let info = request.payload;
            console.log('payload is',info);
            let infos = await Note.updateOne({_id: params},info).lean();
            return h.response(infos);
        }
    });

    // Delete an existing note by id
    // http://[::1]:3000/api/notes/id
    server.route({
        method:'DELETE',
        path:'/api/notes/{id}',
        handler: async (request,h) => {
            let params = request.params.id;
            let info = await Note.findOneAndDelete({_id: params});
            return h.response(info);
        }
    });

    await server.start();
    console.log('Server running on %s',server.info.uri);
};

process.on('unhandledRejection',(err) => {
    console.log(err);
    process.exit(1);
});

init();
const Hapi = require('@hapi/hapi');
const Handlebars = require('handlebars');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register({
        plugin:require('vision') //add template rendering support using vision in hapi
    });

    // configure the template support with view handlebars
    server.views({
        engines:{
            html:Handlebars
        },
        path:__dirname+'/views',
        layoutPath:'views/layout',
        layout:'layout',
        partialsPath:'views/partials'
    });

    server.route({
        method:'GET',
        path:'/',
        handler:(request,h) => {
            // return 'Hello World from HAPI!';
            var data = {message:'Hello from HAPI Handlebars view!'}
            return h.view('index',{
                title:'Home Page!',
                data
            });
        }
    });

    server.route({
        method:'GET',
        path:'/services',
        handler:(request,h) => {
            var data = {message:'Give us chance to serve you Better!'}
            return h.view('services',{
                title:'Services Page!',
                data
            });
        }
    });

    server.route({
        method:'GET',
        path:'/users',
        handler:(request,h) => {
            const usersList = [
                {
                    name:'Ashish',
                    age:23
                },
                {
                    name:'Aditya',
                    age:15
                },
                {
                    name:'Aarya',
                    age:14
                },
                {
                    name:'Ovee',
                    age:8
                },
                {
                    name:'Taksh',
                    age:5
                },
                {
                    name:'Nyra',
                    age:3
                }
            ]
            return h.view('users',{
                title:'Users Page!',
                usersList
            });
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
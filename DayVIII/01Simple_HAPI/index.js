const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // adding routes
    server.route({
        /*The method property can be any valid HTTP method,
        array of HTTP methods, or an asterisk to allow any method */
        method: 'GET',
        /*The path property defines the path including parameters. It can contain
        optional numbered parameters and even wildcards */
        path: '/',
        /*The handler function performs the main business logic of the route and sets the
        response.
        The handler must return a value, a promise, or throw an error. */
        // h is the response toolkit, which is an object with several methods use to
        // response to the request
        handler:(request,h) => {
            return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: '/greet/{name}',
        handler:(request,h) => {
            const name = request.params.name;
            return '<h1>Welcome ' + name + '</h1>';
        }
    });

    server.route({
        method: 'GET',
        path: '/home',
        handler:(request,h) => {
            return h.redirect('/');
            // return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: '/user',
        handler:(request,h) => {
            const user = {
                firstName:'Sachin',
                lastName:'Tendulkar',
                userName:'MasterBlaster',
                id:100
            };
            return user;
        }
    });

    server.route({
        method: 'GET',
        path: '/test',
        handler:(request,h) => {
            return '<h1>Test route with plugin getDate :- </h1>'+ h.getDate();
        }
    });
    /**
        hapi - HTTP-API has 7 extension points along with request lifecycle.
        In order, they are
        onRequest,
        onPreAuth,
        onCredentials,
        onPostAuth,
        onPreHandler,
        onPostHandler and
        onPreResponse
        To add function to an extension point, you call server.ext();
     */

    // // extension method
    // server.ext('onRequest',function(request,h){
    //     request.setUrl('/test');
    //     return h.continue;
    // });

    // plugin (in express, we call it as a middleware)
    const getDate = {
        name:'getDate',
        version:'1:0:0',
        register: async function(server, options){

            const currentDate = function(){
                const date = new Date();
                return date + ' ' +options.name;
            }

            server.decorate('toolkit','getDate',currentDate);
        }
    }

    // call server.register to load the plugin
    await server.register({
        plugin:getDate,
        options:{
            name:'Abhijith'
        }
    })

    await server.start();
    // console.log('Server running on port 3000');
    console.log('Server running on %s',server.info.uri);
};

process.on('unhandledRejection',(err) => {
    console.log(err);
    process.exit(1);
});

init();
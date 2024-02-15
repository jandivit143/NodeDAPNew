// console.log('Welcome to Express');

// // 1 simple response
// const express = require('express');
// const app = express();

// app.get('/',function(req,res){
//     console.log(req.url);
//     res.send('<h1>Hello Abhijith using Express!</h1>')
// })

// const server = app.listen(9876, function(){
//     console.log('Express app listening at: ', server.address().port);
// });

// // 2 Dealing with Views (PUG)
// const express = require('express');
// const app = express();

// app.set('view engine','pug');

// app.get('/',function(req,res){
//     console.log(req.url);
//     res.render('pug/home');
// })

// // Controller
// app.get('/user',function(req,res){
//     console.log(req.url);
//     // Pushing model to the view
//     res.render('pug/user', {Id:101,Name:'Abhijith'});
// });

// let employees = [
//     {id:1,name:'Anirudh'},
//     {id:2,name:'Rehana'},
//     {id:3,name:'Umamaheshwari'},
//     {id:4,name:'Subhash'},
//     {id:5,name:'Himanshu'}
// ]

// // Controller
// app.get('/employees',function(req,res){
//     console.log(req.url);
//     // Pushing model to the view
//     res.render('pug/employees', {
//         pageTitle: 'Employee Info',
//         empList: employees
//     });
// });

// // for static files / resources - need to make it as public
// app.use(express.static('public'));
// // http://localhost:9876/images/bruce.jpg
// // http://localhost:9876/scripts/3rdpartylib.js
// // http://localhost:9876/styles/mystyle.css

// const server = app.listen(9876, function(){
//     console.log('Express app listening at: ', server.address().port);
// });

// 3 Dealing with Views (ejs)
const express = require('express');
const app = express();

app.set('view engine','ejs');

app.get('/',function(req,res){
    console.log(req.url);
    res.render('ejs/home',{myHeader:'Heading 1!'});
})

// Controller
app.get('/user',function(req,res){
    console.log(req.url);
    // Pushing model to the view
    res.render('ejs/user', {Id:102,Name:'Leela'});
});

let employees = [
    {id:1,name:'Anirudh'},
    {id:2,name:'Rehana'},
    {id:3,name:'Umamaheshwari'},
    {id:4,name:'Subhash'},
    {id:5,name:'Himanshu'}
]

// Controller
app.get('/employees',function(req,res){
    console.log(req.url);
    // Pushing model to the view
    res.render('ejs/employees', {
        pageTitle: 'Employee Info',
        empList: employees
    });
});

// for static files / resources - need to make it as public
app.use(express.static('public'));
// http://localhost:9876/images/bruce.jpg
// http://localhost:9876/scripts/3rdpartylib.js
// http://localhost:9876/styles/mystyle.css

let recipes = [
    {"id": "1", "name": "Tawa Surmai", "url": "https://food.ndtv.com/recipe-tawa-surmai-707370"},
    {"id": "2", "name": "Prawn Balchao with Appams", "url": "https://food.ndtv.com/recipe-tawa-surmai-707370"},
    {"id": "3", "name": "Mediterranean Watermelon Salad", "url": "https://food.ndtv.com/recipe-mediterranean-watermelon-salad-507291"},
    {"id": "4", "name": "Chicken Xacuti", "url": "https://food.ndtv.com/recipe-chicken-xacuti-287147"},
    {"id": "5", "name": "Pasta with Tangy Tomato Sauce", "url": "https://food.ndtv.com/recipe-pasta-with-tangy-tomato-sauce-952142"},
];

// Controller - Getting all recipes
// app.get('/recipes1',function(req,res){ // to get middleware error
app.get('/recipes',function(req,res){
    console.log(req.url);
    // Pushing model to the view
    // res.render('ejs/recipes1', { // to check middleware error
    res.render('ejs/recipes', {
        title: 'Zensar\'s Kitchens - Recipes!',
        recipeList: recipes
    });
});

// Controller - Getting recipe by its id
app.get('/recipes/:id',function(req,res){
    let rs = null;
    for(var i in recipes){
        if(recipes[i].id === req.params.id){
            rs = recipes[i];
            break;
        }
    }
    // if(rs == null){
    //     // res.end('<h1>Resource not found!</h1>');
    //     var err = new Error('No Data Found!');
    //     err.status = 405;
    //     res.render('ejs/error',{
    //         title: 'Error!',
    //         message: err.message,
    //         status: err.status
    //     });
    // }else{
        res.render('ejs/recipe', {
            title: 'Favorite Recipe!',
            recipe: rs
        });
    // }
});

// Error Handling - using custom middleware function
app.use(function(req,res,next){
    var err = new Error('View not found!');
    err.status = 404;
    next(err);
});

app.use(function(err,req,res,next){
    console.log('status ',err.status);
    res.status(err.status || 500);
    if(!err.status){
        err.status = 500;
    }
    // ending the request response cycle
    res.render('ejs/error',{
        message: err.message,
        status: err.status
    })
});

const server = app.listen(9876, function(){
    console.log('Express app listening at: ', server.address().port);
});
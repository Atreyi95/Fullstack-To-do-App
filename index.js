const express = require('express');
const path = require('path');
const port =8000;

const db=require('./config/mongoose');
const Todo =require('./model/todo');

const app= express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));



app.get('/',function(req,res){
    // return response.render('home', {
    //     title: "TODO List"
    // });

    Todo.find({}, function(err, todo ){
        if(err)
        {
            console.log('Error in fetching Todos from DB');
            return;
        }
        return res.render('home', {
            title: "TODO App",
            todo_list: todo
        });
    })
    
    
});
app.post('/create-todo',function(request,response){

    Todo.create({
        todoDesc: request.body.task_name,
        category: request.body.category,
        date: request.body.date
    }, function(err, newTodo){
        if(err){
            console.log('error in creating todo!');
            return;
        }
        console.log('***********', newTodo);
        return response.redirect('back');
    });


    

});


app.get('/delete-todo', function(request, response){


    let id = request.query.id;


    
    Todo.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }
        return response.redirect('back');
    });
    
});


app.listen(port, function(err){
    if (err) { console.log('Error in running the server',err);}
    console.log('Yup! Express server is running on Port:',port);
});

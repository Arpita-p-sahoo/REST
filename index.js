

const express = require('express');
const PORT = 8000;
const users = require('./MOCK_DATA.json');
const app = express();
const fs = require('fs');
const { error } = require('console');
// if anyone requests on web app
app.get("/users",(req,res)=>{
    let html = `
        <ol>
        ${users.map(user=>`<li>${user.first_name}</li>`).join('')}
        </ol>
    `
    res.send(html);
})


//routes
app.get("/api/users", (req, res) => {
    return res.json(users);
});


// Hybrid REST API
// /api/users/:id
// /:id is a variable(dynamic)
// finding single user
app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(users=>users.id === id);
    return res.json(user);
})

// creating new user by post
// MIDDLEWAre

app.use(express.urlencoded({extended:false}))
app.post("/api/users",(req,res)=>{

    users.push({...req.body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(error,data)=>{
        return res.json({status:'Success',id:users.length});

    })
});

// app.patch("/api/users/:id",(req,res)=>{
//     // edit user with id
//     return res.json({status:"pending"})
// });

// app.delete("/api/users/:id",(req,res)=>{
//     // delete user with id
//     return res.json({status:"pending"})
// })

// combining all the request route
app.route("/api/users/:id").
get((req,res)=>{
    return res.json({status:"pending"})
}).
patch((req,res)=>{
    return res.json({status:"pending"})
}).
delete((req,res)=>{
    // splicemathod need to use
    
    // return res.json({status:"pending"})
})


app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});

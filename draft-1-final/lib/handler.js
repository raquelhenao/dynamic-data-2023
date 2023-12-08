let eList = require('../data/info.json')


const fs = require("fs")


exports.checkoutSignup = (req, res)=> {
    res.render('cartinfo-signup', { csrf : 'supersecret'  })
}
exports.checkoutSignupList = (req, res)=> {
    res.render('userspage', { 'users': eList.users })
}

exports.checkoutUser = (req, res) => {
    var userDetails = eList.users.filter((user)=>{
        return user.email == req.params.email
    })

    console.log(userDetails)
    res.render('userdetails', {"users": userDetails})
}

exports.checkoutUserDelete = (req, res) => {
    var users = eList.users.filter((user)=>{
        return user.email != req.params.email
    })

    var json = JSON.stringify(users)
    fs.writeFile('./data/info.json', json, 'utf8', ()=>{})

    console.log(users)


    res.redirect(303, '/cartinfo/list')
}

exports.newsletterSignupProcess = (req, res)=> {

     //then we do something here
     console.log(req.body)
     //req.body.email
     //req.body.firstname
     //req.body.lastname

     var newUser = {
        'firstname' : req.body.firstname,
        'lastname' : req.body.lastname,
        'email' : req.body.email,
        'address' : req.body.address,
        'city' : req.body.city,
        'state' : req.body.state,
        'zip' : req.body.zip
    
         }

         //the push method adds items to an array

         eList.users.push(newUser)


         var json = JSON.stringify(eList)

         console.log(json)

         fs.writeFileSync('./data/info.json', json, 'utf8', ()=>{})


         res.redirect(303, '/newsletter/thankyou')

         


    res.send("you posted something to /process " + req.body.email)
}
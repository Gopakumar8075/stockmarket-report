//Requiring mailchimp's module
//For this we need to install the npm module @mailchimp/mailchimp_marketing. To do that we write:
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//Using bod-parser
app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS
app.use(express.static("public"));
//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});
//Setting up MailChimp
mailchimp.setConfig({
//*****************************ENTER YOUR API KEY HERE******************************
 apiKey: "00d2a84c6233f8ccca85e34a0929358d-us5",
//*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
 server: "us5"
});
//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {
//*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
const firstName = req.body.f1;
const secondName = req.body.f2;
const email = req.body.f3;
//*****************************ENTER YOU LIST ID HERE******************************
const listId = "2bbad1699a";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
//Running the function and catching the errors (if any)
// ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure.html", function(req, res) {
  res.redirect("/");
});

// const express = require ("express");
// const bodyParser = require("body-parser");
// const request = require ("request");
//
// // mailchimp require
//
//
// const mailchimp = require("@mailchimp/mailchimp_marketing");
//
// const app = express();
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended:true}));
//
// app.get("/",function(req,res){
// res.sendFile(__dirname + "/signup.html")
//
// });
//
//
// app.post('/', (req, res) => {
//   var fName = req.body.f1
//   var lName = req.body.f2
//   var email = req.body.f3
//
// // object created to match with the object in mail chimp server
//
//   var userData = {
//   members: [{
//     email_address: email,
//     status: "subscribed",
//     merge_fields: {
//       FNAME: fName,
//       LNAME: lName
//     }
//   }],};
//
// // mail chimp config
//
//  mailchimp.setConfig({
//    apiKey: "00d2a84c6233f8ccca85e34a0929358d-us5",
//    server: "us5",
//  });
//
//  // code for mailchimp to work lol
//
//  const run = async () => {
//     const response = await mailchimp.lists.batchListMembers("2bbad1699a", userData );
//     console.log(response);
//   };
//   run();
//
//   //if statement for loading page for success and Failure
//
// if (res.statusCode === 200 ){
//   res.sendFile(__dirname + "/success.html")
// }
// else{
//   res.sendFile(__dirname + "/failure.html")
// }
//
// });
//
// app.listen(3000,function(){
//   console.log("server is running on port 3000");
// });

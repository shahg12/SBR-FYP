var express = require("express");
var router = express.Router();
var User = require("../models/user");
var BlogModel = require("../models/blog");
var AppointmentModel = require("../models/appointment");
var IdeaModel = require("../models/idea");
var StartupIdeaModel = require("../models/startupidea");

var ProfileModel = require("../models/profile");
var DiaryScrappedData = "./csv/dairy.csv";
var poultaryScrapped = "./csv/poultry.csv";
var fishScrappedData = "./csv/Fish.csv";


const fs = require("fs");
const csv = require("csv-parser");
// var diaryScrappedData=require('../views/images/diary.csv')
// var diaryScrappedData=require('../views/images/diary.csv')
// let diaryCSV = '';

// const csvToJson = require('csvtojson');

let csvToJson = require("convert-csv-to-json");

const multer = require("multer");

router.get("/nav-bar", function (req, res, next) {
  return res.render("nav-bar.ejs");
});

router.get("/startup", function (req, res, next) {

  StartupIdeaModel.find().exec((err, startupIdea) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("startup", {
        startupIdea: startupIdea,
      });
    }
  });
 
});

router.get("/startup/blog/(:id)", function (req, res, next) {
  // return res.render("startupblog.ejs");

    let id =req.params.id;

    StartupIdeaModel.findById(id,(err,blog)=>
    {
  
       if(err)
       {
         res.redirect("startup")
       }
       else 
       {
           if(blog==null)
           {
            res.redirect("startup")
           }
           else 
           { 
             res.render("startupblog",{
              description: blog.description,
             })
           }
       }
    })

  
});







router.get("/blogservices", function (req, res, next) {
  BlogModel.find().exec((err, blogs) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("blogservices", {
        blogs: blogs,
      });
    }
  });
});



router.get("/blogservices/desc/(:id)", function (req, res, next) {
  // return res.render("startupblog.ejs");

    let id =req.params.id;

    BlogModel.findById(id,(err,blog)=>
    {
  
       if(err)
       {
         res.redirect("blogservices")
       }
       else 
       {
           if(blog==null)
           {
            res.redirect("blogservices")
           }
           else 
           { 
             res.render("blogserviceDesc",{
              description: blog.description,
             })
           }
       }
    })

  
});


router.get("/submit", function (req, res, next) {
  return res.render("submit.ejs");
});
router.get("/dairy", function (req, res, next) {
  return res.render("dairy.ejs");
});
router.get("/poultary", function (req, res, next) {
  return res.render("poultary.ejs");
});
router.get("/fish", function (req, res, next) {
  return res.render("fish.ejs");
});
router.get("/Consultant", function (req, res, next) {
  ProfileModel.find().exec((err, profile) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("Consultant", {
        profile: profile,
      });
    }
  });
});

router.get("/", function (req, res, next) {
  return res.render("index.ejs");
});

router.get("/addBlog", function (req, res, next) {
  return res.render("addblog.ejs");
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + "-" + Date.now() + "-" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("image");

// blog Posts
router.post("/addBlog", upload, function (req, res, next) {
  console.log(req.body);
  var blogData = req.body;

  console.log("df", blogData);

  var blog = new BlogModel({
    title: blogData.title,
    description: blogData.description,
    image: req.file.filename,
  });

  console.log(blog, "df");

  blog.save(function (err, blogs) {
    if (err) console.log(err);
    else {
      console.log("Success", blogs);
      res.redirect("/blogservices");
    }
  });
});

  router.post("/addAppointment", function (req, res, next) {
    console.log(req.body);
    var appointmentData = req.body;
  
    console.log("df", appointmentData);
  
    var appointment = new AppointmentModel({
      title: appointmentData.title,
      description: appointmentData.description,
      payment: appointmentData.payment,
      reason:appointmentData.reason
    });
  
    console.log(appointment, "df");
  
    appointment.save(function (err, appointment) {
      if (err) console.log(err);
      else {
        console.log("Success", appointment);
        res.redirect("/consultantProfile");
      }
    });
  
  // if (blog) {
  //  return  res.redirect("/blogservices.ejs");

  // } else {
  //   throw new Error("Blogs Not Added ");
  // }
});

router.get("/registerConsultant", function (req, res, next) {
  return res.render("registerConsultant.ejs");
});
router.get("/bookAppointment", function (req, res, next) {
  return res.render("bookAppointment.ejs");
});
router.get("/consultantProfile", function (req, res, next) {
  return res.render("consultantProfile.ejs");
});

router.get("/add-project-idea", function (req, res, next) {
  res.render("add-project-idea");
});

// post startup idea from csv
router.post("/add-project-idea", function (req, res, next) {
  let scrapArray = [DiaryScrappedData, fishScrappedData,poultaryScrapped];
  let json;
  let newArray = [];

  console.log(scrapArray.length)
 
  scrapArray.forEach((item,index) => {
      console.log( "dfddfdf",index)
         json = csvToJson.getJsonFromCsv(item);
         console.log(json[0].title,"spd");
        
          newArray.push(json);
 
    // console.log("inner ",json);
  });

  console.log("dfd", newArray);
  // let json = csvToJson.getJsonFromCsv(fishScrappedData);
  var startup;
  var startup2;

  newArray.forEach((item, index) => {
   console.log("bfg", item, index);
    if (index === 0) {
      console.log(" index 00000");
      item?.forEach((item2, index) => {
        //  console.log("item2", index);
        startup = new StartupIdeaModel({
          title: item2.Title,
          description: item2.description,
        });
      
        startup.save(function (err, startupData) {
          if (err) console.log(err);
          else {
            console.log("Success", startupData);
            // res.redirect("/add-project-idea");
          }
        });
      });
    }
    if (index === 1) {
      // console.log(" index 1111111111");

      item?.forEach((item2, index) => {
        // console.log("item2", index, item2);
        startup2 = new StartupIdeaModel({
          title: item2.Title,
          description: item2.description,
        });
        startup2.save(function (err, startupData) {
          if (err) console.log(err);
          else {
            console.log("Success", startupData);
            // res.redirect("/add-project-idea");
          }
        });
      });
    }

    if (index === 2) {
      // console.log(" index 1111111111");

      item?.forEach((item2, index) => {
        // console.log("item2", index, item2);
        startup3 = new StartupIdeaModel({
          title: item2.Title,
          description: item2.description,
        });
        startup3.save(function (err, startupData) {
          if (err) console.log(err);
          else {
            console.log("Success", startupData);
            // res.redirect("/add-project-idea");
          }
        });
      });
    }
  });
});

//  consultant Profile
router.post("/registerConsultant", upload, function (req, res, next) {
  console.log(req.body);
  var ProfileData = req.body;

  console.log("df", ProfileData);

  var Profile = new ProfileModel({
    name: ProfileData.name,
    designation: ProfileData.designation,
    image: req.file.filename,
  });

  console.log(Profile, "df");

  Profile.save(function (err, Profiles) {
    if (err) console.log(err);
    else {
      console.log("Success", Profiles);
      res.redirect("/consultant");
    }
  });
});

//  submit Idea
router.post("/submit", function (req, res, next) {
  console.log(req.body);
  var IdeaData = req.body;

  console.log("df", IdeaData);

  var Idea = new IdeaModel({
    title: IdeaData.title,
    description: IdeaData.description,
  });

  console.log(Idea, "df");

  Idea.save(function (err, ideas) {
    if (err) console.log(err);
    else {
      console.log("Success", ideas);
      res.redirect("/startup");
    }
  });
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  var personInfo = req.body;

  console.log("df", personInfo);

  var user = new User({
    email: personInfo.email,
    username: personInfo.username,
    password: personInfo.password,
    passwordConf: personInfo.passwordConf,
  });

  console.log(user, "df");

  user.save(function (err, Person) {
    if (err) console.log(err);
    else console.log("Success", Person);
  });

  if (user) {
    res.status(201).json({
      username: user.username,
      email: user.email,
    });
  } else {
    throw new Error("User Not Created ");
  }
});

router.get("/login", function (req, res, next) {
  return res.render("login.ejs");
});

router.post("/login", function (req, res, next) {
  //console.log(req.body);
  User.findOne({ email: req.body.email }, function (err, data) {
  
    if (data) {
      if (data.password == req.body.password) {
        console.log("Done Login");
  
          res.render("nav-bar.ejs");
     
      } else {
        res.send({ Success: "Wrong password!" });
      }
    } else {
      res.send({ Success: "This Email Is not regestered!" });
    }
  });
});

router.get("/profile", function (req, res, next) {
  console.log("profile");
  User.findOne({ unique_id: req.session.userId }, function (err, data) {
    console.log("data");
    console.log(data);
    if (!data) {
      res.redirect("/");
    } else {
      //console.log("found");
      return res.render("data.ejs", { name: data.username, email: data.email });
    }
  });
});

router.get("/logout", function (req, res, next) {
  console.log("logout");
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

router.get("/forgetpass", function (req, res, next) {
  res.render("forget.ejs");
});

router.post("/forgetpass", function (req, res, next) {
  //console.log('req.body');
  //console.log(req.body);
  User.findOne({ email: req.body.email }, function (err, data) {
    console.log(data);
    if (!data) {
      res.send({ Success: "This Email Is not regestered!" });
    } else {
      // res.send({"Success":"Success!"});
      if (req.body.password == req.body.passwordConf) {
        data.password = req.body.password;
        data.passwordConf = req.body.passwordConf;

        data.save(function (err, Person) {
          if (err) console.log(err);
          else console.log("Success");
          res.send({ Success: "Password changed!" });
        });
      } else {
        res.send({
          Success: "Password does not matched! Both Password should be same.",
        });
      }
    }
  });
});

module.exports = router;

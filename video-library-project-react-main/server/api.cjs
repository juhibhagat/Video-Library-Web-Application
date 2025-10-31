const express = require("express");
const cors = require("cors");
const mongoClient = require("mongodb").MongoClient;

const app = express();

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/get-categories", (req, res)=>{

      mongoClient.connect("mongodb://127.0.0.1:27017")
      .then(clientObj=>{
            var database = clientObj.db("video-project");
            database.collection("tblcategories").find({}).toArray().then(documents=>{
                  res.send(documents);
                  res.end();
            });
      });
});

app.get("/get-users", (req, res)=>{

      mongoClient.connect("mongodb://127.0.0.1:27017")
      .then(clientObj=>{
            var database = clientObj.db("video-project");
            database.collection("tblusers").find({}).toArray().then(documents=>{
                  res.send(documents);
                  res.end();
            });
      });
});

app.get("/get-admin", (req, res)=>{

      mongoClient.connect("mongodb://127.0.0.1:27017")
      .then(clientObj=>{
            var database = clientObj.db("video-project");
            database.collection("tbladmin").find({}).toArray().then(documents=>{
                  res.send(documents);
                  res.end();
            });
      });
});

app.get("/get-videos", (req, res)=>{

      mongoClient.connect("mongodb://127.0.0.1:27017")
      .then(clientObj=>{
            var database = clientObj.db("video-project");
            database.collection("tblvideos").find({}).toArray().then(documents=>{
                  res.send(documents);
                  res.end();
            });
      });
});

app.get("/get-video/:id", (req, res)=>{

      var id = parseInt(req.params.id);

      mongoClient.connect("mongodb://127.0.0.1:27017")
      .then(clientObj=>{
            var database = clientObj.db("video-project");
            database.collection("tblvideos").find({video_id:id}).toArray().then(documents=>{
                  res.send(documents);
                  res.end();
            });
      });
});

app.post("/register-user", (req, res)=>{

      var user = {
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            password: req.body.password, 
            mobile: req.body.mobile,
            email:req.body.email
      };

      mongoClient.connect("mongodb://127.0.0.1:27017").then(clientObj=>{

            var database = clientObj.db("video-project");

            database.collection("tblusers").insertOne(user).then(()=>{
                   console.log('User Registered..');
                   res.end();
            })

      })
})

app.post("/add-video", (req, res)=>{

     var video = {
        video_id : parseInt(req.body.video_id),
        title: req.body.title,
        description:req.body.description,
        comments: req.body.comments,
        likes : parseInt(req.body.likes),
        views : parseInt(req.body.views),
        url: req.body.url,
        category_id: parseInt(req.body.category_id)
     }

      mongoClient.connect("mongodb://127.0.0.1:27017").then(clientObj=>{

            var database = clientObj.db("video-project");

            database.collection("tblvideos").insertOne(video).then(()=>{
                   console.log('Video Added..');
                   res.end();
            })

      })

})


app.put("/edit-video/:id", (req, res)=>{

     var id  = parseInt(req.params.id);

     var video = {
        video_id : parseInt(req.body.video_id),
        title: req.body.title,
        description:req.body.description,
        comments: req.body.comments,
        likes : parseInt(req.body.likes),
        views : parseInt(req.body.views),
        url: req.body.url,
        category_id: parseInt(req.body.category_id)
     }

      mongoClient.connect("mongodb://127.0.0.1:27017").then(clientObj=>{

            var database = clientObj.db("video-project");

            database.collection("tblvideos").updateOne({video_id:id},{$set:video}).then(()=>{
                   console.log('Video Updated..');
                   res.end();
            })

      })
})


app.delete("/delete-video/:id", (req, res)=>{

     var id  = parseInt(req.params.id);

    
      mongoClient.connect("mongodb://127.0.0.1:27017").then(clientObj=>{

            var database = clientObj.db("video-project");

            database.collection("tblvideos").deleteOne({video_id:id}).then(()=>{
                   console.log('Video Deleted..');
                   res.end();
            })

      })
})


app.listen(5050);
console.log(`API Started http://127.0.0.1:5050`);
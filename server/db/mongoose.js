var mongoose=require("mongoose");
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://mohini96:lanetteam1@cluster0-shard-00-00-x6ahr.mongodb.net:27017,cluster0-shard-00-01-x6ahr.mongodb.net:27017,cluster0-shard-00-02-x6ahr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use( bodyParser.json({limit: '50mb'}) );


app.set("view engine","ejs")

app.use(express.static(__dirname+"/public"))

app.get("/home", function(req,res){

 res.render("home",{message:"goodjob"})

}) 
app.get("/test", function(req,res) 

{

    res.render("home",{message:null})
   
   }) 
app.post("/getStatus",function(req,res){
    var trackingnumber= req.body.trackingId  
    var apiKey = "R=rOcP^{0HZz";
    var url = "http://OSMART.OSMWORLDWIDE.US/OSMServices/TrackingRESTService.svc/Tracking?trackingNumbers="+trackingNumber+"&format=JSON&APIKey="+apiKey;
    request(url,function(error,response,body){
        if(!error&&response.statusCode==200){
            var data = JSON.parse(body)
            if(data["Items"][0]["Events"][0]["City"]!=null){
                var status;
                var location;
                var eventArray=[];
                var date;
                for(var i=0;i < data["Items"][0]["Events"].length; i++){
                    status = data["Items"][0]["Events"][i]["StatusDescription"]
                    location = data["Items"][0]["Events"][i]["DisplayLocation"] 
                    date = data["Items"][0]["Events"][i]["Date"]
                    eventArray.push([date,status,location])
                }
            var thedata={
                Events:eventArray
            }
                res.render("home",{data:thedata})   
        }else{
            console.log("either error or status code not 200")
        }
    }else{
    console.log("their was error"+ error)
    }
})
})





const port = process.env.PORT || 8080;









app.listen(port,process.env.IP,function(){
    console.log("The PolyTrader server has started on port " + port);
}
)
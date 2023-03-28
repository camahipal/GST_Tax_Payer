const express = require('express')
const app = express()
const https = require('https')
const bodyParser = require("body-parser")
const request = require('request')
const { error } = require('console')

app.set('view engine','ejs')
// const { query } = require('express')

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.use(express.static('public'))


app.post('/',function(req,res){
    const query =req.body.GST_no
    
    const options = {
        'method': 'GET',
        'headers': {
          'client_id': 'JarZChUcsytSBbnkpt',
          'Authorization': 'Bearer 0ab31ef7392227173c6e8d34195e86d5eb0da1e9'
        }
      };

    const url= "https://commonapi.mastersindia.co/commonapis/searchgstin?gstin="+query+""

    https.get(url,options,function(response){
        console.log(response.statusCode);
        

        response.on('data',function(data){
            

            
            

            const GSTdata = JSON.parse(data);
            const name = GSTdata.data.lgnm
            const status = GSTdata.data.dty
            const GST_ofc = GSTdata.data.stj
            const type = GSTdata.data.ctb
            const date = GSTdata.data.rgdt
            const ao = GSTdata.data.ctj
            console.log(GSTdata)
            // res.write("<h1>The name of the tax payer is : "+name+"</h1>")
            // res.write("<p>The status of Tax payer is : "+ status+"</p>")
            // res.send()
            if(response.statusCode ===200 & GSTdata.error===false){
                res.render("list",{name:name,status:status,GSTO:GST_ofc,type:type,date:date,ao:ao});
                // res.render("list",{status:status})

            }
        
            
            else {
                
                res.sendFile(__dirname+"/incorrect.html")

            }
            
        })
        
        
    })
    
    app.post("/incorrect",function(req,res){
        
        res.redirect("/")

    // app.use((err,req,res,next)=>{
    //     console.error(err.stack);
    //     res.status(500).redirect('/')
    // })
    })
})




app.listen(3000,function(){
    console.log('Server is running on port 3000')
})

 app.use((err,req,res,next)=>{
        console.error(err.stack);
        res.status(500).redirect('/')
    })
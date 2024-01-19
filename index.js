import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "asha";
const yourPassword = "kunju";
const yourAPIKey = "b329388f-efc5-416d-810d-e61bf8119365";
const yourBearerToken = "061882b6-1443-4642-9812-046b84c7f581";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async (req, res) => {
  try{
       const result= await axios.get(API_URL+"/random");
       const response=JSON.stringify(result.data);
       res.render("index.ejs",{
        content:response,
       });
  }catch(error){
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async(req, res) => {
 try{
  const result=await axios.get(API_URL+"/all?page=2",{
    auth:{
      username:yourUsername,
      password:yourPassword,
    }
  });
  const response=JSON.stringify(result.data);
  res.render("index.ejs",{
    content:response,
  })
 }catch(error)
{
  res.status(404).send(error.message);
}});

app.get("/apiKey", async(req, res) => {
  try{
    const result=await axios.get(API_URL+"/filter",{
      params:{
        score:5,
        apiKey:yourAPIKey,
      }
    });
    const response=JSON.stringify(result.data);
    res.render("index.ejs",{
      content:response,
    })

  }catch(error){
    res.status(404).send(error.message);
  }
});
const config={headers:{
  Authorization:`Bearer ${yourBearerToken}`, 
 }
}
app.get("/bearerToken", async(req, res) => {
 
 try{
  const result=await axios.get(API_URL+"/secrets/2",config);
  const response=JSON.stringify(result.data);
  res.render("index.ejs",{
    content:response,
  })
 }catch(error){
  res.status(404).send(error.message);
 }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const key = "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";

const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
var cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 80;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: key,
});
const openai = new OpenAIApi(configuration);

const Data = {
  name: "Law Fu Hin",
  age: "22 years old",
  "born city": "hong kong, china",
  "phone number": "+(852) 64894416",
  skills:
    "html,css,js,jquery,react.js,sql,knex.js,postgres,mongodb,fontawesome,bootstrap,awsdeployment,python(jupyter),C++(arduino)",
  educationOne:
    "BEng (Hons) Industrial and Systems Engineering from The Hong Kong Polytechnic university, from 09/2020 to 08/2022. graded A for Puri-Air, intelligent air purifier with table lamp, graded A for STEM project: World Youth A.I. x Robotic Car Competition, graded a- for Final year project: I-See, assistive device for visually impaired people",
  educationTwo:
    "Full-Stack Web Development Immersive Bootcamp Full Time in Xceelerate hong kong, during 08/2022 to 03/2023, firstly deveolped the project of About Me, a personal portfolio website utilizing  html, css, flex, bootstrap. secondly, project Canvas, an online drawing app utlizing js, jquery, canvas API. thirdly, cantonese study ease, an introduction website to a university society using hong kong style neon light as the main themen. Lastly, speedX, a full stack second hand trading platgorm utilizing react, knex, jwt, postgresSQL,API,bootstrap,redux toolkit",
  jobOne:
    "internship at TTM Technologies, which is a local hong kong pcb manufacturer during 06/2021 - 08/2021, won the 2021 IPC Asia Scholar Program Second-class Scholarship because of the Awarded data analysis R&D project in material variation properties and VBA automation development in Excel and Outlook",
  job2: "technical engineer II, at TTM Technologies,during 02/2022 - 08/2022,reponsible for five duties. Which are Technical query team member for Big Tech's quick-turn (QTA) services, Design For Manufacturing (DFM) meeting for complicated project, PCB Gerber (CAD) manufacturing capability review and analysis, Python script and VBA empowered automation tools,Data analysis using Minitab for design of experiment (DOE)",
};

const stringData = JSON.stringify(Data);

let messageAll = [
  {
    role: "system",
    content:
      "You are a powerful conversation chat ai that helps William to response to the employer.You are placed in the portfolio website of williams. You will be given a set of json data as the real information for williams.",
  },
  {
    role: "system",
    content: `${stringData}`,
  },
  {
    role: "user",
    content: "give me a short descriptions of william",
  },
];
app.get("/", (rea, res) => {
  res.send("hi");
});

app.post("/chat", async (req, res) => {
  const newMessage = req.body.content;

  //   const { newMessage } = req.body;
  function promptWithPromise(newMessage) {
    return new Promise(async (resolve, reject) => {
      try {
        messageAll.push({ role: "user", content: `${newMessage}` });
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: messageAll,
        });
        const completionMessage = completion.data.choices[0].message;
        messageAll.push(completion.data.choices[0].message);
        resolve(completionMessage);
      } catch (error) {
        console.error(error);
        reject("fail");
      }
    });
  }

  promptWithPromise(newMessage)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

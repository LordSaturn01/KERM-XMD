const fs = require("fs");
const fetch = require("node-fetch");
const { smd, TelegraPh } = require("../lib");
const Config = require("../config");


  // Command 3: cat
smd(
    {
      pattern: "cat",
      react: "🐱",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a cat wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://api.thecatapi.com/v1/images/search";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: cat",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
  // Command 4: dog
smd(
    {
      pattern: "dog",
      react: "🐶",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a dog wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://dog.ceo/api/breeds/image/random";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: dog",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
  
  smd(
    {
      pattern: "random",
      alias: ["wallpaper", "rw"],
      react: "🪅",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a random wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://pikabotzapi.vercel.app/random/randomwall/?apikey=anya-md";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: random",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
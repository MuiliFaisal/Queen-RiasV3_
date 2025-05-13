const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Faisal",
    ownerNumber: process.env.OWNER_NUMBER || "2349071761016",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "false" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUF0Y1RGYWdyNE5NcTA2M2dtMDZyb3hFcWtrUGNDWlcxM2h1K2Fhb3dtST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamwyRXFtNWRBbkF1d21ueFpjNTJYOTlPcTZoMkl3WFVwRzJQVUpDdTIyWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0UFRhNTRBeUh0cFo3UDNIa3hLbWl3YnQybld4dUMxejFNZzQrUENkQUhvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFT010ZVh4alNNTm1vbWxmcCtLWXhCUzR6Ym85SmlWNlBoZDAyejN5YzE4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlFOStjUy9KOFVDM1NVMXlxUlBYektxeGZaTjU0c3AvKzFkbmpLM1NLV0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlM3SU9xVTRwZmt6c3dOV1h5a3V3UFdLTzZnWGUzVFlFbWs5d0dTZXJpakk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU5mOElUSklWdG5VK2pHc1hpSEZCZ2RvSHlidWZHdVNuaithSUszbDMzMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSStZVEJWaUxOS1hRWHFtREZ5V001V2tWTEJVUFRkQ3dEbHF2SS9xK09IWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdZdWdqQTU0M0oxZGk2ZzNjdmpZR3FKNXlMeVVNWXBsbS9Ibjl3TU5FekFvdzc3ZFFhNm96UkNtOVhzRlh6VDdRemdFdW5ZdFZraGRuc1Y5dzN6RERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI3LCJhZHZTZWNyZXRLZXkiOiJLOEhwN1IxUkttQkhweXpuZlFFdnJzMi9xNnN4TWlYRG1vSEJJREh2aVVBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIzTVRHS0I4RyIsIm1lIjp7ImlkIjoiNjI4MjIyNzY5MzI2MTo4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiNTE3NjAwNjAzNzY1Mzo4QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTFdXZytjTEVQK1NqOEVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQlBYa2pMdXNWL2xuVHhEZFV5WWRscHpWZkRYaldQaVFoUUdTajJ3c3BHVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiaUpRZ1NwZkJHU1lweXFySlBoNTZ5ZzJSWW5TNWRFT3JvS0oyREdHdkpCeTYyamRicUwyUXZ2ZzJ3Y3lYVEhYb0tycE05TFJCNWYrVG0zLzlyT3hrZ1E9PSIsImRldmljZVNpZ25hdHVyZSI6IlE3Y0FOb0NHOS9zazdVQlV1RjZzek1KRmJXSTF1TXRYWjdSdC9xVE96MmZoSnJKMldNRTFUb1VUN05oM1kzcUtPSldXUXBsNE8wR2RSM1RKK1VCSkNBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNjI4MjIyNzY5MzI2MTo4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFUMTVJeTdyRmY1WjA4UTNWTW1IWmFjMVh3MTQxajRrSVVCa285c0xLUmwifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3MTc1ODE5LCJsYXN0UHJvcEhhc2giOiIzUjlaMzkiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBpMiJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 1  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;

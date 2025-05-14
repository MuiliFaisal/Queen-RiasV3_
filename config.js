const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Faisal",
    ownerNumber: process.env.OWNER_NUMBER || "6282227693261",
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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0dMNi9kTEd6UHV2cTlqYTZQdmZRRWxFQjhUMEtobUkyNzBpN041eFBFMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibHRmMmRtbm1ER0dBbWtBdTg3WFpiR2VNWjFwZVJ2Ky9vR2lJTnY5cm9HTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Q0JxTmw1RVNsbkIxempUc29uZVp1aXIzbnl2YllwVzhoa1gyK2dobjBrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1QU5aTS9IQ1BsRDZDNjVLMjJnVzljT0RDL0pSNVVxSy9ZZ1NvbkNCY2tVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZLUFBTK0VwVWEzSmVZaWdHTFo3NThQQnpMdExxUEMrWHNPMWJCK1o4MG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFtRXVOZEh1SDdMdWxqbk53K1BtcEc2Tno2VVJmVklERzN5RERTeFdEaUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk5scWUzQ1dLaUwvZmllSmxLa0UwRW94emJVUTZQYjEraDlTcWxWSWJFRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieG02R0pSV24wdUMrWE1SQXYrcWY4cUd0M0h6azcyTlVrS3E0d0ZmL1F3OD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVsOVdDZmova1ZPNFFWZXdJL2xGNG1SQXJLZFlENnA3WWNkVWFlNTZURDRDTWpaWDNhVThFZndTSlU1VWIzNEFOY2pDdStmVkpzVGcvcHFUOFJGQ2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk4LCJhZHZTZWNyZXRLZXkiOiJibVhiK3ViUmgwVGlHSE1Manlkd2JwTGpkSTlhVjdMZm9XL2ZJVE5ZWWh3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjYyODIyMjc2OTMyNjFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0E4MjAwNDVDNEM4RTMzNzU5NTEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzIyODg0MX1dLCJuZXh0UHJlS2V5SWQiOjYxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6NjEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiV1NXRlo3TTYiLCJtZSI6eyJpZCI6IjYyODIyMjc2OTMyNjE6MTBAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI1MTc2MDA2MDM3NjUzOjEwQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGVXZytjTEVKYXhrc0VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQlBYa2pMdXNWL2xuVHhEZFV5WWRscHpWZkRYaldQaVFoUUdTajJ3c3BHVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoic0lwMmRWM2NZWVZIVFZrcjFyYno2c05sVGh0ZUEwcnpXQ3UwQ2tLc2E4UitZYU9qUi9UVzV6a3JCeFVSNVJsOUY2QTM2eVczVHlIU25jTUpNOHl2aFE9PSIsImRldmljZVNpZ25hdHVyZSI6InZtTWlqUlRDY1BGUFRaVjFuVlBWTVUwKzBJZjNvMG83SHBOa2UzSU0xMTVpYmcrV3EvRGp5NzliUXJzWHVtRktjMnF5RThicVp0QkFCcVF5NmR3OWhRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNjI4MjIyNzY5MzI2MToxMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRVDE1SXk3ckZmNVowOFEzVk1tSFphYzFYdzE0MWo0a0lVQmtvOXNMS1JsIn19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NzIyODgzNiwibGFzdFByb3BIYXNoIjoiM1I5WjM5IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKU1YifQ==",
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

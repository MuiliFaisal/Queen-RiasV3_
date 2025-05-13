const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2349071761016",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUdNd2g4SHZ3ZjNqU3FOWkdFNUZldzd6bUlFUG9tVndEVnBCTEl4djFWcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNm5NcDFKeVdudmJhTW1uRlVMeGtkNXVOMXJhYU9DNTN1WkNBOXJ4S0tBOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTWpVUE5DR0YrM2R1UnE1QkZLc1lnRGdkai9RNjF6bE9xN2dXeExEWEdzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0WDFETDk2R3ZMUVlBeG5ud3F0K2JseG8xelpQSEZiRCszSzc0YlVYNVZzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9ISmxVZGR0aGtkeVhrU2F4Zks3SVFsdTh5c2gxZFNVZmd0N2N6K2JvMzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlljeHhBU2lZbFNtaHBSZ2w1eW12enFLVlBOQkp4ZFROc3dyNW5aVnF5QXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0RuN3oyRjlTbDg1MXhnZ24zNEx5dnNYNVdBNnhseURyNzNHTTc3Qm5FST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidFVScGh4T1Z1ZFFWQi8xblA5RWFTaG40Uk5QKzF1aER3bWpTMktET3BqZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InExVlZMLzZlWXFBRlFPRXJGNGg1MWdMckk5aXkwZ3VKM3QwUzBWdGZrb01ESjJRNE93NzBOMllDdG5iWElGNTcxWk9wVW9kNXY4bW1hNk5qVVBmVEF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM2LCJhZHZTZWNyZXRLZXkiOiIvZTcyMyttWU5BMjBYS2VLTGZFSEc3NGpOcHZWRmU0T0tDR1EvZjMzN3lnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJRUEc4QjIxQyIsIm1lIjp7ImlkIjoiMjM0OTA3MTc2MTAxNjo3NkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI3OTE4NjQxMzUwNjc5OTo3NkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1AvQ3grY0xFTk9panNFR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkJXeTNnY2cyaWM2TW1JTVZxSlF1alVEeEJ2UkczNVdOZlJiR2M4M0hTaEk9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImxDNVNVYzlCRkliVGxadVJxa3FROUROMGZzRXVlR0wwRzJyeWNjU3dJR2J1aXZrMkExdzlBVkdpK0Jmc0tKZFRNYjNsb01IaWpycXBxWnhhSSszVmlnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpRnZrWlZ6WEFPTHBWaWd1bnZqODFqNjI5ZHMvdzlpc3hwTmMvMXRya2sxQ21pQlIxTkpmTWt3aml1NVB4Wmd2RGhuSzVKMVVmc3NkMWlzd2ZxS3FDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkwNzE3NjEwMTY6NzZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUVZzdDRISU5vbk9qSmlERmFpVUxvMUE4UWIwUnQrVmpYMFd4blBOeDBvUyJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDcxNjE0NDAsImxhc3RQcm9wSGFzaCI6IjNnUFVKayIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRit0In0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;

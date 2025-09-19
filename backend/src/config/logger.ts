import path from "path";
import winston from "winston";

const logFilePath = path.join(__dirname, "../../logs/app.log");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: logFilePath, level: "error" }),
    new winston.transports.File({ filename: logFilePath }),
  ],
});



export default logger;

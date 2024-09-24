import morgan from "morgan";
import fs from "fs";
import path from "path";
import "dotenv/config";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom-error";
import { StatusCodes } from "../models/enums/status.enum";

// Config to write all access request to the access.log file
const accesslogFile: string =
    process.env.ACCESS_LOG_PATH ||
    path.join(__dirname, "../logs", "access.log");

const accessLogStream = fs.createWriteStream(accesslogFile, { flags: "a" });

export const logRequest = morgan("combined", { stream: accessLogStream });

// Config to write error log to the errors.log file
const errorlogFile: string =
    process.env.ERRORS_LOG_PATH ||
    path.join(__dirname, "../logs", "errors.log");

export const errorLogStream = fs.createWriteStream(errorlogFile, {
    flags: "a",
});

/**
 * Handle the server errors
 *
 * @param error
 * @param req
 * @param res
 * @param next
 */
export const errorHandler: ErrorRequestHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof CustomError) {
        if (error.detail) {
            errorLogStream.write(`${error.detail}\n`);
        }

        res.status(error.status).json({
            status: error.status,
            message: error.message,
        });
    } else {
        errorLogStream.write(`${error.message}\n`);
        res.status(StatusCodes.SERVER_ERROR).json({
            status: StatusCodes.SERVER_ERROR,
            message: "Server error",
        });
    }
};

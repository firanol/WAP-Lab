import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../utils/custom-error";
import { StatusCodes } from "../models/enums/status.enum";

/**
 * Handle if there is no route
 *
 * @param req
 * @param res
 * @param next
 */
export const notFoundRouteHandler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    next(new CustomError(StatusCodes.NOT_FOUND, "Not found route"));
};

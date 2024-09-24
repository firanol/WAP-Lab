import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "../../models/enums/status.enum";
import { InquiryService } from "../../services/inquiry/inquiry.service";
import { Inquiry } from "../../models/inquiry/inquiry.model";

/**
 * Add new inquiry
 *
 * @param req
 * @param res
 * @param next
 */
export const addInquiryHandler: RequestHandler<
    unknown,
    unknown,
    {
        name: string;
        phone: string;
        email: string;
        address: string;
        message: string;
    },
    unknown
> = (req, res, next) => {
    try {
        // add inquiry and response data
        const inquiryService = new InquiryService();

        const inquiry: Inquiry = {
            id: uuidv4(),
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            message: req.body.message,
        };

        inquiryService.addInquiry(inquiry);
        res.status(StatusCodes.CREATED).json(inquiry);
    } catch (error) {
        next(error);
    }
};

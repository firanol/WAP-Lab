import { readFileSync, writeFileSync } from "fs";
import { join } from "node:path";
import { CustomError } from "../../utils/custom-error";
import { StatusCodes } from "../../models/enums/status.enum";
import { errorLogStream } from "../../middlewares/middleware";
import { Inquiry } from "../../models/inquiry/inquiry.model";

export class InquiryService {
    private inquiries: Inquiry[] = [];
    private fullFilePath: string = "";

    constructor() {
        this.fullFilePath = join(__dirname, "../../data", "inquiry.json");
        try {
            const fileContent: string = readFileSync(
                this.fullFilePath,
                "utf-8"
            );
            this.inquiries = JSON.parse(fileContent);
        } catch (error) {
            errorLogStream.write(`${error.message}\n`);
            this.inquiries = [];
        }
    }

    persist = (): void => {
        try {
            writeFileSync(this.fullFilePath, JSON.stringify(this.inquiries));
        } catch (error) {
            errorLogStream.write(`${error.message}\n`);
            throw new CustomError(
                StatusCodes.SERVER_ERROR,
                `Cannot write json file`,
                error.message
            );
        }
    };

    addInquiry = (inquiry: Inquiry): Inquiry => {
        this.inquiries = [...this.inquiries, inquiry];
        this.persist();
        return inquiry;
    };
}

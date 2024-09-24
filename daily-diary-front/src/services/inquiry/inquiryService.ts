import { StatusCode } from "../../models/enums/StatusCodeEnum";
import { Inquiry } from "../../models/Inquiry";
import { APIService } from "../apiService";

export class InquiryService extends APIService {
    sendInquiry = async (inquiry: Inquiry): Promise<Inquiry> => {
        const url: string = `${this.getBaseUrl()}/inquiries`;
        const response: Response = await this.postData(url, inquiry);

        if (response.status !== StatusCode.CREATED) {
            await this.throwError(response);
        }

        return await response.json();
    };
}

import { Box, Button, TextField } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { GlobalContext } from "../../../contexts/PostsContext";
import { Inquiry } from "../../../models/Inquiry";
import { InquiryService } from "../../../services/inquiry/inquiryService";
import { CustomError } from "../../../utils/customError";
import {
    isRequired,
    isValidEmail,
    isValidPhoneNumber,
} from "../../../utils/validateInput";

type ContactUsForm = {
    name: string;
    errorName: string;
    phone: string;
    errorPhone: string;
    email: string;
    errorEmail: string;
    address: string;
    message: string;
    errorMessage: string;
    isValidForm: boolean;
};

export default function ContactUs() {
    const inquiryService = new InquiryService();
    const contactUsFormInit: ContactUsForm = {
        name: "",
        errorName: "",
        phone: "",
        errorPhone: "",
        email: "",
        errorEmail: "",
        address: "",
        message: "",
        errorMessage: "",
        isValidForm: true,
    };

    const { updateLoading, updateNotify } = useContext(GlobalContext);
    const [contactUsForm, setContactUsForm] = useState(contactUsFormInit);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateInputForm()) {
            sendInquiry();
        }
    };

    const validateInputForm = (): boolean => {
        let tempErrors = {
            errorName: "",
            errorPhone: "",
            errorEmail: "",
            errorMessage: "",
            isValidForm: false,
        };

        if (!isRequired(contactUsForm.name)) {
            tempErrors.errorName = "Name is required";
        }

        if (!isRequired(contactUsForm.phone)) {
            tempErrors.errorPhone = "Phone is required";
        } else if (!isValidPhoneNumber(contactUsForm.phone)) {
            tempErrors.errorPhone =
                "Phone number format is incorrect. Please enter format [xxx]-xxx-xxxx";
        }

        if (contactUsForm.email && !isValidEmail(contactUsForm.email)) {
            tempErrors.errorEmail = "Email format is incorrect";
        }

        if (!isRequired(contactUsForm.message)) {
            tempErrors.errorMessage = "Message is required";
        }

        tempErrors.isValidForm =
            !tempErrors.errorName &&
            !tempErrors.errorPhone &&
            !tempErrors.errorEmail &&
            !tempErrors.errorMessage;

        setContactUsForm((prev) => ({
            ...prev,
            errorName: tempErrors.errorName,
            errorPhone: tempErrors.errorPhone,
            errorEmail: tempErrors.errorEmail,
            errorMessage: tempErrors.errorMessage,
            isValidForm: tempErrors.isValidForm,
        }));

        return tempErrors.isValidForm;
    };

    const resetInquiryForm = () => {
        setContactUsForm(contactUsFormInit);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContactUsForm({ ...contactUsForm, [e.target.name]: e.target.value });
    };

    const sendInquiry = async () => {
        try {
            updateLoading(true);
            const inquiry: Inquiry = {
                id: "",
                name: contactUsForm.name,
                phone: contactUsForm.phone,
                email: contactUsForm.email,
                address: contactUsForm.address,
                message: contactUsForm.message,
            };

            await inquiryService.sendInquiry(inquiry);

            updateLoading(false);
            updateNotify({
                status: "success",
                message:
                    "Send inquiry successfully. Thank you for your feedback, we will contact you soon!",
            });
            resetInquiryForm();
        } catch (error) {
            let errMsg: string = "Unknow error";
            if (error instanceof CustomError) {
                errMsg = error.message;
            }

            updateLoading(false);
            updateNotify({
                status: "error",
                message: errMsg,
            });
        }
    };

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": {
                    mt: 1,
                    mb: 1,
                    width: "100%",
                },
                Button: { mt: 1 },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div>
                <TextField
                    required
                    fullWidth
                    label="Name"
                    placeholder="Enter your name"
                    name="name"
                    value={contactUsForm.name}
                    onChange={handleChange}
                    error={contactUsForm.errorName.length > 0}
                    helperText={contactUsForm.errorName}
                />
                <TextField
                    required
                    fullWidth
                    label="Phone"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={contactUsForm.phone}
                    onChange={handleChange}
                    error={contactUsForm.errorPhone.length > 0}
                    helperText={contactUsForm.errorPhone}
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    label="Email"
                    placeholder="Enter your email"
                    name="email"
                    value={contactUsForm.email}
                    onChange={handleChange}
                    error={contactUsForm.errorEmail.length > 0}
                    helperText={contactUsForm.errorEmail}
                />
                <TextField
                    fullWidth
                    label="Address"
                    placeholder="Enter your address"
                    name="address"
                    value={contactUsForm.address}
                    onChange={handleChange}
                />
            </div>
            <div>
                <TextField
                    required
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    placeholder="Enter message"
                    name="message"
                    value={contactUsForm.message}
                    onChange={handleChange}
                    error={contactUsForm.errorMessage.length > 0}
                    helperText={contactUsForm.errorMessage}
                />
            </div>
            <div>
                <Button
                    variant="contained"
                    startIcon={<SendOutlinedIcon />}
                    type="submit"
                >
                    Send
                </Button>
            </div>
        </Box>
    );
}

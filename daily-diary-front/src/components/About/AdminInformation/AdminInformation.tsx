import { Typography } from "@mui/material";

export default function AdminInformation() {
    return (
        <>
            <div>
                <Typography component="span">
                    <strong>Student Name: </strong> Van Nhat Le
                </Typography>
            </div>
            <div>
                <Typography component="span">
                    <strong>Student ID: </strong> 618071
                </Typography>
            </div>
            <div>
                <Typography component="span">
                    <strong>Phone: </strong> [641]-233-1984
                </Typography>
            </div>
            <div>
                <Typography component="span">
                    <strong>Email: </strong> vle@miu.edu
                </Typography>
            </div>
        </>
    );
}

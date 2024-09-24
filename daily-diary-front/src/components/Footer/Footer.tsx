import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
    return (
        <Container maxWidth="xl" className="footer">
            <Typography variant="body2" color="white" align="center">
                {"Copyright © "}
                <Link color="white" to="http://localhost:3000/">
                    Daily Diary
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </Container>
    );
}

import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
} from "@mui/material";
import AdminInformation from "../../components/About/AdminInformation/AdminInformation";
import ContactUs from "../../components/About/ContactUs/ContactUs";

export default function AboutPage() {
    return (
        <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardHeader title="About Us" />
                <CardContent>
                    <AdminInformation />
                    <Divider sx={{ mt: 2, mb: 2, width: "100%" }} />
                    <ContactUs />
                </CardContent>
            </Card>
        </Container>
    );
}

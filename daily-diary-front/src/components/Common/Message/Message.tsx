import { Alert, Snackbar } from "@mui/material";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../../contexts/PostsContext";

export default function Message() {
    const { notify, updateNotify } = useContext(GlobalContext);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        updateNotify({
            status: "success",
            message: "",
        });
    };

    return (
        <Snackbar
            open={notify.message.length > 0}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={notify.status}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    );
}

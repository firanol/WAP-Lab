// PostItem.tsx
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton,
    IconButtonProps,
    Typography,
    TextField,
    Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext, useState } from "react";
import styled from "@emotion/styled";
import diaryJpg from "../../../assets/images/diary.jpg";
import Votes from "../Votes/Votes";
import { Post } from "../../../models/Post";
import { GlobalContext } from "../../../contexts/PostsContext";
import { isToday } from "date-fns";
import { convertDateToFormat } from "../../../utils/utils";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface PostItemProps {
    post: Post;
    updatePost: (id: string, updatedData: { title: string; body: string }) => void;
    deletePost: (id: string) => void; // Make sure deletePost is added here
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
}));

export default function PostItem({ post, updatePost, deletePost }: PostItemProps) {
    const { searchDate } = useContext(GlobalContext);
    const [expanded, setExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);
    const [editedBody, setEditedBody] = useState(post.body);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedTitle(post.title);
        setEditedBody(post.body);
    };

    const handleSaveClick = () => {
        updatePost(post.id, {
            title: editedTitle,
            body: editedBody
        });
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(post.id);
        }
    };

    return (
        <Card variant="outlined" sx={{ mt: 2, mb: 2 }}>
            <CardHeader
                subheader={
                    isToday(searchDate)
                        ? "Today"
                        : convertDateToFormat(new Date(searchDate), "MMMM dd, yyyy")
                }
            ></CardHeader>
            <CardMedia
                component="img"
                height="200"
                image={diaryJpg}
                alt="Daily diary"
            ></CardMedia>
            <CardContent>
                {isEditing ? (
                    <>
                        <TextField
                            fullWidth
                            label="Title"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Body"
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                            multiline
                            rows={4}
                        />
                        <Button onClick={handleSaveClick} variant="contained" sx={{ mt: 2, mr: 1 }}>
                            Save
                        </Button>
                        <Button onClick={handleCancelClick} variant="outlined" sx={{ mt: 2 }}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography color="text.primary">{post.title}</Typography>
                        <Typography color="text.secondary" paragraph sx={{ whiteSpace: "pre-wrap" }}>
                            {post.body}
                        </Typography>
                    </>
                )}
                <CardActions disableSpacing>
                    <Votes post={post}></Votes>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                    {!isEditing && (
                        <>
                            <Button onClick={handleEditClick} variant="outlined" sx={{ ml: 2 }}>
                                Edit
                            </Button>
                            <Button onClick={handleDeleteClick} variant="contained" color="error" sx={{ ml: 2 }}>
                                Delete
                            </Button>
                        </>
                    )}
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography
                            color="text.secondary"
                            paragraph
                            sx={{ whiteSpace: "pre-wrap" }}
                        >
                            {post.body}
                        </Typography>
                    </CardContent>
                </Collapse>
            </CardContent>
        </Card>
    );
}

import { Rating } from "@mui/material";
import { Post } from "../../../models/Post";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/PostsContext";
import { PostService } from "../../../services/post/postService";
import { convertDateToFormat } from "../../../utils/utils";
import { CustomError } from "../../../utils/customError";

export default function Votes({ post }: { post: Post }) {
    const postService = new PostService();
    const { searchDate, updateIsVoted, updateLoading, updateNotify } =
        useContext(GlobalContext);

    const setNewValue = (newValue: number | null) => {
        if (newValue) {
            post.vote = newValue;
            votedPost(post.vote);
        }
    };

    const votedPost = async (votes: number) => {
        updateLoading(true);
        try {
            await postService.votedPostById(
                post.id,
                convertDateToFormat(searchDate, "MM-dd-yyyy"),
                votes
            );

            updateIsVoted(true);
            updateLoading(false);
            updateNotify({
                status: "success",
                message: "Voted post successfully!",
            });
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
        <>
            <Rating
                name="customized-10"
                defaultValue={0}
                value={post.vote}
                precision={1}
                max={10}
                onChange={(event, newValue) => {
                    setNewValue(newValue);
                }}
            />
        </>
    );
}

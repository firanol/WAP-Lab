import { Route, BrowserRouter, Routes } from "react-router-dom";
import PostPage from "../pages/PostPage/PostPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddPostPage from "../pages/AddPostPage/AddPostPage";
import { PostsContext } from "../contexts/PostsContext";
import MainLayout from "../layouts/MainLayout/MainLayout";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <PostsContext>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<PostPage />} />
                        <Route path="/posts" element={<PostPage />} />
                        <Route path="/posts/add" element={<AddPostPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </PostsContext>
        </BrowserRouter>
    );
}

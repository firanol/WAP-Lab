import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./MainLayout.css";
import Loading from "../../components/Common/Loading/Loading";
import Message from "../../components/Common/Message/Message";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div>
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Loading />
            <Message />
        </div>
    );
}

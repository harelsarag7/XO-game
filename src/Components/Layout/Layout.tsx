import Board from "../Board/Board";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<Header/>
            <Board/>
            <Footer/>
        </div>
    );
}

export default Layout;

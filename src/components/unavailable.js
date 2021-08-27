import {
    Link
  } from "react-router-dom";
const Unavailable = () => {
    return (
        <div className="unavailable">
            <h3 >Oops! Page Not Found</h3>
            <Link to="/">
                Go To home page
            </Link>
        </div>
    );
};

export default Unavailable;
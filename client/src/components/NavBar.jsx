import { Link } from "react-router-dom";

function NavBar() {
    return(
        <nav className="navbar">
            <h2> Hotel Management</h2>
            <div>
                <Link to="/">Home</Link>
                <Link to="/hotels/add">Add Hotel</Link>

            </div>
            </nav>
    )
    }
    export default NavBar;
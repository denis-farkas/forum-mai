
import Logo from '../Logo';
import Navigation from "../Navigation"
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  
  return (
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col">
          <Link
        to={"/"}
      >
           <Logo />
           </Link>
          </div>
          <div className="col">
            <Navigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
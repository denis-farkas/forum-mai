import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import './navigation.css';
import { userService } from '../../utils/userService';
import { useNavigate } from "react-router-dom";


const Navigation = () => {
  const navigate = useNavigate();
    userService.setNavigate(navigate);

    const logout = () => {
      userService.logout();
  };
  const [user, setUser] = useState(null);


  useEffect(() => {
    // Abonnement aux mises à jour de l'utilisateur à l'aide du service userService
    const subscription = userService.user.subscribe((x) => setUser(x));

    // Nettoyage de l'abonnement lors de la destruction du composant
    return () => subscription.unsubscribe();
}, []);

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav ms-auto">
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? 'nav-item active' : 'nav-item')}
          >
            <li className="nav-item">Accueil</li>
          </NavLink>

  {user ? (<>
  <NavLink to="/" onClick={logout} activeClassName="active" role="menuitem">
                            Se déconnecter
                        </NavLink>
                    </>
                    ) : (
                        <>
                            <NavLink to={"/signin"} activeClassName="active" role="menuitem">
                                Connexion
                            </NavLink>
                            <NavLink to={"/signup"} activeClassName="active" role="menuitem">
                                Inscription
                            </NavLink>
                        </>
                    )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
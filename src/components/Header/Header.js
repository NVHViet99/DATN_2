import React, { useState, useEffect } from "react";
import classes from "./Header.module.scss";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../hooks/auth";

import profile from "../../images/admin.jpg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const isToken = useSelector((state) => state.auth.token);

  const logout = () => {
    dispatch(authActions.logoutAct());
  };

  //condition to open menu
  useEffect(() => {
    if (window.innerWidth > 768) {
      setMenuOpen(false);
    } else {
    }
  }, []);

  //Toggle menu
  const menuToggleHandler = () => {
    window.innerWidth <= 768 && setMenuOpen((p) => !p);
  };

  // render UI

  return (
    <div className={classes.container}>
      <header className={isToken ? classes.header : classes.header__hide}>
        <div className={classes.header__content}>
          {isToken && (
            <NavLink className={classes.header__content__logo} to="/">
              <img src={profile} alt="Logo" className={classes.image} />
            </NavLink>
          )}

          <nav
            className={`${classes.header__content__nav} ${
              menuOpen && window.innerWidth < 768 ? classes.isMenu : ""
            }`}
          >
            {isToken && (
              <ul>
                <li>
                  <NavLink
                    to="/"
                    exact
                    activeClassName="selected"
                    onClick={menuToggleHandler}
                    className={classes.header__content__name}
                  >
                    {/* <span>
                      <i className="fas fa-user  mr-2"></i>
                    </span> */}
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/page-two"
                    activeClassName="selected"
                    onClick={menuToggleHandler}
                    className={classes.header__content__name}
                  >
                    {/* <span>
                      <i className="fas fa-chalkboard  mr-2"></i>
                    </span> */}
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/page-three"
                    activeClassName="selected"
                    onClick={menuToggleHandler}
                    className={classes.header__content__name}
                  >
                    {/* <span>
                      <i className="fas fa-user-cog  mr-2"></i>
                    </span> */}
                    Admin
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/page-four"
                    className={classes.header__content__name}
                    activeClassName="selected"
                    onClick={menuToggleHandler}
                  >
                    {/* <span>
                      <i className="fas fa-user  mr-2"></i>
                    </span> */}
                    Employees
                  </NavLink>
                </li>
              </ul>
            )}

            <NavLink
              to="/page-login"
              activeClassName="selected"
              onClick={menuToggleHandler}
            >
              {isToken && <button onClick={logout}>Log Out</button>}
            </NavLink>
          </nav>

          <div className={classes.header__content__toggle}>
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler}></BiMenuAltRight>
            ) : (
              <AiOutlineClose onClick={menuToggleHandler}></AiOutlineClose>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

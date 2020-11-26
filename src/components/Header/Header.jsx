import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux'
import { Menu, MenuItem, MenuButton, MenuDivider } from '@szhsin/react-menu';
import { logoutUser } from '../../actions/user'
import { friendPage, homePage, editProfilePage } from '../../actions/pageDisplayed'
import '@szhsin/react-menu/dist/index.css';
import { LOGIN_USER_PAGE, CREATE_ACCOUNT_PAGE } from '../../actions/types'

function Header() {
  const page = useSelector(state => state.pageDisplayed.type);
  const dispatch = useDispatch();
  return (
      <div className="row">
          <div className="col-12 header-div" id="main-header">
              <div className="row">
                <div className="col-3 header-div">

                </div>
                <div className="col-6 header-div">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center center-text">
                            <h1>IDK,</h1>
                        </div>
                        </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center center-text">
                            <h5>what do you want?</h5>
                        </div>
                    </div>
                </div>
                <div className="col-3 header-div">
                    <div className="row">
                        <div className="col-12 justiy-content-center">
                            {((page === LOGIN_USER_PAGE || page === CREATE_ACCOUNT_PAGE) ? <div></div> : 
                            <div id="navigationButton">
                                <Menu menuButton={<MenuButton className="navHeader">Navigate</MenuButton>}>
                                    <MenuItem onClick={() => dispatch(homePage())} >Meal Match</MenuItem>
                                    <MenuItem onClick={() => dispatch(friendPage())} >Friends</MenuItem>
                                    <MenuItem onClick={() => dispatch(editProfilePage())}>Edit Profile</MenuItem>
                                        <MenuDivider />
                                    <MenuItem onClick={() => dispatch(logoutUser())}><b>Logout</b></MenuItem>
                                </Menu>
                            </div>)}
                        </div>
                    </div>
        </div>  
        </div>
        </div>
        </div>
  );
}

export default connect()(Header);
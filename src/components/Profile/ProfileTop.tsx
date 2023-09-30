import { useState } from 'react';
import { ReactComponent as Steam } from '../../assets/img/profile/steam.svg';
import { ReactComponent as Exit } from '../../assets/img/profile/exit.svg';
import { useGetToken } from '../../hooks/useGetToken';
import { authApi } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../../utils/getUser';
import { useWindowSize } from '../../hooks/useWindowSize';
import ProfileTopItem from './ProfileTopItem';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { useLang } from '../../hooks/useLang';
import {
  confirmationModalGetOutTitle,
  exitBtn,
  profilePageSelectDetailing,
  profilePageSelectInventory,
} from '../../consts/profile';

const profileTopItem = [useLang(profilePageSelectInventory), useLang(profilePageSelectDetailing)];

interface ProfileTopProps {
  activeNav: number;
  setActiveNav: (num: number) => void;
}

const ProfileTop = ({ activeNav, setActiveNav }: ProfileTopProps) => {
  const [isActiveConfirm, setIsActiveConfirm] = useState(false);
  const [logOut, {}] = authApi.useLazyLogOutQuery();
  const navigate = useNavigate();
  const dimensions = useWindowSize();
  const token = useGetToken();
  const user = getUser();

  const logOutHandler = () => setIsActiveConfirm(true);

  const logOutFunc = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    logOut();
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <main className="profile-top">
        <div className="container profile-top-container">
          <div className="profile-top_inner">
            <div className="left-side">
              <div className="logo">
                <img src={user?.avatar} alt="" className="avatarInProfile" />
              </div>
              <div className="user">
                <span className="user-name">{user?.name}</span>
                <Link to={`https://steamcommunity.com/profiles/${user?.steamId}`}>
                  <Steam className="steam-logo" />
                </Link>
              </div>
            </div>
            {token && dimensions.width >= 1280 && (
              <div className="right-side">
                <button className="btn blackBtn exitBtn" onClick={logOutHandler}>
                  <Exit />
                  <span>{useLang(exitBtn)}</span>
                </button>
              </div>
            )}
          </div>
          <div className="profile-nav">
            {profileTopItem.map((el, index) => (
              <ProfileTopItem key={index} title={el} activeNav={activeNav} setActiveNav={setActiveNav} index={index} />
            ))}
          </div>
        </div>
      </main>

      {isActiveConfirm && (
        <ConfirmationModal
          func={logOutFunc}
          modalTitle={useLang(confirmationModalGetOutTitle)}
          setIsActive={setIsActiveConfirm}
        />
      )}
    </>
  );
};

export default ProfileTop;

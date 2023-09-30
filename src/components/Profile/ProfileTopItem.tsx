interface ProfileTopItemProps {
  title: string;
  index: number;
  activeNav: number;
  setActiveNav: (num: number) => void;
}

const ProfileTopItem = ({ title, index, activeNav, setActiveNav }: ProfileTopItemProps) => {
  return (
    <div
      onClick={() => setActiveNav(index)}
      className={`profile-nav__btn ${activeNav === index ? 'profile-nav__btn__active' : ''}`}
    >
      {title}
    </div>
  );
};

export default ProfileTopItem;

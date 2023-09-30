import React, { useEffect, useState } from 'react';
import rust1 from '../../assets/img/shop/rust 1.png';
import restangle from '../../assets/img/shop/Rectangle 185.png';
import { ReactComponent as Info } from '../../assets/img/shop/info.svg';
import { rustApi } from '../../store';
import { Link } from 'react-router-dom';
import { useLang } from '../../hooks/useLang';
import {
  headerShopHowDoIFineOutTheServerMode,
  headerShopOnOurProject,
  headerShopPickYourMode,
} from '../../consts/headerShop';

interface HeaderShopProps {
  activeSection: number;
  setActiveSection: (arg: number) => void;
}

const HeaderShop = ({ activeSection, setActiveSection }: HeaderShopProps) => {
  const { data: types } = rustApi.useGetTypeServersQuery();

  useEffect(() => {
    localStorage.setItem('section', String(activeSection));
  }, [activeSection]);

  return (
    <div className={`headerShopBox ${activeSection === 0 ? 'headerShopBoxShadow' : ''}`}>
      <img src={restangle}></img>
      <img src={rust1} className="filterHeader"></img>
      <div className="contentHeaderShopBox container">
        <div className="centerHeaderShopBox">
          <div className="textHeaderShopBox">
            <h1>{useLang(headerShopPickYourMode)}</h1>
            <p>{useLang(headerShopOnOurProject)}</p>
            <Link to="/servers">
              <div className="dopInfoHeaderShopBox">
                <Info />

                <p>{useLang(headerShopHowDoIFineOutTheServerMode)}</p>
              </div>
            </Link>
          </div>

          <div className="menuHeaderShopBox">
            {types?.map((item, index) => (
              <div
                key={item.id}
                className={`sectionMenuHeaderShopBox ${
                  activeSection == item.id ? 'activeSectionMenuHeaderShopBox' : ''
                } ${activeSection === 0 ? 'purrple-effect' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderShop;

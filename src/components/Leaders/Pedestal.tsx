import React, { useState, useRef } from 'react';
import PedestalItem from './PedestalItem';
import '../../assets/scss/components/leaders/_pedestal.scss';
import { useWindowSize } from '../../hooks/useWindowSize';
import { getLeadersItem } from '../../types/userTypes';

interface PedestalProps {
  data: getLeadersItem[];
}

const Pedestal = ({ data }: PedestalProps) => {
  const dimensions = useWindowSize();
  const [activePlace, setActivePlace] = useState(0);

  if (!data || data.length < 3) return <></>;
  return (
    <div style={{ width: '100%' }}>
      {dimensions.width >= 700 ? (
        <div className="boxPedestal">
          <PedestalItem data={data[1]} />
          <PedestalItem data={data[0]} />
          <PedestalItem data={data[2]} />
        </div>
      ) : (
        <>
          <div className="scrollContainer" style={{ display: 'flex' }} id="container">
            <button
              className="buttonArrow"
              onClick={() => {
                setActivePlace(activePlace - 1);
              }}
              disabled={activePlace === 0}
            >
              ‹
            </button>
            {data.map((item, index) => {
              return index === activePlace && <PedestalItem key={index} data={item} />;
            })}
            <button
              className="buttonArrow"
              onClick={() => {
                setActivePlace(activePlace + 1);
              }}
              disabled={data.length - 1 === activePlace}
            >
              ›
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pedestal;

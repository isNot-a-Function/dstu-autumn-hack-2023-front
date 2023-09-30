import React, { useState, useRef, useEffect } from 'react';
import ListSections from './ListSections';
import { customPageApi } from '../../store';
import Loader from '../Loader';

interface CustomPageProps {
  id: number;
  haveSection: boolean;
}

const CustomPage = ({ haveSection, id }: CustomPageProps) => {
  const [activeValue, setActiveValue] = useState<number>(1);
  const [isScroll, setIsScroll] = useState(false);
  const [scrollValue, setScrollValue] = useState(1);
  const [direction, setDirection] = useState('bottom');
  const { data: info } = customPageApi.useGetCustomPageQuery(id);
  let lastScrollTop = 0;

  const returnValue = () => {
    return isScroll ? activeValue : scrollValue;
  };

  useEffect(() => {
    const sections = document.getElementsByClassName('sectionCustomPage');
    const box = document.getElementsByClassName('boxForSection');
    window.addEventListener('scroll', () => {
      console.log('handler scroll');
      let current = '';
      if (sections != null) {
        let array = Array.from(sections);
        array.map(section => {
          //@ts-ignore
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;

          if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            //@ts-ignore
            current = section.getAttribute('id');
          }
        });
      }
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setDirection('bottom');
      } else if (st < lastScrollTop) {
        setDirection('top');
      }
      lastScrollTop = st <= 0 ? 0 : st;
      setScrollValue(Number(current));
    });
  }, []);

  useEffect(() => {
    if (scrollValue === activeValue) {
      setIsScroll(false);
      setActiveValue(0);
    }
  }, [scrollValue, activeValue]);

  useEffect(() => {
    if (activeValue !== 0) {
      if (direction === 'bottom' && scrollValue > activeValue) {
        setIsScroll(false);
      } else if (direction === 'top' && scrollValue < activeValue) {
        setIsScroll(false);
      }
    }
  }, [direction]);

  useEffect(() => {
    info &&
      info.sections.map(item => {
        let extractscript = /<script>(.+)<\/script>/gi.exec(item.html);
        if (extractscript != null) {
          window.eval(extractscript[1]);
        }
      });
  });

  if (!info) return <Loader />;
  return (
    <div className="containerCustomPage">
      <h1 className="titlePage">{info.text}</h1>
      <div className={` ${haveSection ? 'boxWithSection' : 'boxNoSection'}`}>
        {haveSection && (
          <ListSections
            array={info.sections}
            activeValue={activeValue}
            setActiveValue={setActiveValue}
            setIsScroll={setIsScroll}
            isScroll={isScroll}
            scrollValue={scrollValue}
          />
        )}
        <div className="boxForSection">
          {info &&
            info.sections.map((item: any) => (
              <section key={item.id} className="sectionCustomPage" id={String(item.id)}>
                <div className={`${item.icon === null ? 'labelSectionCustomPage' : 'labelSectionCustomPageWithIcon'}`}>
                  <div className="iconSectionCustomPage">
                    {item.icon !== null && <img src={item.icon} className="iconCustomPage" />}
                  </div>
                  <h2>
                    {' '}
                    <a>{item.title}</a>
                  </h2>
                </div>
                {}
                <div className="question-text" dangerouslySetInnerHTML={{ __html: item.html }} />
              </section>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomPage;

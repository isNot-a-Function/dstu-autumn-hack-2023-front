import React, { useEffect } from 'react';
import { customPageItem } from '../../types/customPageTypes';
import { useWindowSize } from '../../hooks/useWindowSize';

interface ListSectionsProps {
  array: customPageItem[];
  activeValue: number;
  setActiveValue: (value: number) => void;
  setIsScroll: (value: boolean) => void;
  scrollValue: number;
  isScroll: boolean;
}

const ListSections = ({
  array,
  activeValue,
  setActiveValue,
  setIsScroll,
  isScroll,
  scrollValue,
}: ListSectionsProps) => {
  const dimensions = useWindowSize();

  const returnValue = () => {
    return isScroll ? activeValue : scrollValue;
  };

  useEffect(() => {
    const navLi = document.getElementsByClassName('sectionListSection');
    var myElement = document.getElementsByClassName('boxListSections');
    console.log('myElement', myElement);
    if (navLi != null) {
      let array = Array.from(navLi);
      array.map((li: any, index: any) => {
        // console.log()
        if (index + 1 === returnValue()) {
          if (dimensions.width <= 800) {
            const leftOfScroll = li.offsetLeft;
            if (myElement != null) {
              // myElement[0].scrollLeft = leftOfScroll;
              // myElement[0].scrollTo({top: 175, behavior: 'smooth'});
            }
          } else {
            const topOfScroll = li.offsetTop;
            if (myElement != null) {
              // myElement[0].scrollTo({ top: topOfScroll, behavior: 'smooth' });
              // li.scrollIntoView({ behavior: 'smooth' });
              // myElement[0].scrollTop = topOfScroll;
            }
          }
        }
      });
    }
  }, [scrollValue, activeValue]);

  return (
    <div className="boxListSections">
      {array.map(item => (
        <a
          key={item.id}
          className={`sectionListSection ${returnValue() == item.id ? 'sectionListSectionActive' : ''}`}
          href={`#${item.id}`}
          onClick={event => {
            console.log('вы клацнули');
            // event.preventDefault();
            // const sections = document.getElementsByClassName('sectionCustomPage');
            // if (sections != null) {
            //   let array = Array.from(sections);
            //   array.map((section: any, index) => {
            //     if (index + 1 === item.id) {
            //       console.log('заходит сюла');
            //       console.log('section', section);
            //       const topOfScroll = section.offsetTop;
            //       var myElement = document.getElementsByClassName('boxForSection');
            //       console.log('boxForSection', myElement);
            //       if (myElement !== null) {
            //         console.log('sdf');
            //         // myElement[0].scrollTop = topOfScroll;
            //         myElement[0].scrollTo({ top: topOfScroll, behavior: 'smooth' });
            //       }
            //       // section.scrollIntoView({ behavior: 'smooth' });
            //     }
            //     //@ts-ignore
            //     // const sectionTop = section.offsetTop;
            //     // const sectionHeight = section.clientHeight;

            //     // if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            //     //   //@ts-ignore
            //     //   current = section.getAttribute('id');
            //     // }
            //   });
            // }
            // if (base != null) {
            //   base[0].scrollIntoView();
            // }

            setIsScroll(true);
            setActiveValue(item.id);
          }}
        >
          {item.title}
        </a>
      ))}
    </div>
  );
};

export default ListSections;

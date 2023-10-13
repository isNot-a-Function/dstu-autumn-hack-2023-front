import reverved from "../../assets/img/wagons/reverved.jpg";
import res1 from "../../assets/img/wagons/res1.jpg";
import res2 from "../../assets/img/wagons/res2.jpg";
import res3 from "../../assets/img/wagons/res3.jpg";

const ReservedWagon = () => {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
  ];

  return (
    <div className="box-wagon">
      <div className="top-wagon"></div>
      {arr.map((it, index) => {
        const count = arr.length / 3;
        if (index % 2 == 0 && index <= 2 * count - 1) {
          return (
            <>
              <div className="line-places">
                <div className="box-polka">
                  <div className="box-place">{arr[index]}</div>
                  <div className="box-place">{arr[index + 1]}</div>
                </div>
                <div className="box-place">{arr.length - index / 2}</div>
              </div>
              {/* {index / 2} */}
              {index !== 2 * count - 2 && <div className="wagon-gap"></div>}
            </>
          );
        }
      })}
      <div className="bottom-wagon"></div>
    </div>
  );
};
export default ReservedWagon;

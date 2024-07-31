
import img from "../../assets/Group 143.png";

interface Props {
  closeModal: () => void;
  data : string[]
}
const Success = ({ closeModal ,data}: Props) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[435px] h-[312px] relative bg-white rounded-lg">
        <div className="flex justify-center items-center">
            <div>
            <img className="w-36" src={img} alt="" />
            </div>
        </div>
        <div className="text-center font-lato text-2xl mt-4 font-semibold ">
          <p>Your {data[0]} has been </p>
          <p>{data[1]} successfully.</p>
        </div>
        <div onClick={closeModal} className=" cursor-pointer absolute top-2 right-2 w-8 h-8 rounded-full text-white flex justify-center items-center bg-indigo ">X</div>
      </div>
    </div>
  );
};

export default Success;

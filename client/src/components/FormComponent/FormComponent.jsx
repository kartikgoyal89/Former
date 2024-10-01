// import React, { useEffect } from "react";

// import Input from "../../components/Input/Input";
// import Heading from "../../components/heading/Heading";
// import ShortText from "../../components/shortText/ShortText";
// import LongText from "../../components/LongText/LongText";
// import Number from "../../components/Number/Number";
// import Name from "../../components/Name/Name";
// import Email from "../../components/Email/Email";
// import Phone from "../../components/Phone/Phone";
// import Link from "../../components/Link/Link";
// import Address from "../../components/Address/Address";
// import Date from "../../components/Date/Date";
// import Time from "../../components/Time/Time";
// import ScaleRating from "../../components/ScaleRating/ScaleRating";
// import StarRating from "../../components/starRating/StarRating";
// import Ranking from "../../components/Ranking/Ranking";
// import SingleChoice from "../../components/SingleChoice/SingleChoice";
// import MultipleChoice from "../../components/MultipleChoice/MultipleChoice";
// import PictureChoice from "../../components/PictureChoice/PictureChoice";
// import Dropdown from "../../components/Dropdown/Dropdown";
// import Matrix from "../../components/Matrix/Matrix";
// import Image from "../../components/Image/Image";
// import Video from "../../components/Video/Video";
// import Audio from "../../components/Audio/Audio";
// import GenericEmbed from "../../components/Generic Embed/GenericEmbed";

// import { useItems } from "../../context/itemContext";

// import { AiOutlineDrag } from "react-icons/ai";
// import { RxCross2 } from "react-icons/rx";
// import { PiAlignCenterHorizontalBold } from "react-icons/pi";
// import { PiAlignRightBold } from "react-icons/pi";
// import { PiAlignLeftBold } from "react-icons/pi";
// import { FaHeading } from "react-icons/fa6";
// import { TfiText } from "react-icons/tfi";
// import { PiTextTBold } from "react-icons/pi";
// import { FiFileText } from "react-icons/fi";
// import { TbNumbers } from "react-icons/tb";
// import { FaBold } from "react-icons/fa";
// import { FaItalic } from "react-icons/fa";
// import { IoRadioButtonOnSharp } from "react-icons/io5";
// import { AiOutlineUser } from "react-icons/ai";
// import { TfiEmail } from "react-icons/tfi";
// import { LuPhone } from "react-icons/lu";
// import { FaLink } from "react-icons/fa6";
// import { PiMapPinBold } from "react-icons/pi";
// import { MdOutlineDateRange } from "react-icons/md";
// import { MdAccessTime } from "react-icons/md";
// import { PiChartBarBold } from "react-icons/pi";
// import { TiStarFullOutline } from "react-icons/ti";
// import { PiRankingBold } from "react-icons/pi";
// import { IoMdRadioButtonOn } from "react-icons/io";
// import { IoIosCheckboxOutline } from "react-icons/io";
// import { PiRowsBold } from "react-icons/pi";
// import { CiViewTable } from "react-icons/ci";
// import { IoImageOutline } from "react-icons/io5";
// import { AiOutlineDelete } from "react-icons/ai";
// import { MdOutlineEdit } from "react-icons/md";

// const FormComponent = ({
//   mainId,
//   formId,
//   setTheProperties,
//   submit,
//   handleSubmitButton,
//   submitButtonStyle,
//   rankings,
//   singleChoice,
//   visibleArray,
//   uploadedImage,
// }) => {
//   const { items, setItems } = useItems();

//   useEffect(() => {
//     console.log(items || "None");
//   }, [items]);

//   return (
//     <form
//       action=""
//       className="form-container"
//       style={{ width: formId.length === 0 ? "65%" : "100%" }}
//     >
//       {items?.length === 0 ? (
//         <>
//           <div className="nodata">
//             <div className="text">
//               <AiOutlineDrag /> Click or Drag Elements to add questions, text to
//               your form.
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           {items?.map((item, key) => {
//             switch (item?.type) {
//               case "form-header":
//                 return (
//                   <Heading
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                   />
//                 );
//               case "text":
//                 return (
//                   <Input
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                   />
//                 );
//               case "long-text":
//                 return (
//                   <LongText
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     height={item?.height}
//                     defaultVal={item?.defaultVal}
//                     minChar={item?.minChar}
//                     maxChar={item?.maxChar}
//                   />
//                 );
//               case "short-text":
//                 return (
//                   <ShortText
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                   />
//                 );
//               case "number":
//                 return (
//                   <Number
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                     minChar={item?.minChar}
//                     maxChar={item?.maxChar}
//                   />
//                 );
//               case "email":
//                 return (
//                   <Email
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                   />
//                 );
//               case "name":
//                 return (
//                   <Name
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     firstNameInput={item.text}
//                     lastNameInput={item.text}
//                     firstPlaceholder={item.text}
//                     lastPlaceholder={item.text}
//                     VisibleOptions={visibleArray}
//                   />
//                 );
//               case "phone":
//                 return (
//                   <Phone
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                   />
//                 );
//               case "link":
//                 return (
//                   <Link
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                   />
//                 );
//               case "address":
//                 return (
//                   <Address
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                     VisibleOptions={visibleArray}
//                   />
//                 );
//               case "date":
//                 return (
//                   <Date
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                   />
//                 );
//               case "time":
//                 return (
//                   <Time
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                   />
//                 );
//               case "scale":
//                 return (
//                   <ScaleRating
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                   />
//                 );
//               case "star":
//                 return (
//                   <StarRating
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                   />
//                 );
//               case "ranking":
//                 return (
//                   <Ranking
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                     ranking={rankings}
//                   />
//                 );
//               case "single-choice":
//                 return (
//                   <SingleChoice
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                     ranking={rankings}
//                     selectedChoice={singleChoice}
//                   />
//                 );
//               case "multiple-choice":
//                 return (
//                   <MultipleChoice
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                     ranking={rankings}
//                   />
//                 );
//               case "picture-choice":
//                 return (
//                   <PictureChoice
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                     ranking={rankings}
//                   />
//                 );
//               case "dropdown":
//                 return (
//                   <Dropdown
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                     ranking={rankings}
//                     selectedChoice={singleChoice}
//                   />
//                 );
//               case "matrix":
//                 return (
//                   <Matrix
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                     ranking={rankings}
//                     selectedChoice={singleChoice}
//                   />
//                 );
//               case "image":
//                 return (
//                   <Image
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                     uploadedImage={uploadedImage}
//                   />
//                 );
//               case "video":
//                 return (
//                   <Video
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                   />
//                 );
//               case "audio":
//                 return (
//                   <Audio
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                   />
//                 );
//               case "generic":
//                 return (
//                   <GenericEmbed
//                     id={item.id}
//                     key={item.id}
//                     onClick={() => setTheProperties(item.id)}
//                     style={item.style || {}}
//                     isSelected={mainId === item.id}
//                     text={item.text}
//                     placeholderText={item.text}
//                     defaultVal={item?.defaultVal}
//                   />
//                 );
//               default:
//                 return null;
//             }
//           })}
//           <div className="submit-div hover-outline">
//             <button
//               className="submit"
//               style={submitButtonStyle}
//               onClick={(e) => {
//                 handleSubmitButton(e);
//               }}
//             >
//               {submit ? submit : "SUBMIT"}
//             </button>
//           </div>
//         </>
//       )}
//     </form>
//   );
// };

// export default FormComponent;

import React, { useState } from "react";
import "./sidebar.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CiSearch } from "react-icons/ci";
import { FaHeading } from "react-icons/fa6";
import { TfiText } from "react-icons/tfi";
import { FiFileText } from "react-icons/fi";
import { TbNumbers } from "react-icons/tb";
import { useDraggable } from "@dnd-kit/core";
import { AiOutlineUser } from "react-icons/ai";
import { TfiEmail } from "react-icons/tfi";
import { LuPhone } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
import { PiMapPinBold } from "react-icons/pi";
import { MdOutlineDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { PiChartBarBold } from "react-icons/pi";
import { TiStarFullOutline } from "react-icons/ti";
import { PiRankingBold } from "react-icons/pi";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoIosCheckboxOutline } from "react-icons/io";
import { AiOutlinePicture } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";
import { CiViewTable } from "react-icons/ci";
import { IoImageOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { IoVolumeHighOutline } from "react-icons/io5";
import { ImEmbed } from "react-icons/im";
import { BsArrowRepeat } from "react-icons/bs";
import { BsRepeat } from "react-icons/bs";
import { PiPenNib } from "react-icons/pi";
import { BiUpload } from "react-icons/bi";
import { TbCurrentLocation } from "react-icons/tb";
import { PiMathOperationsLight } from "react-icons/pi";
import { RxSpaceBetweenVertically } from "react-icons/rx";

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const Sidebar = () => {
  const [menu, setMenu] = useState("basic");

  return (
    <>
      <div className="sidebar-container">
        <Slider {...settings}>
          <div className="item">
            <button
              className={menu === "basic" ? "active" : ""}
              onClick={() => setMenu("basic")}
            >
              <p className="mb-0">Basic</p>
            </button>
          </div>
          <div className="item">
            <button
              className={menu === "personal" ? "active" : ""}
              onClick={() => setMenu("personal")}
            >
              <p className="mb-0">Personal</p>
            </button>
          </div>
          <div className="item">
            <button
              className={menu === "date-time" ? "active" : ""}
              onClick={() => setMenu("date-time")}
            >
              <p className="mb-0">Date & Time</p>
            </button>
          </div>
          <div className="item">
            <button
              className={menu === "survey" ? "active" : ""}
              onClick={() => setMenu("survey")}
            >
              <p className="mb-0">Survey</p>
            </button>
          </div>
          <div className="item">
            <button
              className={menu === "choices" ? "active" : ""}
              onClick={() => setMenu("choices")}
            >
              <p className="mb-0">Choices</p>
            </button>
          </div>
          <div className="item">
            <button
              className={menu === "embed" ? "active" : ""}
              onClick={() => setMenu("embed")}
            >
              <p className="mb-0">Embed</p>
            </button>
          </div>
          <div className="item">
            <button
              className={menu === "payments" ? "active" : ""}
              onClick={() => setMenu("payments")}
            >
              <p className="mb-0">Payments</p>
            </button>
          </div>
          <div className="item">
            <button
              className={menu === "spam" ? "active" : ""}
              onClick={() => setMenu("spam")}
            >
              <p className="mb-0">Spam Protection</p>
            </button>
          </div>
          <div className="item">
            <button
              className={menu === "other" ? "active" : ""}
              onClick={() => setMenu("other")}
            >
              <p className="mb-0">Others</p>
            </button>
          </div>
          <div className="item">
            <button
              className={menu === "layout" ? "active" : ""}
              onClick={() => setMenu("layout")}
            >
              <p className="mb-0">Layout</p>
            </button>
          </div>
        </Slider>
        <div className="input-section">
          <input type="text" placeholder="search here..." />
          <CiSearch className="search-icon" />
        </div>

        {menu === "basic" ? (
          <div className="input-list">
            <li>
              <DraggableItem id="form-header">
                <button className="input_">
                  <button className="input-icon">
                    <FaHeading />
                  </button>
                  Form Header
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="text">
                <button className="input_">
                  <button className="input-icon">
                    <TfiText />
                  </button>
                  Text
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="short-text">
                <button className="input_">
                  <button className="input-icon">
                    <FiFileText />
                  </button>
                  Short text
                </button>
              </DraggableItem>
            </li>

            <li>
              <DraggableItem id="long-text">
                <button className="input_">
                  <button className="input-icon">
                    <FiFileText />
                  </button>
                  Long text
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="number">
                <button className="input_">
                  <button className="input-icon">
                    <TbNumbers />
                  </button>
                  Number
                </button>
              </DraggableItem>
            </li>
          </div>
        ) : menu === "personal" ? (
          <div className="input-list">
            <li>
              <DraggableItem id="name">
                <button className="input_">
                  <button className="input-icon">
                    <AiOutlineUser />
                  </button>
                  Name
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="email">
                <button className="input_">
                  <button className="input-icon">
                    <TfiEmail />
                  </button>
                  Email
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="phone">
                <button className="input_">
                  <button className="input-icon">
                    <LuPhone />
                  </button>
                  Phone
                </button>
              </DraggableItem>
            </li>

            <li>
              <DraggableItem id="link">
                <button className="input_">
                  <button className="input-icon">
                    <FaLink />
                  </button>
                  Link
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="address">
                <button className="input_">
                  <button className="input-icon">
                    <PiMapPinBold />
                  </button>
                  Address
                </button>
              </DraggableItem>
            </li>
          </div>
        ) : menu === "date-time" ? (
          <div className="input-list">
            <li>
              <DraggableItem id="date">
                <button className="input_">
                  <button className="input-icon">
                    <MdOutlineDateRange />
                  </button>
                  Date
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="time">
                <button className="input_">
                  <button className="input-icon">
                    <MdAccessTime />
                  </button>
                  Time
                </button>
              </DraggableItem>
            </li>
          </div>
        ) : menu === "survey" ? (
          <div className="input-list">
            <li>
              <DraggableItem id="scale">
                <button className="input_">
                  <button className="input-icon">
                    <PiChartBarBold />
                  </button>
                  Scale Rating
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="star">
                <button className="input_">
                  <button className="input-icon">
                    <TiStarFullOutline />
                  </button>
                  Star Rating
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="ranking">
                <button className="input_">
                  <button className="input-icon">
                    <PiRankingBold />
                  </button>
                  Ranking
                </button>
              </DraggableItem>
            </li>
          </div>
        ) : menu === "choices" ? (
          <div className="input-list">
            <li>
              <DraggableItem id="single-choice">
                <button className="input_">
                  <button className="input-icon">
                    <IoMdRadioButtonOn />
                  </button>
                  Single Choice
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="multiple-choice">
                <button className="input_">
                  <button className="input-icon">
                    <IoIosCheckboxOutline />
                  </button>
                  Multiple Choice
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="picture-choice">
                <button className="input_">
                  <button className="input-icon">
                    <AiOutlinePicture />
                  </button>
                  Picture Choice
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="dropdown">
                <button className="input_">
                  <button className="input-icon">
                    <IoIosArrowDropdown />
                  </button>
                  Dropdown
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="matrix">
                <button className="input_">
                  <button className="input-icon">
                    <CiViewTable />
                  </button>
                  Matrix
                </button>
              </DraggableItem>
            </li>
          </div>
        ) : menu === "embed" ? (
          <div className="input-list">
            <li>
              <DraggableItem id="image">
                <button className="input_">
                  <button className="input-icon">
                    <IoImageOutline />
                  </button>
                  Image
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="video">
                <button className="input_">
                  <button className="input-icon">
                    <IoVideocamOutline />
                  </button>
                  Video
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="audio">
                <button className="input_">
                  <button className="input-icon">
                    <IoVolumeHighOutline />
                  </button>
                  Audio
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="generic">
                <button className="input_">
                  <button className="input-icon">
                    <ImEmbed />
                  </button>
                  Generic Embed
                </button>
              </DraggableItem>
            </li>
          </div>
        ) : menu === "spam" ? (
          <div className="input-list">
            <li>
              <DraggableItem id="recaptcha">
                <button className="input_">
                  <button className="input-icon">
                    <BsRepeat />
                  </button>
                  Recaptcha
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="turnstile">
                <button className="input_">
                  <button className="input-icon">
                    <BsArrowRepeat />
                  </button>
                  Turnstile
                </button>
              </DraggableItem>
            </li>
          </div>
        ) : menu === "other" ? (
          <div className="input-list">
            <li>
              <DraggableItem id="calculation">
                <button className="input_">
                  <button className="input-icon">
                    <PiMathOperationsLight />
                  </button>
                  Calculation
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="signature">
                <button className="input_">
                  <button className="input-icon">
                    <PiPenNib />
                  </button>
                  Signature
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="file_upload">
                <button className="input_">
                  <button className="input-icon">
                    <BiUpload />
                  </button>
                  File Upload
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="location">
                <button className="input_">
                  <button className="input-icon">
                    <TbCurrentLocation />
                  </button>
                  Location
                </button>
              </DraggableItem>
            </li>
          </div>
        ) : menu === "layout" ? (
          <div className="input-list">
            <li>
              <DraggableItem id="spacer">
                <button className="input_">
                  <button className="input-icon">
                    <RxSpaceBetweenVertically />
                  </button>
                  Spacer
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="signature">
                <button className="input_">
                  <button className="input-icon">
                    <PiPenNib />
                  </button>
                  Column Layout
                </button>
              </DraggableItem>
            </li>
            <li>
              <DraggableItem id="file_upload">
                <button className="input_">
                  <button className="input-icon">
                    <BiUpload />
                  </button>
                  Repeat Field
                </button>
              </DraggableItem>
            </li>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Sidebar;

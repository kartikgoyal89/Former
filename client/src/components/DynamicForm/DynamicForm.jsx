// DynamicForm.jsx
import React from "react";
import { AiOutlineDrag } from "react-icons/ai"; // Import any icons or components used
import { useLocation } from "react-router-dom";
import Input from "../../components/Input/Input";
import Heading from "../../components/heading/Heading";
import ShortText from "../../components/shortText/ShortText";
import LongText from "../../components/LongText/LongText";
import Number from "../../components/Number/Number";
import Name from "../../components/Name/Name";
import Email from "../../components/Email/Email";
import Phone from "../../components/Phone/Phone";
import Link from "../../components/Link/Link";
import Address from "../../components/Address/Address";
import Date from "../../components/Date/Date";
import Time from "../../components/Time/Time";
import ScaleRating from "../../components/ScaleRating/ScaleRating";
import StarRating from "../../components/starRating/StarRating";
import Ranking from "../../components/Ranking/Ranking";
import SingleChoice from "../../components/SingleChoice/SingleChoice";
import MultipleChoice from "../../components/MultipleChoice/MultipleChoice";
import PictureChoice from "../../components/PictureChoice/PictureChoice";
import Dropdown from "../../components/Dropdown/Dropdown";
import Matrix from "../../components/Matrix/Matrix";
import Image from "../../components/Image/Image";
import Video from "../../components/Video/Video";
import Audio from "../../components/Audio/Audio";
import GenericEmbed from "../../components/Generic Embed/GenericEmbed";
import Recaptcha from "../../components/Recaptcha/Recaptcha";
import Turnstile from "../../components/Turnstile/Turnstile";
import Signature from "../../components/Signature/Signature";
import Location from "../../components/Location/Location";
import FileUpload from "../../components/FileUpload/FileUpload";
import Calculation from "../../components/Calculation/Calculation";
import Spacer from "../../components/Spacer/Spacer";

const DynamicForm = ({
  items,
  setTheProperties,
  mainId,
  visibleArray,
  rankings,
  singleChoice,
  uploadedImage,
  submitButtonStyle,
  handleSubmitButton,
  calculation,
}) => {
  const location = useLocation();
  let formId = location.pathname.split("/")[1];
  return (
    <form
      action=""
      className="form-container"
      style={{ width: formId.length === 0 ? "65%" : "50%" }}
    >
      {items?.length === 0 ? (
        <>
          <div className="nodata">
            <div className="text">
              <AiOutlineDrag /> Click or Drag Elements to add questions, text to
              your form.
            </div>
          </div>
        </>
      ) : (
        <>
          {items?.map((item, key) =>
            item?.type === "form-header" ? (
              <Heading
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
              />
            ) : item?.type === "text" ? (
              <Input
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
              />
            ) : item?.type === "long-text" ? (
              <LongText
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                height={item?.height}
                defaultVal={item?.defaultVal}
                minChar={item?.minChar}
                maxChar={item?.maxChar}
              />
            ) : item?.type === "short-text" ? (
              <ShortText
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
              />
            ) : item?.type === "number" ? (
              <Number
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
                minChar={item?.minChar}
                maxChar={item?.maxChar}
              />
            ) : item?.type === "email" ? (
              <Email
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
              />
            ) : item?.type === "name" ? (
              <Name
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                firstNameInput={item.text}
                lastNameInput={item.text}
                firstPlaceholder={item.text}
                lastPlaceholder={item.text}
                VisibleOptions={visibleArray}
              />
            ) : item?.type === "phone" ? (
              <Phone
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
              />
            ) : item?.type === "link" ? (
              <Link
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
              />
            ) : item?.type === "address" ? (
              <Address
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
                VisibleOptions={visibleArray}
              />
            ) : item?.type === "date" ? (
              <Date
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
              />
            ) : item?.type === "time" ? (
              <Time
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
              />
            ) : item?.type === "scale" ? (
              <ScaleRating
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
              />
            ) : item?.type === "star" ? (
              <StarRating
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
              />
            ) : item?.type === "ranking" ? (
              <Ranking
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
                ranking={rankings}
              />
            ) : item?.type === "single-choice" ? (
              <SingleChoice
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
                ranking={rankings}
                selectedChoice={singleChoice}
              />
            ) : item?.type === "multiple-choice" ? (
              <MultipleChoice
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
                ranking={rankings}
              />
            ) : item?.type === "picture-choice" ? (
              <PictureChoice
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
                ranking={rankings}
              />
            ) : item?.type === "dropdown" ? (
              <Dropdown
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
                ranking={rankings}
                selectedChoice={singleChoice}
              />
            ) : item?.type === "matrix" ? (
              <Matrix
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
                ranking={rankings}
                selectedChoice={singleChoice}
              />
            ) : item?.type === "image" ? (
              <Image
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
                uploadedImage={uploadedImage}
              />
            ) : item?.type === "video" ? (
              <Video
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
              />
            ) : item?.type === "audio" ? (
              <Audio
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
              />
            ) : item?.type === "generic" ? (
              <GenericEmbed
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
              />
            ) : item?.type === "recaptcha" ? (
              <Recaptcha
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
              />
            ) : item?.type === "turnstile" ? (
              <Turnstile
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
              />
            ) : item?.type === "signature" ? (
              <Signature
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
              />
            ) : item?.type === "location" ? (
              <Location
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
              />
            ) : item?.type === "file_upload" ? (
              <FileUpload
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
              />
            ) : item?.type === "calculation" ? (
              <Calculation
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
                text={item.text}
                placeholderText={item.text}
                defaultVal={item?.defaultVal}
                calculation={calculation}
              />
            ) : item?.type === "spacer" ? (
              <Spacer
                id={item.id}
                key={item.id}
                onClick={() => setTheProperties(item.id)}
                style={item.style || {}}
                isSelected={mainId === item.id}
              />
            ) : null
          )}
          <div className="submit-div hover-outline">
            <button
              className={`submit ${mainId === 0 ? "submit-active" : ""}`}
              style={{
                height:
                  submitButtonStyle?.btnHeight !== undefined
                    ? `${submitButtonStyle?.btnHeight}px`
                    : "42px",
                fontSize:
                  submitButtonStyle?.btnFontsize !== undefined
                    ? `${submitButtonStyle?.btnFontsize}px`
                    : "20px",
                fontWeight:
                  submitButtonStyle?.bold !== undefined ? "600" : "400",
                fontStyle:
                  submitButtonStyle?.bold !== undefined ? "italic" : "normal",
              }}
              onClick={(e) => {
                handleSubmitButton(e);
              }}
            >
              {submitButtonStyle?.buttonInputText !== undefined
                ? submitButtonStyle?.buttonInputText
                : "Submit"}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default DynamicForm;

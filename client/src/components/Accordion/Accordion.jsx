import React from "react";
import ColorPicker from "../../components/ColorPicker/ColorPicker";

const Accordion = () => {
  return (
    <>
      <div className="settings-accordion mt-5">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Font Style
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <p>Font</p>
                <select name="" className="dropdown" id="">
                  <option value="sans-serif">sans-serif</option>
                  <option value="rubik">Rubik</option>
                </select>
                <div className="font-prop d-flex justify-between gap-10">
                  <div className="prop">
                    <p className="mb-0 text-nowrap">Question Font Size</p>
                    <input type="number" defaultValue="16" />
                  </div>
                  <div className="prop">
                    <p className="mb-0 text-nowrap">Question Spacing</p>
                    <input type="number" defaultValue="12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Color
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <p>Placeholder Text</p>
                <ColorPicker />
                <p>Button Text</p>
                <ColorPicker />
                <p>Border </p>
                <ColorPicker />
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Margin
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="margin-prop">
                  <div className="prop">
                    <p>Field Top</p>
                    <input type="number" defaultValue="0" />
                  </div>
                  <div className="prop">
                    <p>Field Bottom</p>
                    <input type="number" defaultValue="0" />
                  </div>
                  <div className="prop">
                    <p>Label Bottom</p>
                    <input type="number" defaultValue="0" />
                  </div>
                  <div className="prop">
                    <p>Description Bottom</p>
                    <input type="number" defaultValue="0" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFour"
                aria-expanded="false"
                aria-controls="flush-collapseFour"
              >
                Padding
              </button>
            </h2>
            <div
              id="flush-collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="margin-prop">
                  <div className="prop">
                    <p>Field Top</p>
                    <input type="number" defaultValue="0" />
                  </div>
                  <div className="prop">
                    <p>Field Bottom</p>
                    <input type="number" defaultValue="0" />
                  </div>
                  <div className="prop">
                    <p>Label Bottom</p>
                    <input type="number" defaultValue="0" />
                  </div>
                  <div className="prop">
                    <p>Description Bottom</p>
                    <input type="number" defaultValue="0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordion;

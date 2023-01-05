import { useState } from "react";
import "./styles.css";

const Accordion = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className="accordion-wrapper">
        <div className="accordion-header" onClick={clickHandler}>
          <div>Stop Header</div>
        </div>
        <div className={`accordion-content ${isOpen ? "show" : ""}`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Accordion;

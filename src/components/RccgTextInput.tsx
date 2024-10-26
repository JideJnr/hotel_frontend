import React from "react";

interface RccgTextInputProp {
  placeholder: string;
}

const RccgTextInput = ({ placeholder }: RccgTextInputProp) => {
  return (
    <input type="text" className="form-control" placeholder={placeholder} />
  );
};

export default RccgTextInput;

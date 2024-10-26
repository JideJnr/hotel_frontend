import { IonInput, IonInputPasswordToggle } from "@ionic/react";

interface RccgPasswordInputProp {
  placeholder: string;
}
const RccgPasswordInput = ({ placeholder }: RccgPasswordInputProp) => {
  return (
    <IonInput
      type="password"
      placeholder={placeholder}
      value=""
      className="form-control" // Add Tailwind classes here
    >
      <IonInputPasswordToggle
        slot="end"
        style={{ color: "#667085 !important" }}
      />
    </IonInput>
  );
};

export default RccgPasswordInput;

import "./App.css";
import Dropdown from "./components/Dropdown";
import { customSuccessFunctionT } from "./types";

const customSuccessFunction: customSuccessFunctionT = (
  identifier: string
): void => {
  console.log(
    "%cSuccess; Status: 200; Emit identifier",
    "color: green; font-weight: bold;"
  );
  console.log("Selected value's identifier :", identifier);
};

function App() {
  return (
    <Dropdown
      placeholder="Select an option"
      options={[
        { id: "ID_1", label: "Option 1" },
        { id: "ID_2", label: "Option 2" },
        { id: "ID_3", label: "Option 3" },
        { id: "ID_4", label: "Option 4" },
        { id: "ID_5", label: "Option 5" },
        { id: "ID_6", label: "Option 6" },
        { id: "ID_7", label: "Option 7" },
        { id: "ID_8", label: "Option 8" },
        { id: "ID_9", label: "Option 9" },
      ]}
      onOptionSelect={customSuccessFunction}
    />
  );
}

export default App;

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styles from "./Dropdown.module.css";
import { DropdownPropsT, OptionT } from "./types";

const Dropdown = ({ options, placeholder, onOptionSelect }: DropdownPropsT) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  const memoizedOptions = useMemo(() => options, [options]);

  const handleOptionSelect = useCallback(
    (value: string) => {
      const foundOption = options.find((option) => option.label === value);

      setSelectedOption(value);
      setIsOpen(false);

      foundOption && onOptionSelect(foundOption.id);
    },
    [options, onOptionSelect]
  );

  const handleSelectToggle = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      clearTimeout(timeoutRef.current);

      document.addEventListener("click", handleOutsideClick);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = undefined;
      }, 100);

      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const memoizedOptionElements = useMemo(
    () =>
      memoizedOptions.map((option: OptionT) => {
        return (
          <option
            style={{ display: "none" }}
            value={option.label}
            key={option.id}
          >
            {option.label}
          </option>
        );
      }),
    [memoizedOptions]
  );

  const memoizedLiElements = useMemo(
    () =>
      memoizedOptions.map((option: OptionT) => (
        <li
          key={option.id}
          className={styles.dropdownListItem}
          onClick={() => handleOptionSelect(option.label)}
        >
          {option.label}
        </li>
      )),
    [memoizedOptions, handleOptionSelect]
  );

  return (
    <div
      className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
      ref={selectRef}
    >
      <select
        value={selectedOption || ""}
        className={`${styles.dropdownSelect} ${
          selectedOption ? styles.active : ""
        }`}
        onChange={(e) => setSelectedOption(e.target.value)}
        onClick={handleSelectToggle}
      >
        <option value="" disabled style={{ display: "none" }}>
          {placeholder}
        </option>
        {memoizedOptionElements}
      </select>
      <ul className={`${styles.dropdownList} ${isOpen ? styles.open : ""}`}>
        <div className={styles.dropdownListScroll}>{memoizedLiElements}</div>
      </ul>
    </div>
  );
};

export default Dropdown;

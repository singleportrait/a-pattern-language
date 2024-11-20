import { useCallback, useEffect } from "react";

import { Stack } from "@sanity/ui";
import { NumberInputProps, useFormValue, set, unset } from "sanity";

const CustomNumberInput = (props: NumberInputProps) => {
  const numberString = useFormValue(["numberString"]);

  const handleChange = useCallback(() => {
    // console.log("----");
    // console.log("Props value to string", props.value?.toString());
    // console.log("Number string", numberString);
    if (props.value?.toString() === numberString) return;

    if (!numberString || typeof numberString !== "string") {
      // console.log("Unsetting");
      props.onChange(unset());
    }

    if (numberString && typeof numberString === "string") {
      try {
        const numberNum = parseInt(numberString, 10);
        // console.log("Number is a number now; setting", numberNum);
        props.onChange(set(numberNum));
      } catch {
        console.log("Error turning that string into a number");
      }
    }
  }, [numberString, props]);

  useEffect(() => {
    handleChange();
  }, [props, numberString]);
  return <Stack space={2}>{props.value}</Stack>;
};

export default CustomNumberInput;

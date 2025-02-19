import { useCallback, useEffect } from 'react';

import { Stack } from '@sanity/ui';
import { NumberInputProps, useFormValue, set, unset } from 'sanity';

/** Created so there is also a number version of the number
 *  The string is for searching in references (numbers aren't searchable)
 *  The number is for sorting in ascending order
 */
const CustomNumberInput = (props: NumberInputProps) => {
  const numberString = useFormValue(['numberString']);

  const handleChange = useCallback(() => {
    if (props.value?.toString() === numberString) return;

    if (!numberString || typeof numberString !== 'string') {
      props.onChange(unset());
    }

    if (numberString && typeof numberString === 'string') {
      try {
        const numberNum = parseInt(numberString, 10);
        props.onChange(set(numberNum));
      } catch {
        console.log('Error turning that string into a number');
      }
    }
  }, [numberString, props]);

  useEffect(() => {
    handleChange();
  }, [props, numberString]);
  return <Stack space={2}>{props.value}</Stack>;
};

export default CustomNumberInput;

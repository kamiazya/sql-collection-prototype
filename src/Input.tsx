import React, { FC, useState } from "react";
import { Box } from "ink";
import TextInput from "ink-text-input";

type Props = {
  value: string;
  onSubmit: (value: string) => void;
}

export const Input: FC<Props> = ({ value, onSubmit }) => {
         const [text, setText] = useState(value);
         return (
           <Box>
             <Box marginRight={1}>ID:</Box>

             <TextInput value={text} onChange={setText} onSubmit={onSubmit} />
           </Box>
         );
       };

import { useState } from 'react';
import { Pane, Label, TextInput } from 'evergreen-ui';
import { themeObj } from './style-component';
import styled from 'styled-components';

const CustomTextInput = styled(TextInput)`
  &:focus {
    border: 2px solid ${props => props.main_color};
    box-shadow:0 2px 3px 0 rgba(51, 48, 60, 0.1);
  }
`;

const TextInputComponent = (props) => {
  const { dnsData } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("")
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Pane position="relative" style={{ marginTop: '1rem' }}>
      <Label
        htmlFor="myInput"
        position="absolute"
        top={isFocused || textFieldValue ? '-9px' : '10px'}
        left={'10px'}
        zIndex={1}
        transition="top 0.2s ease-in-out, font-size 0.2s ease-in-out, color 0.2s ease-in-out"
        background="white"
        paddingLeft="4px"
        paddingRight="4px"
        fontSize={isFocused || textFieldValue ? themeObj.font_size.font5 : themeObj.font_size.font3}
        color={isFocused || textFieldValue ? dnsData?.theme_css?.main_color : themeObj.grey[500]}
      >
        인증번호 입력
      </Label>
      <CustomTextInput
        main_color={dnsData?.theme_css?.main_color}
        id="myInput"
        style={{ width: '100%', height: '40px' }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => {
          setTextFieldValue(e.target.value)
        }}
      />
    </Pane>
  );
}
export default TextInputComponent;

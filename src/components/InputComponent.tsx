import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardType,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {EyeSlash} from 'iconsax-react-native';
import {appColors} from '../constants/appColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {globalStyles, inputStyles} from '../styles';

interface Props {
  value: string;
  color?: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  onEnd?: () => void;
}
const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    placeholder,
    suffix,
    isPassword,
    allowClear,
    type,
    onEnd,
  } = props;
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);
  return (
    <View style={[inputStyles.inpuContainer]}>
      {affix ?? affix}
      <TextInput
        value={value}
        style={[inputStyles.textInput, globalStyles.text]}
        placeholder={placeholder ?? ''}
        placeholderTextColor={appColors.placeholder}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPass}
        keyboardType={type ?? 'default'}
        autoCapitalize="none"
        onEndEditing={onEnd}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
        }>
        {isPassword ? (
          <Entypo
            name={isShowPass ? 'eye-with-line' : 'eye'}
            size={22}
            color={appColors.gray}
          />
        ) : (
          value.length > 0 &&
          allowClear && (
            <AntDesign name="close" size={22} color={appColors.text} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;

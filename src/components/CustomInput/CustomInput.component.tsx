import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Control, Controller, RegisterOptions} from 'react-hook-form';

// TYPES
import {User} from '../../API';

// STYLES
import {styles} from './CustomInput.styles';
import {colors} from '../../theme/colors';

//* Creates a new type based on another type.
//* However, Pick enables us to select specific keys we'd like to pass into the new type.
//* This makes it such that if we edit/update the original interface/type, we automatically get the edits to the picked keys in the new type as well
type IEditableUserField = 'name' | 'username' | 'bio' | 'website' | 'image';
export type IEditableUser = Pick<User, IEditableUserField>;

interface ICustomInput {
  label: string;
  name: IEditableUserField;
  control: Control<IEditableUser, object>;
  rules?: RegisterOptions;
  multiline?: boolean;
}

const CustomInput = ({
  label = 'Your label',
  name,
  control,
  rules = {},
  multiline = false,
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({
      field: {onChange, onBlur, value},
      fieldState: {error, isTouched},
    }) => {
      return (
        <View style={styles.root}>
          <Text style={styles.label}>{label}</Text>

          {/* Input & Error text1 */}
          <View style={styles.textContainer}>
            <TextInput
              placeholder={label}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value || ''}
              multiline={multiline}
              style={[
                styles.input,
                {
                  borderColor:
                    error && isTouched ? colors.error : colors.border,
                },
              ]}
            />

            {error && isTouched && (
              <Text style={{color: colors.error}}>
                {error.message || error.type}
              </Text>
            )}
          </View>
        </View>
      );
    }}
  />
);

export default CustomInput;

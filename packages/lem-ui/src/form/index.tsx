import React from 'react';
import InternalForm, { InternalFormProps } from './Form';
import FormItem from './FormItem';
import FormField from './FormField';
import FormStore from './FormStore';

interface FormProps extends React.FC<InternalFormProps> {
  Item: typeof FormItem;
  Field: typeof FormField;
}

const Form = InternalForm as FormProps;

Form.Item = FormItem;
Form.Field = FormField;

export { FormStore };

export default Form;

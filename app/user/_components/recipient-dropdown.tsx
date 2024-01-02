import GroupMultipleSelector, { Option } from "@/components/multi-select";
import { User } from "@prisma/client";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface RecipientsDropdownProps {
  control: Control<FieldValues, any>;
  recipients: User[];
}

const RecipientsDropdown = ({
  control,
  recipients,
}: RecipientsDropdownProps) => {
  const options: Option[] = recipients.map((recipient) => ({
    label: recipient.name ? recipient.name : "(Unknown Name)",
    value: recipient.name
      ? recipient.name + recipient.id
      : "(Unknown Name)" + recipient.id,
  }));

  return (
    <Controller
      name="recipients"
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <GroupMultipleSelector
          value={value}
          onChange={onChange}
          options={options}
          placeholder="Select your recipients here..."
        />
      )}
    />
  );
};

export default RecipientsDropdown;

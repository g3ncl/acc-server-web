import React from "react";
import { NumberInput, TextInput, Select } from "@mantine/core";
import { ConfigField } from "@/types/configTypes";

interface ConfigFieldInputProps {
  field: ConfigField;
  value: number | string;
  onChange: (value: number | string | boolean) => void;
}

const ConfigFieldInput: React.FC<ConfigFieldInputProps> = ({
  field,
  value,
  onChange,
}) => {
  switch (field.inputType) {
    case "number":
      return (
        <NumberInput
          key={field.key}
          label={field.label}
          value={value as number}
          onChange={(val) => onChange(val as number)}
          min={field.range?.min}
          max={field.range?.max}
          description={field.description}
          placeholder="Currently not set"
        />
      );
    case "text":
      return (
        <TextInput
          key={field.key}
          label={field.label}
          value={value as string}
          onChange={(event) => onChange(event.currentTarget.value)}
          description={field.description}
          placeholder="Currently not set"
        />
      );
    case "select":
      return (
        <Select
          key={field.key}
          label={field.label}
          data={
            field.options?.map((option) => ({
              // Store the original type in a data attribute
              value: String(option.value),
              label: option.label,
              type: typeof option.value,
            })) || []
          }
          value={String(value)}
          onChange={(selectedValue) => {
            if (!selectedValue) return;
            // Find the original option to get its type
            const originalOption = field.options?.find(
              (opt) => String(opt.value) === selectedValue
            );
            // Convert back to original type if it was a number
            const finalValue = originalOption?.value ?? selectedValue;
            onChange(finalValue);
          }}
          description={field.description}
          onClear={() => onChange("")}
          searchable={false}
          placeholder="Currently not set"
          clearable={true}
        />
      );
    default:
      return null;
  }
};

export default ConfigFieldInput;

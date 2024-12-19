"use client";

import React, { useCallback, useEffect } from "react";

import { Button, FieldLabel, TextInput, useField, useForm, useFormFields } from "@payloadcms/ui";
import { TextFieldClientProps } from "payload";

import { formatSlug } from "./formatSlug";

type SlugComponentProps = {
	fieldToUse: string | string[]; // Accepts either a single field or multiple fields
	checkboxFieldPath: string;
} & TextFieldClientProps;

export const SlugComponent: React.FC<SlugComponentProps> = (props) => {
	const {
		field,
		fieldToUse,
		checkboxFieldPath: checkboxFieldPathFromProps,
		path,
		readOnly: readOnlyFromProps
	} = props;
	const { label } = field;

	const checkboxFieldPath = path?.includes(".")
		? `${path}.${checkboxFieldPathFromProps}`
		: checkboxFieldPathFromProps;

	const { value, setValue } = useField<string>({ path: path || field.name });

	const { dispatchFields } = useForm();

	// The value of the checkbox
	const checkboxValue = useFormFields(([fields]) => {
		return fields[checkboxFieldPath]?.value as string;
	});

	// The values of the fields we're listening to for the slug
	const targetFieldValues = useFormFields(([fields]) => {
		// Normalize `fieldToUse` to an array and fetch values
		const fieldKeys = Array.isArray(fieldToUse) ? fieldToUse : [fieldToUse];
		return fieldKeys.map((key) => fields[key]?.value || "");
	});

	useEffect(() => {
		if (checkboxValue) {
			const combinedValues = targetFieldValues.filter(Boolean).join(" "); // Combine non-empty values
			const formattedSlug = formatSlug(combinedValues);

			if (value !== formattedSlug) setValue(formattedSlug);
		} else {
			if (value !== "") setValue("");
		}
	}, [targetFieldValues, checkboxValue, setValue, value]);

	const handleLock = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();

			dispatchFields({
				type: "UPDATE",
				path: checkboxFieldPath,
				value: !checkboxValue
			});
		},
		[checkboxValue, checkboxFieldPath, dispatchFields]
	);

	const readOnly = readOnlyFromProps || checkboxValue;

	return (
		<div>
			<div className="mb-2 flex items-center justify-between">
				<FieldLabel htmlFor={`field-${path}`} label={label} />

				<Button className="p-0 pb-1" buttonStyle="none" onClick={handleLock}>
					{checkboxValue ? "Unlock" : "Lock"}
				</Button>
			</div>

			<TextInput
				value={value}
				onChange={setValue}
				path={path || field.name}
				readOnly={Boolean(readOnly)}
			/>
		</div>
	);
};

import React from "react";

import type { CheckboxFieldClient, DefaultCellComponentProps } from "payload";

import "./index.css";

const CheckboxCell: React.FC<DefaultCellComponentProps<CheckboxFieldClient>> = ({ cellData }) => {
	return (
		<span
			className={`bool-cell inline-block h-4 w-4 rounded-full ${cellData ? "bg-[var(--color-success-500)]" : "bg-[var(--color-error-500)]"}`}
			aria-label={cellData ? "True" : "False"}
		></span>
	);
};

export default CheckboxCell;

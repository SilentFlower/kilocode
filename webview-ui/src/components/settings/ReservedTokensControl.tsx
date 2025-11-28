import React, { useCallback } from "react"
import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { useAppTranslation } from "@/i18n/TranslationContext"

interface ReservedTokensControlProps {
	value: number | undefined
	onChange: (value: number | undefined) => void
}

export const ReservedTokensControl: React.FC<ReservedTokensControlProps> = ({ value, onChange }) => {
	const { t } = useAppTranslation()

	const handleInputChange = useCallback(
		(e: Event | React.ChangeEvent<HTMLInputElement>) => {
			const target = e.target as HTMLInputElement
			const inputValue = target.value.trim()

			if (inputValue === "") {
				onChange(undefined)
				return
			}

			const numValue = parseInt(inputValue, 10)
			if (!isNaN(numValue) && numValue > 0) {
				onChange(numValue)
			}
		},
		[onChange],
	)

	return (
		<div className="flex flex-col gap-1">
			<label className="block font-medium mb-1">{t("settings:providers.providerReservedTokens.label")}</label>
			<VSCodeTextField
				value={value?.toString() ?? ""}
				onInput={handleInputChange}
				placeholder={t("settings:providers.providerReservedTokens.placeholder")}
				className="w-full"
				type="number"
			/>
			<div className="text-sm text-vscode-descriptionForeground">
				{t("settings:providers.providerReservedTokens.description")}
			</div>
		</div>
	)
}

import React from "react"
import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { useAppTranslation } from "@/i18n/TranslationContext"

interface ReservedTokensControlProps {
	value: number | undefined
	onChange: (value: number | undefined) => void
}

export const ReservedTokensControl: React.FC<ReservedTokensControlProps> = ({ value, onChange }) => {
	const { t } = useAppTranslation()

	return (
		<div className="flex flex-col gap-1">
			<VSCodeTextField
				value={value?.toString() ?? ""}
				onInput={(e) => {
					const inputValue = (e.target as HTMLInputElement).value.trim()

					if (inputValue === "") {
						onChange(undefined)
						return
					}

					const numValue = parseInt(inputValue, 10)
					if (!isNaN(numValue) && numValue > 0) {
						onChange(numValue)
					}
				}}
				placeholder={t("settings:providers.providerReservedTokens.placeholder")}
				className="w-full">
				<label className="block font-medium mb-1">{t("settings:providers.providerReservedTokens.label")}</label>
			</VSCodeTextField>
			<div className="text-sm text-vscode-descriptionForeground">
				{t("settings:providers.providerReservedTokens.description")}
			</div>
		</div>
	)
}

import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function Toggle({
    optionL,
    optionR,
    initialValue = false,
    onChange = () => {},
    className,
}) {
    const [enabled, setEnabled] = useState(initialValue);

    return (
        <div className={"inline-block text-gray-200 space-x-2 " + className}>
            <span className={enabled ? "text-gray-700" : ""}>{optionL}</span>
            <Switch
                checked={enabled}
                onChange={(val) => {
                    setEnabled(val);
                    onChange(val);
                }}
                className={`${
                    enabled ? "bg-red-500" : "bg-red-200"
                } relative inline-flex items-center h-6 rounded-full w-11 
                transition-all`}
            >
                <span
                    className={`
                    transition-all
                    ${
                        enabled ? "translate-x-6" : "translate-x-1"
                    } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
            </Switch>

            <span className={!enabled ? "text-gray-700" : ""}>{optionR}</span>
        </div>
    );
}

import React, { useEffect, useState } from "react";
const LangContext = React.createContext({
    lang: {},
    setLang: () => {},
    en: "en",
    pt: "pt",
    units: {
        temp: { short: "ºC", long: "Celsius" },
        pressure: { short: "bar", long: "bar" },
    },
    metric: "metric",
    imperial: "imperial",
});

//UNIT OBJS
const metricUnitObj = {
    temp: "ºC",
    pressure: "mbar",
    humidity: "%",
};
const imperialUnitObj = {
    temp: "ºF",
    pressure: "psi",
    humidity: "%",
};

const en = "en";
const pt = "pt";

const ptLangObj = {
    current: pt,
    currentWeather: {
        placeholder: "- Selecione uma Localização -",
    },
    weather: {
        feels_like: "Sensação",
        temp_min: "Mínima",
        temp_max: "Máxima",
        humidity: "Humidade",
        pressure: "Pressão",
    },
    searchbar: {
        label: "Procure uma Localidade",
        placeholder: "Procurar...",
        loadingText: "A carregar...",
        noMatch: "Sem Resultados",
    },
    weekdays: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
    ],
};
const enLangObj = {
    current: en,
    weather: {
        feels_like: "Feels Like",
        temp_min: "Minimum",
        temp_max: "Maximum",
        humidity: "Humidity",
        pressure: "Pressure",
    },
    currentWeather: {
        placeholder: "- Select a Location -",
    },
    searchbar: {
        label: "Type in a Location",
        placeholder: "Search...",
        loadingText: "Loading...",
        noMatch: "No Results",
    },
    weekdays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ],
};

export const LangContextProvider = (props) => {
    //Lang Constants - Identifiers

    //Current Lang State
    const [lang, setLangObj] = useState(ptLangObj);

    /**
     * Changes the context's current language.
     * @param {String} lang_code Target language code.
     */
    const setLang = (lang_code) => {
        switch (lang_code) {
            case pt:
                setLangObj(ptLangObj);

                break;
            case en:
                setLangObj(enLangObj);

                break;
            default:
                setLangObj(enLangObj);
        }
    };

    //===================== UNITS
    //Unit Constants - Identifiers
    const metric = "metric";
    const imperial = "imperial";

    const [units, setUnitsObj] = useState(metricUnitObj);
    /**
     * Changes the context's current language.
     * @param {String} units_code Target language code.
     */
    const setUnits = (units_code) => {
        switch (units_code) {
            case metric:
                setUnitsObj(metricUnitObj);

                break;
            case imperial:
                setUnitsObj(imperialUnitObj);

                break;
            default:
                setLangObj(metricUnitObj);
        }
    };

    return (
        <LangContext.Provider
            value={{ lang, setLang, en, pt, units, setUnits, metric, imperial }}
        >
            {props.children}
        </LangContext.Provider>
    );
};

export default LangContext;

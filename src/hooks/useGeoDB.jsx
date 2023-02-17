import { useMemo, useState } from "react";
import { optionsParser } from "../components/Select";

const useGeoDB = (lang = "") => {
    //API Options

    const defaultLang = lang;

    const defaultOptions = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "e315d61bd5mshfdb9cd3a7c561cap1923d7jsn3e078153b6ca",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
    };
    //Base URL
    const baseURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/";

    //Base Fetch
    const baseFetch = async (endpoint, params = "") => {
        return fetch(baseURL + endpoint + params, defaultOptions)
            .then((response) => response.json())
            .then((response) => {
                // console.log(response);
                return response;
            })
            .catch((err) => console.error(err));
    };

    const cityToLabel = (cityData) => {
        const labelArr = [
            cityData.city,
            cityData.country,
            cityData.countryCode,
        ];
        const label = labelArr.join(", ");
        // console.log("label", label);
        return label;
    };

    const getCities = async (search = "", lang = defaultLang) => {
        console.log("City lang", lang);
        //params ? key=val&key=val
        let requestParams = "?";
        if (typeof search === "string") {
            requestParams +=
                "minPopulation=10000&languageCode=" +
                lang +
                "&namePrefix=" +
                search;
        }

        let data = await baseFetch("cities", requestParams);
        // console.log("RAW DATA", data);

        if (Object.hasOwn(data, "data")) {
            //filter only cities (other possible value -> ADM2)
            //dont know what that is...but when searching for Lisbon it returns a city and an "amd2"
            data = data.data.filter((el) => el.type === "CITY");
            // console.log("Filtered Data", data);
            //Parse data
            return optionsParser(data, cityToLabel);
        }

        //Response can contain data or an obejct with a message property!
        //TODO: That should be handled...but...here?
        return data;
    };

    return { getCities, cityToLabel };
};
export default useGeoDB;

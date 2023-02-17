import React, { useContext } from "react";
import LangContext from "../../store/LangContext";
import { Disclosure } from "@headlessui/react";

function getWeekdayFromISODate(dateString) {
    const date = new Date(dateString);
    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekdays[date.getDay()];
}

function ForecastDayCard({
    date,
    title,
    descp,
    icon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    pressure,
    ...props
}) {
    const { lang, units } = useContext(LangContext);
    return (
        <Disclosure>
            <Disclosure.Button className="flex flex-col space-y-3 w-full items-center justify-between bg-gray-700 text-gray-200 hover:text-gray-800 my-2 mx-auto p-3 px-8 rounded-lg md:min-w-[35rem] md:w-3/4 md:flex-row md:space-y-0  hover:bg-gray-200 transition ease-linear duration-300 ">
                <img src={"icons/" + icon + ".png"} alt="weather icon" />

                <h3 className="text-3xl font-bold ">
                    {lang.weekdays[date.getDay()]}
                </h3>

                <span className="text-xl font-bold">
                    <p>{temp + " " + units.temp}</p>
                    <p>
                        {lang.weather.feels_like +
                            " " +
                            feels_like +
                            " " +
                            units.temp}
                    </p>
                </span>
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col space-y-3 w-3/4 md:min-w-[30rem] md:w-3/4 items-center justify-between bg-gray-700 text-gray-200 hover:text-gray-800 mb-2 mx-auto p-3 px-8 rounded-lg  md:flex-row md:space-y-0  hover:bg-gray-200 transition ease-linear duration-300 ">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="capitalize">{descp}</p>

                <span className="text-md md:border-l-2 border-gray-200  md:pl-7">
                    <p>{lang.weather.temp_max + " " + temp_max + units.temp}</p>
                    <p>{lang.weather.temp_min + " " + temp_min + units.temp}</p>
                    <p>
                        {lang.weather.feels_like +
                            " " +
                            feels_like +
                            " " +
                            units.temp}
                    </p>
                </span>
            </Disclosure.Panel>
        </Disclosure>
    );
}
export default ForecastDayCard;

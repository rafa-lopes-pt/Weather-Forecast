import React, { useContext, useState } from "react";
import LangContext from "../../store/LangContext";
function CurrentWeather({
    cityLabel,
    title,
    descp,
    icon = "unknown",
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
        <div className="bg-gray-100 w-fit mx-auto my-2 px-10 py-2 rounded-lg space-y-4">
            <div className="flex flex-row items-center justify-between">
                <h3 className="text-2xl font-bold">
                    {cityLabel || lang.currentWeather.placeholder}
                </h3>
                <figure className="ml-5 flex flex-col place-items-center place-content-center ">
                    <img src={"/icons/" + icon + ".png"} alt="Weather Icon" />
                    <figcaption className="capitalize">{descp}</figcaption>
                </figure>
            </div>
            {temp && (
                <div className="flex items-center justify-between border-t-2 border-gray-800">
                    <h2 className="text-5xl font-bold">
                        {temp + " " + units.temp}
                    </h2>
                    <ul className="flex flex-col items-end content-center w-fit text-sm  mt-4 border-l-[1px] border-gray-500 pl-2">
                        <li>
                            {lang.weather.feels_like}:{" "}
                            {feels_like + " " + units.temp}
                        </li>
                        <li>
                            {lang.weather.temp_min}:{" "}
                            {temp_min + " " + units.temp}
                        </li>
                        <li>
                            {lang.weather.temp_max}:{" "}
                            {temp_max + " " + units.temp}
                        </li>
                        <li>
                            {lang.weather.humidity}:{" "}
                            {humidity + " " + units.humidity}
                        </li>
                        <li>
                            {lang.weather.pressure}:{" "}
                            {pressure + " " + units.pressure}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
export default CurrentWeather;

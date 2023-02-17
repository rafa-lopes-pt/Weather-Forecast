import { useContext, useEffect, useState } from "react";
import "./css/tailwind.css";
import Select from "./components/Select";
import CurrentWeather from "./components/Weather/CurrentWeather";
import useGeoDB from "./hooks/useGeoDB";
import useOpenWeather from "./hooks/useOpenWeather";
import ForecastDayCard from "./components/Weather/ForecastDayCard";
import LangContext from "./store/LangContext";
import Toggle from "./components/Toggle";

function App() {
    const { lang, setLang, en, pt } = useContext(LangContext);

    const { getCities } = useGeoDB(lang.current);
    const { getCurrentWeather, getForecast } = useOpenWeather(lang.current);
    //State
    const [city, setCity] = useState("");
    const [cityLabel, setCityLabel] = useState(undefined);
    const [currentWeather, setCurrentWeather] = useState({});
    const [forecast, setForecast] = useState(undefined);

    const onFetchHandler = async (cityData) => {
        const weather = await getCurrentWeather({
            lon: cityData.longitude,
            lat: cityData.latitude,
            lang: lang.current,
        });
        //Forecast
        const forecast = await getForecast({
            lon: cityData.longitude,
            lat: cityData.latitude,
            lang: lang.current,
        });
        // console.log("Forecast", forecast);

        setCurrentWeather(weather);
        setForecast(forecast);
    };

    const onSelectLocationHandler = async (params) => {
        // console.log("CITY DATA:", cityData);
        const { label, value: cityData } = params;
        setCity(cityData);
        setCityLabel(label);

        onFetchHandler(cityData);
    };

    useEffect(() => {
        city && onFetchHandler(city);
    }, [lang]);

    return (
        <div className="flex flex-col items-center bg-gray-900 w-full h-[100vh] overflow-auto p-5 pt-0 relative">
            {/* ================================ NAV */}
            <nav className="flex flex-col md:flex-row justify-between w-full px-4 text-center items-center text-gray-200 sticky top-0 bg-gray-900 z-10">
                <h1 className="text-3xl font-bold my-3">
                    {" "}
                    Weather Forecast -{" "}
                    <i class="fa-brands fa-free-code-camp"></i> FCC Project
                </h1>

                <span className="space-x-3">
                    <a
                        href="https://www.youtube.com/watch?v=Reny0cTTv24"
                        target="_blank"
                    >
                        <i class="fa-brands fa-youtube"></i> Original Project
                    </a>
                    <a href="https://github.com/rafa-lopes-pt" target="_blank">
                        <i class="fa-brands fa-github"></i> Github
                    </a>
                    <a
                        href="https://www.linkedin.com/in/rafa-lopes-098146234/"
                        target="_blank"
                    >
                        <i class="fa-brands fa-linkedin"></i> LinkedIn
                    </a>{" "}
                    <Toggle
                        optionL={"EN"}
                        optionR={"PT"}
                        initialValue={lang.current === pt ? 1 : 0}
                        onChange={(val) => {
                            setLang(val ? pt : en);
                        }}
                        className="my-5 md:my-0"
                    ></Toggle>
                </span>
            </nav>

            {/*================================= SEARCH BAR */}
            <label className="text-gray-200 text-3xl font-bold my-2 mt-10">
                {lang.searchbar.label}
            </label>
            <Select
                placeholder={lang.searchbar.placeholder}
                noMatch={lang.searchbar.noMatch}
                loadingText={lang.searchbar.loadingText}
                className={"w-full md:w-3/4"}
                fetchData={(param) => getCities(param, lang.current)}
                onChange={onSelectLocationHandler}
            ></Select>

            {/*=========================== WEATHER */}
            <CurrentWeather
                {...currentWeather}
                cityLabel={cityLabel}
            ></CurrentWeather>
            {forecast &&
                forecast.map((el, key) => {
                    return (
                        <ForecastDayCard {...el} key={key}></ForecastDayCard>
                    );
                })}
        </div>
    );
}

export default App;

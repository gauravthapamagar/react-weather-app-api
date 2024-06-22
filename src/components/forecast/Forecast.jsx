import React from "react";
import './Forecast.css';
import {
  Accordion,
  AccordionItemHeading,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const Forecast = ({ data }) => {
  const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const daysInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(daysInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, daysInAWeek)
  );
  if (!data || !data.list) {
    return <div>No data available</div>;
  }
  return (
    <>
      <label htmlFor="" className="title">
        Daily
      </label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    alt="weather"
                    className="icon-small"
                  />
                  <label className="day">{forecastDays[index]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel></AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;

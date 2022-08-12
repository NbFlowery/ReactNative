import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { format } from "date-fns";

export const MainCalendar = () => {

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const selected = {
    [selectedDate]: {
      selected: true,
    },
  };

  LocaleConfig.locales['kr'] = {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월'
    ],
    dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
    dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  };

  LocaleConfig.defaultLocale = 'kr';

  return (
      <Calendar
        markedDates={selected}
        theme={{
          arrowColor: "black",
          todayTextColor: "green",
          selectedDayBackgroundColor: "black",
          selectedDayTextColor: "white",
          textMonthFontSize: 40,
          textMonthFontWeight: "700",
          textDayHeaderFontSize: 16,
        }}
        monthFormat={"yyyy년 M월"}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
      />
  );
};

export default MainCalendar;

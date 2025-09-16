import { useState } from "react";

function CalendarWeek() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  // 현재 주의 시작(일요일)부터 토요일까지 구하기
  const getWeekDates = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay()); // 주 시작: 일요일
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);

  const prevWeek = () => {
    const prev = new Date(currentDate);
    prev.setDate(currentDate.getDate() - 7);
    setCurrentDate(prev);
  };

  const nextWeek = () => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + 7);
    setCurrentDate(next);
  };

  return (
    <div className="card">
        <div className="calendar-week">
          <div className="calendar-header">
            <cbutton onClick={prevWeek}>◀</cbutton>
            <h3>
              {weekDates[0].toLocaleDateString()} ~{" "}
              {weekDates[6].toLocaleDateString()}
            </h3>
            <cbutton onClick={nextWeek}>▶</cbutton>
          </div>

          <div className="calendar-grid">
            {["일","월","화","수","목","금","토"].map((d, i) => (
              <div key={i} className="calendar-day-header">{d}</div>
            ))}
            {weekDates.map((d, i) => (
              <div
                key={i}
                className={`calendar-day ${
                  d.toDateString() === today.toDateString() ? "today" : ""
                }`}
              >
                {d.getDate()}
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}

export default CalendarWeek;

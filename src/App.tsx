import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import "./App.css";

type Event = {
  id: string;
  date: string;
  start: string;
  end: string;
  hours: number;
  number: number;
  coach: string;
  level: string;
  comment: string;
  limit: number;
  price: number;
};

function EventTimeLine({
  sortedEvents,
  times,
  deleteEvent,
}: {
  sortedEvents: Event[];
  times: string[];
  deleteEvent: (id: string) => void;
}) {
  return (
    <div className="flex flex-col">
      {times.map((time) => {
        const eventAtThisTime = sortedEvents.find(
          (event) => event.start === time,
        );

        return (
          <div className="relative w-55 h-18" key={time}>
            {eventAtThisTime && (
              <div
                className="absolute top-0 left-0 z-10 w-55 border-t"
                style={{ height: `${eventAtThisTime.hours * 64}px` }}
              >
                <div className="flex justify-between bg-amber-200">
                  <p>No.{sortedEvents.indexOf(eventAtThisTime) + 1} </p>
                  <p>{eventAtThisTime.coach}</p>
                  <p>{eventAtThisTime.level}</p>
                </div>
                <p className="text-xs">☆{eventAtThisTime.hours}時間レッスン☆</p>
                <p>{eventAtThisTime.comment}</p>
                <p>
                  {eventAtThisTime.start} ~ {eventAtThisTime.end}
                </p>
                <p className="text-xs">定員 {eventAtThisTime.limit}名</p>
                <div className="flex gap-1 items-center">
                  {Array.from({ length: eventAtThisTime.limit }).map(
                    (_, index) => (
                      <div key={index} className="w-6 h-6 border rounded" />
                    ),
                  )}
                </div>
                <div className="relative border-b">
                  <p className="text-center">
                    1名: {eventAtThisTime.price}円（税込）
                  </p>
                  <button
                    className="no-print absolute right-0 top-0 bg-gray-200 items-end w-5"
                    onClick={() => deleteEvent(eventAtThisTime.id)}
                  >
                    x
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    const savedDate1 = localStorage.getItem("date1");
    const savedDate2 = localStorage.getItem("date2");

    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }

    if (savedDate1 && savedDate2) {
      setDate1(savedDate1);
      setDate2(savedDate2);
      setIsCreated(true);
    }

    setIsLoaded(true);
  }, []);

  const changeDates = () => {
    const oldDate1 = localStorage.getItem("date1");
    const oldDate2 = localStorage.getItem("date2");

    const updatedEvents = events.map((event) => {
      if (event.date === oldDate1) {
        return { ...event, date: date1 };
      }

      if (event.date === oldDate2) {
        return { ...event, date: date2 };
      }

      return event;
    });

    setEvents(updatedEvents);

    localStorage.setItem("date1", date1);
    localStorage.setItem("date2", date2);

    setIsCreated(true);
  };

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("events", JSON.stringify(events));
  }, [events, isLoaded]);

  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  const [event, setEvent] = useState<Event>({
    id: "",
    date: "",
    start: "",
    end: "",
    hours: 0,
    number: 0,
    coach: "名前",
    level: "クラス",
    comment: "ここにコメント",
    limit: 0,
    price: 0,
  });

  const date1Events = events.filter((event) => event.date === date1);
  const date2Events = events.filter((event) => event.date === date2);

  const sortedDate1Events = [...date1Events].sort((a, b) =>
    a.start.localeCompare(b.start),
  );

  const sortedDate2Events = [...date2Events].sort((a, b) =>
    a.start.localeCompare(b.start),
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const addEvent = () => {
    if (!times.includes(event.start)) {
      alert("無効な時間です。");
      return;
    }

    const newEvent = {
      ...event,
      id: crypto.randomUUID(),
      date: event.date || date1,
    };

    setEvents([...events, newEvent]);
    setEvent({
      id: "",
      date: "",
      start: "",
      end: "",
      hours: 0,
      number: 0,
      coach: "名前",
      level: "クラス",
      comment: "ここにコメント",
      limit: 0,
      price: 0,
    });
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  //first page
  if (!isCreated) {
    return (
      <div className="flex flex-col justify-center min-h-screen items-center">
        <h1>イベントカレンダーを作りましょう！</h1>
        <div>
          <h2>日付の選択</h2>
          <input
            type="date"
            name="date1"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
          />
          <input
            type="date"
            name="date2"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
          />
        </div>
        <button
          className="mt-6 w-full rounded-xl bg-gray-800 px-6 py-3 text-white font-medium shadow-sm transition hover:bg-gray-700 hover:shadow-md active:scale-95"
          onClick={changeDates}
        >
          Create
        </button>
      </div>
    );
  }

  if (date1 !== "" && date2 !== "") {
    return (
      <div>
        <div>
          <button
            className="no-print rounded p-2 fixed top-5 right-5 bg-gray-400 text-amber-50"
            onClick={() => window.print()}
          >
            PDF出力
          </button>
        </div>
        <div className="pb-3">
          <h1 className="mb-20">{date1.slice(5, 7)}月テニスイベント</h1>
        </div>
        <div className="no-print grid grid-cols-2 gap-4 m-8 bg-gray-50">
          <div className="flex items-center">
            <label className="w-50">Coach: </label>
            <input
              className="border rounded-4xl w-40"
              name="coach"
              value={event.coach}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-50">Level: </label>
            <select
              name="level"
              value={event.level}
              onChange={handleChange}
              className="border roundedn w-40"
            >
              <option value="">Choose level</option>
              <option value="初級">初級</option>
              <option value="中級">中級</option>
              <option value="上級">上級</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-50">Date: </label>
            <select
              value={event.date}
              onChange={(e) => {
                setEvent({ ...event, date: e.target.value });
              }}
              className="border rounded w-40"
            >
              <option value={date1}>{date1}</option>
              <option value={date2}>{date2}</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-50">Time: </label>
            <input
              className="border rounded-4xl w-20"
              type="time"
              name="start"
              value={event.start.slice(0, 5)}
              onChange={handleChange}
            />
            ~
            <input
              className="border rounded-4xl w-20"
              type="time"
              name="end"
              value={event.end.slice(0, 5)}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-50">Hours:</label>
            <input
              className="border rounded-4xl w-40"
              name="hours"
              value={event.hours}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-50">Comment: </label>
            <input
              className="border rounded-4xl"
              name="comment"
              value={event.comment}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-50">Limit(半角): </label>
            <input
              className="border rounded-4xl"
              name="limit"
              value={event.limit}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-50">Price: </label>
            <input
              className="border rounded-4xl"
              name="price"
              value={event.price}
              onChange={handleChange}
            />
          </div>
          <button
            className="col-span-2 flex items-center justify-center bg-gray-600 px-2 py-1 rounded text-white hover:bg-green-300"
            onClick={addEvent}
          >
            Add
          </button>
        </div>
        <div className="flex">
          <div className="w-150 center">
            <h2>
              {date1.slice(5, 7)}/{date1.slice(8, 10)}
            </h2>
          </div>
          <div className="w-150 center">
            <h2>
              {date2.slice(5, 7)}/{date2.slice(8, 10)}
            </h2>
          </div>
        </div>

        <div className="flex">
          {/*time*/}
          <div className="flex flex-col w-20 text-left ml-10">
            {times.map((time) => (
              <div className="h-18" key={time}>
                {time}
              </div>
            ))}
          </div>
          {/*event card structure*/}
          <div className="flex">
            <EventTimeLine
              sortedEvents={sortedDate1Events}
              times={times}
              deleteEvent={deleteEvent}
            />
            <div className="ml-45 flex flex-col w-20 text-left">
              {times.map((time) => (
                <div className="h-18" key={time}>
                  {time}
                </div>
              ))}
            </div>
            <EventTimeLine
              sortedEvents={sortedDate2Events}
              times={times}
              deleteEvent={deleteEvent}
            />
          </div>
        </div>
        <div>
          <button
            className="border no-print"
            onClick={() => setIsCreated(false)}
          >
            Change dates
          </button>
        </div>
        <button
          className="no-print"
          onClick={() => {
            const confirmed =
              window.confirm("すべてのイベントをリセットしますか？");

            if (!confirmed) return;

            localStorage.removeItem("date1");
            localStorage.removeItem("date2");
            localStorage.removeItem("events");
            window.location.reload();
          }}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default App;

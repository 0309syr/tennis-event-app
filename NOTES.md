const handleChange = (e: ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
setEvent({
...event,
[e.target.name]: e.target.value,
});
};
This event can come from either an input or a select

<input
className="border rounded-4xl"
name="coach"
value={events.coach}
onChange={(e) =>
setEvents({
...events,
coach: e.target.value,
})
}
/>

name = "Which piece of data is this?"
value = "What is its current value?"
onChange = "What should happen when the user changes it?"

e.target.value = what user typed in

make a function
const handleChange = (e) => {
setEvent({
...event,
[e.target.name]: e.target.value
})
}

e is short for event.
e is an object that React gives to your function when an event happens.

addEvent → the function itself
addEvent() → run the function
() => addEvent → a new function that doesn't run addEvent
() => addEvent() → a new function that runs addEvent

.map()
.map() is a JavaScript array method that lets you go through every item in an array and create something from each item.

events.map((event) => (

  <div>
    <p>{event.coach}</p>
    <p>{event.level}</p>
  </div>
))

this means for every event in the array, create this <div>.

const sortedEvents = [...events].sort((a, b) =>
a.start.localeCompare(b.start)
)

[...events] → makes a copy of your events array.

.sort() → rearranges that copy.

(a, b) → two events that sort() is comparing.

a.start and b.start → their start times.

.localeCompare() → compares the two time strings and puts them in order.

create ID to delete event
const addEvent = () => {
const newEvent = {
...event, // copy event
id: crypto.randomUUID(), add id
};

setEvents([...events, newEvent]); //...events copies all your existing events, then newEvent is added at the end.

setEvent({
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

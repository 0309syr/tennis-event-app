## Why I Built This

My brother was managing tennis events using Excel and found it time-consuming to create and update the timetable manually.

I built this application to make the process faster and easier while keeping the timetable familiar to the people who would use it.

I intentionally kept the layout and overall structure similar to the Excel timetable used by his company. This meant users could understand the new application without having to learn a completely different way of reading the schedule.

Instead of manually arranging events in Excel, users can enter the event information and have the timetable automatically organized in the browser.

### Design Approach

I considered how the timetable was already being used and kept important visual elements such as:

- Time displayed along the schedule
- Events positioned according to their start time
- Separate columns for different dates
- Event information displayed directly on the timetable


## Features

- Select two dates for the timetable
- Create tennis events with:
  - Date
  - Start and end time
  - Duration
  - Coach
  - Level
  - Comment
  - Capacity
  - Price

- Display events in a visual timetable
- Automatically sort events by start time
- Display events on the correct date
- Delete events
- Persist events using `localStorage`
- Keep selected dates after refreshing the page
- Update event dates when the timetable dates are changed
- Reset all saved events and dates

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Browser `localStorage`

## What I Learned

This project helped me practice building a more complete React application and managing multiple pieces of application state.

### React state management

I used `useState` to manage:

- Selected dates
- Tennis events
- Whether the timetable has been created
- Loading state for saved data

### Reusable components

The timetable uses a reusable `EventTimeLine` component to display events for each selected date.

This helped me practice passing data and functions between components through props instead of duplicating the same code.

### Data persistence

I used `localStorage` to save the application data in the browser.

The app loads saved events and dates when it starts and automatically saves changes when events are added, deleted, or updated.

### Working with arrays

I practiced common array operations such as:

- `map()` for updating events
- `filter()` for displaying events for a specific date
- `sort()` for ordering events by start time
- `find()` for locating events at a specific time

### Dynamic UI

The timetable is generated from the event data rather than being manually written for each event.

## Running Locally

Clone the repository and install the dependencies:

```bash
git clone https://github.com/0309syr/tennis-event-app.git
cd tennis-event-app
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

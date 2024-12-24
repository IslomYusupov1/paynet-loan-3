import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../assets/calendar.css';
import {useState} from "react";

interface Props {
    readonly setDate: (values: number) => void;
    readonly close: () => void;
}

const CustomCalendar = ({ setDate, close }: Props) => {
    const [selectedDate, setSelectedDate] = useState(new Date)
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const handleDateChange = (selectedDate: any) => {
        setSelectedDate(selectedDate)
    };

    const disableDates = ({ date, view }: any) => {
        if (view === 'month') {
            return date < startOfToday;
        }
        return false;
    };

    const closeAndSubmit = () => {
        const date = new Date(selectedDate);
        const day = date.getDate();
        setDate(day);
        close();
    }

    return (
        <div className="calendar-container">
            <h2>Дата погашения</h2>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                locale="ru-RU"
                minDetail="month"
                prev2Label={null}
                next2Label={null}
                minDate={startOfMonth}
                maxDate={endOfMonth}
                tileDisabled={disableDates}
            />
            <button className="continue-button" onClick={closeAndSubmit}>Продолжить</button>
        </div>
    );
};

export default CustomCalendar;
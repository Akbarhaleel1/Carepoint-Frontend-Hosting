
'use client';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

export default function ResponsiveTimePickers({onTimeChange}:any) {
  const [selectedTime, setSelectedTime] = React.useState<Dayjs | null>(dayjs());

  const handleTimeChange = (newValue: Dayjs | null) => {
    setSelectedTime(newValue);
    onTimeChange(newValue)
  };

  const formatTime = (time: Dayjs | null) => {
    return time ? time.format('HH:mm') : 'None';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <style jsx global>{`
        .MuiDialogActions-root {
          display: none !important;
        }
      `}</style>
      <DemoContainer
        components={[
          'TimePicker',
          'MobileTimePicker',
          'DesktopTimePicker',
          'StaticTimePicker',
        ]}
      >
        <DemoItem label="Static variant">
          <StaticTimePicker
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </DemoItem>
      </DemoContainer>

      <div className="text-black py-2 rounded-2xl mt-4 bg-blue-200">
        <div className='ml-[25%]'>
        Selected Time: {formatTime(selectedTime)}
        </div>
      </div>
    </LocalizationProvider>
  );
}
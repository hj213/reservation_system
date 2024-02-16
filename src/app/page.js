'use client'

import { useEffect, useState} from "react"; 
import { useDispatch, useSelector } from "react-redux";

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ko } from 'date-fns/locale';
import moment from 'moment';


import Image from 'next/image';
import Logo from '../image/logo.png';


function getWeekDays(weekStart) {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, 'days')
        .toDate()
    );
  }
  return days;
}

function getWeekRange(date) {
  return {
    from: moment(date)
      .startOf('week')
      .toDate(),
    to: moment(date)
      .endOf('week')
      .toDate(),
  };
}

export default function Home() {

  const dispatch = useDispatch();

  //selector
  const userInfo = useSelector(state => state.user.userInfo);
  const userClass = useSelector(state => state.user.class);
  const tutors = useSelector(state => state.tutors);

  

  //캘린더
  const today = new Date();
  const todayWeek = getWeekDays(getWeekRange(today).from);
  const [selectedWeek, setSelectedWeek] =useState(todayWeek);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const timeOfDayArray = [
    { 0: '자정 12시' },
    { 0.5: ' ' },
    { 1: '새벽 1시' },
    { 1.5: ' ' },
    { 2: '새벽 2시' },
    { 2.5: ' ' },
    { 3: '새벽 3시' },
    { 3.5: ' ' },
    { 5: '오전 5시' },
    { 5.5: ' ' },
    { 6: '오전 6시' },
    { 6.5: ' ' },
    { 7: '오전 7시' },
    { 7.5: ' ' },
    { 8: '오전 8시' },
    { 8.5: ' ' },
    { 9: '오전 9시' },
    { 9.5: ' ' },
    { 10: '오전 10시' },
    { 10.5: ' ' },
    { 11: '오전 11시' },
    { 11.5: ' ' },
    { 12: '오후 12시' },
    { 12.5: ' ' },
    { 13: '오후 1시' },
    { 13.5: ' ' },
    { 14: '오후 2시' },
    { 14.5: ' ' },
    { 19: '오후 7시' },
    { 19.5: ' ' },
    { 20: '오후 8시' },
    { 20.5: ' ' },
    { 21: '오후 9시' },
    { 21.5: ' ' },
    { 22: '오후 10시' },
    { 22.5: ' ' },
    { 23: '오후 11시' },
    { 23.5: ' ' },
  ];

  

  const handleDayChange = date => {
    setSelectedWeek(getWeekDays(getWeekRange(date).from));
  };

  const handleWeekClick = (weekNumber, days, e) => {
    setSelectedWeek(days);
  };

  const daysAreSelected = selectedWeek.length > 0;

  const modifiers = {
    selectedRange: daysAreSelected && {
      from: selectedWeek[0],
      to: selectedWeek[6],
    },
    selectedRangeStart: daysAreSelected && selectedWeek[0],
    selectedRangeEnd: daysAreSelected && selectedWeek[6],
  };
  const sunday3pmEvent = {
    date: '일',
    time: '7',
    event: 'Sunday',
  };

  const updatedScheduleData = [ sunday3pmEvent];



  // const [selected, setSelected] = useState();
  // console.log(selected);

  return (
      <div>
        {/* nav */}
        <div class="flex items-center gap-x-7 h-16 bg-slate-50 border-b border-slate-200">
          <button class="ml-7 text-xs text-violet-600 "> &lt; 나가기 </button>
          <div class="w-7"><Image src={Logo} alt='logo'></Image></div>
          <div class="font-bold text-slate-600"> 수업 예약 </div>
          <div class="text-sm text-slate-600"> STEP 1. 튜터 및 시간 선택 </div>
          <div class="flex-grow text-sm">
            <select class="w-96 h-10 px-4 rounded-md border border-slate-300">
              <option value="20"> 20분 1회 수업권 (0회 남음) </option>
              <option>40분 수업</option>
            </select>
          </div>

          <div class="text-sm mr-[-15px] text-slate-600">예약 신청한 수업</div>
          <div class="text-sm text-violet-600">{userClass ? userClass.length : 0}</div>
          <button class="w-32 h-10 mr-7 rounded-md bg-slate-200 text-sm text-slate-400">다음</button>
        </div>

        {/* body */}
        <div class="flex h-[calc(100vh-64px)]">
          <div class="flex w-3/4 border-r border-slate-200">
            <div class="w-1/4 mt-10 mr-6" className="Calendar">
              <DayPicker locale={ko} mode="single" 
                selectedWeek = {selectedWeek}  
                modifiers={modifiers}
                onDayClick={handleDayChange}
                onWeekClick={handleWeekClick} 
                showOutsideDays
              />
            </div>
            <div class="w-3/4 overflow-scroll">
              <div className="w-11/12 mx-auto">
                <table className="w-full border-collapse">
                  <thead className="z-10 sticky top-0 bg-white">
                    <tr className="h-10">
                      <th></th>
                      {daysOfWeek.map((day) => (
                        <th key={day} className={`text-xs font-normal ${(day === daysOfWeek[today.getDay()] ? 'text-violet-600':(day ==='일' | day ==='토' ? 'text-red-500' : '')) }`}>{day}</th>
                      ))}
                    </tr>
                    <tr>
                      <th className="h-14"></th>
                      {selectedWeek.map((day,index) => (
                          <th key={day} className={`text-xl font-semibold ${day.getDate() === today.getDate() ? 'text-violet-600': (index === 0  | index === 6 ? 'text-red-500' : '')
                        }`}>{day.getDate()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                  {timeOfDayArray.map((time) => (
                    <tr key={time}>
                      <td className="w-8 h-3 mt-[20px] text-xs text-center align-top ">{Object.values(time)[0]}</td>
                      {daysOfWeek.map((day,index) => (
                        <td key={index} className={`w-14 h-8 ${ day === '토'? 'border border-r-0': 'border' } ${ day === '일'? 'border border-l-0': 'border' } ` }>
                          <button onClick={()=>{console.log(day)}}>
                          { updatedScheduleData.find((item) => item.date === day && Object.keys(time)[0] === item.time)?.event} 
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="w-1/4">
            <div>
              {tutors.map((tutor, index) => (
                <div key={index}>{tutor.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

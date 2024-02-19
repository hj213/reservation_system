'use client'

import { useEffect, useState} from "react"; 
import { useDispatch, useSelector } from "react-redux";

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ko } from 'date-fns/locale';
import moment from 'moment';

import Image from 'next/image';
import Logo from '../image/logo.png';

import { regiClass,removeClass, useTicket, unUseTicket} from "@/features/userSlice";
import { tutorAddTime, tutorRegiClass,tutorRemoveClass, tutorRemoveTime } from "@/features/tutorSlice";


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

  const today = new Date();
  const todayWeek = getWeekDays(getWeekRange(today).from);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const timeOfDayArray = [
    { 0: '자정 12시' },
    { 0.5: '새벽 12시 30분' },
    { 1: '새벽 1시' },
    { 1.5: '새벽 1시 30분' },
    { 2: '새벽 2시' },
    { 2.5: '새벽 2시 30분' },
    { 3: '새벽 3시' },
    { 3.5: '새벽 3시 30분' },
    { 5: '오전 5시' },
    { 5.5: '오전 5시 30분' },
    { 6: '오전 6시' },
    { 6.5: '오전 6시 30분' },
    { 7: '오전 7시' },
    { 7.5: '오전 7시 30분' },
    { 8: '오전 8시' },
    { 8.5: '오전 8시 30분' },
    { 9: '오전 9시' },
    { 9.5: '오전 9시 30분' },
    { 10: '오전 10시' },
    { 10.5: '오전 10시 30분' },
    { 11: '오전 11시' },
    { 11.5: '오전 11시 30분' },
    { 12: '정오 12시' },
    { 12.5: '오후 12시 30분' },
    { 13: '오후 13시' },
    { 13.5: '오후 13시 30분' },
    { 14: '오후 14시' },
    { 14.5: '오후 14시 30분' },
    { 19: '오후 19시' },
    { 19.5: '오후 19시 30분' },
    { 20: '오후 20시' },
    { 20.5: '오후 20시 30분' },
    { 21: '오후 21시' },
    { 21.5: '오후 21시 30분' },
    { 22: '오후 22시' },
    { 22.5: '오후 22시 30분' },
    { 23: '오후 23시' },
    { 23.5: '오후 23시 30분' },
  ];

  //selector
  const userID = useSelector(state => state.user.userInfo.id);
  const userTickets = useSelector(state => state.user.tickets);
  const userClass = useSelector(state => state.user.class);
  const tutors = useSelector(state => state.tutors);

  //states
  const [selectedTicket, setSelectedTicket] = useState('20'); //유저가 선택한 수업권 종류
  const [selectedTime, setSelectedTime] = useState(''); //유저가 선택한 수업 시간 '24-2-20-9'
  const [selectedTutor, setSelectedTutor] = useState(0); //유저가 선택한 튜터 id
  const [available20, setAvailable20] = useState([]); //튜터 선택이 가능한 시간 배열
  const [available40, setAvailable40] = useState([]); 
  const [availableTutors, setAvailableTutors] = useState([]); //유저가 선택한 시간대에 수업이 가능한 튜터들
  const [cancel, setCancel] = useState(''); //예약 취소 정보 {duration:'',time:'', tutorID:''}
  const [selectedWeek, setSelectedWeek] = useState(todayWeek); // 캘린더
  const [formatTime, setFormatTime] = useState(''); //시간 formatting
  const [click, setClick] = useState(false); //튜터 선택 버튼 온클릭 여부 

  const daysAreSelected = selectedWeek.length > 0;


  //useEffect

  //모든 튜터들의 수업 가능 시간을 캘린더에 뿌려주기 위해 배열에 담는 과정
  useEffect(()=>{

    let newAvailable20 = [];
    let newAvailable40 = [];

    tutors.forEach((tutor) => {
      if (tutor.twenty && tutor.forty) {

        tutor.twenty.forEach((times) => {
           newAvailable20 = Array.from(new Set([...newAvailable20, times]));
        });

        tutor.forty.forEach((times)=>{
          newAvailable40 = Array.from(new Set([...newAvailable40, times]));
        })
      }
    });

    //available 배열에서 예약된 수업 시간 제거
    if(userClass.length > 0){
      
      userClass.map((item)=> {

        if(item.time.includes('.')){
          const regTime = item.time.replace(/(\.\d+)?$/, '');
          newAvailable40 = newAvailable40.filter(e => e!== regTime);
          newAvailable20 = newAvailable20.filter(e => e !== item.time);
        } else {
          newAvailable20 = newAvailable20.filter(e => e !== item.time);
          newAvailable40 = newAvailable40.filter(e => e !== item.time);
        }
      });
    }

    setAvailable20(newAvailable20);
    setAvailable40(newAvailable40);

  },[tutors]); 


  //유저가 선택한 시간에 수업이 가능한 튜터들을 담아주는 과정
  useEffect(()=>{

    let newAvailableTutors = [];

    if(selectedTime){
      //넘겨 받은 selectedTime을 '2월 18일(일) 오후 20시'와 같이 포맷팅
      const format = formatting(selectedTime);
      setFormatTime(format);

      //selectedTime에 수업이 가능한 튜터들을 필터링
      if(selectedTicket === '20')
        newAvailableTutors = tutors.filter((tutor)=> tutor.twenty.includes(selectedTime));
      else if(selectedTicket === '40')
        newAvailableTutors = tutors.filter((tutor)=> tutor.forty.includes(selectedTime));
      else
        newAvailableTutors = [];

      if (newAvailableTutors.length > 5) {
        newAvailableTutors = newAvailableTutors.slice(0, 5);
      }
    }

    setAvailableTutors(newAvailableTutors);

  },[selectedTime, selectedTicket]);

  //튜터 선택 시
  useEffect(()=>{

    if(selectedTutor > 0){

      dispatch(useTicket(selectedTicket));
      dispatch(regiClass([selectedTicket,selectedTime,selectedTutor]));
      dispatch(tutorRegiClass([selectedTicket,selectedTime,selectedTutor,userID]));
      dispatch(tutorRemoveTime([selectedTicket,selectedTime,selectedTutor]));

      setSelectedTutor(0);
      setSelectedTime('');
      setFormatTime('');
      setClick(false);

    } 
  },[selectedTutor]);

  //선택한 수업 클랙했을 때 취소하는 과정
  useEffect(()=>{
    if(cancel){
      console.log(cancel)
      const tutorIndex = tutors.findIndex(item => item.id === cancel.tutorID);
      const tutorName = tutors[tutorIndex].name;
      
      const format = formatting(cancel.time);
      
      const result = confirm(`${format}
${tutorName} 

이 수업을 삭제하겠습니까?`);

      if(result){
        dispatch(removeClass(cancel));
        dispatch(unUseTicket(cancel.duration));
        dispatch(tutorRemoveClass(cancel));
        dispatch(tutorAddTime(cancel));

        alert("수업이 삭제되었습니다.") 
        setSelectedTutor(0);
        setSelectedTime('');
        setFormatTime('');
        setClick(false);
      }
  
    }
    
  },[cancel]);


  //event handler

  //수강권 종류 선택
  const handleSelectTicket = (e) => {
    if(e.target.value === '20'){
      setSelectedTicket('20'); 
    } 
    else{
      setSelectedTicket('40'); 
    } 
    setSelectedTime('');
    setFormatTime('');
    setClick(false);
  };

  //수업 시간 선택
  const handleSelectTime = (e) => {

    if(e.target.value === selectedTime && click){
      setClick(false);
    }    
    else{
      setSelectedTime(e.target.value);
      setClick(true);
    }
  };

  //튜터 선택
  const handleTutor = (id) => {

    if(checkTicket() > 0 ){
      setSelectedTutor(id);
    } else {
      alert("❌ 수업권을 구매하세요.");
    }
  }

  //캘린더
  const handleDayChange = date => {
    setSelectedWeek(getWeekDays(getWeekRange(date).from));
  };

  const handleWeekClick = (days) => {
    setSelectedWeek(days);
  };

  const handletody = () => {
    setSelectedWeek(todayWeek);
  };

  const modifiers = {
    selectedRange: daysAreSelected && {
      from: selectedWeek[0],
      to: selectedWeek[6],
    },
    selectedRangeStart: daysAreSelected && selectedWeek[0],
    selectedRangeEnd: daysAreSelected && selectedWeek[6],
  };

  //예약 가능한 버튼을 띄우기 위해 조건 검사
  const checkAvailability = (item, time, index) => {
    const [year, month, date, hour] = item.split('-');
    const limit = new Date().setHours(today.getHours() + 2);
    const timeKey = Object.keys(time)[0];
    const dateOfTutor = new Date(2000 + Number(year), Number(month) - 1, Number(date), Number(hour));
  
    return dateOfTutor >= limit 
    && hour === timeKey 
    && Number(year) + 2000 === selectedWeek[index].getFullYear() 
    && Number(month) - 1 === selectedWeek[index].getMonth() 
    && dateOfTutor.getDate() === selectedWeek[index].getDate();
  };

  const checkReserved = (item, time, index) => {
    const [year, month, date, hour] = item.time.split('-');
    const timeKey = Object.keys(time)[0];
  
    return Number(year) + 2000 === selectedWeek[index].getFullYear() 
    && Number(month) - 1 === selectedWeek[index].getMonth() 
    && Number(date) === selectedWeek[index].getDate()
    && hour === timeKey;

  };

  //사용 가능한 티켓이 남았는지 확인
  const checkTicket = () => {
    const leftTicket = userTickets.filter(ticket => ticket.duration === selectedTicket && ticket.status === 'UNUSED').length;
    return leftTicket;
  }
  
  //포맷팅
  const formatting = (time) => {
    const [year, month, date, hour] = time.split('-');
    const day = new Date(Number(year)+2000, month - 1, date).getDay();
    const timeValue = timeOfDayArray.find((time) => Object.keys(time)[0] === hour);
    const format = month+"월 "+date+"일("+daysOfWeek[day]+") "+timeValue[hour];

    return format;
  }

  return (
      <div>
        {/* top */}
        <div className="flex items-center gap-x-7 h-16 bg-slate-50 border-b border-slate-200">
          <button className="ml-7 text-xs text-violet-600 "> &lt; 나가기 </button>
          <div className="w-7"><Image src={Logo} alt='logo'></Image></div>
          <div className="font-bold text-slate-600"> 수업 예약 </div>
          <div className="text-sm text-slate-600"> STEP 1. 튜터 및 시간 선택 </div>
          <div className="flex-grow text-sm">
            <select onChange={handleSelectTicket} className="w-96 h-10 px-4 rounded-md border border-slate-300">
              <option value="20"> 20분 수업권 </option>
              <option value="40"> 40분 수업권 </option>
            </select>
          </div>

          <div className="text-sm mr-[-15px] text-slate-600">예약 신청한 수업</div>
          <div className="text-sm text-violet-600">{userClass ? userClass.length : 0}</div>
          <button className="w-32 h-10 mr-7 rounded-md bg-slate-200 text-sm text-slate-400">다음</button>
        </div>

        {/* body */}
        <div className="flex h-[calc(100vh-64px)]">
          {/* left */}
          <div className="flex w-3/4 border-r border-slate-200">
            {/* calender */}
            <div className="Calendar w-1/4 mt-10 mr-6">
              <DayPicker locale={ko} mode="single" 
                selectedWeek = {selectedWeek}  
                modifiers={modifiers}
                onDayClick={handleDayChange}
                onWeekClick={handleWeekClick} 
                showOutsideDays
              />
            </div>
            {/* weekly */}
            <div className="w-3/4 overflow-scroll">
              <div className="w-11/12 mx-auto">
                <table className="w-full border-collapse">
                  <thead className="z-20 sticky top-0 bg-white">
                    <tr>
                      <th></th>
                        <th>
                          <button onClick={handletody} className="w-2/4 mt-4 py-1 text-xs font-normal text-violet-600 rounded-full border border-violet-600">오늘</button>
                        </th>
                        <th></th><th></th><th></th><th></th><th></th><th></th>
                      </tr>
                    
                    <tr>
                      <th></th>
                      {selectedWeek.map((day) => (
                        <th key={day} 
                          className={`pt-4 text-xs font-normal 
                          ${(day.getMonth() === today.getMonth() && day.getDate() === today.getDate() && day.getDay() === today.getDay() ? 'text-violet-600':(day.getDay() ===0 | day.getDay() ===6 ? 'text-red-500' : '')) }`
                        }>{daysOfWeek[day.getDay()]}</th>
                      ))}
                    </tr>
                    <tr>
                      <th></th>
                      {selectedWeek.map((day,index) => (
                          <th key={day} className={`h-12 text-xl font-semibold ${day.getDate() === today.getDate() ? 'text-violet-600': (index === 0  | index === 6 ? 'text-red-500' : '')
                        }`}>{day.getDate()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                  {timeOfDayArray.map((time, index) => (
                    <tr key={index}>
                      <td className="w-8 h-3 mt-[20px] text-xs text-center align-top ">{Object.keys(time)[0] % 1 !== 0 ? '' : Object.values(time)[0]}</td>
                      {daysOfWeek.map((day,dIndex) => (
                        <td key={dIndex} className={`w-14 h-8 ${ day === '토'? 'border border-r-0': 'border' } ${ day === '일'? 'border border-l-0': 'border' } ` }>
                         {
                            selectedTicket === '20' && available20 && available20.length > 0 ? (
                              available20.map((item, index) => (
                                checkAvailability(item, time, dIndex) ? (
                                  <button onClick={handleSelectTime} key={index} value={item} className={`w-full h-6 mt-[-4px] align-top text-xs text-gray-500 rounded-md border border-violet-600 bg-white hover:bg-violet-400 hover:text-white hover:border-violet-400 active:bg-violet-600 active:text-white ${click && item === selectedTime ? 'ring-violet-300 drop-shadow-md ring' : ''}`}>
                                    👤 튜터 선택
                                  </button>
                                ) : null
                              ))
                            ) : null
                          }
                          {
                            selectedTicket === '40' && available40 && available40.length > 0 ? (
                              available40.map((item, index) => (
                                checkAvailability(item, time, dIndex)? (
                                  <div className="relative h-full">
                                    <button onClick={handleSelectTime} key={index} value={item} className={`w-full h-14 absolute text-xs text-gray-500 rounded-md border border-violet-600 bg-white  hover:bg-violet-400 hover:text-white hover:border-violet-400 active:bg-violet-600 active:text-white ${click && item === selectedTime ? 'ring-violet-300 drop-shadow-md ring' : ''}`}>
                                      👤 튜터 선택
                                    </button>
                                  </div>
                                ) : null
                              ))
                            ) : null
                          }
                          {
                            userClass.length > 0 ? (
                              userClass.map((item, index)=>(
                                checkReserved(item, time, dIndex) ? (
                                  item.duration === '20' ? (
                                    <button key={index} value={item.time} onClick={()=>setCancel(item)} className="w-full h-6 mt-[-4px] align-top text-xs text-white rounded-md border border-violet-600 bg-violet-600 focus:bg-violet-600 focus:text-white active:bg-violet-700 active:text-white hover:outline-none hover:ring hover:ring-violet-300">
                                      ▫️ 선택 완료
                                    </button>
                                  ) : (
                                    <div className="relative h-full">
                                      <button key={index} value={item.time} onClick={()=>setCancel(item)} className="w-full h-14 absolute text-xs text-white rounded-md border border-violet-600 bg-violet-600  focus:bg-violet-600 focus:text-white active:bg-violet-700 active:text-white hover:outline-none hover:ring hover:ring-violet-300">
                                      ▫️ 선택 완료
                                      </button>
                                    </div>
                                  )
                                ) : null
                              ))) : null
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="w-1/4">
            {
              availableTutors.length > 0 && click ? (
                <div>
                  <div className="flex h-14 pl-3 items-center text-base font-normal border-b">
                    {formatTime}
                  </div>
                  <div>
                    <div className="flex h-12 pl-3 mt-4 items-center text-base font-normal"> 
                      튜터 직접 선택 
                    </div>
                    <div className="flex h-14 pl-3 mt-4 items-center text-sm font-normal text-violet-600 bg-slate-100 border-b border-violet-600"> 
                      <div>예약 가능 </div>
                      <div className="pl-1">({availableTutors.length})</div>
                    </div >
                    <div className="overflow-scroll">
                      <div className="flex h-16 pl-3 items-center text-xs font-normal text-slate-400 border-b">
                        선택한 시간에 수업 가능한 튜터들입니다.
                      </div>
                      
                      {availableTutors.map((tutor,index) => (
                        <button key={index} value={tutor.id} onClick={()=>{handleTutor(tutor.id);}} className="flex flex-col space-y-2 w-full h-44 pl-5 border-b hover:bg-slate-50">
                          <div className="mt-3 text-lg font-semibold">{tutor.name}</div>
                          <div className="text-sm font-normal text-slate-600">{tutor.info.school}</div>
                          <div className="text-xs font-normal text-slate-400">{tutor.info.major}</div>
                          <div className="text-sm font-normal text-slate-400"> 
                            수락률 
                            <span className="text-sm font-normal text-black">{tutor.info.response}%</span>
                          </div>
                          {selectedTicket === '20'? 
                          (<span className="w-fit px-2 text-sm font-medium text-sky-500 bg-sky-50 rounded-md">
                            20분 수업: {tutor.twenty.length}
                            </span>
                          ): 
                          (<span className="w-fit px-2 text-sm font-medium text-sky-500 bg-sky-50 rounded-md">
                            40분 수업: {tutor.forty.length}
                          </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div> 
                </div>
              ) : (
                <div className="flex h-full pl-3 justify-center items-center text-sm font-normal text-slate-400">
                  수업 시간을 선택하세요.
                </div>
              )
            }
            
          </div>
        </div>
      </div>
  );
}

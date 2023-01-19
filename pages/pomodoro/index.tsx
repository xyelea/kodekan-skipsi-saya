/* eslint-disable */
import { NextPage } from "next";
import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";

import Navigation from "../../components/pomodoro/Navigation";
import Timer from "../../components/pomodoro/Timer";
import About from "../../components/pomodoro/About";
import Alarm from "../../components/pomodoro/Alarm";
import ModalSetting from "../../components/pomodoro/ModalSetting";
/* eslint-disable no-restricted-globals */
enum TimerStage {
  Pomodoro = 0,
  ShortBreak = 1,
  LongBreak = 2,
}

interface Props {
  openSetting: boolean;
  setOpenSetting: Dispatch<SetStateAction<boolean>>;
  //props lain yang digunakan pada komponen
}

const Home: NextPage = () => {
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(10);
  const [seconds, setSecond] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [consumedSecond, setConsumedSecond] = useState(0);
  const [stage, setStage] = useState<TimerStage>(TimerStage.Pomodoro);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const alarmRef = useRef<HTMLAudioElement>();
  const pomodoroRef = useRef<HTMLInputElement>(null);
  const shortBreakRef = useRef<HTMLInputElement>(null);
  const longBreakRef = useRef<HTMLInputElement>(null);

  const updateTimeDefaultValue = (value: number) => {
    if (pomodoroRef.current) {
      setPomodoro(parseInt(pomodoroRef.current.value));
    }
    if (shortBreakRef.current) {
      setShortBreak(parseInt(shortBreakRef.current.value));
    }
    if (longBreakRef.current) {
      setLongBreak(parseInt(longBreakRef.current.value));
    }
    setOpenSetting(false);
    setSecond(0);
  };

  const switchStage = (index: TimerStage) => {
    const isYes =
      consumedSecond && stage !== index ? confirm("anda yakin ?") : false;
    if (isYes) {
      reset();
      setStage(index);
    } else if (!consumedSecond) {
      setStage(index);
    }
  };

  const updateMinute = () => {
    const updateStage = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    };

    return updateStage[stage];
  };

  const reset = () => {
    setConsumedSecond(0);
    setTicking(false);
    setSecond(0);
    updateTimeDefaultValue(0);
  };

  const timeUp = () => {
    reset();
    setIsTimeUp(true);
    alarmRef.current?.play();
  };
  const clockTicking = () => {
    const minutes = getTickingTime();
    const setMinutes = updateMinute();

    if (minutes === 0 && seconds === 0) {
      timeUp();
    } else if (seconds === 0) {
      setMinutes((minute) => minute - 1);
      setSecond(59);
    } else {
      setSecond((second) => second - 1);
    }
  };

  const getTickingTime = () => {
    const timeStage = {
      [TimerStage.Pomodoro]: pomodoro,
      [TimerStage.ShortBreak]: shortBreak,
      [TimerStage.LongBreak]: longBreak,
    };
    return timeStage[stage];
  };

  const muteAlarm = (): void => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  };

  const startTimer = (): void => {
    setIsTimeUp(false);
    muteAlarm();
    setTicking((ticking) => !ticking);
  };

  useEffect(() => {
    window.onbeforeunload = () => {
      return consumedSecond ? "show warning" : null;
    };

    const timer = setInterval(() => {
      if (ticking) {
        setConsumedSecond((value) => value + 1);
        clockTicking();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, pomodoro, shortBreak, longBreak, ticking]);

  return (
    <div className="bg-gray-900 min-h-screen font-inter">
      <div className="max-w-2xl min-h-screen mx-auto">
        <Navigation setOpenSetting={setOpenSetting} />
        <Timer
          stage={stage}
          switchStage={switchStage}
          getTickingTime={getTickingTime}
          seconds={seconds}
          ticking={ticking}
          startTimer={startTimer}
          muteAlarm={muteAlarm}
          isTimeUp={isTimeUp}
          reset={reset}
        />
        <About />
        <Alarm ref={alarmRef} />
        <ModalSetting
          openSetting={openSetting}
          setOpenSetting={setOpenSetting}
          pomodoroRef={pomodoroRef}
          shortBreakRef={shortBreakRef}
          longBreakRef={longBreakRef}
          updateTimeDefaultValue={updateTimeDefaultValue}
        />
      </div>
    </div>
  );
};

export default Home;

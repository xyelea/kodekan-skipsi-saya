import React, { memo } from "react";
/* eslint-disable */
const Alarm = React.forwardRef((_, ref) => {
  return (
    <audio ref={ref}>
      {/* <source src="/alarm.mp3" type="audio/mp3" /> */}
      <source src="/wibu-v-2.mp3" type="audio/mp3" />
      Browsermu lawas bre ga support elemen audio.
    </audio>
  );
});

export default memo(Alarm);

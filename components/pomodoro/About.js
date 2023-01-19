import React, { memo } from "react";
/* eslint-disable */
function About() {
  return (
    <div className="w-11/12 mx-auto mt-36 text-white p-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-medium">
          <span className="border-b-4 border-red-400">Apa</span> pengertian
          teknik pomodoro ?
        </h1>
        <p className="mt-5 tracking-wide opacity-70 text-lg text-justify">
          Teknik Pomodoro adalah metode manajemen waktu yang dikembangkan oleh
          Francesco Cirillo pada akhir tahun 1980-an.
        </p>
      </div>
      <div className="mt-5">
        <h1 className="text-xl sm:text-2xl font-medium">
          <span className="border-b-4 border-red-400">Bagaimana</span>cara
          melakukan teknik pomodoro?
        </h1>
        <p className="mt-5 tracking-wide opacity-70 text-lg text-justify">
          Teknik ini menggunakan timer untuk membagi pekerjaan menjadi beberapa
          interval waktu. Secara umum, teknik Pomodoro menggunakan pembagian
          waktu 25 menit untuk bekerja (atau "sesi pomodoro"), diikuti oleh
          waktu istirahat selama 5 menit. Setelah 4 sesi pomodoro
          berturut-turut, waktu istirahat yang lebih panjang akan diambil selama
          15-30 menit.
        </p>
      </div>
    </div>
  );
}

export default memo(About);

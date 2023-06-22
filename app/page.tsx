'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

type Prayer = {
  day: string
  times: {
    fajr: string
    sunrise: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
  }
} | null

export default function Home() {

  const [prayers, setPrayers] = useState({
    fajr: '',
    sunrise: '',
    dhuhr: '',
    asr: '',
    maghrib: '',
    isha: '',
  })
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {


    const today = new Date()
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

    window.navigator.geolocation.getCurrentPosition(position => {
      setLocation(position.coords)
    })

    axios.get(`https://www.moonsighting.com/time_json.php?year=${today.getFullYear()}&tz=${timezone}&lat=${location.latitude}&lon=${location.longitude}&method=0&both=false&time=0`)
      .then(prayerResponse => {
        const todayString = `${today.toLocaleString('default', { month: 'short', day: '2-digit' })} ${today.toLocaleDateString('default', { weekday: 'short' })}`

        const prayersToday = prayerResponse.data.times.find((prayer: Prayer) => prayer?.day === todayString)

        setPrayers(prayersToday.times)

        if (prayers.fajr !== '') {
          setLoading(false)
        }

      })
      .catch(error => { console.log(error) })

  }, [setPrayers, setLocation, location.latitude, location.longitude, prayers.fajr])

  if (loading) {
    return <>
      <main className={styles.main}>
        <h1 className={styles.heading}>Moonsight</h1>
        <p className={styles.loading}>Loading...</p>
      </main>
    </>
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Moonsight</h1>
      <ul className={styles.prayers}>
        <li>
          <p>Fajr</p><p>{prayers.fajr}</p>
        </li>
        <li>
          <p>Sunrise</p><p>{prayers.sunrise}</p>
        </li>
        <li>
          <p>Dhuhr</p><p>{prayers.dhuhr}</p>
        </li>
        <li>
          <p>Asr</p><p>{prayers.asr}</p>
        </li>
        <li>
          <p>Maghrib</p><p>{prayers.maghrib}</p>
        </li>
        <li>
          <p>Isha</p><p>{prayers.isha}</p>
        </li>
      </ul>
    </main>
  )
}

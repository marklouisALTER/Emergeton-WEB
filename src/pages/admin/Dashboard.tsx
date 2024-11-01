import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { MdLocalPolice } from "react-icons/md";
import { MdFireTruck } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import L from 'leaflet';
import { useLocation, useNavigate } from 'react-router-dom';
import { Authentication } from '@/Authentication/Authenticate';
import { useAlertStore } from '@/store/Alerts/useStoreAlerts';
import AlertCard from '@/components/Cards/AlertCard';

const customIcon = L.divIcon({
  className: 'custom-marker',
  html: "<div style='background-color: red; width: 25px; height: 25px; border-radius: 50%; border: 2px solid white;'></div>",
  iconSize: [10, 10],
  popupAnchor: [0, -15],
});

const Dashboard:React.FC = () => {

  
const { getUser, getID, getToken, isAuthenticated } = Authentication();
const user = getUser();
const  token = getToken()
const userID = getID()
const navigate = useNavigate();
const location = useLocation();
const { fetchAlert, alertData } = useAlertStore();

useEffect(() => {
  if(!isAuthenticated()){
      navigate('/', { state: { message: "You must login first", from: location.pathname } })
  }      
  
  fetchAlert(token)
  
},[user, token, userID])

// alertData.map((data) => {
//   console.log(data.latitude)
// })

  return (

    <section className='p-5 md:pl-5'>
      <h1 className='font-primary text-black/80 text-xl font-semibold'>Admin Dashboard</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen gap-5 py-5'>  
        <div className='py-5'>
          <div className='mb-5'>
            <h3 className='font-secondary text-black/80 font-medium'>Emergency Map</h3>
            <p className='font-secondary text-gray-400 text-xs'>It will show here all the emergency in the vicinity</p>  
          </div>
          <MapContainer center={[14.653740, 120.960177]} zoom={15} style={{ height: '50vh', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              alertData.map((data) => {
                return (
                  <Marker position={[data.latitude, data.longitude]} icon={customIcon}>
                    <Popup>
                      <div>
                        <h3 className='font-secondary text-black/80 font-medium'>Emergency</h3>
                        <p className='font-secondary text-gray-400 text-xs'>Name: <span className='text-black/70'>{data.message}</span></p>
                        <p className='font-secondary text-gray-400 text-xs'>Location: <span className='text-black/70'>City of malabon university</span></p>
                        <p className='font-secondary text-gray-400 text-xs'>Remarks: <span className='text-black/70'>Send help</span></p>
                      </div>
                    </Popup>
                  </Marker>
               )
              })
            } 
          </MapContainer>
         
        </div>
        <div className='w-full h-full'>
          <h3 className='font-secondary text-black/80 font-medium'>Unit Available</h3>
          <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='rounded-md w-full bg-primary mt-5 p-5 relative'>
              <div className='w-full flex items-end justify-end mt-5'> 
                <span className='font-primary text-2xl font-extrabold text-white text-right'>20</span>
              </div>
              <div className='absolute top-[-1rem] flex items-center justify-center left-2 w-10 h-10 bg-blue-600 rounded-md'>
                  <MdLocalPolice className='text-white text-xl'/>
              </div>
              <div className='absolute top-[-0.4rem] flex items-center justify-center right-2 px-3 py-1 bg-blue-700 rounded-md'>
                <p className='text-white text-[11px]'>Police</p>
              </div>
            </div>
            <div className='rounded-md w-full bg-red-600/80 mt-5 p-5 relative'>
              <div className='w-full flex items-end justify-end mt-5'> 
                <span className='font-primary text-2xl font-extrabold text-white text-right'>5</span>
              </div>
              <div className='absolute top-[-1rem] flex items-center justify-center left-2 w-10 h-10 bg-red-600 rounded-md'>
                  <MdFireTruck className='text-white text-xl'/>
              </div>
              <div className='absolute top-[-0.4rem] flex items-center justify-center right-2 px-3 py-1 bg-red-700 rounded-md'>
                <p className='text-white text-[11px]'>Fire Truck</p>
              </div>
            </div>
            <div className='rounded-md w-full bg-green-600/80 mt-5 p-5 relative'>
              <div className='w-full flex items-end justify-end mt-5'> 
                <span className='font-primary text-2xl font-extrabold text-white text-right'>5</span>
              </div>
              <div className='absolute top-[-1rem] flex items-center justify-center left-2 w-10 h-10 bg-green-600 rounded-md'>
                  <MdHealthAndSafety className='text-white text-xl'/>
              </div>
              <div className='absolute top-[-0.4rem] flex items-center justify-center right-2 px-3 py-1 bg-green-700 rounded-md'>
                <p className='text-white text-[11px]'>Health care</p>
              </div>
            </div>
          </div>
          <h2 className='font-secondary text-white bg-primary font-medium mt-5 p-4'>Recent Emergency</h2>
            <div className='flex flex-col gap-5 h-96 overflow-y-auto'>
              {
                alertData.map((data, index) => (
                  <AlertCard key={index} {...data} />
                ))
              }
            </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
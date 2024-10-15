import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const Dashboard:React.FC = () => {
  return (
    <section className='p-5 md:pl-5'>
      <h1 className='font-primary text-black/80 text-xl font-semibold'>Admin Dashboard</h1>
      <div className='grid grid-cols-2 h-screen gap-5 py-5'>  
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
            <Marker position={[14.653740, 120.960177]}>
              <Popup>
                Kulang 20 sa pag dedesign. <br /> dagdag ka pag gusto mo maganda.
              </Popup>
            </Marker>
          </MapContainer>
          <div className='mt-5'>
            <div className='relative w-full rounded-md bg-white shadow-md p-3'>
              <h3 className='font-secondary text-red-500 font-medium animate-pulse'>Emergency</h3>
              <p className='font-secondary text-gray-400 text-xs mt-2'>Name: <span className='text-black/70'>Markme Dev</span></p>
              {/* <p className='font-secondary text-gray-400 text-xs'>Location: <span className='text-black/70'>City of malabon university</span></p>
              <p className='font-secondary text-gray-400 text-xs'>Remarks: <span className='text-black/70'>Send help</span></p> */}
              <div className='mt-2 w-full flex justify-end'>
                <button className='bg-green-500 text-white text-xs px-3 p-1 rounded-sm'>
                  Deploy
                </button>
              </div>
              <div className='absolute top-5 right-3'>
                <p className='font-secondary text-black/80 text-xs'>2 mins ago</p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full rounded-md p-5 shadow-md h-full border-2 border-gray-300'>
          <h3 className='font-secondary text-black/80 font-medium'>Unit Available</h3>
          <div className='mt-5 grid grid-cols-3 gap-5'>
            <div className='rounded-md w-full h-[5rem] bg-primary'>
            </div>
            <div className='rounded-md w-full h-[5rem] bg-primary'>
            </div>
            <div className='rounded-md w-full h-[5rem] bg-primary'>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
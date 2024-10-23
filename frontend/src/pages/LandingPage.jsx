import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    registerNumber: '',
    carModel: '',
    carModelEquipmentPackage: '',
    carYear: '',
    gear: 'automatic',
    milages: '',
    carsBody: '',
    carsWindscreen: 'good',
    summerWheels: 'good',
    winterWheels: 'good',
    maintenanceRecord: 'perfect',
    maintenanceHistory: '',
    timingBelt: '',
    additionalInformation: '',
    priceEstimation: '',
    picture: null
  })

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? e.target.files[0] : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Here you would typically send the data to your backend
    // navigate('/thank-you')
  }

  return (
    <div className="min-h-screen bg-[#b4a7d6] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-6">DRIVALIA</h1>
        <p className="text-white text-center mb-6">PLANET MOBILITY</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />

          <h2 className="text-lg font-semibold mt-6">Car's Information</h2>
          <input
            type="text"
            name="registerNumber"
            placeholder="Register number"
            value={formData.registerNumber}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <input
            type="text"
            name="carModel"
            placeholder="Model of the car"
            value={formData.carModel}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <input
            type="text"
            name="carModelEquipmentPackage"
            placeholder="Equipment package (optional)"
            value={formData.carModelEquipmentPackage}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
          />
          <input
            type="text"
            name="carYear"
            placeholder="Year model of the car"
            value={formData.carYear}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <div>
            <p className="mb-2">Gear</p>
            <div className="flex space-x-4">
              {['Automatic', 'Manual'].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gear"
                    value={option.toLowerCase()}
                    checked={formData.gear === option.toLowerCase()}
                    onChange={handleChange}
                    className="form-radio text-black"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>
          <input
            type="text"
            name="milages"
            placeholder="Mileage"
            value={formData.milages}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />

          <h2 className="text-lg font-semibold mt-6">Condition</h2>
          <input
            type="text"
            name="carsBody"
            placeholder="Car's body"
            value={formData.carsBody}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <div>
            <p className="mb-2">Windscreen</p>
            <div className="flex flex-col space-y-2">
              {['Good', 'Decent', 'Bad'].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="carsWindscreen"
                    value={option.toLowerCase()}
                    checked={formData.carsWindscreen === option.toLowerCase()}
                    onChange={handleChange}
                    className="form-radio text-black"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2">Summer Wheels</p>
            <div className="flex flex-col space-y-2">
              {['Good', 'Decent', 'Bad'].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="summerWheels"
                    value={option.toLowerCase()}
                    checked={formData.summerWheels === option.toLowerCase()}
                    onChange={handleChange}
                    className="form-radio text-black"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2">Winter Wheels</p>
            <div className="flex flex-col space-y-2">
              {['Good', 'Decent', 'Bad'].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="winterWheels"
                    value={option.toLowerCase()}
                    checked={formData.winterWheels === option.toLowerCase()}
                    onChange={handleChange}
                    className="form-radio text-black"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <h2 className="text-lg font-semibold mt-6">Maintenance</h2>
          <div>
            <p className="mb-2">Maintenance record</p>
            <div className="flex flex-col space-y-2">
              {['Perfect', 'Partly', 'Unknown'].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="maintenanceRecord"
                    value={option.toLowerCase()}
                    checked={formData.maintenanceRecord === option.toLowerCase()}
                    onChange={handleChange}
                    className="form-radio text-black"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>
          <input
            type="text"
            name="maintenanceHistory"
            placeholder="When & where was the last maintenance?"
            value={formData.maintenanceHistory}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <input
            type="text"
            name="timingBelt"
            placeholder="If there is a timing belt, when was it changed?"
            value={formData.timingBelt}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />

          <h2 className="text-lg font-semibold mt-6">Additional Information</h2>
          <textarea
            name="additionalInformation"
            placeholder="Additional information"
            value={formData.additionalInformation}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            rows="3"
          />

          <h2 className="text-lg font-semibold mt-6">Price Estimation</h2>
          <input
            type="text"
            name="priceEstimation"
            placeholder="Price estimation"
            value={formData.priceEstimation}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />

          <h2 className="text-lg font-semibold mt-6">Upload Picture</h2>
          <input
            type="file"
            name="picture"
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default LandingPage
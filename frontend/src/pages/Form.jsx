import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import drivaliaLogo from "../assets/drivalia-white-logo.svg";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    registerNumber: "",
    carModel: "",
    carModelEquipmentPackage: "",
    carYear: "",
    gear: "automatic",
    milages: "",
    carsBody: "",
    carsWindscreen: "good",
    summerWheels: "good",
    winterWheels: "good",
    maintenanceRecord: "perfect",
    maintenanceHistory: "",
    timingBelt: "",
    additionalInformation: "",
    priceEstimation: "",
    picture: [], // Handle multiple files
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const files = Array.from(e.target.files);

      const currentFiles = [...formData.picture];

      if (currentFiles.length + files.length > 3) {
        alert("You can only upload a maximum of 3 images.");
        return;
      }

      const filePreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...filePreviews]); // Accumulate previews
      setFormData((prevState) => ({
        ...prevState,
        [name]: [...prevState[name], ...files], // Accumulate file objects
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation to limit images to 3 max
    if (formData.picture.length > 3) {
      alert("You can only upload a maximum of 3 images.");
      return;
    }
    console.log(formData);
    // TODO: Here you would typically send the data to your backend
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen bg-[#b4a7d6] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <img
          src={drivaliaLogo}
          alt="Drivalia Logo"
          className="mx-auto mb-4 py-4"
        />
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
            placeholder="Model"
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
            placeholder="Year model"
            value={formData.carYear}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <input
            type="text"
            name="milages"
            placeholder="Mileage"
            value={formData.milages}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <div>
            <p className="mb-2">Gear</p>
            <div className="flex space-x-4">
              {["Automatic", "Manual"].map((option) => (
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

          <h2 className="text-lg font-semibold mt-6 pt-6">Condition</h2>
          <p>Car's Body</p>
          <textarea
            type="text"
            name="carsBody"
            placeholder="Example: The vehicle is in great condition with minimal rust."
            value={formData.carsBody}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <div>
            <p className="mb-2">Windscreen</p>
            <div className="flex flex-col space-y-2">
              {["Good", "Decent", "Bad"].map((option) => (
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
              {["Good", "Decent", "Bad"].map((option) => (
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
              {["Good", "Decent", "Bad"].map((option) => (
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

          <h2 className="text-lg font-semibold mt-6 pt-6">Maintenance</h2>
          <div>
            <p className="mb-2">Maintenance record</p>
            <div className="flex flex-col space-y-2">
              {["Perfect", "Partly", "Unknown"].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="maintenanceRecord"
                    value={option.toLowerCase()}
                    checked={
                      formData.maintenanceRecord === option.toLowerCase()
                    }
                    onChange={handleChange}
                    className="form-radio text-black"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          </div>
          <p>When & where was the last maintenance?</p>
          <textarea
            type="text"
            name="maintenanceHistory"
            placeholder="Example: 13.4.2024 at Drivalia"
            value={formData.maintenanceHistory}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
            required
          />
          <p>If there is a timing belt, when was it changed?</p>
          <textarea
            type="text"
            name="timingBelt"
            placeholder="Example: Chain belt / Timing belt was changed at 60 000km last year."
            value={formData.timingBelt}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
          />
          <h2 className="text-lg font-semibold mt-6 pt-6">
            Additional Information
          </h2>
          <textarea
            type="text"
            name="additionalInformation"
            placeholder="Anything else you'd like to mention?"
            value={formData.additionalInformation}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
          />

          <h2 className="text-lg font-semibold mt-6 pt-6">
            Price Estimation (Optional)
          </h2>
          <textarea
            type="text"
            name="priceEstimation"
            placeholder="If you have a price estimation, add it here"
            value={formData.priceEstimation}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
          />

          <h2 className="text-lg font-semibold mt-6 pt-6">Pictures</h2>
          <p>You can upload a maximum of 3 pictures of the car</p>
          <input
            type="file"
            name="picture"
            onChange={handleChange}
            accept="image/*"
            multiple
            className="mt-4"
          />

          {/* Image Preview Section */}
          {imagePreviews.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Image Previews</h3>
              <div className="flex flex-wrap mt-2">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`preview-${index}`}
                    className="h-32 w-32 object-cover m-2 border border-gray-300 rounded"
                  />
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#7861b7] hover:bg-[#5e479a] text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;

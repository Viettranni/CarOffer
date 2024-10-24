import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
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

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

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

  const handleDeleteImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    const updatedFiles = formData.picture.filter((_, i) => i !== index);

    setImagePreviews(updatedPreviews);
    setFormData((prevState) => ({
      ...prevState,
      picture: updatedFiles, // Update file objects
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation to limit images to 3 max
    if (formData.picture.length > 3) {
      alert("You can only upload a maximum of 3 images.");
      return;
    }

    // Create a FormData object to handle the file uploads
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file) => formDataToSend.append(key, file));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      // Send the form data to your backend
      await axios.post(`${baseUrl}/carOffer/submitForm`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
        },
      });

      // Handle successful form submission
      alert("Form submitted successfully!");
      navigate('/thank-you');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form");
    }
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
              {["Good(+6mm)", "Decent(4mm-6mm)", "Bad(-4mm)", "No Summer Tires"].map((option) => (
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
              {["Good(+6mm)", "Decent(4mm-6mm)", "Bad(-4mm)", "No Winter Tires"].map((option) => (
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
            <p className="mb-2">Maintenance Record</p>
            <div className="flex flex-col space-y-2">
              {["Perfect", "Good", "Decent", "Bad"].map((option) => (
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
          <p>When & where was the last maintenance?</p>
          <textarea
            type="text"
            name="maintenanceHistory"
            placeholder="Example: 13.04.2024 at Drivalia"
            value={formData.maintenanceHistory}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
          />
          <h2 className="text-lg font-semibold mt-6">Timing Belt</h2>
          <input
            type="text"
            name="timingBelt"
            placeholder="When was the timing belt changed?"
            value={formData.timingBelt}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
          />
          <h2 className="text-lg font-semibold mt-6">Additional Information</h2>
          <textarea
            type="text"
            name="additionalInformation"
            placeholder="Additional information about the vehicle"
            value={formData.additionalInformation}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
          />
          <h2 className="text-lg font-semibold mt-6">Price Estimation</h2>
          <input
            type="text"
            name="priceEstimation"
            placeholder="Estimated price"
            value={formData.priceEstimation}
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
          />

          <h2 className="text-lg font-semibold mt-6">Car Images</h2>
          <input
            type="file"
            name="picture"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="w-full p-2 bg-gray-100 rounded"
          />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;

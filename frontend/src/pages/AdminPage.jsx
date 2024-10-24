import React, { useState, useEffect } from "react";
import axios from "axios";

import jari_picture from "../assets/jari_koivisto_bg_rm.png";
import drivalia_logo from "../assets/drivalia-white-logo.svg";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [receiverEmails, setReceiverEmails] = useState("");
  const [forms, setForms] = useState([]);
  const [sentForms, setSentForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchForms();
    fetchReceiverEmails();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(`${baseUrl}/carOffer/forms`);
      setForms(response.data.filter((form) => !form.sent));
      setSentForms(response.data.filter((form) => form.sent));
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const fetchReceiverEmails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/user/getEmails`
      );
      setReceiverEmails(response.data.emails.join(", "));
    } catch (error) {
      console.error("Error fetching receiver emails:", error);
    }
  };

  const saveReceiverEmails = async () => {
    try {
      // Split the string by commas, trim whitespace, and join them back into a single string
      const emailString = receiverEmails
        .split(",")
        .map((email) => email.trim())
        .join(", ");
  
      await axios.put(`${baseUrl}/user/updateEmails`, {
        emails: emailString, // Send emails as a string
      });
  
      alert("Receiver emails saved successfully");
    } catch (error) {
      console.error("Error saving receiver emails:", error);
      alert("Failed to save receiver emails");
    }
  };
  

  const handleFormClick = (form) => {
    setSelectedForm(form);
    setIsEditing(false);
  };

  const handleEditForm = () => {
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSelectedForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSaveForm = async () => {
    try {
      await axios.put(`${baseUrl}/forms/${selectedForm._id}`, selectedForm);
      setIsEditing(false);
      fetchForms();
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save form");
    }
  };

  const handleSendForm = async () => {
    try {
      await axios.post(`${baseUrl}/send-form/${selectedForm._id}`);
      alert("Form sent successfully");
      fetchForms();
    } catch (error) {
      console.error("Error sending form:", error);
      alert("Failed to send form");
    }
  };

  const handleDeleteForm = async () => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        await axios.delete(`${baseUrl}forms/${selectedForm._id}`);
        setSelectedForm(null);
        fetchForms();
      } catch (error) {
        console.error("Error deleting form:", error);
        alert("Failed to delete form");
      }
    }
  };

  return (
    <div className="min-h-screen bg-purple-300 p-8">
      <div className="flex items-center justify-center space-x-4 mb-4">
        <img
          src={jari_picture}
          alt="JARI"
          className="w-32 h-32 rounded-full object-cover"
        />
        <img
          src={drivalia_logo}
          alt="Drivalia Logo"
          className="w-32 h-32 object-contain"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex mb-6">
          <button
            className={`mr-4 px-4 py-2 rounded ${
              activeTab === "dashboard"
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "email receivers"
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("email receivers")}
          >
            Email Receivers
          </button>
        </div>

        {activeTab === "dashboard" && (
          <div className="flex">
            <div className="w-1/3 pr-4">
              <h2 className="text-2xl font-semibold mb-4">Unhandled Forms</h2>
              <div className="space-y-2">
                {forms.map((form) => (
                  <div
                    key={form._id}
                    className={`p-2 rounded cursor-pointer ${
                      selectedForm?._id === form._id
                        ? "bg-purple-100"
                        : "bg-gray-100"
                    }`}
                    onClick={() => handleFormClick(form)}
                  >
                    {form.fullName} - {form.registerNumber}
                  </div>
                ))}
              </div>
              <h2 className="text-2xl font-semibold my-4">Sent Forms</h2>
              <div className="space-y-2">
                {sentForms.map((form) => (
                  <div
                    key={form._id}
                    className={`p-2 rounded cursor-pointer bg-green-100 ${
                      selectedForm?._id === form._id ? "bg-green-200" : ""
                    }`}
                    onClick={() => handleFormClick(form)}
                  >
                    {form.fullName} - {form.registerNumber}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-2/3 pl-4">
              {selectedForm && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Form Details</h2>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <ul className="space-y-2">
                      {Object.entries(selectedForm).map(([key, value]) => {
                        if (
                          key === "_id" ||
                          key === "sent" ||
                          key === "__v"
                        )
                          return null; // Exclude __v field

                        const label = key
                          .replace(/([A-Z])/g, " $1") // Add space before capital letters
                          .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
                          .trim(); // Trim any excess whitespace

                        return (
                          <li
                            key={key}
                            className="flex justify-between border-b border-gray-200 pb-2 items-center"
                          >
                            <span className="font-medium text-gray-700 w-1/3">
                              {label}:
                            </span>
                            {!isEditing ? (
                              <span className="text-gray-800 w-2/3">
                                {value}
                              </span>
                            ) : (
                              <input
                                className="text-gray-800 w-2/3 border border-gray-300 rounded px-2 py-1"
                                name={key}
                                value={value}
                                onChange={handleFormChange}
                              />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-4 flex justify-between">
                      {!isEditing ? (
                        <button
                          onClick={handleEditForm}
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          onClick={handleSaveForm}
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Save
                        </button>
                      )}
                      {!selectedForm.sent && (
                        <button
                          onClick={handleSendForm}
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Send to Partners
                        </button>
                      )}
                      <button
                        onClick={handleDeleteForm}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "email receivers" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Email Receiver Settings
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <label className="block font-medium text-gray-700 mb-2">
                Receiver Emails (comma-separated):
                <p className="text-xs">Example: viet.tran@drivalia.com, ironman@drivalia.com, spiderman@drivalia.com </p>
              </label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700"
                value={receiverEmails}
                onChange={(e) => setReceiverEmails(e.target.value)}
              />
              <button
                onClick={saveReceiverEmails}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Receiver Emails
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

// controllers/userController.js
const User = require("../models/User");

// Fetch receiver emails
exports.getReceiverEmails = async (req, res) => {
  try {
    const user = await User.findOne(); // The application should have only one credentials atm
    res.json({ emails: user ? user.emails : [] });
  } catch (error) {
    res.status(500).json({ error: "Error fetching receiver emails" });
  }
};

// Save receiver emails
exports.saveReceiverEmails = async (req, res) => {
    const { emails } = req.body; // Expecting a single string of emails
  
    console.log("Received emails:", emails); // Log received emails for debugging
  
    try {
      let user = await User.findOne();
      if (!user) {
        // If no user exists, create a new one
        user = new User({ emails });
      } else {
        // Update the existing user's emails
        user.emails = emails; // Directly set the emails string
      }
  
      await user.save(); // Save the user (either new or updated)
      res.json({ message: "Receiver emails saved successfully" }); // Success response
    } catch (error) {
      console.error("Error saving receiver emails:", error); // Log the error details
      res.status(500).json({ error: "Error saving receiver emails", details: error.message }); // Return error response
    }
  };
  

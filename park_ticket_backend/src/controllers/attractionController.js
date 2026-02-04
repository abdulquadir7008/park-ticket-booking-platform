/**
 * Attraction Controller
 * Handles attraction-related requests
 */

// Dubai Frame attraction data
const attractionData = {
  id: 'dubai-frame-001',
  name: 'Your Ultimate Destination for Thrills, Smiles & Celebration in Dubai',
  description: 'The Dubai Frame is an iconic landmark offering breathtaking 360-degree views of Old and New Dubai. Standing 150 meters tall, this architectural marvel bridges the past and future of the city.',
  location: 'Zabeel Park, Gate 4, Dubai, UAE',
  timings: '9:00 AM - 9:00 PM',
  ticketPrice: 50, // AED per person
  currency: 'AED',
  phone:'+971 4 123 4567',
  email:"info@dubai-frame.com",
  features: [
    '150-meter high observation deck',
    'Sky Bridge with glass floor',
    'Museum showcasing Dubai\'s history',
    'Vortex Tunnel experience',
    'Photo opportunities with panoramic views'
  ],
  rules: [
    'Children under 3 years enter free',
    'Camera and mobile phones allowed',
    'Outside food not permitted',
    'Wheelchair accessible'
  ],
  availableTimeSlots: [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM'
  ],
  images: [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800'
  ]
};

/**
 * Get attraction details
 */
const getAttraction = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: attractionData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching attraction details',
      error: error.message
    });
  }
};

module.exports = {
  getAttraction
};
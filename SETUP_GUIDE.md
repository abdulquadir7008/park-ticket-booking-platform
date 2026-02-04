# Setup Guide - Park Ticket Entry Application

## Quick Start (Development)

### Prerequisites
- Node.js v16+ ([Download](https://nodejs.org/))
- npm v7+ (comes with Node.js)
- Git

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd park-ticket-app
```

### Step 2: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend API will be running on **http://localhost:5000**

**Expected output:**
```
╔═══════════════════════════════════════════════╗
║  Park Ticket API Server                       ║
║  Running on http://localhost:5000             ║
║  Environment: development                     ║
╚═══════════════════════════════════════════════╝

Connected to SQLite database
Bookings table ready
```

### Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open automatically at **http://localhost:3000**

---

## Project Structure Explained

```
park-ticket-app/
│
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   │   └── database.js
│   │   ├── controllers/       # Business logic
│   │   │   ├── attractionController.js
│   │   │   └── bookingController.js
│   │   ├── middleware/        # Custom middleware
│   │   │   └── errorHandler.js
│   │   ├── models/            # Database models
│   │   │   └── Booking.js
│   │   ├── routes/            # API routes
│   │   │   └── api.js
│   │   └── server.js          # Main server file
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── Dockerfile
│
├── frontend/                   # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Button.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── QRDisplay.js
│   │   │   ├── TicketCard.js
│   │   │   └── TimeSlot.js
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useApi.js
│   │   │   ├── useBooking.js
│   │   │   └── useForm.js
│   │   ├── pages/             # Page components
│   │   │   ├── Home.js
│   │   │   ├── Booking.js
│   │   │   ├── Confirmation.js
│   │   │   └── Admin.js
│   │   ├── services/          # API services
│   │   │   └── api.js
│   │   ├── styles/            # CSS files
│   │   │   ├── App.css
│   │   │   ├── Home.css
│   │   │   ├── Booking.css
│   │   │   └── ...
│   │   ├── utils/             # Utility functions
│   │   │   └── helpers.js
│   │   ├── App.js             # Main App component
│   │   └── index.js           # Entry point
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml          # Docker configuration
├── API_DOCUMENTATION.md        # API docs
├── README.md                   # Project overview
└── .gitignore
```

---

## Docker Setup (Optional)

If you prefer using Docker:

### Prerequisites
- Docker Desktop ([Download](https://www.docker.com/products/docker-desktop))

### Run with Docker Compose
```bash
docker-compose up --build
```

This will:
- Build both frontend and backend images
- Start containers
- Set up networking between services

Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## Testing the Application

### 1. Test Attraction Details
```bash
curl http://localhost:5000/api/attraction
```

### 2. Create a Test Booking
```bash
curl -X POST http://localhost:5000/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-12-25",
    "timeSlot": "10:00 AM",
    "tickets": 2,
    "name": "Test User",
    "email": "test@example.com"
  }'
```

Save the `id` from the response.

### 3. Retrieve Booking
```bash
curl http://localhost:5000/api/booking/<BOOKING_ID>
```

### 4. Validate QR Code (Admin)
```bash
curl -X POST http://localhost:5000/api/validate \
  -H "Content-Type: application/json" \
  -d '{"qrCode": "<BOOKING_ID>"}'
```

---

## User Flow Testing

### Customer Flow:
1. Go to http://localhost:3000
2. Click "Book Tickets Now"
3. Select date and time slot
4. Enter number of tickets
5. Fill in personal details
6. Click "Proceed to Payment"
7. Click "Confirm Payment"
8. View booking confirmation with QR code
9. Download QR code

### Admin Flow:
1. Go to http://localhost:3000/admin
2. Enter the booking ID (or scan QR)
3. Click "Validate Ticket"
4. View validation result
5. Mark as used if valid

---

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Troubleshooting

### Backend not starting?
- Check if port 5000 is already in use
- Verify Node.js is installed: `node --version`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Frontend not loading?
- Check if port 3000 is already in use
- Clear npm cache: `npm cache clean --force`
- Delete `.cache` and `node_modules`, then reinstall

### Database errors?
- The database file (`database.db`) is created automatically
- To reset: delete `backend/database.db` and restart the server

### CORS errors?
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`

---

## Development Scripts

### Backend
```bash
npm start       # Start server
npm run dev     # Start with nodemon (auto-reload)
```

### Frontend
```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

---

## Production Build

### Backend
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The build folder will contain optimized production files.

---

## Need Help?

- Check the [API Documentation](./API_DOCUMENTATION.md)
- Review the [README](./README.md)
- Open an issue in the repository

---

## Next Steps

1. ✅ Set up the project
2. ✅ Test all endpoints
3. ✅ Complete a full booking flow
4. ✅ Test admin validation
5. 🚀 Deploy to production (optional)

Enjoy building with the Park Ticket Entry Application! 🎫
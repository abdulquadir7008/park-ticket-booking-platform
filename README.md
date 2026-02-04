# Park Ticket Entry Application

A full-stack web application for managing park attraction ticket bookings with QR code generation and validation.

frontend/   (park_ticket_app)
backend/    (park_ticket_backend)

## Features

- View attraction details (Dubai Frame)
- Select visit date and time slots
- Purchase tickets with automatic price calculation
- Generate QR-based entry passes
- Admin interface for QR code validation
- Responsive design for all devices

## 🛠 Tech Stack

### Frontend
- **React + Vite** - UI library with modern hooks
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **QRCode.react** - QR code generation
- **date-fns** - Date manipulation
- **CSS3** - Styling with responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Lightweight database
- **UUID** - Unique ID generation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
park-ticket-app/
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS files
│   └── package.json
├── backend/               # Express API
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Database models
│   │   ├── middleware/   # Custom middleware
│   │   └── config/       # Configuration
│   ├── database.db       # SQLite database
│   └── package.json
└── README.md
```

## Setup Instructions

### Custom Hooks
- `useBooking` - Manages booking state and operations
- `useForm` - Form validation and state management
- `useApi` - API call handling with loading states

### Reusable Components
- `DatePicker` - Custom date selection
- `TimeSlot` - Time slot selection grid
- `QRDisplay` - QR code display with download
- `TicketCard` - Booking information display
- `LoadingSpinner` - Loading state indicator

### Modern React Patterns
- Functional components with hooks
- Custom hooks for logic reuse
- Component composition
- Props validation
- Error boundaries

## Assumptions

1. **Payment**: Simulated with a confirmation button (no real payment gateway)
2. **Authentication**: Basic admin validation (JWT can be added as bonus)
3. **Time Slots**: Pre-defined slots (9 AM - 5 PM)
4. **Ticket Types**: Single type with variable quantity
5. **Database**: SQLite for simplicity (can be replaced with PostgreSQL/MongoDB)
6. **QR Code**: Contains booking ID for validation
7. **Expiry**: Bookings expire after the selected date

## Bonus Features Implemented

- ✅ Responsive UI with animations
- ✅ Form validation
- ✅ Error handling with user feedback
- ✅ Loading states
- ✅ QR code download functionality
- ✅ Admin dashboard for validation

## Docker Setup (Optional)

```bash
# Build and run with Docker Compose
docker-compose up --build
```
## 🧪 Testing

### Manual Testing
1. Book a ticket from the home page
2. Note the booking ID
3. Go to admin page and validate the QR code
# API Documentation

Base URL: `http://localhost:5000/api`

## Endpoints

### 1. Get Attraction Details

Get information about Dubai Frame attraction.

**Endpoint:** `GET /attraction`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "dubai-frame-001",
    "name": "Dubai Frame",
    "description": "The Dubai Frame is an iconic landmark...",
    "location": "Zabeel Park, Gate 4, Dubai, UAE",
    "timings": "9:00 AM - 9:00 PM",
    "ticketPrice": 50,
    "currency": "AED",
    "features": [...],
    "rules": [...],
    "availableTimeSlots": [...]
  }
}
```

---

### 2. Create Booking

Create a new ticket booking.

**Endpoint:** `POST /book`

**Request Body:**
```json
{
  "date": "2024-03-20",
  "timeSlot": "10:00 AM",
  "tickets": 2,
  "name": "Abdul Quadir",
  "email": "abquadir@gmail.com"
}
```

**Validation Rules:**
- `date`: Required, must be today or future date (YYYY-MM-DD format)
- `timeSlot`: Required, must be valid time slot
- `tickets`: Required, must be between 1-10
- `name`: Required, minimum 2 characters
- `email`: Required, valid email format

**Success Response (201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": "uuid-here",
    "date": "2024-03-20",
    "timeSlot": "10:00 AM",
    "tickets": 2,
    "name": "John Doe",
    "email": "john@example.com",
    "totalPrice": 100,
    "qrCode": "uuid-here",
    "status": "active"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "All fields are required"
}
```

---

### 3. Get Booking Details

Retrieve booking information by ID.

**Endpoint:** `GET /booking/:id`

**Parameters:**
- `id` (path): Booking ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "date": "2024-03-20",
    "timeSlot": "10:00 AM",
    "tickets": 2,
    "name": "John Doe",
    "email": "john@example.com",
    "totalPrice": 100,
    "qrCode": "uuid-here",
    "status": "active",
    "createdAt": "2024-03-15T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Booking not found"
}
```

---

### 4. Validate QR Code

Validate a QR code for entry (Admin endpoint).

**Endpoint:** `POST /validate`

**Request Body:**
```json
{
  "qrCode": "uuid-here"
}
```

**Valid Ticket Response (200):**
```json
{
  "success": true,
  "valid": true,
  "message": "Valid ticket",
  "booking": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "date": "2024-03-20",
    "timeSlot": "10:00 AM",
    "tickets": 2,
    "totalPrice": 100,
    "status": "active"
  }
}
```

**Invalid Ticket Response (200):**
```json
{
  "success": true,
  "valid": false,
  "message": "Ticket has expired",
  "booking": {
    "id": "uuid-here",
    "name": "John Doe",
    "date": "2024-03-15",
    "timeSlot": "10:00 AM",
    "tickets": 2,
    "status": "expired"
  }
}
```

**Not Found Response (404):**
```json
{
  "success": false,
  "valid": false,
  "message": "Invalid QR code - Booking not found"
}
```

---

### 5. Mark Ticket as Used

Mark a validated ticket as used (Admin endpoint).

**Endpoint:** `POST /mark-used`

**Request Body:**
```json
{
  "qrCode": "uuid-here"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Ticket marked as used"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Booking not found"
}
```

---

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

## Testing with cURL

### Get Attraction
```bash
curl http://localhost:5000/api/attraction
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-03-20",
    "timeSlot": "10:00 AM",
    "tickets": 2,
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### Get Booking
```bash
curl http://localhost:5000/api/booking/YOUR_BOOKING_ID
```

### Validate QR Code
```bash
curl -X POST http://localhost:5000/api/validate \
  -H "Content-Type: application/json" \
  -d '{"qrCode": "YOUR_QR_CODE"}'
```
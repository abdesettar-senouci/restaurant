# Restaurant API Documentation

## Base URL
```
http://localhost:5500/api/v1
```

## Content Type
All requests should include:
```
Content-Type: application/json
```

---

## 📋 Tables API

### Create Table
**POST** `/tables`

Creates a new table with QR code generation.

**Request Body:**
```json
{
  "tableNumber": 1,
  "capacity": 4,
  "location": "indoor"
}
```

**Response:**
```json
{
  "message": "Table created successfully",
  "table": {
    "_id": "...",
    "tableNumber": 1,
    "capacity": 4,
    "location": "indoor",
    "isOccupied": false,
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "createdAt": "2025-10-04T...",
    "updatedAt": "2025-10-04T..."
  }
}
```

### Get All Tables
**GET** `/tables`

**Query Parameters:**
- `location` (optional): `indoor`, `outdoor`, `terrace`, `private`
- `isOccupied` (optional): `true`, `false`

**Response:**
```json
{
  "tables": [
    {
      "_id": "...",
      "tableNumber": 1,
      "capacity": 4,
      "location": "indoor",
      "isOccupied": false,
      "qrCode": "...",
      "currentOrder": null
    }
  ]
}
```

### Get Table by Number
**GET** `/tables/:tableNumber`

**Response:**
```json
{
  "table": {
    "_id": "...",
    "tableNumber": 1,
    "capacity": 4,
    "location": "indoor",
    "isOccupied": false,
    "qrCode": "...",
    "currentOrder": {
      "_id": "...",
      "totalAmount": 45.99,
      "status": "active"
    }
  }
}
```

### Update Table
**PUT** `/tables/:tableNumber`

**Request Body:**
```json
{
  "capacity": 6,
  "location": "outdoor"
}
```

### Delete Table
**DELETE** `/tables/:tableNumber`

---

## 📅 Reservations API

### Create Reservation
**POST** `/reservations`

**Request Body:**
```json
{
  "tableNumber": 5,
  "customerName": "John Doe",
  "customerPhone": "+1234567890",
  "customerEmail": "john@email.com",
  "partySize": 4,
  "reservationDate": "2025-10-05",
  "reservationTime": "19:30",
  "notes": "Birthday celebration"
}
```

**Response:**
```json
{
  "message": "Reservation created successfully",
  "reservation": {
    "_id": "...",
    "tableNumber": 5,
    "customerName": "John Doe",
    "customerPhone": "+1234567890",
    "customerEmail": "john@email.com",
    "partySize": 4,
    "reservationDate": "2025-10-05T00:00:00.000Z",
    "reservationTime": "19:30",
    "status": "pending",
    "notes": "Birthday celebration",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Get All Reservations
**GET** `/reservations`

**Query Parameters:**
- `date` (optional): `YYYY-MM-DD`
- `status` (optional): `pending`, `confirmed`, `seated`, `completed`, `cancelled`
- `tableNumber` (optional): number

**Response:**
```json
{
  "reservations": [
    {
      "_id": "...",
      "tableNumber": 5,
      "customerName": "John Doe",
      "status": "pending",
      "reservationDate": "2025-10-05T00:00:00.000Z",
      "reservationTime": "19:30"
    }
  ]
}
```

### Get Reservation by ID
**GET** `/reservations/:id`

### Get Available Tables
**GET** `/reservations/available-tables/:date/:time`

**Parameters:**
- `date`: YYYY-MM-DD
- `time`: HH:MM

**Query Parameters:**
- `partySize` (optional): number

**Example:** `/reservations/available-tables/2025-10-05/19:30?partySize=4`

**Response:**
```json
{
  "availableTables": [
    {
      "_id": "...",
      "tableNumber": 3,
      "capacity": 6,
      "location": "indoor"
    }
  ],
  "totalAvailable": 1
}
```

### Update Reservation Status
**PATCH** `/reservations/:id/status`

**Request Body:**
```json
{
  "status": "confirmed"
}
```

### Update Reservation
**PUT** `/reservations/:id`

### Cancel Reservation
**DELETE** `/reservations/:id`

### Get Today's Reservations
**GET** `/reservations/today/list`

---

## 🛒 Orders API (QR Code System)

### Scan QR Code
**POST** `/orders/scan-qr`

**Request Body:**
```json
{
  "qrCode": "table-1-1696451234567",
  "customerName": "Jane Smith"
}
```

**Response:**
```json
{
  "message": "Successfully joined table",
  "order": {
    "_id": "...",
    "tableNumber": 1,
    "customers": [
      {
        "name": "Jane Smith",
        "scannedAt": "2025-10-04T..."
      }
    ],
    "isUnified": false
  }
}
```

### Add Item to Order
**POST** `/orders/:orderId/items`

**Request Body:**
```json
{
  "menuItemId": "...",
  "quantity": 2,
  "specialInstructions": "No onions please",
  "orderedBy": "Jane Smith"
}
```

**Response:**
```json
{
  "message": "Item added to order",
  "order": {
    "_id": "...",
    "tableNumber": 1,
    "items": [
      {
        "menuItem": {
          "_id": "...",
          "name": "Caesar Salad",
          "price": 12.99
        },
        "quantity": 2,
        "price": 12.99,
        "specialInstructions": "No onions please",
        "orderedBy": "Jane Smith"
      }
    ],
    "totalAmount": 25.98,
    "status": "active"
  }
}
```

### Get Order Details
**GET** `/orders/:orderId`

### Update Order Status
**PATCH** `/orders/:orderId/status`

**Request Body:**
```json
{
  "status": "preparing"
}
```

**Status Options:** `active`, `preparing`, `ready`, `served`, `paid`

---

## 🍽️ Menu API

### Get All Menu Items
**GET** `/menu`

**Query Parameters:**
- `category` (optional): `appetizer`, `main_course`, `dessert`, `beverage`, `special`
- `available` (optional): `true`, `false`

**Response:**
```json
{
  "menuItems": [
    {
      "_id": "...",
      "name": "Caesar Salad",
      "description": "Fresh romaine lettuce with Caesar dressing",
      "price": 12.99,
      "category": "appetizer",
      "image": "https://...",
      "isAvailable": true,
      "preparationTime": 10,
      "allergens": ["dairy"],
      "dietaryInfo": ["vegetarian"]
    }
  ]
}
```

### Add Menu Item
**POST** `/menu`

**Request Body:**
```json
{
  "name": "Grilled Salmon",
  "description": "Fresh Atlantic salmon with herbs",
  "price": 24.99,
  "category": "main_course",
  "image": "https://example.com/salmon.jpg",
  "preparationTime": 20,
  "allergens": ["shellfish"],
  "dietaryInfo": ["gluten-free"]
}
```

### Update Menu Item
**PUT** `/menu/:id`

### Delete Menu Item
**DELETE** `/menu/:id`

---

## 🚨 Error Responses

All endpoints may return these error formats:

**400 Bad Request:**
```json
{
  "error": "Table does not exist"
}
```

**404 Not Found:**
```json
{
  "error": "Reservation not found"
}
```

**500 Server Error:**
```json
{
  "error": "Internal server error"
}
```

---

## 📱 Frontend Implementation Examples

### JavaScript/Fetch Examples

**Create a reservation:**
```javascript
const createReservation = async (reservationData) => {
  try {
    const response = await fetch('http://localhost:5500/api/v1/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating reservation:', error);
  }
};
```

**Scan QR Code:**
```javascript
const scanTableQR = async (qrCode, customerName) => {
  try {
    const response = await fetch('http://localhost:5500/api/v1/orders/scan-qr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ qrCode, customerName })
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error scanning QR:', error);
  }
};
```

**Get menu items:**
```javascript
const getMenu = async (category = '') => {
  try {
    const url = category 
      ? `http://localhost:5500/api/v1/menu?category=${category}`
      : 'http://localhost:5500/api/v1/menu';
    
    const response = await fetch(url);
    const result = await response.json();
    return result.menuItems;
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
};
```

**Add item to order:**
```javascript
const addItemToOrder = async (orderId, itemData) => {
  try {
    const response = await fetch(`http://localhost:5500/api/v1/orders/${orderId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding item:', error);
  }
};
```

---

## 🔄 Typical Workflow

### Admin Panel Workflow:
1. **Create tables** → `POST /tables`
2. **Add menu items** → `POST /menu`
3. **View reservations** → `GET /reservations`
4. **Update order status** → `PATCH /orders/:id/status`

### Customer Reservation Workflow:
1. **Check available tables** → `GET /reservations/available-tables/:date/:time`
2. **Make reservation** → `POST /reservations`
3. **Receive confirmation** → Reservation created with status "pending"

### Customer On-site Ordering Workflow:
1. **Scan table QR code** → `POST /orders/scan-qr`
2. **Browse menu** → `GET /menu`
3. **Add items to order** → `POST /orders/:id/items`
4. **View order summary** → `GET /orders/:id`
5. **Wait for food** → Kitchen updates status via `PATCH /orders/:id/status`

### Kitchen Workflow:
1. **View active orders** → `GET /orders` (filter by status: "active")
2. **Start preparing** → `PATCH /orders/:id/status` (status: "preparing")
3. **Food ready** → `PATCH /orders/:id/status` (status: "ready")
4. **Food served** → `PATCH /orders/:id/status` (status: "served")
5. **Payment completed** → `PATCH /orders/:id/status` (status: "paid")

---

## 📋 Data Models

### Table Model
```json
{
  "_id": "ObjectId",
  "tableNumber": "Number (unique)",
  "capacity": "Number",
  "location": "String (indoor|outdoor|terrace|private)",
  "isOccupied": "Boolean",
  "qrCode": "String (unique)",
  "currentOrder": "ObjectId (ref: Order)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Reservation Model
```json
{
  "_id": "ObjectId",
  "tableNumber": "Number",
  "customerName": "String",
  "customerPhone": "String",
  "customerEmail": "String",
  "partySize": "Number (1-12)",
  "reservationDate": "Date",
  "reservationTime": "String",
  "status": "String (pending|confirmed|seated|completed|cancelled)",
  "notes": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Order Model
```json
{
  "_id": "ObjectId",
  "tableNumber": "Number",
  "items": [
    {
      "menuItem": "ObjectId (ref: MenuItem)",
      "quantity": "Number",
      "price": "Number",
      "specialInstructions": "String",
      "orderedBy": "String"
    }
  ],
  "totalAmount": "Number",
  "status": "String (active|preparing|ready|served|paid)",
  "customers": [
    {
      "name": "String",
      "scannedAt": "Date"
    }
  ],
  "isUnified": "Boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### MenuItem Model
```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String",
  "price": "Number",
  "category": "String (appetizer|main_course|dessert|beverage|special)",
  "image": "String (URL)",
  "isAvailable": "Boolean",
  "preparationTime": "Number (minutes)",
  "allergens": ["String"],
  "dietaryInfo": ["String"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 🔧 Environment Setup

**Required Environment Variables:**
```env
PORT=5500
NODE_ENV=development
DB_URI=mongodb://localhost:27017/restaurant
```

**Server Status Check:**
```
GET http://localhost:5500/
Response: "Restaurant API is running!"
```

---

This documentation provides complete API reference for frontend development integration.
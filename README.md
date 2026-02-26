# 🛍️ E-Shop Mobile App

React Native course project - Mobile application for an online store.

---

## 📦 APK Link
```
🤖 Android app:
https://drive.google.com/file/d/1ClW2UsNtuF9S_O5c3_gMDQZD1U1c1G9S/view?usp=sharing
```

Or:
```
🤖 Android app:
https://expo.dev/artifacts/eas/83DTVM4PTB1HPSLVssGwQJ.apk
```

---

## 🔑 Test Credentials

To test the application **without registration**, use the following credentials:

| Field | Value |
|------|----------|
| **Email** | `react_native@exam.com` |
| **Password** | `111111` |

> **Note:** This account is pre-created and contains sample data for testing all functionalities (profile, cart, etc.).

**Alternative:** You can use **"Continue as Guest"** for quick product browsing (without access to Cart and Profile).

---

## 🚀 Installation Instructions

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo Go app (for testing on physical device)
- Android Studio or Xcode (optional, for emulator)

### Installation Steps

1. **Clone the repository:**
```bash
   git clone https://github.com/venelinkolev/react-native-exam-2026.git
   cd react-native-exam-2026
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Create `local.environment.ts` file:**
   
   Copy `local.environment.example.ts` and rename to `local.environment.ts`:
```bash
   cp local.environment.example.ts local.environment.ts
```
   
   Fill in your Firebase credentials and API data.

4. **Start the application:**
```bash
   npm start
```

5. **Test on device:**
   - Scan the QR code with **Expo Go** app (Android/iOS)
   - Or press `a` for Android emulator / `i` for iOS simulator

---

## 📱 Walkthrough - How to Use the App

### For Guest Users:
1. On the initial screen, select **"Continue as Guest"**
2. Browse products on the Home screen
3. Filter by category and price range
4. Tap on a product for details
5. **Cannot** add to cart or access profile

### For Registered Users:
1. Tap **"Register"** and fill out the form
2. Login with email and password
3. Browse and add products to cart
4. Manage cart (change quantity, delete items)
5. Edit your profile (name, avatar photo, birth date)
6. Enable/disable Dark Mode from Profile screen

---

## 📋 Functional Guide

### 1️⃣ Project Overview

- **Application Name:** E-Shop Mobile App
- **Application Category:** E-Commerce / Shopping
- **Main Purpose:**  
  A mobile application for an online store that allows users to browse products, filter them by category and price, add products to cart, and manage their profile. The application supports both registered users (with full functionality) and guest mode (product browsing only).

---

### 2️⃣ User Access & Permissions

#### **Guest (Not Authenticated)**

Unauthenticated users have access to:
- ✅ **Home Screen** - browse products
- ✅ **Filtering** by category and price
- ✅ **Product Details Screen** - product details
- ❌ **No access** to Cart and Profile screens
- Attempting to access Cart/Profile shows message "Please login to your account"

#### **Authenticated User**

Logged-in users have access to:
- ✅ **Home Tab:**
  - Browse products with filters (category, price)
  - Product Details Screen with ability to add to cart
- ✅ **Cart Tab:**
  - View added products
  - Change quantity (increase/decrease)
  - Delete items
  - View total price
- ✅ **Profile Tab:**
  - View profile information (username, email, full name, birth date)
  - Edit profile (Edit Profile Screen)
  - Upload/change profile photo via ImagePicker
  - Enable/disable Dark Mode
  - Logout functionality

---

### 3️⃣ Authentication & Session Handling

#### **Authentication Flow**

**On app startup:**
1. The app checks for saved **Firebase Auth Token** in SecureStore
2. Also checks for **API Session Token** and **Session ID**
3. If tokens are valid → user is directed to **Main App** (automatic login)
4. If no tokens → user sees **Auth Stack** (Login/Register screens)

**On successful Login:**
1. User enters email and password
2. Firebase Authentication validates credentials
3. On success, **Firebase Auth Token** is generated
4. API endpoint `/login` is called to get **API Session Token**
5. Unique **Session ID** (UUID) is generated
6. All tokens are saved in **Expo SecureStore**
7. User is redirected to **Main App** (Bottom Tab Navigator)

**On Registration:**
1. User fills out the form (email, password, password confirmation)
2. React Hook Form validates the data
3. Firebase Authentication creates new account
4. Automatically logs in and redirects to Main App
5. Empty profile is created in Firebase Realtime Database

**On Logout:**
1. Tokens are deleted from SecureStore
2. Firebase Auth logs out
3. User is redirected to **Auth Stack** (Login screen)

#### **Session Persistence**

- **How session is stored:**  
  User session is stored via **Expo SecureStore** (encrypted storage).  
  Saved items:
  - `firebaseAuthToken` - Firebase authentication token
  - `apiToken` - API session token for e-shop backend
  - `sessionID` - UUID for cart operations
  
- **Auto-login after restart:**  
  On each app startup, `AuthContext` checks SecureStore for saved tokens. If tokens are valid, the user is automatically logged in without re-entering credentials.

---

### 4️⃣ Navigation Structure

#### **Root Navigation Logic**

Navigation is split into two main flows:

- **If user is NOT logged in:**  
  Shows **Auth Stack** (Login / Register screens)
  
- **If user IS logged in:**  
  Shows **Main App** with Bottom Tab Navigator

- **Guest Mode:**  
  User can select "Continue as Guest" and browse products without registration, but with limited access (no Cart and Profile).

#### **Main Navigation**

The application uses **Bottom Tab Navigator** with 3 tabs:

1. **🏠 Home Tab** (Stack Navigator)
   - HomeScreen (product list)
   - ProductDetailsScreen (product details)

2. **🛒 Cart Tab**
   - CartScreen (shopping cart)

3. **👤 Profile Tab** (Stack Navigator)
   - ProfileScreen (profile view)
   - EditProfileScreen (profile editing)

#### **Nested Navigation**

✅ **Yes, there is nested navigation:**

- **Home Tab** contains **Stack Navigator**:
  - `HomeScreen` → `ProductDetailsScreen`
  
- **Profile Tab** contains **Stack Navigator**:
  - `ProfileScreen` → `EditProfileScreen`

---

### 5️⃣ List → Details Flow

#### **List / Overview Screen**

**HomeScreen** displays:
- **FlatList** with product list
- Each product is rendered via `ProductCard` component
- User can:
  - Filter products by **category** (via horizontal buttons)
  - Filter by **maximum price** (via Slider component)
  - **Pull-to-refresh** to reload products
  - Tap on product for details

#### **Details Screen**

**ProductDetailsScreen:**
- Navigation is triggered by **tapping** on `ProductCard` component
- **Data** is passed via **route parameters:**
```typescript
  navigation.navigate("ProductDetails", { product });
```
- Screen receives entire `product` object and displays:
  - Product name
  - Image (base64 image)
  - Price
  - Description
  - **"Add to Cart"** button (only for logged-in users)

---

### 6️⃣ Data Source & Backend

#### **Backend Type**

✅ **Real Backend:**

The application uses **Firebase** for:
- **Firebase Authentication** - for login/register
- **Firebase Realtime Database** - for user profiles
- **Firebase Storage** - for avatar photos

And **REST API** for:
- **E-Shop API** (`https://api3.eyanak.com:1110/e-shop/api`)
  - `/login` - for API session token
  - `/getstockslite` - for products
  - `/cart` - for CRUD operations with cart

---

### 7️⃣ Data Operations (CRUD)

#### **Read (GET)**

1. **GET Products** (`/getstockslite`)
   - **Where:** HomeScreen
   - Loads product list from API
   - Displays in FlatList with pull-to-refresh

2. **GET Cart** (`/cart`)
   - **Where:** CartScreen
   - Loads current items in user's cart
   - Uses `sessionID` for identification

3. **GET User Profile** (Firebase Realtime Database)
   - **Where:** ProfileScreen
   - Loads username, fullName, birthdate from Firebase

4. **GET Avatar** (Firebase Storage)
   - **Where:** ProfileScreen
   - Loads profile photo URL

#### **Create (POST)**

1. **POST Add to Cart** (`/cart`)
   - **Where:** ProductDetailsScreen
   - User taps "Add to Cart"
   - Sends `stockID`, `quantity`, `sessionID`
   - On success shows Alert "Product added to cart"

2. **POST Register User** (Firebase Auth)
   - **Where:** Register Screen
   - Creates new user in Firebase Authentication
   - Automatically creates empty profile in Realtime Database

#### **Update (PUT)**

1. **PUT Update Cart Quantity** (`/cart`)
   - **Where:** CartScreen
   - User changes item quantity (+/-)
   - Sends new `quantity` and `cart item id`
   - UI updates automatically after successful request

2. **PUT Update User Profile** (Firebase Realtime Database)
   - **Where:** EditProfileScreen
   - User edits username, fullName, birthdate
   - Data is updated in Firebase
   - ProfileScreen automatically reloads

3. **PUT Upload Avatar** (Firebase Storage)
   - **Where:** EditProfileScreen
   - User selects photo via **Expo ImagePicker**
   - Photo is uploaded to Firebase Storage
   - URL is saved in Realtime Database

#### **Delete (DELETE)**

1. **DELETE Cart Item** (`/cart`)
   - **Where:** CartScreen
   - User taps "Delete" button
   - Sends `cart item id`
   - Item is removed from cart
   - UI updates after successful deletion

---

### 8️⃣ Forms & Validation

#### **Forms Used**

1. **Login Form** (Login.tsx)
2. **Register Form** (Register.tsx)
3. **Edit Profile Form** (EditProfileScreen.tsx)

#### **Validation Rules**

**React Hook Form** is used for all forms.

**Login Form:**
- **Email:**
  - ✅ Required (mandatory field)
  - ✅ Email format (valid email format)
- **Password:**
  - ✅ Required (mandatory field)

**Register Form:**
- **Email:**
  - ✅ Required
  - ✅ Email format
- **Password:**
  - ✅ Required
  - ✅ Minimum 6 characters
- **Confirm Password:**
  - ✅ Required
  - ✅ Must match password

**Edit Profile Form:**
- **Username:**
  - ✅ Required
  - ✅ Minimum 3 characters
- **Full Name:**
  - ✅ Required
- **Birth Date:**
  - ✅ Optional (but format is validated if filled)

---

### 9️⃣ Native Device Features

#### **Used Native Feature(s)**

✅ **Camera / Image Picker** (Expo ImagePicker)

#### **Usage Description**

- **Where it's used:**  
  **ProfileScreen** and **EditProfileScreen**

- **Functionality:**
  1. User opens Profile screen
  2. Taps "Edit Profile" button
  3. In EditProfileScreen there's "Choose Photo" button
  4. **Expo ImagePicker** opens device gallery
  5. User selects a photo
  6. Photo is uploaded to **Firebase Storage**
  7. Photo URL is saved in **Firebase Realtime Database**
  8. Profile photo is displayed on ProfileScreen

- **Permissions:**  
  Application requires permission to access gallery (photos permission).

---

### 🔟 Typical User Flow

**Typical scenario for registered user:**

1. **User starts the application**
   - If logged in before → automatic login
   - If not → sees Login screen

2. **User logs in or registers**
   - Enters email and password
   - Taps "Login" or "Register"

3. **Browses products on Home screen**
   - Filters by category (e.g., "Electronics")
   - Changes price filter with Slider
   - Sees product list

4. **Opens product details**
   - Taps on ProductCard
   - Sees full information
   - Taps "Add to Cart"

5. **Goes to Cart screen**
   - Sees added products
   - Changes quantity (+/-)
   - Deletes unwanted items

6. **Edits profile**
   - Goes to Profile screen
   - Taps "Edit Profile"
   - Uploads profile photo
   - Changes full name
   - Saves changes

7. **Logout**
   - Taps "Logout" on Profile screen
   - Returns to Login screen

---

### 1️⃣1️⃣ Error & Edge Case Handling

#### **Authentication Errors**

- Wrong email/password → Alert with message "Wrong email or password"
- Empty fields → Error shown below field via React Hook Form
- Weak internet connection → "Network problem, try again"

#### **Network or Data Errors**

- **When loading products:**
  - Shows `ActivityIndicator` (loading spinner)
  - On error → "Error loading products"
  - "Try Again" button for retry

- **During CRUD operations with cart:**
  - Every API request is wrapped in `try/catch`
  - On error → Alert with informative message
  - On success → UI updates automatically

#### **Empty or Missing Data States**

- **Empty cart:**
  - Shows message "Cart is empty"

- **No products (after filtering):**
  - "No products available."

- **Guest mode:**
  - Attempting to access Cart/Profile → "Please login to your account" and **"Go to Login"** button

- **Missing profile photo:**
  - Shows placeholder avatar (user icon)

---

## 🛠️ Tech Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **State Management:** Context API (AuthContext, CartContext, ThemeContext)
- **Backend:** 
  - Firebase (Authentication, Realtime Database, Storage)
  - REST API (E-Shop API)
- **Forms:** React Hook Form
- **Native Features:** Expo ImagePicker, Expo SecureStore
- **UI Components:** React Native Community Slider, DateTimePicker

---

## 📊 Project Structure
```
src/
├── api/              # API calls (auth, products, cart)
├── context/          # Global state (Auth, Cart, Theme)
├── hooks/            # Custom hooks
├── navigation/       # Navigation structure
├── screens/          # All screens (auth, home, cart, profile, guest)
├── services/         # Business logic (userProfile service)
├── shared/           # Reusable components (ProductCard, InputField, etc.)
├── types/            # TypeScript interfaces
└── utils/            # Helper functions (storage, validators)
```

---

## 📸 Screenshots

<p align="center">
  <img src="./assets/screenshots/login-screen.png " alt="Login" width="180"/>
  <img src="./assets/screenshots/register-screen.png" alt="Register" width="180"/>
  <img src="./assets/screenshots/home-screen.png" alt="Home" width="180"/>
  <img src="./assets/screenshots/product-details-screen.png" alt="ProductDetails" width="180"/>
</p>
<p align="center">
  <img src="./assets/screenshots/cart-screen.png" alt="Cart" width="180"/>
  <img src="./assets/screenshots/profile-screen.png" alt="Profile" width="180"/>
  <img src="./assets/screenshots/edit-profile-screen.png" alt="EditProfile" width="180"/>
</p>

---

## 👨‍💻 Author

**Venelin Kolev**  
React Native Course 2026  
SoftUni

---

## 📄 License

This project is licensed under the MIT License.
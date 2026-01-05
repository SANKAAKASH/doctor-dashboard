# 🏥 React-based Doctor Dashboard

A modern, comprehensive doctor dashboard application built with React, TypeScript, and Tailwind CSS. This application provides healthcare professionals with a complete suite of tools to manage patients, appointments, prescriptions, medical reports, and more.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🎯 Key Components](#-key-components)
- [🔐 Authentication](#-authentication)
- [💾 Database](#-database)
- [🎨 Styling](#-styling)
- [📝 Available Scripts](#-available-scripts)
- [🔧 Configuration](#-configuration)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🎯 Core Functionality

- 🔐 **Authentication System** - Secure login and user management with Supabase
- 📊 **Dashboard Overview** - Real-time statistics and insights for doctors
- 👥 **Patient Management** - Complete patient records and chart management
- 📅 **Appointment Management** - Schedule, view, and manage appointments
- 📝 **Doctor Notes** - Create and manage clinical notes
- 💊 **Prescriptions** - Generate and track prescriptions
- 📋 **Medical Reports** - View and manage medical reports
- 💳 **Payments** - Track payments and billing information
- ⚙️ **Settings** - Customize application settings

### 🎨 User Interface

- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎭 **Modern UI** - Clean and intuitive interface built with Tailwind CSS
- 🔄 **Collapsible Sidebar** - Space-efficient navigation
- 🎯 **Component-Based Architecture** - Modular and maintainable code structure

## 🛠️ Tech Stack

### Frontend Technologies

- ⚛️ **React 18.3.1** - Modern UI library for building user interfaces
- 📘 **TypeScript 5.5.3** - Type-safe JavaScript for better development experience
- ⚡ **Vite 5.4.2** - Fast build tool and development server
- 🎨 **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid UI development
- 🎯 **Lucide React 0.344.0** - Beautiful icon library

### Backend & Database

- 🗄️ **Supabase 2.57.4** - Backend-as-a-Service for authentication and database

### Development Tools

- 🔍 **ESLint 9.9.1** - Code linting and quality assurance
- 🔧 **TypeScript ESLint** - TypeScript-specific linting rules
- 🎨 **PostCSS & Autoprefixer** - CSS processing and vendor prefixing

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- 📦 **Node.js** (v16 or higher recommended)
- 📦 **npm** or **yarn** package manager
- 🗄️ **Supabase Account** (for backend services)

### Step-by-Step Installation

1. **📥 Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **📦 Install dependencies**
   ```bash
   npm install
   ```

3. **⚙️ Configure Supabase**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Update the Supabase configuration in `src/lib/supabase.ts`

4. **🚀 Start the development server**
   ```bash
   npm run dev
   ```

5. **🌐 Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🚀 Getting Started

### First Time Setup

1. **🔐 Set up Supabase**
   - Create tables for users, patients, appointments, etc.
   - Configure authentication providers
   - Set up Row Level Security (RLS) policies

2. **📝 Configure Environment Variables**
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **🎨 Customize the Application**
   - Modify `tailwind.config.js` for custom styling
   - Update mock data in `src/data/mock-data.json` if needed
   - Customize components in `src/components/`

## 📁 Project Structure

```
project/
├── 📄 index.html                 # Main HTML entry point
├── 📄 package.json               # Project dependencies and scripts
├── 📄 vite.config.ts             # Vite configuration
├── 📄 tailwind.config.js         # Tailwind CSS configuration
├── 📄 tsconfig.json              # TypeScript configuration
│
├── 📂 src/                       # Source code directory
│   ├── 📄 main.tsx               # Application entry point
│   ├── 📄 App.tsx                # Main App component
│   ├── 📄 index.css              # Global styles
│   │
│   ├── 📂 components/            # React components
│   │   ├── 📄 Dashboard.tsx              # Main dashboard container
│   │   ├── 📄 DashboardOverview.tsx      # Dashboard overview page
│   │   ├── 📄 Header.tsx                 # Top navigation header
│   │   ├── 📄 Sidebar.tsx                # Side navigation menu
│   │   ├── 📄 Login.tsx                  # Login page
│   │   ├── 📄 PatientManagement.tsx      # Patient management page
│   │   ├── 📄 PatientChart.tsx           # Individual patient chart
│   │   ├── 📄 AppointmentManagement.tsx  # Appointment management
│   │   ├── 📄 AppointmentRequestPanel.tsx # Appointment requests
│   │   ├── 📄 Calendar.tsx               # Calendar component
│   │   ├── 📄 DoctorNotes.tsx            # Clinical notes management
│   │   ├── 📄 Prescriptions.tsx          # Prescription management
│   │   ├── 📄 MedicalReports.tsx         # Medical reports viewer
│   │   ├── 📄 Payments.tsx               # Payment tracking
│   │   └── 📄 Settings.tsx               # Settings page
│   │
│   ├── 📂 contexts/              # React Context providers
│   │   └── 📄 AuthContext.tsx    # Authentication context
│   │
│   ├── 📂 lib/                   # Utility libraries
│   │   ├── 📄 supabase.ts        # Supabase client configuration
│   │   ├── 📄 mockData.ts        # Mock data utilities
│   │   └── 📄 mockState.ts       # Mock state management
│   │
│   ├── 📂 types/                 # TypeScript type definitions
│   │   └── 📄 index.ts           # Shared type definitions
│   │
│   └── 📂 data/                  # Static data files
│       └── 📄 mock-data.json     # Mock data for development
│
└── 📂 supabase/                  # Supabase configuration
    └── 📂 migrations/            # Database migration files
```

## 🎯 Key Components

### 🏠 Dashboard Overview (`DashboardOverview.tsx`)
- 📊 Displays key metrics and statistics
- 📈 Visual charts and graphs
- 🔔 Recent notifications and alerts
- ⚡ Quick access to common actions

### 👥 Patient Management (`PatientManagement.tsx`)
- 📋 List of all patients
- 🔍 Search and filter functionality
- ➕ Add new patients
- ✏️ Edit patient information
- 📄 View patient charts

### 📅 Appointment Management (`AppointmentManagement.tsx`)
- 📆 Calendar view of appointments
- ➕ Schedule new appointments
- ✏️ Edit existing appointments
- ❌ Cancel appointments
- 📝 Appointment details and notes

### 💊 Prescriptions (`Prescriptions.tsx`)
- 📝 Create new prescriptions
- 📋 View prescription history
- 🔍 Search prescriptions
- 📄 Print prescriptions

### 📋 Medical Reports (`MedicalReports.tsx`)
- 📊 View medical reports
- 📥 Download reports
- 🔍 Filter and search reports
- 📤 Share reports

### 💳 Payments (`Payments.tsx`)
- 💰 Track payment transactions
- 📊 Payment statistics
- 📄 Generate invoices
- 🔍 Payment history

## 🔐 Authentication

The application uses **Supabase Authentication** for secure user management:

- 🔑 **Email/Password Authentication** - Traditional login method
- 🔐 **Session Management** - Automatic session handling
- 👤 **User Context** - Global user state via React Context
- 🛡️ **Protected Routes** - Automatic redirect to login if not authenticated

### Authentication Flow

1. 👤 User enters credentials on the Login page
2. 🔐 Supabase validates credentials
3. ✅ On success, user session is created
4. 🏠 User is redirected to Dashboard
5. 🔄 Session persists across page refreshes

## 💾 Database

The application uses **Supabase** as the backend database:

- 🗄️ **PostgreSQL Database** - Relational database for structured data
- 🔒 **Row Level Security (RLS)** - Secure data access policies
- 🔄 **Real-time Subscriptions** - Live data updates
- 📊 **Database Migrations** - Version-controlled schema changes

### Key Tables (Expected)

- 👤 `users` - User accounts
- 👥 `patients` - Patient records
- 📅 `appointments` - Appointment scheduling
- 💊 `prescriptions` - Prescription data
- 📋 `medical_reports` - Medical reports
- 💳 `payments` - Payment transactions
- 📝 `doctor_notes` - Clinical notes

## 🎨 Styling

The application uses **Tailwind CSS** for styling:

- 🎨 **Utility-First CSS** - Rapid UI development
- 📱 **Responsive Design** - Mobile-first approach
- 🎭 **Custom Theme** - Configurable design system
- 🌈 **Color Palette** - Consistent color scheme

### Customization

Edit `tailwind.config.js` to customize:
- 🎨 Colors and theme
- 📏 Spacing and sizing
- 🔤 Typography
- 🎯 Component styles

## 📝 Available Scripts

### 🚀 Development

```bash
npm run dev
```
- 🏃 Starts the development server
- 🔄 Hot module replacement enabled
- 🐛 Source maps for debugging
- ⚡ Fast refresh for React components

### 🏗️ Build

```bash
npm run build
```
- 📦 Creates production build
- 🗜️ Optimizes and minifies code
- 📊 Generates build statistics
- ✅ Type checking included

### 👀 Preview

```bash
npm run preview
```
- 🌐 Serves production build locally
- 🧪 Test production build before deployment
- ⚡ Fast preview of optimized build

### 🔍 Linting

```bash
npm run lint
```
- ✅ Checks code quality
- 🐛 Finds potential errors
- 📏 Enforces code style
- 🔧 Suggests improvements

### 🔎 Type Checking

```bash
npm run typecheck
```
- 📘 Validates TypeScript types
- 🐛 Catches type errors
- ✅ Ensures type safety
- 📊 No code generation

## 🔧 Configuration

### Vite Configuration (`vite.config.ts`)
- ⚡ Build tool settings
- 🔌 Plugin configuration
- 📦 Path aliases
- 🌐 Server settings

### TypeScript Configuration (`tsconfig.json`)
- 📘 Compiler options
- 📁 Path mappings
- ✅ Strict type checking
- 🎯 Target settings

### ESLint Configuration (`eslint.config.js`)
- ✅ Linting rules
- 🔧 Code quality standards
- 📏 Style guidelines
- 🎯 React-specific rules

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 **Fork the repository**
2. 🌿 **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. 💻 **Make your changes**
4. ✅ **Test your changes** (`npm run lint` and `npm run typecheck`)
5. 📝 **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. 📤 **Push to the branch** (`git push origin feature/amazing-feature`)
7. 🔀 **Open a Pull Request**

### Code Style Guidelines

- 📏 Follow ESLint rules
- 📘 Use TypeScript types
- 🎨 Follow Tailwind CSS conventions
- 📝 Write clear commit messages
- ✅ Test your changes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- ⚛️ **React Team** - For the amazing React library
- 🎨 **Tailwind CSS** - For the utility-first CSS framework
- 🗄️ **Supabase** - For the backend infrastructure
- ⚡ **Vite** - For the fast build tool
- 🎯 **Lucide** - For the beautiful icons

---

## 📞 Support

If you encounter any issues or have questions:

- 🐛 **Report bugs** - Open an issue on GitHub
- 💬 **Ask questions** - Start a discussion
- 📖 **Read documentation** - Check the docs folder
- 🔍 **Search issues** - Look for similar problems

---

**Made with ❤️ for healthcare professionals**

👤 Author

Sanka Akash
AI Engineer | Full-Stack Developer

📧 Email: ursakash9@gmail.com

📞 Phone: +91 93913 52606

💼 LinkedIn: https://www.linkedin.com/in/sanka-akash

💻 GitHub: https://github.com/SANKAAKASH

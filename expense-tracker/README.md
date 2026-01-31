# Expense Tracker

A comprehensive web application for tracking income and expenses with budget management, reports, and financial analytics.

## Features

- **Dashboard**: Overview of income, expenses, and balance
- **Transactions**: Add, view, and manage income and expense transactions
- **Budget Management**: Set and monitor budgets by category
- **Financial Reports**: Visual reports with charts and analytics
- **Category Management**: Customize expense/income categories
- **Settings**: Personalize currency, theme, and notifications
- **User Authentication**: Secure login and registration

## Tech Stack

### Frontend
- **React** 18.2.0
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - API framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## Project Structure

```
expense-tracker/
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/                 # Static files
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express backend
│   ├── models/                 # MongoDB schemas
│   │   ├── Transaction.js
│   │   ├── Budget.js
│   │   ├── Category.js
│   │   └── User.js
│   ├── routes/                 # API routes
│   │   ├── transactions.js
│   │   ├── budgets.js
│   │   ├── categories.js
│   │   ├── reports.js
│   │   └── auth.js
│   ├── middleware/             # Custom middleware
│   │   └── auth.js
│   ├── server.js               # Main server file
│   ├── .env.example
│   └── package.json
│
└── package.json                # Root package.json

```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client && npm install && cd ..

   # Install server dependencies
   cd server && npm install && cd ..
   ```

3. **Configure environment variables**
   ```bash
   # In server directory, create .env file
   cp server/.env.example server/.env

   # Edit server/.env with your MongoDB URI and other settings
   ```

4. **Start the application**

   **Option 1: Run both client and server concurrently**
   ```bash
   npm run dev
   ```

   **Option 2: Run separately**
   ```bash
   # Terminal 1 - Start server
   cd server
   npm run dev

   # Terminal 2 - Start client
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## API Endpoints

### Transactions
- `GET /transactions` - Get all transactions
- `GET /transactions/:id` - Get transaction by ID
- `GET /transactions/category/:category` - Get by category
- `POST /transactions` - Create transaction
- `PUT /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

### Budgets
- `GET /budgets` - Get all budgets
- `GET /budgets/:id` - Get budget by ID
- `POST /budgets` - Create budget
- `PUT /budgets/:id` - Update budget
- `DELETE /budgets/:id` - Delete budget

### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create category
- `DELETE /categories/:id` - Delete category

### Reports
- `GET /reports/summary` - Get financial summary
- `GET /reports/category-breakdown` - Get expense breakdown by category
- `GET /reports/monthly-trend` - Get monthly trend data
- `GET /reports/expense-vs-income` - Get expense vs income comparison

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

## Features Explained

### Dashboard
- Quick overview of total income, expenses, and balance
- Budget alert notifications
- Recent transactions list

### Transactions
- Add new income or expense transactions
- Filter by type (all, income, expense)
- View transaction history with category, amount, and date
- Delete transactions

### Budget Management
- Create budget limits for different categories
- Track spending against budget
- Visual progress bars showing budget usage
- Alerts when budget is nearly exceeded or exceeded

### Reports
- Pie chart showing expense distribution by category
- Line chart tracking monthly trends
- Bar chart comparing monthly expense vs income
- Financial summary with savings rate calculation

### Settings
- Change currency preference
- Select theme (light/dark/auto)
- Enable/disable notifications
- Configure email alerts

## Component Overview

### Frontend Components
- **StatCard**: Display financial statistics
- **RecentTransactions**: Show last 5 transactions
- **TransactionForm**: Add/edit transactions
- **TransactionList**: List all transactions
- **BudgetForm**: Create budgets
- **BudgetList**: Display budget cards with progress

### Pages
- **Dashboard**: Main overview page
- **Transactions**: Transaction management page
- **Budget**: Budget management page
- **Reports**: Financial reports and analytics
- **Settings**: User preferences

## Database Models

### Transaction
- `type`: income or expense
- `amount`: transaction amount
- `category`: expense/income category
- `description`: optional description
- `date`: transaction date
- `userId`: user reference

### Budget
- `category`: budget category
- `limit`: budget limit amount
- `spent`: spent amount
- `month`: budget month
- `userId`: user reference

### Category
- `name`: category name
- `type`: income or expense
- `color`: category color
- `icon`: category icon
- `userId`: user reference

### User
- `name`: user name
- `email`: user email
- `password`: hashed password
- `currency`: preferred currency

## Development

### Adding a New Feature

1. Create the database model in `server/models/`
2. Create API routes in `server/routes/`
3. Add the API service in `client/src/services/api.js`
4. Create React components in `client/src/components/`
5. Create pages if needed in `client/src/pages/`
6. Update routing in `client/src/App.jsx`

### Building for Production

```bash
# Build client
cd client
npm run build

# The server uses ES modules, no build needed
```

## Security Notes

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- CORS enabled for cross-origin requests
- Environment variables for sensitive data
- Input validation on backend

## Future Enhancements

- User authentication UI
- Data export (CSV, PDF)
- Recurring transactions
- Multiple accounts
- Bill reminders
- Income and expense goals
- Mobile app
- Dark theme
- Multi-language support
- Advanced filters and search

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or use a cloud instance
- Check `MONGODB_URI` in `.env` file

### CORS Error
- Make sure backend is running on port 5000
- Check proxy configuration in `vite.config.js`

### Port Already in Use
- Change port in `.env` (server) or `vite.config.js` (client)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues or questions, please create an issue in the repository.

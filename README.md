# Finance Dashboard UI


A comprehensive MERN-stack financial dashboard built to evaluate frontend development, component structuring, and data visualization. This project provides users with clear insights into their financial activity through a clean, interactive, and responsive interface.

# 🚀 Live Links
Frontend (Netlify): https://69d20845ce2a58b6ef5c9307--dreamy-chaja-3348c8.netlify.app/



 #🛠️ Key Features
1. Dashboard Overview
Summary Cards: Instant view of Total Balance, Income, and Expenses.

Time-based Visualization: Interactive Trend Chart (Balance fluctuations) using Recharts.

Categorical Visualization: Spending breakdown by category (e.g., Rent, Food, Shopping).

2. Transactions Management
Detailed List: View all transactions with Date, Amount, and Type.

Search & Filter: Real-time search by title and filtering by Income/Expense types.

State Management: Handled via React Context/State for seamless UI updates.

3. Role-Based UI (RBAC Simulation)
Admin Role: Full access to add and manage transactions.

Viewer Role: Read-only access where the "Add Transaction" button is hidden/disabled to demonstrate UI behavior changes based on roles.

4. Smart Insights
Highlights the Highest Spending Category.

Monthly comparison and simple observations from the mock/live data.

#💻 Tech Stack
Frontend: React.js, Tailwind CSS, Recharts, Lucide-React.

Backend: Node.js, Express.js.

Database: MongoDB Atlas.

Deployment: Netlify (Frontend) & Render (Backend).

#⚙️ Local Setup Instructions
1. Clone the repository
Bash
git clone https://github.com/NandineeNargesh/ContractHub-MERN.git
cd ContractHub-MERN
2. Backend Setup
Bash
cd server
npm install
# Create a .env file and add your MONGO_URI
npm start
3. Frontend Setup
Bash
cd client
npm install --legacy-peer-deps
npm start


#📝 Design Approach
Modularity: Reusable components for Charts, Sidebar, and Tables.

Responsiveness: Fully functional on Mobile, Tablet, and Desktop.

User Experience: Focused on readability and clean interactions.

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./Employees.css";

const ManagerEmployees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending'
  });

  // Mock data for manager's team
  const mockEmployees = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@company.com',
      department: 'HR',
      position: 'HR Specialist',
      salary: 45000,
      hireDate: '2022-03-15',
      status: 'Active',
      avatar: 'AH',
      avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      department: 'HR',
      position: 'Recruitment Officer',
      salary: 42000,
      hireDate: '2022-06-20',
      status: 'Active',
      avatar: 'SW',
      avatarColor: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      id: 3,
      name: 'Omar Ali',
      email: 'omar.ali@company.com',
      department: 'HR',
      position: 'Training Coordinator',
      salary: 48000,
      hireDate: '2023-01-10',
      status: 'Active',
      avatar: 'OA',
      avatarColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
     {
      id: 4,
      name: 'Fatima Khan',
      email: 'fatima.khan@company.com',
      department: 'HR',
      position: 'HR Assistant',
      salary: 35000,
      hireDate: '2023-05-22',
      status: 'On Leave',
      avatar: 'FK',
      avatarColor: 'bg-gradient-to-br from-pink-500 to-rose-500'
    }
  ];

  useEffect(() => {
    // Load data immediately without delay
    const filteredEmployees = mockEmployees.filter(emp => emp.department === user?.department);
    setEmployees(filteredEmployees);
    setLoading(false);
  }, [user?.department]);

  const handleTeamMeeting = () => {
    Swal.fire({
      title: 'Schedule Team Meeting',
      text: 'Schedule a meeting with your team?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Schedule',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Meeting Scheduled',
          text: 'Team meeting has been scheduled for tomorrow at 10:00 AM',
          timer: 3000,
          showConfirmButton: false
        });
      }
    });
  };

  const handleAssignTask = (employee) => {
    setSelectedEmployee(employee);
    setShowTaskModal(true);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the task to your backend
    console.log('Task assigned:', {
      employee: selectedEmployee,
      task: taskForm
    });

    Swal.fire({
      icon: 'success',
      title: 'Task Assigned!',
      text: `Task "${taskForm.title}" has been assigned to ${selectedEmployee.name}`,
      timer: 2000,
      showConfirmButton: false
    });

    // Reset form and close modal
    setTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      status: 'pending'
    });
    setShowTaskModal(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return "bg-green-500";
      case 'On Leave': return 'bg-yellow-500';
      case 'Inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600 mx-auto"></div>
          <h2 className="text-2xl font-semibold text-slate-700 mt-4">Loading Team...</h2>
          <p className="text-slate-500">Just a moment, we're getting things ready.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg shadow-blue-500/20">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            My Team
          </h1>
          <p className="mt-1 text-blue-100">
            Manage your team members and assign tasks.
          </p>
        </div>
        <button 
            onClick={handleTeamMeeting} 
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30 font-semibold py-2 px-4 rounded-lg"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Team Meeting
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Team Members', value: employees.length, icon: 'users', color: 'from-blue-500 to-indigo-600' },
          { title: 'Pending Approvals', value: 3, icon: 'check', color: 'from-green-500 to-emerald-600' },
          { title: 'Team Performance', value: '92%', icon: 'chart', color: 'from-amber-500 to-orange-600' },
          { title: 'On Leave Today', value: employees.filter(e => e.status === 'On Leave').length, icon: 'calendar', color: 'from-red-500 to-rose-600' }
        ].map(stat => (
            <div key={stat.title} className="bg-white p-5 rounded-2xl shadow-md border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className={`w-12 h-12 ${stat.color} bg-gradient-to-br text-white rounded-xl flex items-center justify-center mb-4`}>
                    {stat.icon === 'users' && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    {stat.icon === 'check' && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    {stat.icon === 'chart' && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                    {stat.icon === 'calendar' && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                </div>
                <h3 className="text-sm font-semibold text-slate-500 mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        {/* Search and actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="relative w-full sm:max-w-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              />
          </div>
          {/* Add more filters or actions here if needed */}
        </div>

        {/* Employees Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100">
              <tr>
                <th scope="col" className="p-4">Employee</th>
                <th scope="col" className="p-4">Position</th>
                <th scope="col" className="p-4">Status</th>
                <th scope="col" className="p-4">Hire Date</th>
                <th scope="col" className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg ${employee.avatarColor}`}>
                        {employee.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{employee.name}</div>
                        <div className="text-slate-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1.5 rounded-lg">{employee.position}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(employee.status)}`}></div>
                        <span>{employee.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {new Date(employee.hireDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleAssignTask(employee)} 
                        className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-green-600 transition-colors" 
                        title="Assign Task"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </button>
                      <Link to={`/employee/${employee.id}`} className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-indigo-600 transition-colors" title="View Profile">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Assignment Modal */}
      {showTaskModal && (
        <div className="fixed inset-0  flex items-center justify-center ">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">
                  Assign Task to {selectedEmployee?.name}
                </h3>
                <button 
                  onClick={() => setShowTaskModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleTaskSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                    rows="3"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowTaskModal(false)}
                    className="flex-1 px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Assign Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {filteredEmployees.length === 0 && (
        <div className="text-center p-6 bg-white rounded-2xl shadow-md mt-8">
          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="mt-2 text-xl font-semibold text-slate-800">No members found</h3>
          <p className="mt-1 text-slate-500">Your search for "{searchTerm}" did not match any team members.</p>
        </div>
      )}
    </div>
  );
};

export default ManagerEmployees; 
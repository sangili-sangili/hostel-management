export const mockTenantDashboardData = {
  kpis: {
    totalRooms: 54,
    totalBeds: 180,
    occupiedBeds: 142,
    availableBeds: 28,
    reservedBeds: 6,
    maintenanceBeds: 4,
    occupancyRate: 78.9, // percentage
    todayCheckIns: 4,
    todayCheckOuts: 2,
    monthCollections: 42500,
    outstandingDues: 3850,
  },
  branchOccupancy: [
    { branchId: 'br_1', branchName: 'Downtown Berkeley Branch', totalBeds: 80, occupiedBeds: 68, rate: 85 },
    { branchId: 'br_2', branchName: 'Northside Campus Residency', totalBeds: 60, occupiedBeds: 46, rate: 76.7 },
    { branchId: 'br_3', branchName: 'South Bay Scholar House', totalBeds: 40, occupiedBeds: 28, rate: 70 },
  ],
  occupancyTrends: [
    { month: 'Jun', occupancy: 70, collections: 36000 },
    { month: 'Jul', occupancy: 74, collections: 38200 },
    { month: 'Aug', occupancy: 82, collections: 44000 },
    { month: 'Sep', occupancy: 80, collections: 43100 },
    { month: 'Oct', occupancy: 78.9, collections: 42500 },
  ],
  bedDistribution: [
    { name: 'Occupied', value: 142, color: '#10b981' },
    { name: 'Available', value: 28, color: '#3b82f6' },
    { name: 'Reserved', value: 6, color: '#f59e0b' },
    { name: 'Maintenance', value: 4, color: '#ef4444' },
  ],
  recentActivities: [
    { id: 'act_101', type: 'checkin', text: 'Liam Chen checked into Room 204 (Bed A) at Downtown Berkeley', time: '10 mins ago' },
    { id: 'act_102', type: 'payment', text: 'Received $450 rent payment from Maya Patel via Online Transfer', time: '1 hour ago' },
    { id: 'act_103', type: 'checkout', text: 'James Wilson checked out from Room 102 (Northside)', time: '3 hours ago' },
    { id: 'act_104', type: 'maintenance', text: 'Room 305 AC maintenance reported by Branch Manager', time: '5 hours ago' },
  ],
  todayArrivals: [
    { id: 'arr_1', residentName: 'Liam Chen', room: 'Room 204 (Bed A)', branch: 'Downtown Berkeley', time: '11:00 AM', status: 'Checked In' },
    { id: 'arr_2', residentName: 'Emma Watson', room: 'Room 108 (Bed B)', branch: 'Northside Campus', time: '02:30 PM', status: 'Pending' },
    { id: 'arr_3', residentName: 'Rohit Sharma', room: 'Room 301 (Bed A)', branch: 'South Bay', time: '04:00 PM', status: 'Pending' },
  ],
};

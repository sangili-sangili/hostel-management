export const mockTenantReportsData = {
  monthlyOccupancy: [
    { month: 'May 2026', totalBeds: 180, occupied: 130, rate: '72.2%' },
    { month: 'Jun 2026', totalBeds: 180, occupied: 135, rate: '75.0%' },
    { month: 'Jul 2026', totalBeds: 180, occupied: 140, rate: '77.8%' },
    { month: 'Aug 2026', totalBeds: 180, occupied: 148, rate: '82.2%' },
    { month: 'Sep 2026', totalBeds: 180, occupied: 145, rate: '80.5%' },
    { month: 'Oct 2026', totalBeds: 180, occupied: 142, rate: '78.9%' },
  ],
  revenueCollections: [
    { month: 'May 2026', target: 45000, collected: 41200, outstanding: 3800 },
    { month: 'Jun 2026', target: 45000, collected: 42100, outstanding: 2900 },
    { month: 'Jul 2026', target: 46000, collected: 43500, outstanding: 2500 },
    { month: 'Aug 2026', target: 48000, collected: 46000, outstanding: 2000 },
    { month: 'Sep 2026', target: 47000, collected: 43800, outstanding: 3200 },
    { month: 'Oct 2026', target: 47000, collected: 42500, outstanding: 3850 },
  ],
  branchSummaries: [
    { branchName: 'Downtown Berkeley Branch', totalRooms: 24, totalBeds: 80, occupied: 68, occupancyRate: '85.0%', monthlyRevenue: 24800, pendingDues: 1850 },
    { branchName: 'Northside Campus Residency', totalRooms: 18, totalBeds: 60, occupied: 46, occupancyRate: '76.7%', monthlyRevenue: 15200, pendingDues: 1200 },
    { branchName: 'South Bay Scholar House', totalRooms: 12, totalBeds: 40, occupied: 28, occupancyRate: '70.0%', monthlyRevenue: 9500, pendingDues: 800 },
  ],
};

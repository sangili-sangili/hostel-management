export const supportService = {
  getTickets: async (_params) => Promise.resolve([]),
  getTicketById: async (_id) => Promise.resolve(null),
  addReply: async (ticketId, reply) => Promise.resolve({ ticketId, reply, simulated: true }),
  addInternalNote: async (ticketId, note) => Promise.resolve({ ticketId, note }),
  updateTicketStatus: async (ticketId, status) => Promise.resolve({ ticketId, status }),
  assignTicket: async (ticketId, agentId) => Promise.resolve({ ticketId, agentId }),
};

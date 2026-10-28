export const mockPlatformSettings = {
  platformName: 'HostelFlow SaaS Super Admin',
  supportEmail: 'ops@hostelflow.io',
  defaultTrialDays: 10,
  defaultCurrency: 'USD',
  defaultTimezone: 'UTC',
  invoicePrefix: 'INV',
  maintenanceMode: false,
  security: {
    enforceMFA: true,
    sessionTimeoutMinutes: 60,
    passwordExpiryDays: 90,
  },
  fileLimits: {
    maxTenantLogoSizeMb: 5,
    maxDocumentAttachmentMb: 25,
  },
  paymentGateways: {
    stripeEnabled: true,
    stripePublishableKey: 'pk_test_simulated_stripe_key_mock_only',
    razorpayEnabled: true,
    razorpayKeyId: 'rzp_test_simulated_key_mock_only',
  },
  backup: {
    lastBackup: '2026-10-28T02:00:00Z',
    status: 'Healthy',
    retentionDays: 30,
  },
};

import React from 'react';
import { Card } from '../common/Card';

export const ChartCard = ({ title, subtitle, children, action, className = '' }) => {
  return (
    <Card title={title} subtitle={subtitle} action={action} className={className}>
      <div className="w-full h-72">{children}</div>
    </Card>
  );
};

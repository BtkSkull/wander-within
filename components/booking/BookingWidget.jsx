'use client';

import { InlineWidget } from 'react-calendly';

export default function BookingWidget() {
  return (
    <InlineWidget
      url="https://calendly.com/bloxfruiz000"
      styles={{ height: '650px', width: '100%' }}
      pageSettings={{
        backgroundColor: 'f8f6fc',
        primaryColor: '6b2d8b',
        textColor: '35105c',
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
      }}
    />
  );
}
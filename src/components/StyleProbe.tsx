'use client'

import { useEffect } from 'react'

export function StyleProbe() {
  useEffect(() => {
    const bodyStyles = window.getComputedStyle(document.body)
    const primaryTextEl = document.querySelector('.text-primary')
    const sectionBgEl = document.querySelector('.bg-surface-container-low')
    const howItWorksSection = document.querySelector('section.bg-surface-container-low')
    const stepCards = document.querySelectorAll('section.bg-surface-container-low article')
    const primaryTextColor = primaryTextEl ? window.getComputedStyle(primaryTextEl).color : null
    const sectionBgColor = sectionBgEl ? window.getComputedStyle(sectionBgEl).backgroundColor : null

    // #region agent log
    fetch('http://127.0.0.1:7272/ingest/b6180842-bdf5-43f3-9eb9-1d3130ec3a35', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '92e393' },
      body: JSON.stringify({
        sessionId: '92e393',
        runId: `run-${Date.now()}`,
        hypothesisId: 'H6',
        location: 'src/components/StyleProbe.tsx:9',
        message: 'Client style probe',
        data: {
          bodyBackgroundColor: bodyStyles.backgroundColor,
          bodyFontFamily: bodyStyles.fontFamily,
          primaryTextColor,
          sectionBgColor,
          hasHowItWorksSection: Boolean(howItWorksSection),
          howItWorksCardCount: stepCards.length,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
  }, [])

  return null
}

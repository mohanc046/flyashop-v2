import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../config/routes'

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="secondary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          {/* <Route path="/" element={<Navigate to="/dashboard/live" replace />} /> */}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)

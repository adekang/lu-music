import React, { FC } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import styles from '@/assets/scss/index.module.scss'

const Index: FC = function () {
  return (
    <div className={styles.indexWrapper}>
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <nav className={styles.navWrapper}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/rank">Rank</NavLink>
          </li>
          <li>
            <NavLink to="/recommend">Recommend</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Index

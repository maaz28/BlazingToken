import React from 'react'
import { Menu } from 'semantic-ui-react'

export default function Appbar () {
  function handlerHome (params) {
    window.location.href = 'https://nuklear.io/'
  }

  return (
    <Menu pointing secondary>
      <Menu.Item name='Home' onClick={handlerHome} style={{ color: 'white' }} />
    </Menu>
  )
}

import { useDispatch } from 'react-redux'
import { PersonAddSVG } from '@/src/icons'
import { setModalOpen } from '@/src/store'

const Header = ({ name }) => {
  const dispatch = useDispatch()

  return (
    <header className='header'>
      <h1 className='header__h1'>
        Manage <span>{name}</span>
      </h1>
      <button
        className="btn btn__primary btn__icon"
        onClick={() => {
          dispatch(setModalOpen(true))
        }}
      >
        <PersonAddSVG /> <span>Add new</span>
      </button>
    </header>
  )
}

export default Header
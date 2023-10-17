import { FaCopyright } from 'react-icons/fa'
import classes from './Footer.module.css'

const Footer = () => {
  return (
    <div>
      <footer className={classes.footer}>
          <h2> {<FaCopyright />} Criado Pela B-Rush/2023</h2>
        </footer>
    </div>
  )
}

export default Footer

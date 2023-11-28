import classes from "./Steps.module.css";
import { AiOutlineIdcard, AiOutlineMail } from "react-icons/ai";
import { BiSolidKey } from "react-icons/bi";
import { BiSolidJoystick } from "react-icons/bi";
const Steps = ({currentStep}) => {
  return (
    <div className={classes.steps}>
      <div className={`${classes.step} ${classes.active}`}><AiOutlineIdcard/></div>
      <div className={`${classes.step} ${currentStep >= 1 ? classes.active : ``}`}><AiOutlineMail /></div>
      <div className={`${classes.step} ${currentStep >= 2 ? classes.active : ``}`}><BiSolidKey/></div>
      <div className={`${classes.step} ${currentStep >= 3 ? classes.active : ``}`}><BiSolidJoystick/></div>
    </div>
  )
}

export default Steps

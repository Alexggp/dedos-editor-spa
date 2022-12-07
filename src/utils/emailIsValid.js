 const emailIsValid = (mail) =>{
// eslint-disable-next-line
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true
  }
    return false
}
export default emailIsValid;
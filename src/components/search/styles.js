const box = {
  width:'100%'
};
const InputField = {
  border: '1px solid rgba(0, 0, 0, 0.42)',
  boxSizing: 'border-box',
  width: '100%',
  borderRadius: '0.2rem',
  fontSize: 'inherit',
  height: '100%',
  margin: '0px 10%'
};

const button = {
  color: 'inherit',
  border: '1px solid #ffffff',
  variant: () => 'outlined',
  maxheight: '2.4rem',
  alignSelf: 'center',
  margin: '0px 9%'
};

const Label = {
  display: 'none',
};

const ErrorMessage = {
  color: '#fdfdfd',
  margin: '0 10%',
  position: 'absolute',
  top: '100%',
  left: '12%',
  border: 'solid',
  borderRadius: '5px',
  borderWidth: '2px',
  padding: '2px 10px 5px 10px',
  backgroundColor: 'rgb(231 13 13 / 56%)',
};
const Form = {
  display: 'inline-flex',
  width: '80%',
  margin: '0px 0px 1rem 0px',
};
const styles = {
  InputField,
  Label,
  ErrorMessage,
  Form,
  button,
  box
};
export default styles;
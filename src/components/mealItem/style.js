const Card = {
  maxWidth: 400,
  margin: '2rem',
  minWidth: '25rem',
  minHeight: '33rem',
  position: 'relative'
};

const CardContent = { cursor: 'pointer' };

const CardActions = {
  display: 'flex',
  justifyContent: 'center',
  margin:'1rem'
};
const renderButtonStyle = (vegan) => {
  return {
    width: '96%',
    position: 'absolute',
    bottom: '0.5rem',
    backgroundColor: vegan ? '#19d21f' : '#1976d2', //#19d21f
  };
};
const Styles = {
  Card,
  CardContent,
  CardActions,
  renderButtonStyle,
};

export default Styles;
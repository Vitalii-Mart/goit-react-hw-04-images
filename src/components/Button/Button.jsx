import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.styled';


const Button = ({ onClick }) => (
  <ButtonStyled type="button" onClick={onClick}>
    Load More
  </ButtonStyled>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
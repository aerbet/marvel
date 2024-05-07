import error from './error.gif';
import './ErrorMessage.scss';

const ErrorMessage = () => {
  return (
    <>
      <img className="errorImg" src={error} alt="error"/>
    </>
  );
};

export default ErrorMessage;
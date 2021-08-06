import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NotFoundContainer from '../components/styledComponents/NotFoundContainer';
import './notFound.css';

class NotFound extends React.Component {
  render() {
    const { darkmode } = this.props;
    return (
      <NotFoundContainer darkmode={ darkmode }>
        <h1>Página não encontrada.</h1>
        <Link
          to="/carteira"
        >
          Ir para Carteira
        </Link>
      </NotFoundContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  darkmode: state.user.darkmode,
});

NotFound.propTypes = {
  darkmode: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(NotFound);

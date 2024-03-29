import React, { Component } from 'react';
import styles from './CardsList.module.scss';
import { connect } from 'react-redux';
import CardLink from '../CardLink';
import Loader from '../Loader';

class CardsList extends Component {

    state = {
        numberOfCards: 1
    }

    handleButton = () => {
        this.setState({ numberOfCards: this.state.numberOfCards + 1 })
    }

    render() {
        const { cardsList } = this.props;
        const { numberOfCards } = this.state;

        return (
            <div className={styles.cardslist}>
                <div className={styles.cardslist__inner}>
                    <p className={styles.cardslist__description}>Главная задача проекта - собрать наиболее полный список интересных, необычных, странных, красивых мест и  достопримечательностей, которые есть на поселке Котовского.</p>
                    <div className={styles.cardslist__wrapper}>
                        {
                            cardsList ? (
                                cardsList.map((item, i) => i < numberOfCards ? <CardLink card={item} key={item.id} /> : null
                                )
                            ) : (
                                    <Loader />
                                )
                        }
                    </div>
                    {
                        cardsList ? (
                            cardsList.length > numberOfCards ? (
                                <button className={styles.cardslist__btn} onClick={this.handleButton}>Показать еще</button>
                            ) : (
                                    <p className={styles.cardslist__notification}> На этом пока всё :) </p>
                                )
                        ) : (
                                null
                            )
                    }
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        cardsList: state.cardsList.cards
    }
}

export default connect(mapStateToProps)(CardsList);
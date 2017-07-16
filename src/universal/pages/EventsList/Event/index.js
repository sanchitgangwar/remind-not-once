import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import MobileStepper from 'material-ui/MobileStepper';
import lightGreen from 'material-ui/colors/lightGreen';
import pink from 'material-ui/colors/pink';

import DoneIcon from 'material-ui-icons/Done';
import DoneAllIcon from 'material-ui-icons/DoneAll';
import UndoIcon from 'material-ui-icons/Undo';

import Table from './Table';

import styles from './index.css';

class Event extends Component {
    static propTypes = {
        summary: PropTypes.string.isRequired,
        calendarId: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        completed: PropTypes.array,
        incomplete: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.state = {
            showCompleted: false,
            selected: []
        };
    }

    handleToggle = (event, index) => {
        const i = this.state.selected.indexOf(index);
        if (i !== -1) {
            this.setState({
                selected: [
                    ...this.state.selected.slice(0, i),
                    ...this.state.selected.slice(i + 1, -1)
                ]
            });
        } else {
            this.setState({
                selected: [
                    ...this.state.selected,
                    index
                ]
            });
        }
    };

    handleExpandClick = () => {
        this.setState({
            showCompleted: !this.state.showCompleted
        });
    };

    render() {
        const { completed, incomplete } = this.props;

        const nCompleted = completed.length;
        const nIncomplete = incomplete.length;

        return (
            <div>
                <Card className={styles.card}>
                    <MobileStepper
                        type="progress"
                        steps={nCompleted + nIncomplete + 1}
                        position="static"
                        activeStep={nCompleted}
                        onNext={() => null}
                        onBack={() => null}
                        classes={{
                            root: styles.stepperRoot,
                            button: styles.stepperButton,
                            progress: styles.progress
                        }}
                    />

                    <CardContent>
                        <div className={styles.headerContainer}>
                            <div className={styles.headerText}>
                                <Typography type="headline" component="h4">
                                    Re-read pages
                                </Typography>
                                <Typography type="caption">
                                    Created: 12th July 2017
                                </Typography>
                            </div>

                            <div className={styles.headerIcons}>
                                <IconButton aria-label="Done All">
                                    <DoneAllIcon />
                                </IconButton>
                            </div>
                        </div>

                        <Typography style={{ margin: '10px 0 20px 0' }}>
                            Total: {nIncomplete + nCompleted}, Remaining: {incomplete.length}
                        </Typography>

                        <Table
                            title="INCOMPLETE"
                            backgroundColor={pink['50']}
                            list={incomplete}
                            actionIcon={<DoneIcon />}
                            onActionClick={this.handleDone}
                        />
                    </CardContent>

                    <Collapse in={this.state.showCompleted}
                        transitionDuration="auto" unmountOnExit>

                        <CardContent>
                            <Table
                                title="COMPLETED"
                                backgroundColor={lightGreen['50']}
                                list={completed}
                                actionIcon={<UndoIcon />}
                                onActionClick={this.handleUndo}
                            />
                        </CardContent>
                    </Collapse>
                    {
                        nCompleted ? (
                            <CardActions classes={{
                                root: styles.cardActionContainer
                            }}>
                                <Button dense color="primary" onClick={this.handleExpandClick}>
                                    { this.state.showCompleted ?
                                        'Hide completed' :
                                        'Show completed' }
                                </Button>
                            </CardActions>
                        ) : null
                    }
                </Card>
            </div>
        );
    }
}

export default Event;

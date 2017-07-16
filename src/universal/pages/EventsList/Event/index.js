import React, { Component } from 'react';

import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MobileStepper from 'material-ui/MobileStepper';
import DoneIcon from 'material-ui-icons/Done';
import DoneAllIcon from 'material-ui-icons/DoneAll';
import UndoIcon from 'material-ui-icons/Undo';
import pink from 'material-ui/colors/pink';
import lightGreen from 'material-ui/colors/lightGreen';

import styles from './index.css';

class Event extends Component {
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
        const incomplete = [
            'Walden, Page 21', 'India, Page 30'
        ];

        const complete = [
            'Harry Potter, Pages 20-25', 'History I, Pages 40-50'
        ];

        return (
            <div>
                <Card className={styles.card}>
                    <MobileStepper
                        type="progress"
                        steps={5}
                        position="static"
                        activeStep={2}
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

                        <Typography>Total: 5, Remaining: 2</Typography>

                        <div className={styles.listRoot}
                            style={{
                                marginTop: 20,
                                backgroundColor: pink['50']
                            }}>
                            <Typography type="subheading">
                                INCOMPLETE
                            </Typography>
                            <List>
                                {
                                    incomplete.map((value, index) =>
                                        <ListItem dense button key={value}
                                            onClick={event => this.handleToggle(event, index)}
                                            classes={{
                                                root: styles.listItem
                                            }}>

                                            <ListItemText primary={`Line item ${value + 1}`} />
                                            <ListItemSecondaryAction classes={{
                                                root: styles.secondaryAction
                                            }}>
                                                <IconButton aria-label="Done">
                                                    <DoneIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>)
                                }
                            </List>
                        </div>
                    </CardContent>

                    <Collapse in={this.state.showCompleted}
                        transitionDuration="auto" unmountOnExit>

                        <CardContent>
                            <div className={styles.listRoot} style={{
                                backgroundColor: lightGreen['50']
                            }}>
                                <Typography type="subheading">COMPLETED</Typography>
                                <List>
                                    {
                                        complete.map((value, index) =>
                                            <ListItem dense button key={value}
                                                onClick={event => this.handleToggle(event, index)}
                                                classes={{
                                                    root: styles.listItem
                                                }}>

                                                <ListItemText primary={`Line item ${value + 1}`} />
                                                <ListItemSecondaryAction classes={{
                                                    root: styles.secondaryAction
                                                }}>
                                                    <IconButton aria-label="Undo">
                                                        <UndoIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>)
                                    }
                                </List>
                            </div>
                        </CardContent>
                    </Collapse>

                    <CardActions classes={{
                        root: styles.cardActionContainer
                    }}>
                        <Button dense color="primary" onClick={this.handleExpandClick}>
                            { this.state.showCompleted ?
                                'Hide completed' :
                                'Show completed' }
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Event;

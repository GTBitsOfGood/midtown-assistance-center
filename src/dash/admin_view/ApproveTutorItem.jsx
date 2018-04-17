import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../public/css/admin.css';
import axios from "axios/index";

class ApproveTutorItem extends React.Component {
    constructor(props) {
        super(props);
        this.approveOrDeny = this.approveOrDeny.bind(this);
    }

    approveOrDeny(bool) {
        this.props.tutor.approved =  true;
        if (bool) {
            this.props.tutor.status = 'approved';
        } else {
            this.props.tutor.status = 'denied';
        }
        let self = this;
        axios.patch('/api/tutor', this.props.tutor)
            .then(function(response) {
                self.props.refreshTutors();
            }).catch(function(err) {
                console.log(err);
            });

    }

    render() {
        return (
            <div className={styles.approve_tutor_item_wrapper}>
                <div className="approve-tutor-item">
                    {/**
                     <h3>{this.props.data.first_name + " " + this.props.data.last_name}</h3>
                     <h4 className="lighter-text">{this.props.data.email}</h4>

                     <button className="btn  btn-success approve-button">APPROVE</button>
                     <button className="btn  btn-danger reject-button">REJECT</button>
                     **/}

                    <h3 className="text-center approve-tutor-header">{this.props.tutor.first_name + ' ' + this.props.tutor.last_name}</h3>
                    <h5><span className="tutor-ic-admin glyphicon glyphicon-envelope"></span><span className={styles.lighter_text}> Email: </span>{this.props.tutor.email}</h5>
                    <h5><span className="tutor-ic-admin glyphicon glyphicon-envelope"></span><span className={styles.lighter_text}> Gmail: </span>{this.props.tutor.gmail}</h5>
                    <h5><span className="tutor-ic-admin glyphicon glyphicon-tree-deciduous"></span><span className={styles.lighter_text}> University: </span>Georgia Tech</h5>
                    <h5><span className="tutor-ic-admin glyphicon glyphicon-apple"></span><span className={styles.lighter_text}> Subjects: </span>{this.props.tutor.subjects.map((subj) => subj.subject + ' ')}</h5>
                    <h5><span className="tutor-ic-admin glyphicon glyphicon-star"></span><span className={styles.lighter_text}> Favorites: </span>{this.props.tutor.favorites.map((fav) => fav.favorite + ' ')}</h5>
                    <h5><span className="tutor-ic-admin glyphicon glyphicon-pencil"></span><span className={styles.lighter_text}> Bio: </span>{this.props.tutor.bio ? this.props.tutor.bio : 'This tutor has not entered a bio'}</h5>
                    <div className="col-sm-12 text-center">
                        <button onClick={() => this.approveOrDeny(true)} className={styles.approve_btn}>Approve</button>
                        <button onClick={() => this.approveOrDeny(false)} className={styles.deny_btn}>Deny</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default ApproveTutorItem;

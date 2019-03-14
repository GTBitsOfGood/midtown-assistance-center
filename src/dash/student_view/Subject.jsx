import React from 'react';
import PropTypes from 'prop-types';

const SubjectComp = (props) => {
    const { is_favorite, start_grade, end_grade, subject} = props;
    const grades = is_favorite
        ? ''
        : ` (${start_grade}-${end_grade}) `;
    return (
        <span
            className={
                is_favorite ? 'favorite-span' : 'subject-span'
            }
        >
            {subject + grades}
        </span>
    );
};

SubjectComp.propTypes = {
    is_favorite: PropTypes.bool.isRequired,
    start_grade: PropTypes.number.isRequired,
    end_grade: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired
};


export default SubjectComp;
